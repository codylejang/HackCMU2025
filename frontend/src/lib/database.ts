import fs from 'fs';
import path from 'path';

export interface Book {
  id: string;
  title: string;
  author?: string;
  fileType: 'pdf' | 'epub' | 'txt';
  uploadDate: string;
  filePath: string;
  coverPath?: string;
  fileSize: number;
  content?: string;
  currentPage?: number;
}

const DATABASE_PATH = path.join(process.cwd(), 'data', 'database', 'books.json');

// Ensure database file exists
function ensureDatabaseExists() {
  const dbDir = path.dirname(DATABASE_PATH);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  
  if (!fs.existsSync(DATABASE_PATH)) {
    fs.writeFileSync(DATABASE_PATH, JSON.stringify([], null, 2));
  }
}

// Read all books from database
export function getAllBooks(): Book[] {
  ensureDatabaseExists();
  try {
    const data = fs.readFileSync(DATABASE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading books database:', error);
    return [];
  }
}

// Get a single book by ID
export function getBookById(id: string): Book | null {
  const books = getAllBooks();
  return books.find(book => book.id === id) || null;
}

// Add a new book to database
export function addBook(book: Book): Book {
  ensureDatabaseExists();
  const books = getAllBooks();
  books.push(book);
  fs.writeFileSync(DATABASE_PATH, JSON.stringify(books, null, 2));
  return book;
}

// Update an existing book
export function updateBook(id: string, updates: Partial<Book>): Book | null {
  ensureDatabaseExists();
  const books = getAllBooks();
  const index = books.findIndex(book => book.id === id);
  
  if (index === -1) {
    return null;
  }
  
  books[index] = { ...books[index], ...updates };
  fs.writeFileSync(DATABASE_PATH, JSON.stringify(books, null, 2));
  return books[index];
}

// Delete a book from database
export function deleteBook(id: string): boolean {
  ensureDatabaseExists();
  const books = getAllBooks();
  const index = books.findIndex(book => book.id === id);
  
  if (index === -1) {
    return false;
  }
  
  const book = books[index];
  
  // Remove the book from array
  books.splice(index, 1);
  fs.writeFileSync(DATABASE_PATH, JSON.stringify(books, null, 2));
  
  // Delete associated files
  try {
    if (fs.existsSync(book.filePath)) {
      fs.unlinkSync(book.filePath);
    }
    if (book.coverPath && fs.existsSync(book.coverPath)) {
      fs.unlinkSync(book.coverPath);
    }
  } catch (error) {
    console.error('Error deleting book files:', error);
  }
  
  return true;
}

// Generate unique filename
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext);
  return `${name}_${timestamp}_${random}${ext}`;
}

// Generate book ID
export function generateBookId(): string {
  return `book_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
