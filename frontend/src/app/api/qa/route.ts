import { NextRequest, NextResponse } from 'next/server';

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

    // Forward the request to the backend API
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5055';
    
    const response = await fetch(`${backendUrl}/api/search/ask/simple`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        bookId,
        context: context || ''
      })
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const backendData = await response.json();
    
    // Transform backend response to match frontend expectations
    const transformedResponse: QAResponse = {
      answer: backendData.answer,
      references: backendData.references || []
    };

    return NextResponse.json({
      success: true,
      data: transformedResponse
    });
  } catch (error) {
    console.error('QA API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process question' },
      { status: 500 }
    );
  }
}
