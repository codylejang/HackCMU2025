import { NextRequest, NextResponse } from 'next/server';
import { getAllBooks, addBook, deleteBook } from '@/lib/database';
import { saveUploadedFile, generateBookCover, extractTextContent } from '@/lib/fileUpload';
import { openNotebookClient } from '@/lib/openNotebook';
import path from 'path';

export async function GET() {
  try {
    const books = getAllBooks();
    return NextResponse.json({
      success: true,
      data: books
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const author = formData.get('author') as string;
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/epub+zip', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Only PDF, EPUB, and TXT files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'File size too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Save the uploaded file
    const uploadResult = await saveUploadedFile(file);
    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, error: uploadResult.error || 'Failed to save file' },
        { status: 500 }
      );
    }

    // Determine file type
    const fileType = file.type === 'application/pdf' ? 'pdf' : 
                    file.type === 'application/epub+zip' ? 'epub' : 'txt';

    // Extract text content with error handling
    let content: string;
    try {
      content = await extractTextContent(uploadResult.filePath!, fileType);
    } catch (error) {
      console.error('Content extraction failed:', error);
      content = `# ${file.name}\n\n**Error:** Content extraction failed.\n\n**Details:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n**File Type:** ${fileType.toUpperCase()}\n\n**Note:** The file was uploaded but content could not be extracted.`;
    }

    // Generate book cover with error handling
    const title = file.name.replace(/\.[^/.]+$/, "");
    let finalCoverPath = uploadResult.coverPath!;
    try {
      const coverGenerated = await generateBookCover(title, fileType, uploadResult.coverPath!, uploadResult.filePath);
      if (coverGenerated) {
        // Check if the cover path was changed (e.g., from PNG to SVG for failed extraction)
        const expectedExtension = (fileType === 'pdf' || fileType === 'epub') ? '.png' : '.svg';
        const actualExtension = path.extname(uploadResult.coverPath!);
        if (actualExtension !== expectedExtension) {
          // Update the cover path to match the actual file created
          finalCoverPath = uploadResult.coverPath!.replace(actualExtension, expectedExtension);
        }
      }
    } catch (error) {
      console.error('Cover generation failed:', error);
      // Continue without cover - the system will handle missing covers gracefully
    }

    // Create book record
    const newBook = {
      id: uploadResult.bookId!,
      title,
      author: author || 'Unknown',
      fileType: fileType as 'pdf' | 'epub' | 'txt',
      uploadDate: new Date().toISOString(),
      filePath: uploadResult.filePath!,
      coverPath: finalCoverPath || '', // Use the final cover path
      fileSize: file.size,
      content,
      currentPage: 1, // Initialize to page 1
      notebookId: undefined,
      sourceId: undefined
    };

    // Save initial book record
    const savedBook = addBook(newBook);

    // Process with Open Notebook in background
    try {
      // Create notebook in Open Notebook
      const notebookResponse = await openNotebookClient.createNotebook({
        name: title,
        description: `E-book: ${title} by ${author || 'Unknown'}`
      });

      // Create source with the book content
      const sourceResponse = await openNotebookClient.createSource({
        notebook_id: notebookResponse.id,
        type: 'text',
        content: content,
        embed: true // Enable embeddings for Q&A
      });

      // Update book record with Open Notebook IDs
      const updatedBook = {
        ...savedBook,
        notebookId: notebookResponse.id,
        sourceId: sourceResponse.id
      };

      // Update the book in database
      const { updateBook } = await import('@/lib/database');
      const finalBook = updateBook(savedBook.id, {
        notebookId: notebookResponse.id,
        sourceId: sourceResponse.id
      });

      console.log(`Book ${title} successfully processed with Open Notebook. Notebook ID: ${notebookResponse.id}, Source ID: ${sourceResponse.id}`);

      return NextResponse.json({
        success: true,
        data: finalBook || updatedBook,
        message: 'Book uploaded and processed successfully'
      });

    } catch (openNotebookError: unknown) {
      console.error('Failed to process book with Open Notebook:', openNotebookError);

      // Return the book without Open Notebook integration
      // The Q&A will show an appropriate error message
      return NextResponse.json({
        success: true,
        data: savedBook,
        warning: 'Book uploaded but AI processing failed. Q&A features may not be available.',
        openNotebookError: openNotebookError instanceof Error ? openNotebookError.message : String(openNotebookError)
      });
    }
  } catch (error) {
    console.error('Error uploading book:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload book' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookId = searchParams.get('id');
    
    if (!bookId) {
      return NextResponse.json(
        { success: false, error: 'Book ID is required' },
        { status: 400 }
      );
    }

    const success = deleteBook(bookId);
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete book' },
      { status: 500 }
    );
  }
}
