import { NextRequest, NextResponse } from 'next/server';
import { getAllBooks, addBook, deleteBook } from '@/lib/database';
import { saveUploadedFile, generateBookCover, extractTextContent } from '@/lib/fileUpload';
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

    // Extract proper title from file metadata
    let title = file.name.replace(/\.[^/.]+$/, ""); // Default to filename
    let bookAuthor = 'Unknown';
    
    // For EPUB files, try to extract actual title and author from metadata
    if (fileType === 'epub') {
      try {
        const epub = require('epub');
        const epubInstance = new epub(uploadResult.filePath!);
        
        await new Promise((resolve, reject) => {
          epubInstance.on('end', () => {
            if (epubInstance.metadata) {
              if (epubInstance.metadata.title) {
                title = epubInstance.metadata.title;
              }
              if (epubInstance.metadata.creator) {
                bookAuthor = epubInstance.metadata.creator;
              }
            }
            resolve(true);
          });
          
          epubInstance.on('error', (err: any) => {
            console.log('EPUB metadata extraction failed, using filename:', err);
            resolve(true); // Continue with filename as fallback
          });
          
          epubInstance.parse();
        });
      } catch (error) {
        console.log('EPUB metadata extraction failed, using filename:', error);
      }
    }
    
    // Generate book cover with error handling
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
      author: bookAuthor,
      fileType: fileType as 'pdf' | 'epub' | 'txt',
      uploadDate: new Date().toISOString(),
      filePath: uploadResult.filePath!,
      coverPath: finalCoverPath || '', // Use the final cover path
      fileSize: file.size,
      content,
      currentPage: 1 // Initialize to page 1
    };

    // Save to database
    const savedBook = addBook(newBook);

    return NextResponse.json({
      success: true,
      data: savedBook
    });
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
