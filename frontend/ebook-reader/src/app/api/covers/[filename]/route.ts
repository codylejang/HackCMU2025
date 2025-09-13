import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    const coverPath = path.join(process.cwd(), 'data', 'covers', filename);
    
    // Check if file exists
    if (!fs.existsSync(coverPath)) {
      return new NextResponse('Cover not found', { status: 404 });
    }
    
    // Read the file
    const fileBuffer = fs.readFileSync(coverPath);
    
    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'image/png';
    
    if (ext === '.svg') {
      contentType = 'image/svg+xml';
    } else if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg';
    }
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    });
  } catch (error) {
    console.error('Error serving cover:', error);
    return new NextResponse('Error serving cover', { status: 500 });
  }
}
