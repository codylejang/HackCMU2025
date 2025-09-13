import { NextRequest, NextResponse } from 'next/server';
import { openNotebookClient, ensureModelsConfigured } from '@/lib/openNotebook';
import { getBookById } from '@/lib/database';

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
    const { question, bookId, context } = body;

    if (!question || !bookId) {
      return NextResponse.json(
        { success: false, error: 'Question and bookId are required' },
        { status: 400 }
      );
    }

    // Get book information from local database
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
        { success: false, error: 'Book not yet processed by AI backend. Please wait for processing to complete.' },
        { status:400 }
      );
    }

    // Ensure models are configured
    const modelsStatus = await ensureModelsConfigured();
    if (!modelsStatus.ready) {
      return NextResponse.json(
        { success: false, error: 'Open Notebook models not configured properly. Please check the AI backend configuration.' },
        { status: 503 }
      );
    }

    // Use the default chat model for answering questions
    const chatModel = modelsStatus.chatModel!;

    // Make request to Open Notebook's chunk-based Q&A endpoint
    try {
      const askResponse = await openNotebookClient.askQuestion({
        question,
        model_id: chatModel.id,
        limit: 10, // Get up to 10 relevant chunks
        search_sources: true,
        search_notes: false,
        minimum_score: 0.3
      });

      // Transform Open Notebook response to match frontend expectations
      const references = askResponse.chunks_used.map((chunk, index) => ({
        id: chunk.id,
        content: chunk.text,
        relevanceScore: askResponse.vector_search_results[index]?.score || 0.8
      }));

      const transformedResponse: QAResponse = {
        answer: askResponse.answer,
        references
      };

      return NextResponse.json({
        success: true,
        data: transformedResponse
      });

    } catch (openNotebookError) {
      console.error('Open Notebook API error:', openNotebookError);
      return NextResponse.json(
        { success: false, error: 'AI backend is not available. Please ensure Open Notebook is running.' },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error('QA API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
