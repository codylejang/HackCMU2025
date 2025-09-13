import { NextResponse } from 'next/server';
import { updateBook } from '@/lib/database';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { currentPage } = await request.json();

    console.log('API: Updating current page:', { id, currentPage });

    if (typeof currentPage !== 'number' || currentPage < 1) {
      console.log('API: Invalid current page number');
      return NextResponse.json(
        { success: false, error: 'Invalid current page number' },
        { status: 400 }
      );
    }

    const updatedBook = updateBook(id, { currentPage });
    console.log('API: Updated book:', { id, currentPage: updatedBook?.currentPage });

    if (!updatedBook) {
      console.log('API: Book not found');
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: { currentPage: updatedBook.currentPage }
    });
  } catch (error) {
    console.error('Error updating current page:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update current page' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Handle sendBeacon requests (which use POST)
  return PUT(request, { params });
}
