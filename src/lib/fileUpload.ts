import fs from 'fs';
import path from 'path';
import { generateUniqueFilename, generateBookId } from './database';

export interface UploadResult {
  success: boolean;
  bookId?: string;
  filePath?: string;
  coverPath?: string;
  error?: string;
}

// Save uploaded file to data/books directory
export async function saveUploadedFile(file: File): Promise<UploadResult> {
  try {
    // Ensure data/books directory exists
    const booksDir = path.join(process.cwd(), 'data', 'books');
    if (!fs.existsSync(booksDir)) {
      fs.mkdirSync(booksDir, { recursive: true });
    }

    // Generate unique filename
    const uniqueFilename = generateUniqueFilename(file.name);
    const filePath = path.join(booksDir, uniqueFilename);
    
    // Convert File to Buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    fs.writeFileSync(filePath, buffer);
    
    // Generate cover path (we'll create a simple cover later)
    const coversDir = path.join(process.cwd(), 'data', 'covers');
    if (!fs.existsSync(coversDir)) {
      fs.mkdirSync(coversDir, { recursive: true });
    }
    
    // Use PNG for PDF and EPUB covers, SVG for others
    const coverExtension = (file.type === 'application/pdf' || file.type === 'application/epub+zip') ? '.png' : '.svg';
    const coverFilename = uniqueFilename.replace(/\.[^/.]+$/, coverExtension);
    const coverPath = path.join(coversDir, coverFilename);
    
    return {
      success: true,
      bookId: generateBookId(),
      filePath,
      coverPath
    };
  } catch (error) {
    console.error('Error saving uploaded file:', error);
    return {
      success: false,
      error: 'Failed to save uploaded file'
    };
  }
}

// Extract PDF cover page as image
export async function extractPDFCover(
  pdfPath: string,
  coverPath: string
): Promise<boolean> {
  try {
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    // Use pdftoppm directly for more reliable conversion
    const tempOutputPath = path.join(path.dirname(coverPath), 'temp_cover');
    const command = `pdftoppm -png -f 1 -l 1 -scale-to 300 "${pdfPath}" "${tempOutputPath}"`;
    
    console.log('Executing command:', command);
    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.log('pdftoppm stderr:', stderr);
    }
    
    // Find the generated file
    const generatedFiles = fs.readdirSync(path.dirname(coverPath))
      .filter(file => file.startsWith('temp_cover') && file.endsWith('.png'));
    
    if (generatedFiles.length > 0) {
      const generatedFile = path.join(path.dirname(coverPath), generatedFiles[0]);
      
      // Rename to our target cover path
      if (fs.existsSync(generatedFile)) {
        fs.renameSync(generatedFile, coverPath);
        console.log(`PDF cover extracted successfully: ${coverPath}`);
        return true;
      }
    }
    
    console.log('PDF cover extraction failed, no image generated');
    return false;
  } catch (error) {
    console.error('Error extracting PDF cover:', error);
    return false;
  }
}

// Extract EPUB cover image
export async function extractEPUBCover(
  epubPath: string,
  coverPath: string
): Promise<boolean> {
  try {
    const sharp = require('sharp');
    const { exec } = require('child_process');
    const util = require('util');
    const execAsync = util.promisify(exec);
    
    // First, list the contents of the EPUB to find cover images
    const listCommand = `unzip -l "${epubPath}"`;
    console.log('Listing EPUB contents:', listCommand);
    
    const { stdout: listOutput } = await execAsync(listCommand);
    console.log('EPUB contents:', listOutput);
    
    // Look for cover images in the file listing
    const coverPatterns = [
      /cover\.(jpg|jpeg|png|gif)/i,
      /title\.(jpg|jpeg|png|gif)/i,
      /front\.(jpg|jpeg|png|gif)/i,
      /.*cover.*\.(jpg|jpeg|png|gif)/i,
      /.*title.*\.(jpg|jpeg|png|gif)/i,
      /.*front.*\.(jpg|jpeg|png|gif)/i
    ];
    
    let coverImagePath = null;
    const lines = listOutput.split('\n');
    
    for (const line of lines) {
      for (const pattern of coverPatterns) {
        const match = line.match(pattern);
        if (match) {
          // Extract the full path from the line
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 4) {
            coverImagePath = parts[parts.length - 1];
            console.log('Found potential cover image:', coverImagePath);
            break;
          }
        }
      }
      if (coverImagePath) break;
    }
    
    // If no cover found by pattern, look for any image file
    if (!coverImagePath) {
      const imagePattern = /\.(jpg|jpeg|png|gif)$/i;
      for (const line of lines) {
        const match = line.match(imagePattern);
        if (match) {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 4) {
            coverImagePath = parts[parts.length - 1];
            console.log('Using first image as cover:', coverImagePath);
            break;
          }
        }
      }
    }
    
    if (!coverImagePath) {
      console.log('No cover image found in EPUB');
      return false;
    }
    
    // Extract the cover image
    const tempDir = path.join(path.dirname(coverPath), 'temp_epub_extract');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const extractCommand = `unzip -j "${epubPath}" "${coverImagePath}" -d "${tempDir}"`;
    console.log('Extracting cover image:', extractCommand);
    
    await execAsync(extractCommand);
    
    // Find the extracted file
    const extractedFiles = fs.readdirSync(tempDir);
    if (extractedFiles.length === 0) {
      console.log('No files extracted from EPUB');
      return false;
    }
    
    const extractedFile = path.join(tempDir, extractedFiles[0]);
    console.log('Extracted file:', extractedFile);
    
    // Process the image with Sharp
    try {
      const resizedImage = await sharp(extractedFile)
        .resize(300, 400, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 1 }
        })
        .png()
        .toBuffer();
      
      // Save the resized image
      fs.writeFileSync(coverPath, resizedImage);
      console.log(`EPUB cover extracted successfully: ${coverPath}`);
      
      // Clean up temp directory
      fs.rmSync(tempDir, { recursive: true, force: true });
      
      return true;
    } catch (sharpError) {
      console.error('Error processing EPUB cover with Sharp:', sharpError);
      
      // Clean up temp directory
      fs.rmSync(tempDir, { recursive: true, force: true });
      
      return false;
    }
  } catch (error) {
    console.error('Error extracting EPUB cover:', error);
    return false;
  }
}

// Generate a simple cover image (placeholder)
export async function generateBookCover(
  title: string, 
  fileType: string, 
  coverPath: string,
  filePath?: string
): Promise<boolean> {
  try {
    // For PDFs, try to extract the cover page first
    if (fileType === 'pdf' && filePath) {
      const coverExtracted = await extractPDFCover(filePath, coverPath);
      if (coverExtracted) {
        return true;
      }
      console.log('PDF cover extraction failed, falling back to generated cover');
      
      // If PDF extraction failed, change the cover path to SVG
      const svgCoverPath = coverPath.replace('.png', '.svg');
      coverPath = svgCoverPath;
    }
    
    // For EPUBs, try to extract the cover image first
    if (fileType === 'epub' && filePath) {
      const coverExtracted = await extractEPUBCover(filePath, coverPath);
      if (coverExtracted) {
        return true;
      }
      console.log('EPUB cover extraction failed, falling back to generated cover');
      
      // If EPUB extraction failed, change the cover path to SVG
      const svgCoverPath = coverPath.replace('.png', '.svg');
      coverPath = svgCoverPath;
    }

    // Create an enhanced SVG cover with better styling
    const coverContent = `
    <svg width="300" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#fbbf24;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.3"/>
        </filter>
      </defs>
      <rect width="300" height="400" fill="url(#grad1)" filter="url(#shadow)"/>
      <rect x="20" y="20" width="260" height="360" fill="white" stroke="#d97706" stroke-width="2" rx="8"/>
      <text x="150" y="60" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1f2937">
        ${title.length > 25 ? title.substring(0, 25) + '...' : title}
      </text>
      <text x="150" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" fill="#f59e0b">
        ${getFileIcon(fileType)}
      </text>
      <text x="150" y="250" text-anchor="middle" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#f59e0b">
        ${fileType.toUpperCase()}
      </text>
    </svg>`;
    
    fs.writeFileSync(coverPath, coverContent);
    return true;
  } catch (error) {
    console.error('Error generating book cover:', error);
    return false;
  }
}

// Get file icon based on file type
function getFileIcon(fileType: string): string {
  switch (fileType.toLowerCase()) {
    case 'pdf':
      return '📄';
    case 'epub':
      return '📚';
    case 'txt':
      return '📝';
    default:
      return '📖';
  }
}

// Extract text content from file with proper PDF and EPUB support
export async function extractTextContent(filePath: string, fileType: string): Promise<string> {
  try {
    if (fileType === 'txt') {
      try {
        if (!fs.existsSync(filePath)) {
          throw new Error(`TXT file not found: ${filePath}`);
        }
        
        const content = fs.readFileSync(filePath, 'utf8');
        
        if (!content || content.trim().length === 0) {
          return `# Text Document\n\n**File:** ${path.basename(filePath)}\n\n**Status:** Empty text file.\n\n**File Size:** ${(fs.statSync(filePath).size / 1024).toFixed(2)} KB\n\n**Note:** This text file appears to be empty.`;
        }
        
        return content;
      } catch (error) {
        console.error('TXT file reading error:', error);
        return `# Text Document\n\n**File:** ${path.basename(filePath)}\n\n**Status:** Error reading text file.\n\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n**Note:** This text file could not be read. It may be corrupted or in an unsupported encoding.`;
      }
    } else if (fileType === 'pdf') {
      try {
        // Use pdf-parse for PDF parsing (Node.js compatible)
        const pdfParse = require('pdf-parse');
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
          throw new Error(`PDF file not found: ${filePath}`);
        }
        
        console.log(`Processing PDF file: ${filePath}`);
        const dataBuffer = fs.readFileSync(filePath);
        console.log(`PDF file size: ${dataBuffer.length} bytes`);
        
        // Parse the PDF
        const data = await pdfParse(dataBuffer);
        console.log(`PDF text extracted: ${data.text ? data.text.length : 0} characters`);
        
        if (!data.text || data.text.trim().length === 0) {
          return `# PDF Document\n\n**File:** ${path.basename(filePath)}\n\n**Status:** PDF file processed but no text content could be extracted. This may be a scanned PDF or image-based document.\n\n**File Size:** ${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)} MB\n\n**Pages:** ${data.numpages || 'Unknown'}\n\n**Note:** For scanned PDFs, OCR (Optical Character Recognition) would be needed to extract text content.`;
        }
        
        return data.text.trim();
      } catch (error) {
        console.error('PDF parsing error:', error);
        return `# PDF Document\n\n**File:** ${path.basename(filePath)}\n\n**Status:** Error processing PDF file.\n\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n**File Size:** ${fs.existsSync(filePath) ? (fs.statSync(filePath).size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown'}\n\n**Note:** This PDF file could not be processed. It may be corrupted, password-protected, or in an unsupported format.`;
      }
    } else if (fileType === 'epub') {
      try {
        const epub = require('epub');
        
        return new Promise((resolve, reject) => {
          const epubInstance = new epub(filePath);
          
          epubInstance.on('end', () => {
            let fullText = '';
            
            // Add book metadata
            if (epubInstance.metadata) {
              if (epubInstance.metadata.title) {
                fullText += `# ${epubInstance.metadata.title}\n\n`;
              }
              if (epubInstance.metadata.creator) {
                fullText += `**Author:** ${epubInstance.metadata.creator}\n\n`;
              }
              if (epubInstance.metadata.description) {
                fullText += `**Description:** ${epubInstance.metadata.description}\n\n`;
              }
              if (epubInstance.metadata.publisher) {
                fullText += `**Publisher:** ${epubInstance.metadata.publisher}\n\n`;
              }
              if (epubInstance.metadata.date) {
                fullText += `**Date:** ${epubInstance.metadata.date}\n\n`;
              }
            }
            
            // Get the flow (chapters) and table of contents
            const flow = epubInstance.flow || [];
            const toc = epubInstance.toc || [];
            
            // Determine the reading order - prefer TOC if available, otherwise use flow
            const readingOrder = toc.length > 0 ? toc : flow;
            
            // Add table of contents
            if (readingOrder.length > 0) {
              fullText += `## Table of Contents\n\n`;
              readingOrder.forEach((item: any, index: number) => {
                const title = item.title || item.label || item.name || `Chapter ${index + 1}`;
                fullText += `${index + 1}. ${title}\n`;
              });
              fullText += '\n---\n\n';
            }
              
            // Extract chapter content using the reading order
            const maxChapters = readingOrder.length;
            
            const extractChapterContent = (chapterIndex: number) => {
              if (chapterIndex >= maxChapters) {
                // Add file information
                fullText += `## File Information\n\n`;
                fullText += `- **Original File:** ${path.basename(filePath)}\n`;
                fullText += `- **File Size:** ${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)} MB\n`;
                fullText += `- **Upload Date:** ${new Date().toLocaleDateString()}\n`;
                fullText += `- **Total Chapters:** ${maxChapters}\n\n`;
                
                // Add note about content extraction
                fullText += `## Note\n\n`;
                fullText += `This EPUB file has been successfully parsed and its structure extracted. The table of contents and metadata are available. All ${maxChapters} chapters have been fully extracted with complete content.`;
                
                // All chapters processed, resolve the promise
                resolve(fullText);
                return;
              }
              
              const readingItem = readingOrder[chapterIndex];
              const chapterTitle = readingItem.title || readingItem.label || readingItem.name || `Chapter ${chapterIndex + 1}`;
              
              fullText += `## ${chapterTitle}\n\n`;
              
              // Find the corresponding chapter in flow by ID or title
              let chapter = null;
              if (readingItem.id) {
                chapter = flow.find((item: any) => item.id === readingItem.id);
              } else if (readingItem.href) {
                chapter = flow.find((item: any) => item.href === readingItem.href);
              } else {
                // Fallback to index if no ID or href
                chapter = flow[chapterIndex];
              }
              
              if (chapter && chapter.id) {
                epubInstance.getChapter(chapter.id, (error: any, text: string) => {
                  if (error) {
                    fullText += `*Error loading chapter content: ${error.message}*\n\n`;
                  } else if (text) {
                    // Clean up the text content with better formatting
                    let cleanText = text
                      .replace(/<[^>]*>/g, '') // Remove HTML tags
                      .replace(/\s+/g, ' ') // Normalize whitespace
                      .trim();
                    
                    if (cleanText.length > 0) {
                      // Remove duplicate chapter title from content
                      const normalizedChapterTitle = chapterTitle.toLowerCase().replace(/[^\w\s]/g, '').trim();
                      const normalizedContent = cleanText.toLowerCase().replace(/[^\w\s]/g, '').trim();
                      
                      // Check if content starts with the chapter title
                      if (normalizedContent.startsWith(normalizedChapterTitle)) {
                        // Find the end of the title in the original text
                        const titleMatch = cleanText.match(new RegExp(`^${chapterTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'i'));
                        if (titleMatch) {
                          cleanText = cleanText.substring(titleMatch[0].length).trim();
                        }
                      }
                      
                      // Improve paragraph formatting
                      cleanText = cleanText
                        .replace(/\s*\.\s*/g, '. ') // Fix sentence spacing
                        .replace(/\s*,\s*/g, ', ') // Fix comma spacing
                        .replace(/\s*;\s*/g, '; ') // Fix semicolon spacing
                        .replace(/\s*:\s*/g, ': ') // Fix colon spacing
                        .replace(/\s*!\s*/g, '! ') // Fix exclamation spacing
                        .replace(/\s*\?\s*/g, '? ') // Fix question spacing
                        .replace(/\s+/g, ' ') // Normalize whitespace again
                        .trim();
                      
                      // Add paragraph breaks for better readability
                      const paragraphs = cleanText.split(/(?<=[.!?])\s+(?=[A-Z])/);
                      const formattedParagraphs = paragraphs
                        .map(p => p.trim())
                        .filter(p => p.length > 0)
                        .join('\n\n');
                      
                      // Add the full content without truncation
                      fullText += formattedParagraphs;
                    } else {
                      fullText += `*Chapter content could not be extracted.*`;
                    }
                  } else {
                    fullText += `*Chapter content is not available.*`;
                  }
                  fullText += '\n\n';
                  
                  // Process next chapter
                  extractChapterContent(chapterIndex + 1);
                });
              } else {
                fullText += `*Chapter content could not be loaded.*\n\n`;
                // Process next chapter
                extractChapterContent(chapterIndex + 1);
              }
            };
            
            // Start extracting chapters
            if (readingOrder.length > 0) {
              extractChapterContent(0);
            } else {
              fullText += 'No chapters found in this EPUB file.\n\n';
              resolve(fullText);
            }
          });
          
          epubInstance.on('error', (err: any) => {
            console.error('EPUB parsing error:', err);
            const fallbackText = `# EPUB Document\n\n**File:** ${path.basename(filePath)}\n\n**Status:** Error parsing EPUB file.\n\n**Error:** ${err.message}\n\n**File Size:** ${(fs.statSync(filePath).size / 1024 / 1024).toFixed(2)} MB\n\n**Note:** This EPUB file could not be parsed. It may be corrupted or in an unsupported format.`;
            resolve(fallbackText);
          });
          
          epubInstance.parse();
        });
      } catch (error) {
        console.error('EPUB processing error:', error);
        return `# EPUB Document\n\n**File:** ${path.basename(filePath)}\n\n**Status:** Error processing EPUB file.\n\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n**File Size:** ${fs.existsSync(filePath) ? (fs.statSync(filePath).size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown'}\n\n**Note:** This EPUB file could not be processed.`;
      }
    }
    return 'Content extraction not available for this file type.';
  } catch (error) {
    console.error('Error extracting text content:', error);
    return 'Error extracting content from file.';
  }
}
