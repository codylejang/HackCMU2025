import asyncio
import json
from typing import AsyncGenerator, Dict

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from loguru import logger

from api.models import AskRequest, AskResponse, ChunkAskRequest, ChunkAskResponse, SearchChunk, SearchRequest, SearchResponse, VectorSearchResult
from open_notebook.domain.models import Model, model_manager
from open_notebook.domain.notebook import text_search, vector_search
from open_notebook.exceptions import DatabaseOperationError, InvalidInputError
from open_notebook.graphs.ask import graph as ask_graph
from open_notebook.graphs.utils import provision_langchain_model
from langchain_core.messages import HumanMessage, SystemMessage

router = APIRouter()


@router.post("/search", response_model=SearchResponse)
async def search_knowledge_base(search_request: SearchRequest):
    """Search the knowledge base using text or vector search."""
    try:
        if search_request.type == "vector":
            # Check if embedding model is available for vector search
            if not await model_manager.get_embedding_model():
                raise HTTPException(
                    status_code=400,
                    detail="Vector search requires an embedding model. Please configure one in the Models section.",
                )

            results = await vector_search(
                keyword=search_request.query,
                results=search_request.limit,
                source=search_request.search_sources,
                note=search_request.search_notes,
                minimum_score=search_request.minimum_score,
            )
        else:
            # Text search
            results = await text_search(
                keyword=search_request.query,
                results=search_request.limit,
                source=search_request.search_sources,
                note=search_request.search_notes,
            )

        return SearchResponse(
            results=results or [],
            total_count=len(results) if results else 0,
            search_type=search_request.type,
        )

    except InvalidInputError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except DatabaseOperationError as e:
        logger.error(f"Database error during search: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error during search: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")


async def stream_ask_response(
    question: str, strategy_model: Model, answer_model: Model, final_answer_model: Model
) -> AsyncGenerator[str, None]:
    """Stream the ask response as Server-Sent Events."""
    try:
        final_answer = None

        async for chunk in ask_graph.astream(
            input=dict(question=question),
            config=dict(
                configurable=dict(
                    strategy_model=strategy_model.id,
                    answer_model=answer_model.id,
                    final_answer_model=final_answer_model.id,
                )
            ),
            stream_mode="updates",
        ):
            if "agent" in chunk:
                strategy_data = {
                    "type": "strategy",
                    "reasoning": chunk["agent"]["strategy"].reasoning,
                    "searches": [
                        {"term": search.term, "instructions": search.instructions}
                        for search in chunk["agent"]["strategy"].searches
                    ],
                }
                yield f"data: {strategy_data}\n\n"

            elif "provide_answer" in chunk:
                for answer in chunk["provide_answer"]["answers"]:
                    answer_data = {"type": "answer", "content": answer}
                    yield f"data: {answer_data}\n\n"

            elif "write_final_answer" in chunk:
                final_answer = chunk["write_final_answer"]["final_answer"]
                final_data = {"type": "final_answer", "content": final_answer}
                yield f"data: {final_data}\n\n"

        # Send completion signal
        yield f"data: {{'type': 'complete', 'final_answer': '{final_answer}'}}\n\n"

    except Exception as e:
        logger.error(f"Error in ask streaming: {str(e)}")
        error_data = {"type": "error", "message": str(e)}
        yield f"data: {error_data}\n\n"


@router.post("/search/ask")
async def ask_knowledge_base(ask_request: AskRequest):
    """Ask the knowledge base a question using AI models."""
    try:
        # Validate models exist
        strategy_model = await Model.get(ask_request.strategy_model)
        answer_model = await Model.get(ask_request.answer_model)
        final_answer_model = await Model.get(ask_request.final_answer_model)

        if not strategy_model:
            raise HTTPException(
                status_code=400,
                detail=f"Strategy model {ask_request.strategy_model} not found",
            )
        if not answer_model:
            raise HTTPException(
                status_code=400,
                detail=f"Answer model {ask_request.answer_model} not found",
            )
        if not final_answer_model:
            raise HTTPException(
                status_code=400,
                detail=f"Final answer model {ask_request.final_answer_model} not found",
            )

        # Check if embedding model is available
        if not await model_manager.get_embedding_model():
            raise HTTPException(
                status_code=400,
                detail="Ask feature requires an embedding model. Please configure one in the Models section.",
            )

        # For streaming response
        return StreamingResponse(
            stream_ask_response(
                ask_request.question, strategy_model, answer_model, final_answer_model
            ),
            media_type="text/plain",
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in ask endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Ask operation failed: {str(e)}")


@router.post("/search/ask/simple", response_model=AskResponse)
async def ask_knowledge_base_simple(ask_request: AskRequest):
    """Ask the knowledge base a question and return a simple response (non-streaming)."""
    try:
        # Validate models exist
        strategy_model = await Model.get(ask_request.strategy_model)
        answer_model = await Model.get(ask_request.answer_model)
        final_answer_model = await Model.get(ask_request.final_answer_model)

        if not strategy_model:
            raise HTTPException(
                status_code=400,
                detail=f"Strategy model {ask_request.strategy_model} not found",
            )
        if not answer_model:
            raise HTTPException(
                status_code=400,
                detail=f"Answer model {ask_request.answer_model} not found",
            )
        if not final_answer_model:
            raise HTTPException(
                status_code=400,
                detail=f"Final answer model {ask_request.final_answer_model} not found",
            )

        # Check if embedding model is available
        if not await model_manager.get_embedding_model():
            raise HTTPException(
                status_code=400,
                detail="Ask feature requires an embedding model. Please configure one in the Models section.",
            )

        # Run the ask graph and get final result
        final_answer = None
        async for chunk in ask_graph.astream(
            input=dict(question=ask_request.question),
            config=dict(
                configurable=dict(
                    strategy_model=strategy_model.id,
                    answer_model=answer_model.id,
                    final_answer_model=final_answer_model.id,
                )
            ),
            stream_mode="updates",
        ):
            if "write_final_answer" in chunk:
                final_answer = chunk["write_final_answer"]["final_answer"]

        if not final_answer:
            raise HTTPException(status_code=500, detail="No answer generated")

        return AskResponse(answer=final_answer, question=ask_request.question)

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in ask simple endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Ask operation failed: {str(e)}")


def format_search_results_for_chunks(search_results: list) -> str:
    """Format search results into the expected format for the chunk-based prompt."""
    if not search_results:
        return '{"query": "No relevant information found", "results": []}'

    formatted_chunks = []
    for i, result in enumerate(search_results):
        # Extract data from the search result structure
        if hasattr(result, '__dict__'):
            result_dict = result.__dict__
        else:
            result_dict = result

        # Create a unique chunk ID based on the result data
        chunk_id = result_dict.get('id', f"chunk_{i+1}")

        # Extract the text content from matches or title
        matches = result_dict.get('matches', [])
        title = result_dict.get('title', '')

        # Use the most relevant match or title
        text_content = matches[0] if matches else title or ''

        # Clean up and truncate text content for better readability
        text_content = str(text_content).strip()
        if len(text_content) > 800:  # Increased limit for better context
            text_content = text_content[:800] + "..."

        # Escape JSON special characters properly
        text_content = (text_content
                       .replace('\\', '\\\\')
                       .replace('"', '\\"')
                       .replace('\n', '\\n')
                       .replace('\r', '\\r')
                       .replace('\t', '\\t'))

        formatted_chunks.append(f'{{"id": "{chunk_id}", "text": "{text_content}"}}')

    # Return in the format expected by ex.json
    chunks_json = "[" + ",".join(formatted_chunks) + "]"
    return f'{{"query": "User query", "results": {chunks_json}}}'


async def generate_chunk_based_answer(question: str, search_results: list, model: Model) -> tuple[str, list[SearchChunk], str]:
    """Generate an answer using the chunk-based prompt template with improved formatting."""

    if not search_results:
        return "Based on the provided text, I cannot answer this question.", [], ""

    # Create JSON format following the exact structure from ex.json
    chunk_results = []
    chunk_mapping = {}

    for i, result in enumerate(search_results):
        # Extract data from the search result structure
        if hasattr(result, '__dict__'):
            result_dict = result.__dict__
        else:
            result_dict = result

        chunk_id = result_dict.get('id', f"chunk_{i+1}")
        matches = result_dict.get('matches', [])
        title = result_dict.get('title', '')

        # Only process items where the id starts with "source:"
        if not chunk_id.startswith('source:'):
            continue

        # Create separate entries for each match, following the JSON format exactly
        if matches:
            for match_idx, match in enumerate(matches):
                match_text = str(match).strip()
                # Create unique ID for each match
                match_chunk_id = f"{chunk_id}:match{match_idx+1}" if len(matches) > 1 else chunk_id

                # Store mapping for later use
                chunk_mapping[match_chunk_id] = match_text

                # Create separate chunk object for each match
                chunk_results.append({
                    "id": match_chunk_id,
                    "text": match_text  # No text limits
                })
        else:
            # Fall back to title if no matches, but only if title exists
            text_content = str(title or '').strip()
            if text_content:
                chunk_mapping[chunk_id] = text_content
                chunk_results.append({
                    "id": chunk_id,
                    "text": text_content
                })
            # If neither matches nor title exist, skip this chunk (don't raise error)

    # Format as JSON string exactly like ex.json
    formatted_chunks_json = {
        "query": question,
        "results": chunk_results
    }
    formatted_chunks_text = json.dumps(formatted_chunks_json, ensure_ascii=False)

    # Create the improved prompt that references the JSON format
    prompt_template = """You are an expert AI assistant tasked with answering a user's question based ONLY on a provided set of search results. Follow these instructions precisely.

**Instructions:**

1. **Synthesize an Answer:** Carefully read the user's QUESTION and all the text chunks in the SEARCH RESULTS. Synthesize a single, comprehensive, and accurate answer to the question.
2. **Filter for Relevance:** Critically evaluate each text chunk. If a chunk is not relevant to the user's QUESTION, you MUST ignore it and not include its information in your answer.
3. **Cite Your Sources:** For EVERY piece of information you use from a text chunk, you MUST cite its corresponding `id` immediately after the sentence or clause containing that information. Use the format `[id]`. For example: "Steve Jobs believed Microsoft had no taste [doc1:chunk1]."
4. **No Outside Information:** Do NOT use any knowledge you have outside of the provided SEARCH RESULTS. If the search results do not contain enough information to answer the question, you must state: "Based on the provided text, I cannot answer this question."
5. **Be Concise:** Do not repeat information. Combine facts from multiple sources into a single, coherent narrative.

---

**User's QUESTION:**
{user_question}

**SEARCH RESULTS:**
{formatted_chunks_text}

---

**Answer:**"""

    final_prompt = prompt_template.format(
        user_question=question,
        formatted_chunks_text=formatted_chunks_text
    )

    # Generate the answer using the LangChain model provisioning
    try:
        # Use a more direct system message
        system_msg = SystemMessage(content="You are an expert assistant that answers questions based on provided text chunks. Always cite your sources using the chunk IDs in brackets [chunk_id].")
        human_msg = HumanMessage(content=final_prompt)
        payload = [system_msg, human_msg]

        chain = await provision_langchain_model(
            str(payload),
            model.id,
            "chunk_ask",
            max_tokens=3000,  # Increased token limit
        )

        response = await chain.ainvoke(payload)
        answer_text = response.content if hasattr(response, 'content') else str(response)

        logger.info(f"Generated answer: {answer_text[:200]}...")

    except Exception as e:
        logger.error(f"Error generating answer with model {model.id}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating answer: {str(e)}")

    # Create SearchChunk objects for the response - include all chunks that were referenced
    chunks_used = []
    for chunk_id, content in chunk_mapping.items():
        # Look for both the exact chunk ID and any similar references
        # Handle different citation formats: [chunk_id], [simplified_id], or partial matches
        simplified_id = chunk_id.split(':')[-1] if ':' in chunk_id else chunk_id

        if (f"[{chunk_id}]" in answer_text or
            f"[{simplified_id}]" in answer_text or
            chunk_id in answer_text or
            simplified_id in answer_text):
            chunks_used.append(SearchChunk(id=chunk_id, text=content[:1000]))  # Limit text length

    return answer_text, chunks_used, final_prompt


@router.post("/search/ask/chunk", response_model=ChunkAskResponse)
async def ask_knowledge_base_chunk(chunk_ask_request: ChunkAskRequest):
    """Ask the knowledge base a question and return answer with chunk citations."""
    try:
        # Validate question is not empty
        if not chunk_ask_request.question or not chunk_ask_request.question.strip():
            raise HTTPException(
                status_code=400,
                detail="Question cannot be empty"
            )

        # Validate model exists
        try:
            model = await Model.get(chunk_ask_request.model_id)
            if not model:
                raise HTTPException(
                    status_code=400,
                    detail=f"Model {chunk_ask_request.model_id} not found",
                )
        except Exception as e:
            # Handle case where model ID doesn't exist or is malformed
            if "not found" in str(e).lower():
                raise HTTPException(
                    status_code=400,
                    detail=f"Model {chunk_ask_request.model_id} not found",
                )
            else:
                logger.error(f"Error retrieving model {chunk_ask_request.model_id}: {str(e)}")
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid model ID: {chunk_ask_request.model_id}",
                )

        # Check if embedding model is available for vector search
        if not await model_manager.get_embedding_model():
            raise HTTPException(
                status_code=400,
                detail="Ask feature requires an embedding model. Please configure one in the Models section.",
            )

        # Perform vector search to get relevant chunks
        search_results = await vector_search(
            keyword=chunk_ask_request.question,
            results=chunk_ask_request.limit,
            source=chunk_ask_request.search_sources,
            note=chunk_ask_request.search_notes,
            minimum_score=chunk_ask_request.minimum_score,
        )

        # Convert search results to structured format for response
        vector_search_results = []
        raw_results_data = []

        if search_results:
            for result in search_results:
                # Capture raw result data for debugging
                if hasattr(result, '__dict__'):
                    raw_results_data.append(result.__dict__)
                else:
                    raw_results_data.append(str(result))

                # Extract data from the search result structure (it's a dict in raw_results_data)
                if hasattr(result, '__dict__'):
                    result_dict = result.__dict__
                else:
                    result_dict = result

                result_id = result_dict.get('id', 'unknown')
                matches = result_dict.get('matches', [])
                parent_id = result_dict.get('parent_id', None)
                score = result_dict.get('similarity', None)
                title = result_dict.get('title', '')

                # Combine matches into content (take first match or combine them)

                vector_result = VectorSearchResult(
                    id=str(result_id),
                    content=matches,
                    title=str(title) if title else None,
                    source_id=str(parent_id) if parent_id else None,
                    score=float(score) if score is not None else None
                )
                vector_search_results.append(vector_result)

        # Format search results for AI prompt - this is used for debugging/logging only now
        formatted_results = format_search_results_for_chunks(search_results) if search_results else '{"query": "No relevant information found", "results": []}'

        if not search_results:
            return ChunkAskResponse(
                answer="Based on the provided text, I cannot answer this question.",
                question=chunk_ask_request.question,
                chunks_used=[],
                vector_search_results=vector_search_results,
                search_count=0,
                formatted_search_results=formatted_results,
                raw_search_results=raw_results_data,
                prompt_sent_to_llm=""
            )

        # Generate answer using the chunk-based prompt
        answer_text, chunks_used, prompt_sent_to_llm = await generate_chunk_based_answer(
            chunk_ask_request.question,
            search_results,
            model
        )

        return ChunkAskResponse(
            answer=answer_text,
            question=chunk_ask_request.question,
            chunks_used=chunks_used,
            vector_search_results=vector_search_results,
            search_count=len(search_results),
            formatted_search_results=formatted_results,
            raw_search_results=raw_results_data,
            prompt_sent_to_llm=prompt_sent_to_llm
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in chunk ask endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chunk ask operation failed: {str(e)}")
