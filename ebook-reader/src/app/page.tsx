'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, BookOpen, Plus, FileText, Settings, MessageCircle, X, Trash2, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Book {
  id: string;
  title: string;
  author?: string;
  fileType: 'pdf' | 'epub' | 'txt';
  uploadDate: string;
  filePath: string;
  coverPath?: string;
  fileSize: number;
  content?: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load books from API on component mount
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await fetch('/api/books');
      const data = await response.json();
      if (data.success) {
        setBooks(data.data);
      }
    } catch (error) {
      console.error('Error loading books:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        const fileType = file.name.split('.').pop()?.toLowerCase() as 'pdf' | 'epub' | 'txt';
        
        if (['pdf', 'epub', 'txt'].includes(fileType)) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('author', 'Unknown');

          const response = await fetch('/api/books', {
            method: 'POST',
            body: formData,
          });

          const data = await response.json();
          if (data.success) {
            setBooks(prev => [data.data, ...prev]);
          } else {
            alert(`Error uploading ${file.name}: ${data.error}`);
          }
        } else {
          alert(`Unsupported file type: ${fileType}`);
        }
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. Please try again.');
    }
    
    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!confirm('Are you sure you want to delete this book?')) {
      return;
    }

    setIsDeleting(bookId);
    
    try {
      const response = await fetch(`/api/books?id=${bookId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setBooks(prev => prev.filter(book => book.id !== bookId));
      } else {
        alert(`Error deleting book: ${data.error}`);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      alert('Error deleting book. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return '📄';
      case 'epub':
        return '📚';
      case 'txt':
        return '📝';
      default:
        return '📖';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="/Gemini_Generated_Image_3aa3y43aa3y43aa3(2).png" 
                alt="AtlasMind Logo" 
                className="h-16 w-16 object-contain"
              />
              <h1 className="text-2xl font-bold text-gray-900">AtlasMind</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Settings className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Add New Book Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            className="bg-white rounded-xl shadow-lg p-6 border-2 border-dashed border-amber-300 hover:border-amber-400 cursor-pointer transition-colors group"
          >
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-200 transition-colors">
                {isUploading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                ) : (
                  <Plus className="h-8 w-8 text-amber-600" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isUploading ? 'Uploading...' : 'Add New Book'}
              </h3>
              <p className="text-gray-600 text-sm">Click to upload PDF, EPUB, or TXT files</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.epub,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </motion.div>

          {/* Existing Books */}
          <AnimatePresence>
            {books.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200 hover:shadow-xl transition-shadow relative group"
              >
                {/* Delete Button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteBook(book.id);
                  }}
                  disabled={isDeleting === book.id}
                  className="absolute top-2 right-2 z-10 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                >
                  {isDeleting === book.id ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </motion.button>

                <Link href={`/reader/${book.id}`}>
                  <div className="p-6">
                    {/* Book Cover */}
                    <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                      {book.coverPath ? (
                        <Image
                          src={`/api/covers/${book.coverPath.split('/').pop()}`}
                          alt={book.title}
                          width={200}
                          height={200}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      ) : (
                        <div className="text-6xl">{getFileIcon(book.fileType)}</div>
                      )}
                    </div>
                    
                    {/* Book Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                        {book.title}
                      </h3>
                      {book.author && book.author !== 'Unknown' && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <User className="h-4 w-4 mr-1" />
                          <span className="line-clamp-1">{book.author}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="uppercase font-medium">{book.fileType}</span>
                        <span>{new Date(book.uploadDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {(book.fileSize / 1024 / 1024).toFixed(1)} MB
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {books.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <img 
              src="/Gemini_Generated_Image_3aa3y43aa3y43aa3(2).png" 
              alt="AtlasMind Logo" 
              className="h-24 w-24 object-contain opacity-60 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No books yet</h3>
            <p className="text-gray-600">Upload your first e-book to get started</p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
