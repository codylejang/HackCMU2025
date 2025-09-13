const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

const epubPath = './data/books/pg2600-images_1757744808931_l59eoo.epub';
const coverPath = './test-epub-cover.png';

console.log('Testing direct EPUB cover extraction...');
console.log('EPUB path:', epubPath);
console.log('Cover path:', coverPath);

async function extractEPUBCover() {
  try {
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

extractEPUBCover();
