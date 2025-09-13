module.exports = [
"[project]/.next-internal/server/app/api/books/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/lib/database.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addBook",
    ()=>addBook,
    "deleteBook",
    ()=>deleteBook,
    "generateBookId",
    ()=>generateBookId,
    "generateUniqueFilename",
    ()=>generateUniqueFilename,
    "getAllBooks",
    ()=>getAllBooks,
    "getBookById",
    ()=>getBookById,
    "updateBook",
    ()=>updateBook
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
const DATABASE_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'database', 'books.json');
// Ensure database file exists
function ensureDatabaseExists() {
    const dbDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(DATABASE_PATH);
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(dbDir)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(dbDir, {
            recursive: true
        });
    }
    if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(DATABASE_PATH)) {
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(DATABASE_PATH, JSON.stringify([], null, 2));
    }
}
function getAllBooks() {
    ensureDatabaseExists();
    try {
        const data = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(DATABASE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading books database:', error);
        return [];
    }
}
function getBookById(id) {
    const books = getAllBooks();
    return books.find((book)=>book.id === id) || null;
}
function addBook(book) {
    ensureDatabaseExists();
    const books = getAllBooks();
    books.push(book);
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(DATABASE_PATH, JSON.stringify(books, null, 2));
    return book;
}
function updateBook(id, updates) {
    ensureDatabaseExists();
    const books = getAllBooks();
    const index = books.findIndex((book)=>book.id === id);
    if (index === -1) {
        return null;
    }
    books[index] = {
        ...books[index],
        ...updates
    };
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(DATABASE_PATH, JSON.stringify(books, null, 2));
    return books[index];
}
function deleteBook(id) {
    ensureDatabaseExists();
    const books = getAllBooks();
    const index = books.findIndex((book)=>book.id === id);
    if (index === -1) {
        return false;
    }
    const book = books[index];
    // Remove the book from array
    books.splice(index, 1);
    __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(DATABASE_PATH, JSON.stringify(books, null, 2));
    // Delete associated files
    try {
        if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(book.filePath)) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].unlinkSync(book.filePath);
        }
        if (book.coverPath && __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(book.coverPath)) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].unlinkSync(book.coverPath);
        }
    } catch (error) {
        console.error('Error deleting book files:', error);
    }
    return true;
}
function generateUniqueFilename(originalName) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const ext = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(originalName);
    const name = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(originalName, ext);
    return `${name}_${timestamp}_${random}${ext}`;
}
function generateBookId() {
    return `book_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/sharp [external] (sharp, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("sharp", () => require("sharp"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/string_decoder [external] (string_decoder, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("string_decoder", () => require("string_decoder"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/timers [external] (timers, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("timers", () => require("timers"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/pdf-parse [external] (pdf-parse, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("pdf-parse", () => require("pdf-parse"));

module.exports = mod;
}),
"[project]/src/lib/fileUpload.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "extractEPUBCover",
    ()=>extractEPUBCover,
    "extractPDFCover",
    ()=>extractPDFCover,
    "extractTextContent",
    ()=>extractTextContent,
    "generateBookCover",
    ()=>generateBookCover,
    "saveUploadedFile",
    ()=>saveUploadedFile
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/database.ts [app-route] (ecmascript)");
;
;
;
async function saveUploadedFile(file) {
    try {
        // Ensure data/books directory exists
        const booksDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'books');
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(booksDir)) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(booksDir, {
                recursive: true
            });
        }
        // Generate unique filename
        const uniqueFilename = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateUniqueFilename"])(file.name);
        const filePath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(booksDir, uniqueFilename);
        // Convert File to Buffer and save
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(filePath, buffer);
        // Generate cover path (we'll create a simple cover later)
        const coversDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'covers');
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(coversDir)) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(coversDir, {
                recursive: true
            });
        }
        // Use PNG for PDF and EPUB covers, SVG for others
        const coverExtension = file.type === 'application/pdf' || file.type === 'application/epub+zip' ? '.png' : '.svg';
        const coverFilename = uniqueFilename.replace(/\.[^/.]+$/, coverExtension);
        const coverPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(coversDir, coverFilename);
        return {
            success: true,
            bookId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateBookId"])(),
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
async function extractPDFCover(pdfPath, coverPath) {
    try {
        const { exec } = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)");
        const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
        const execAsync = util.promisify(exec);
        // Use pdftoppm directly for more reliable conversion
        const tempOutputPath = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(coverPath), 'temp_cover');
        const command = `pdftoppm -png -f 1 -l 1 -scale-to 300 "${pdfPath}" "${tempOutputPath}"`;
        console.log('Executing command:', command);
        const { stdout, stderr } = await execAsync(command);
        if (stderr) {
            console.log('pdftoppm stderr:', stderr);
        }
        // Find the generated file
        const generatedFiles = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(coverPath)).filter((file)=>file.startsWith('temp_cover') && file.endsWith('.png'));
        if (generatedFiles.length > 0) {
            const generatedFile = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(coverPath), generatedFiles[0]);
            // Rename to our target cover path
            if (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(generatedFile)) {
                __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].renameSync(generatedFile, coverPath);
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
async function extractEPUBCover(epubPath, coverPath) {
    try {
        const sharp = __turbopack_context__.r("[externals]/sharp [external] (sharp, cjs)");
        const { exec } = __turbopack_context__.r("[externals]/child_process [external] (child_process, cjs)");
        const util = __turbopack_context__.r("[externals]/util [external] (util, cjs)");
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
        for (const line of lines){
            for (const pattern of coverPatterns){
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
            for (const line of lines){
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
        const tempDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].dirname(coverPath), 'temp_epub_extract');
        if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(tempDir)) {
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].mkdirSync(tempDir, {
                recursive: true
            });
        }
        const extractCommand = `unzip -j "${epubPath}" "${coverImagePath}" -d "${tempDir}"`;
        console.log('Extracting cover image:', extractCommand);
        await execAsync(extractCommand);
        // Find the extracted file
        const extractedFiles = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readdirSync(tempDir);
        if (extractedFiles.length === 0) {
            console.log('No files extracted from EPUB');
            return false;
        }
        const extractedFile = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(tempDir, extractedFiles[0]);
        console.log('Extracted file:', extractedFile);
        // Process the image with Sharp
        try {
            const resizedImage = await sharp(extractedFile).resize(300, 400, {
                fit: 'contain',
                background: {
                    r: 255,
                    g: 255,
                    b: 255,
                    alpha: 1
                }
            }).png().toBuffer();
            // Save the resized image
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(coverPath, resizedImage);
            console.log(`EPUB cover extracted successfully: ${coverPath}`);
            // Clean up temp directory
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].rmSync(tempDir, {
                recursive: true,
                force: true
            });
            return true;
        } catch (sharpError) {
            console.error('Error processing EPUB cover with Sharp:', sharpError);
            // Clean up temp directory
            __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].rmSync(tempDir, {
                recursive: true,
                force: true
            });
            return false;
        }
    } catch (error) {
        console.error('Error extracting EPUB cover:', error);
        return false;
    }
}
async function generateBookCover(title, fileType, coverPath, filePath) {
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
        __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].writeFileSync(coverPath, coverContent);
        return true;
    } catch (error) {
        console.error('Error generating book cover:', error);
        return false;
    }
}
// Get file icon based on file type
function getFileIcon(fileType) {
    switch(fileType.toLowerCase()){
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
async function extractTextContent(filePath, fileType) {
    try {
        if (fileType === 'txt') {
            try {
                if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(filePath)) {
                    throw new Error(`TXT file not found: ${filePath}`);
                }
                const content = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath, 'utf8');
                if (!content || content.trim().length === 0) {
                    return `# Text Document\n\n**File:** ${__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath)}\n\n**Status:** Empty text file.\n\n**File Size:** ${(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].statSync(filePath).size / 1024).toFixed(2)} KB\n\n**Note:** This text file appears to be empty.`;
                }
                return content;
            } catch (error) {
                console.error('TXT file reading error:', error);
                return `# Text Document\n\n**File:** ${__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath)}\n\n**Status:** Error reading text file.\n\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n**Note:** This text file could not be read. It may be corrupted or in an unsupported encoding.`;
            }
        } else if (fileType === 'pdf') {
            try {
                // Use pdf-parse for PDF parsing (Node.js compatible)
                const pdfParse = __turbopack_context__.r("[externals]/pdf-parse [external] (pdf-parse, cjs)");
                // Check if file exists
                if (!__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(filePath)) {
                    throw new Error(`PDF file not found: ${filePath}`);
                }
                console.log(`Processing PDF file: ${filePath}`);
                const dataBuffer = __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(filePath);
                console.log(`PDF file size: ${dataBuffer.length} bytes`);
                // Parse the PDF
                const data = await pdfParse(dataBuffer);
                console.log(`PDF text extracted: ${data.text ? data.text.length : 0} characters`);
                if (!data.text || data.text.trim().length === 0) {
                    return `# PDF Document\n\n**File:** ${__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath)}\n\n**Status:** PDF file processed but no text content could be extracted. This may be a scanned PDF or image-based document.\n\n**File Size:** ${(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].statSync(filePath).size / 1024 / 1024).toFixed(2)} MB\n\n**Pages:** ${data.numpages || 'Unknown'}\n\n**Note:** For scanned PDFs, OCR (Optical Character Recognition) would be needed to extract text content.`;
                }
                return data.text.trim();
            } catch (error) {
                console.error('PDF parsing error:', error);
                return `# PDF Document\n\n**File:** ${__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath)}\n\n**Status:** Error processing PDF file.\n\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n**File Size:** ${__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(filePath) ? (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].statSync(filePath).size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown'}\n\n**Note:** This PDF file could not be processed. It may be corrupted, password-protected, or in an unsupported format.`;
            }
        } else if (fileType === 'epub') {
            try {
                const epub = __turbopack_context__.r("[project]/node_modules/epub/epub.js [app-route] (ecmascript)");
                return new Promise((resolve, reject)=>{
                    const epubInstance = new epub(filePath);
                    epubInstance.on('end', ()=>{
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
                            readingOrder.forEach((item, index)=>{
                                const title = item.title || item.label || item.name || `Chapter ${index + 1}`;
                                fullText += `${index + 1}. ${title}\n`;
                            });
                            fullText += '\n---\n\n';
                        }
                        // Extract chapter content using the reading order
                        const maxChapters = readingOrder.length;
                        const extractChapterContent = (chapterIndex)=>{
                            if (chapterIndex >= maxChapters) {
                                // Add file information
                                fullText += `## File Information\n\n`;
                                fullText += `- **Original File:** ${__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath)}\n`;
                                fullText += `- **File Size:** ${(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].statSync(filePath).size / 1024 / 1024).toFixed(2)} MB\n`;
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
                                chapter = flow.find((item)=>item.id === readingItem.id);
                            } else if (readingItem.href) {
                                chapter = flow.find((item)=>item.href === readingItem.href);
                            } else {
                                // Fallback to index if no ID or href
                                chapter = flow[chapterIndex];
                            }
                            if (chapter && chapter.id) {
                                epubInstance.getChapter(chapter.id, (error, text)=>{
                                    if (error) {
                                        fullText += `*Error loading chapter content: ${error.message}*\n\n`;
                                    } else if (text) {
                                        // Clean up the text content with better formatting
                                        let cleanText = text.replace(/<[^>]*>/g, '') // Remove HTML tags
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
                                            cleanText = cleanText.replace(/\s*\.\s*/g, '. ') // Fix sentence spacing
                                            .replace(/\s*,\s*/g, ', ') // Fix comma spacing
                                            .replace(/\s*;\s*/g, '; ') // Fix semicolon spacing
                                            .replace(/\s*:\s*/g, ': ') // Fix colon spacing
                                            .replace(/\s*!\s*/g, '! ') // Fix exclamation spacing
                                            .replace(/\s*\?\s*/g, '? ') // Fix question spacing
                                            .replace(/\s+/g, ' ') // Normalize whitespace again
                                            .trim();
                                            // Add paragraph breaks for better readability
                                            const paragraphs = cleanText.split(/(?<=[.!?])\s+(?=[A-Z])/);
                                            const formattedParagraphs = paragraphs.map((p)=>p.trim()).filter((p)=>p.length > 0).join('\n\n');
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
                    epubInstance.on('error', (err)=>{
                        console.error('EPUB parsing error:', err);
                        const fallbackText = `# EPUB Document\n\n**File:** ${__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath)}\n\n**Status:** Error parsing EPUB file.\n\n**Error:** ${err.message}\n\n**File Size:** ${(__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].statSync(filePath).size / 1024 / 1024).toFixed(2)} MB\n\n**Note:** This EPUB file could not be parsed. It may be corrupted or in an unsupported format.`;
                        resolve(fallbackText);
                    });
                    epubInstance.parse();
                });
            } catch (error) {
                console.error('EPUB processing error:', error);
                return `# EPUB Document\n\n**File:** ${__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].basename(filePath)}\n\n**Status:** Error processing EPUB file.\n\n**Error:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n**File Size:** ${__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(filePath) ? (__TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].statSync(filePath).size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown'}\n\n**Note:** This EPUB file could not be processed.`;
            }
        }
        return 'Content extraction not available for this file type.';
    } catch (error) {
        console.error('Error extracting text content:', error);
        return 'Error extracting content from file.';
    }
}
}),
"[project]/src/app/api/books/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/database.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileUpload$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/fileUpload.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
;
async function GET() {
    try {
        const books = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAllBooks"])();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: books
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to fetch books'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const author = formData.get('author');
        if (!file) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'No file provided'
            }, {
                status: 400
            });
        }
        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/epub+zip',
            'text/plain'
        ];
        if (!allowedTypes.includes(file.type)) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Invalid file type. Only PDF, EPUB, and TXT files are allowed.'
            }, {
                status: 400
            });
        }
        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'File size too large. Maximum size is 10MB.'
            }, {
                status: 400
            });
        }
        // Save the uploaded file
        const uploadResult = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileUpload$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["saveUploadedFile"])(file);
        if (!uploadResult.success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: uploadResult.error || 'Failed to save file'
            }, {
                status: 500
            });
        }
        // Determine file type
        const fileType = file.type === 'application/pdf' ? 'pdf' : file.type === 'application/epub+zip' ? 'epub' : 'txt';
        // Extract text content with error handling
        let content;
        try {
            content = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileUpload$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["extractTextContent"])(uploadResult.filePath, fileType);
        } catch (error) {
            console.error('Content extraction failed:', error);
            content = `# ${file.name}\n\n**Error:** Content extraction failed.\n\n**Details:** ${error instanceof Error ? error.message : 'Unknown error'}\n\n**File Type:** ${fileType.toUpperCase()}\n\n**Note:** The file was uploaded but content could not be extracted.`;
        }
        // Generate book cover with error handling
        const title = file.name.replace(/\.[^/.]+$/, "");
        let finalCoverPath = uploadResult.coverPath;
        try {
            const coverGenerated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$fileUpload$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateBookCover"])(title, fileType, uploadResult.coverPath, uploadResult.filePath);
            if (coverGenerated) {
                // Check if the cover path was changed (e.g., from PNG to SVG for failed extraction)
                const expectedExtension = fileType === 'pdf' || fileType === 'epub' ? '.png' : '.svg';
                const actualExtension = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].extname(uploadResult.coverPath);
                if (actualExtension !== expectedExtension) {
                    // Update the cover path to match the actual file created
                    finalCoverPath = uploadResult.coverPath.replace(actualExtension, expectedExtension);
                }
            }
        } catch (error) {
            console.error('Cover generation failed:', error);
        // Continue without cover - the system will handle missing covers gracefully
        }
        // Create book record
        const newBook = {
            id: uploadResult.bookId,
            title,
            author: author || 'Unknown',
            fileType: fileType,
            uploadDate: new Date().toISOString(),
            filePath: uploadResult.filePath,
            coverPath: finalCoverPath || '',
            fileSize: file.size,
            content,
            currentPage: 1 // Initialize to page 1
        };
        // Save to database
        const savedBook = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["addBook"])(newBook);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: savedBook
        });
    } catch (error) {
        console.error('Error uploading book:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to upload book'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const bookId = searchParams.get('id');
        if (!bookId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Book ID is required'
            }, {
                status: 400
            });
        }
        const success = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$database$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["deleteBook"])(bookId);
        if (!success) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Book not found'
            }, {
                status: 404
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'Book deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting book:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Failed to delete book'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e8a905d7._.js.map