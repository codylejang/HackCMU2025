import { NextRequest, NextResponse } from 'next/server';
import { getBookById } from '@/lib/database';
import { openNotebookClient } from '@/lib/openNotebook';

interface QARequest {
  question: string;
  bookId: string;
  context?: string;
}

interface QAResponse {
  answer: string;
  references: Array<{
    id: string;
    content: string;
    page?: number;
    chapter?: string;
    relevanceScore: number;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body: QARequest = await request.json();
    const { question, bookId } = body;

    if (!question || !bookId) {
      return NextResponse.json(
        { success: false, error: 'Question and bookId are required' },
        { status: 400 }
      );
    }

    // Get book from local database
    const book = getBookById(bookId);
    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    // Check if book has been processed by Open Notebook
    if (!book.notebookId || !book.sourceId) {
      return NextResponse.json(
        { success: false, error: 'Book not yet processed. Please wait for processing to complete.' },
        { status: 400 }
      );
    }

    try {
      // Get default models from Open Notebook
      const defaultModels = await openNotebookClient.getDefaultModels();

      if (!defaultModels.default_chat_model || !defaultModels.default_embedding_model) {
        return NextResponse.json(
          { success: false, error: 'Open Notebook models not configured properly' },
          { status: 500 }
        );
      }

      // Ask question using Open Notebook
      const askResponse = await openNotebookClient.ask({
        question: question,
        strategy_model: defaultModels.default_chat_model,
        answer_model: defaultModels.default_chat_model,
        final_answer_model: defaultModels.default_chat_model
      });

      // Also get search results to extract references
      const searchResponse = await openNotebookClient.search({
        query: question,
        type: 'vector',
        limit: 5,
        search_sources: true,
        search_notes: false,
        minimum_score: 0.3
      });

      // Transform search results into references
      const references = searchResponse.results.map((result: Record<string, unknown>, index: number) => ({
        id: `ref_${index}`,
        content: result.chunk_content || result.content || 'No content available',
        page: result.page_number || undefined,
        chapter: result.chapter || undefined,
        relevanceScore: result.score || 0.5
      }));

      const qaResponse: QAResponse = {
        answer: askResponse.answer,
        references: references
      };

      return NextResponse.json({
        success: true,
        data: qaResponse
      });

    } catch (openNotebookError: unknown) {
      console.error('Open Notebook API Error:', openNotebookError);

      // Fallback to basic search if ask fails
      try {
        const searchResponse = await openNotebookClient.search({
          query: question,
          type: 'text',
          limit: 3,
          search_sources: true,
          search_notes: false
        });

        const fallbackAnswer = `I found some relevant passages in the book related to your question: "${question}". Please review the references below for more detailed information.`;

        const references = searchResponse.results.map((result: Record<string, unknown>, index: number) => ({
          id: `ref_${index}`,
          content: result.chunk_content || result.content || 'No content available',
          page: result.page_number || undefined,
          chapter: result.chapter || undefined,
          relevanceScore: result.score || 0.5
        }));

        return NextResponse.json({
          success: true,
          data: {
            answer: fallbackAnswer,
            references: references
          }
        });
      } catch (fallbackError) {
        console.error('Fallback search also failed:', fallbackError);
        return NextResponse.json(
          { success: false, error: `Failed to process question: ${openNotebookError instanceof Error ? openNotebookError.message : String(openNotebookError)}` },
          { status: 500 }
        );
      }
    }

  } catch (error) {
    console.error('QA API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
