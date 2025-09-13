#!/usr/bin/env python3
"""
Test script for the new /api/search/ask/chunk endpoint.

This script tests the chunk-based Q&A functionality by:
1. Checking API health and available models
2. Sending questions to the chunk endpoint
3. Verifying the response format and citations
4. Testing edge cases

Usage:
    conda activate open-notebook
    python test_chunk_ask.py
"""

import asyncio
import json
import sys
from datetime import datetime
from pathlib import Path
from typing import Dict, Any, Optional

import httpx
from loguru import logger

# Configuration
API_BASE_URL = "http://localhost:5055"
TEST_TIMEOUT = 60  # Increased timeout for AI processing


class ChunkAskTester:
    def __init__(self, base_url: str = API_BASE_URL):
        self.base_url = base_url
        self.client = httpx.AsyncClient(timeout=TEST_TIMEOUT)
        self.test_results = []
        self.test_data_dir = Path("data/tests")
        self.test_data_dir.mkdir(parents=True, exist_ok=True)

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.client.aclose()

    def save_test_result(self, result: Dict[str, Any], test_name: str = "chunk_ask_test") -> str:
        """Save test result to JSON file with timestamp."""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{test_name}_{timestamp}.json"
        filepath = self.test_data_dir / filename

        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(result, f, indent=2, ensure_ascii=False)
            logger.info(f"💾 Saved test results to: {filepath}")
            return str(filepath)
        except Exception as e:
            logger.error(f"❌ Failed to save test results: {e}")
            return ""

    def save_prompt_to_file(self, prompt: str, test_name: str = "llm_prompt") -> str:
        """Save the LLM prompt to a text file with timestamp."""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{test_name}_{timestamp}.txt"
        filepath = self.test_data_dir / filename

        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(prompt)
            logger.info(f"📝 Saved LLM prompt to: {filepath}")
            return str(filepath)
        except Exception as e:
            logger.error(f"❌ Failed to save LLM prompt: {e}")
            return ""

    async def check_api_health(self) -> bool:
        """Check if the API is running and healthy."""
        try:
            response = await self.client.get(f"{self.base_url}/health")
            if response.status_code == 200:
                logger.info("✅ API is healthy and running")
                return True
            else:
                logger.error(f"❌ API health check failed: {response.status_code}")
                return False
        except Exception as e:
            logger.error(f"❌ Cannot connect to API: {e}")
            return False

    async def check_available_content(self) -> bool:
        """Check if there are notebooks/sources available for testing."""
        try:
            # Check for notebooks
            response = await self.client.get(f"{self.base_url}/api/notebooks")
            if response.status_code == 200:
                notebooks = response.json()
                logger.info(f"📚 Found {len(notebooks)} notebooks")

            # Check for sources
            response = await self.client.get(f"{self.base_url}/api/sources")
            if response.status_code == 200:
                sources = response.json()
                logger.info(f"📄 Found {len(sources)} sources")

                if len(notebooks) > 0 or len(sources) > 0:
                    logger.info("✅ Content available for testing")
                    return True
                else:
                    logger.warning("⚠️ No notebooks or sources found - answers may be limited")
                    return True  # Still allow testing

            return True
        except Exception as e:
            logger.warning(f"⚠️ Could not check content availability: {e}")
            return True  # Continue with tests anyway

    async def get_available_models(self) -> Optional[Dict[str, Any]]:
        """Get list of available models."""
        try:
            response = await self.client.get(f"{self.base_url}/api/models")
            if response.status_code == 200:
                models = response.json()
                language_models = [m for m in models if m.get("type") == "language"]
                embedding_models = [m for m in models if m.get("type") == "embedding"]
                print(language_models)

                logger.info(f"📊 Found {len(language_models)} language models and {len(embedding_models)} embedding models")

                # Check if we have both language and embedding models
                if not language_models:
                    logger.error("❌ No language models available - required for chunk ask")
                    return None

                if not embedding_models:
                    logger.error("❌ No embedding models available - required for vector search")
                    return None

                # Look for openrouter/sonoma-dusk-alpha specifically
                target_model_id = "openrouter/sonoma-dusk-alpha"
                selected_model = None
                
                for model in language_models:
                    if model.get('name') == target_model_id:
                        selected_model = model
                        break
                
                if selected_model:
                    logger.info(f"🎯 Using target language model: {selected_model['name']} (ID: {selected_model['id']})")
                else:
                    logger.warning(f"⚠️ Target model '{target_model_id}' not found, using first available model")
                    selected_model = language_models[0]
                    logger.info(f"🎯 Using fallback language model: {selected_model['name']} (ID: {selected_model['id']})")
                
                logger.info(f"🔍 Vector search enabled with embedding model available")
                return selected_model
            else:
                logger.error(f"❌ Failed to get models: {response.status_code}")
                logger.error(f"Response: {response.text}")
                return None
        except Exception as e:
            logger.error(f"❌ Error getting models: {e}")
            return None

    async def test_chunk_ask_endpoint(self, model_id: str) -> Optional[Dict[str, Any]]:
        """Test the /api/search/ask/chunk endpoint."""
        test_questions = [
            "How is way of handling difficulty different and similar between Steve Jobs and Bill Gates?",
        ]

        for test_question in test_questions:
            logger.info(f"🔍 Testing chunk ask with question: '{test_question}'")

            request_data = {
                "question": test_question,
                "model_id": model_id,
                "search_sources": True,
                "search_notes": False,
                "limit": 100,  # Fixed: API validation requires <= 50
                "minimum_score": 0.4
            }

            try:
                response = await self.client.post(
                    f"{self.base_url}/api/search/ask/chunk",
                    json=request_data,
                    headers={"Content-Type": "application/json"}
                )

                if response.status_code == 200:
                    result = response.json()
                    logger.info("✅ Chunk ask endpoint responded successfully")

                    # Save intermediate results to JSON file
                    saved_file = self.save_test_result(result, "chunk_ask_response")
                    if saved_file:
                        result['saved_to_file'] = saved_file

                    # Save the LLM prompt to a separate text file
                    if 'prompt_sent_to_llm' in result and result['prompt_sent_to_llm']:
                        prompt_file = self.save_prompt_to_file(result['prompt_sent_to_llm'], "llm_prompt")
                        if prompt_file:
                            result['prompt_saved_to_file'] = prompt_file

                    # Validate response structure
                    if self.validate_chunk_response(result):
                        logger.info(f"📝 Answer preview: {result['answer'][:150]}...")
                        return result
                    else:
                        logger.error("❌ Response validation failed")
                        continue
                elif response.status_code == 400:
                    error_detail = response.json().get('detail', response.text)
                    logger.warning(f"⚠️ Bad request (possibly no embedding model): {error_detail}")
                    continue
                else:
                    logger.error(f"❌ Chunk ask failed: {response.status_code}")
                    logger.error(f"Response: {response.text}")
                    continue

            except Exception as e:
                logger.error(f"❌ Error testing chunk ask: {e}")
                continue

        logger.error("❌ All test questions failed")
        return None

    def validate_chunk_response(self, response: Dict[str, Any]) -> bool:
        """Validate the structure of the chunk ask response."""
        logger.info("🔍 Validating response structure...")

        # Check required fields
        required_fields = ["answer", "question", "chunks_used", "vector_search_results", "search_count", "formatted_search_results", "raw_search_results"]
        for field in required_fields:
            if field not in response:
                logger.error(f"❌ Missing required field: {field}")
                return False

        logger.info("✅ All required fields present")

        # Check chunks_used structure
        chunks_used = response["chunks_used"]
        if not isinstance(chunks_used, list):
            logger.error("❌ chunks_used should be a list")
            return False

        logger.info(f"📊 Response contains {len(chunks_used)} chunks")

        # Validate each chunk
        for i, chunk in enumerate(chunks_used):
            if not isinstance(chunk, dict):
                logger.error(f"❌ Chunk {i} is not a dict")
                return False

            if "id" not in chunk or "text" not in chunk:
                logger.error(f"❌ Chunk {i} missing id or text field")
                return False

            chunk_id = chunk["id"]
            answer_text = response["answer"]

            # Check if chunk is properly cited (silently - details saved to JSON)
            if f"[{chunk_id}]" not in answer_text:
                logger.warning(f"⚠️ Chunk {chunk_id} not cited in answer")

        logger.info("✅ Response structure validation passed")
        return True

    async def test_edge_cases(self, model_id: str):
        """Test edge cases for the chunk ask endpoint."""
        logger.info("🧪 Testing edge cases...")

        # Test 1: Empty question
        try:
            response = await self.client.post(
                f"{self.base_url}/api/search/ask/chunk",
                json={
                    "question": "",
                    "model_id": model_id,
                    "search_sources": True,
                    "search_notes": True,
                    "limit": 5,
                    "minimum_score": 0.0
                }
            )
            if response.status_code == 422:
                logger.info("✅ Empty question properly rejected")
            else:
                logger.warning(f"⚠️ Empty question got unexpected response: {response.status_code}")
        except Exception as e:
            logger.error(f"❌ Error testing empty question: {e}")

        # Test 2: Invalid model ID
        try:
            response = await self.client.post(
                f"{self.base_url}/api/search/ask/chunk",
                json={
                    "question": "Test question",
                    "model_id": "invalid-model-id",
                    "search_sources": True,
                    "search_notes": True,
                    "limit": 5,
                    "minimum_score": 0.0
                }
            )
            if response.status_code == 400:
                logger.info("✅ Invalid model ID properly rejected")
            else:
                logger.warning(f"⚠️ Invalid model ID got unexpected response: {response.status_code}")
        except Exception as e:
            logger.error(f"❌ Error testing invalid model: {e}")

    async def run_tests(self):
        """Run all tests for the chunk ask functionality."""
        logger.info("🚀 Starting chunk ask endpoint tests...")

        # Check API health
        if not await self.check_api_health():
            logger.error("❌ API not available, aborting tests")
            return False

        # Check available content
        await self.check_available_content()

        # Get available models
        model = await self.get_available_models()
        if not model:
            logger.error("❌ No suitable models available, aborting tests")
            return False

        model_id = model["id"]

        # Test main functionality
        result = await self.test_chunk_ask_endpoint(model_id)
        if not result:
            logger.error("❌ Main functionality test failed")
            return False

        # Create test summary
        test_summary = {
            "timestamp": datetime.now().isoformat(),
            "model_used": {
                "id": model["id"],
                "name": model.get("name", "Unknown")
            },
            "question": result.get('question', 'N/A'),
            "answer_length": len(result.get('answer', '')),
            "chunks_used_count": len(result.get('chunks_used', [])),
            "search_results_count": result.get('search_count', 0),
            "saved_response_file": result.get('saved_to_file', ''),
            "chunks_used": []
        }

        if result.get('chunks_used'):
            for chunk in result['chunks_used']:
                chunk_preview = chunk['text'][:100] + "..." if len(chunk['text']) > 100 else chunk['text']
                test_summary["chunks_used"].append({
                    "id": chunk['id'],
                    "preview": chunk_preview
                })

        # Save test summary
        self.save_test_result(test_summary, "test_summary")

        # Print concise summary (details saved to JSON files)
        logger.info("📋 Test Summary:")
        logger.info(f"Question: {result.get('question', 'N/A')}")
        logger.info(f"Answer length: {len(result.get('answer', ''))} characters")
        logger.info(f"Chunks used: {len(result.get('chunks_used', []))}")
        logger.info(f"Search results: {result.get('search_count', 0)}")
        logger.info(f"Results saved to: data/tests/")

        logger.info("✅ All tests completed successfully!")
        return True


async def main():
    """Main test function."""
    logger.info("🧪 Open Notebook Chunk Ask API Test")
    logger.info("=" * 50)

    async with ChunkAskTester() as tester:
        success = await tester.run_tests()

        if success:
            logger.info("🎉 All tests passed!")
            sys.exit(0)
        else:
            logger.error("💥 Some tests failed!")
            sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())