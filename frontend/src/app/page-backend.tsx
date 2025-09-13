'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, BookOpen, Plus, FileText, Settings, MessageCircle, X, Trash2, User, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { uploadBook, getNotebooks, getSources, sourceToBook, healthCheck, type Book, type Notebook } from '@/lib/api';

export default function HomeBackend() {
  const [books, setBooks] = useState<Book[]>([]);
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load data from backend on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Check backend health first
      const isHealthy = await healthCheck();
      if (!isHealthy) {
        setBackendStatus('disconnected');
        setError('Backend API is not available. Please start the backend server.');
        return;
      }
      
      setBackendStatus('connected');
      setError(null);
      
      // Load notebooks and sources
      const notebooksData = await getNotebooks();
      setNotebooks(notebooksData);
      
      // Load sources from all notebooks
      const allBooks: Book[] = [];
      for (const notebook of notebooksData) {
        try {
          const sources = await getSources(notebook.id);
          const notebookBooks = sources.map(sourceToBook);
          allBooks.push(...notebookBooks);
        } catch (error) {
          console.error(`Error loading sources from notebook ${notebook.id}:`, error);
        }
      }
      
      setBooks(allBooks);
    } catch (error) {
      console.error('Error loading data:', error);
      setBackendStatus('disconnected');
      setError('Failed to connect to backend API. Please check if the server is running.');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    setError(null);
    
    try {
      for (const file of Array.from(files)) {
        const fileType = file.name.split('.').pop()?.toLowerCase() as 'pdf' | 'epub' | 'txt';
        
        if (['pdf', 'epub', 'txt'].includes(fileType)) {
          // Use the backend API to upload
          const result = await uploadBook(file, file.name.replace(/\.[^/.]+$/, ""));
          
          // Convert to Book format and add to state
          const newBook = sourceToBook(result);
          setBooks(prev => [newBook, ...prev]);
          
          // Reload notebooks to get updated data
          const notebooksData = await getNotebooks();
          setNotebooks(notebooksData);
          
        } else {
          alert(`Unsupported file type: ${fileType}`);
        }
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setError(`Error uploading files: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
      // Note: The backend doesn't have a delete endpoint yet
      // For now, just remove from local state
      setBooks(prev => prev.filter(book => book.id !== bookId));
      alert('Book deleted from local view. Backend delete functionality not yet implemented.');
    } catch (error) {
      console.error('Error deleting book:', error);
      setError(`Error deleting book: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

  const getBackendStatusColor = () => {
    switch (backendStatus) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-red-600';
      case 'checking':
        return 'text-yellow-600';
    }
  };

  const getBackendStatusText = () => {
    switch (backendStatus) {
      case 'connected':
        return 'Backend Connected';
      case 'disconnected':
        return 'Backend Disconnected';
      case 'checking':
        return 'Checking Backend...';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-amber-600" />
              <h1 className="text-2xl font-bold text-gray-900">E-Book Reader</h1>
              <span className="text-sm text-gray-500">(Backend Connected)</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${getBackendStatusColor()}`}>
                <div className={`w-2 h-2 rounded-full ${
                  backendStatus === 'connected' ? 'bg-green-500' : 
                  backendStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500'
                }`}></div>
                <span className="text-sm font-medium">{getBackendStatusText()}</span>
              </div>
              <Settings className="h-6 w-6 text-gray-600 hover:text-gray-900 cursor-pointer" />
            </div>
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={loadData}
                className="mt-2 text-sm text-red-600 hover:text-red-500 underline"
              >
                Retry Connection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Backend Info */}
        {backendStatus === 'connected' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  Connected to Open Notebook Backend API. 
                  {notebooks.length > 0 && ` Found ${notebooks.length} notebook(s).`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Add New Book Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => backendStatus === 'connected' ? fileInputRef.current?.click() : null}
            className={`bg-white rounded-xl shadow-lg p-6 border-2 border-dashed transition-colors group ${
              backendStatus === 'connected' 
                ? 'border-amber-300 hover:border-amber-400 cursor-pointer' 
                : 'border-gray-300 cursor-not-allowed opacity-50'
            }`}
          >
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors ${
                backendStatus === 'connected' 
                  ? 'bg-amber-100 group-hover:bg-amber-200' 
                  : 'bg-gray-100'
              }`}>
                {isUploading ? (
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                ) : (
                  <Plus className={`h-8 w-8 ${
                    backendStatus === 'connected' ? 'text-amber-600' : 'text-gray-400'
                  }`} />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {isUploading ? 'Uploading...' : 'Add New Book'}
              </h3>
              <p className="text-gray-600 text-sm">
                {backendStatus === 'connected' 
                  ? 'Click to upload PDF, EPUB, or TXT files' 
                  : 'Connect to backend to upload files'
                }
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.epub,.txt"
              onChange={handleFileUpload}
              className="hidden"
              disabled={backendStatus !== 'connected'}
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
                        {book.fileSize > 0 ? `${(book.fileSize / 1024 / 1024).toFixed(1)} MB` : 'Size unknown'}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {books.length === 0 && backendStatus === 'connected' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No books yet</h3>
            <p className="text-gray-600">Upload your first e-book to get started</p>
          </motion.div>
        )}

        {/* Backend Disconnected State */}
        {backendStatus === 'disconnected' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Backend Not Connected</h3>
            <p className="text-gray-600 mb-4">Please start the Open Notebook backend server</p>
            <button
              onClick={loadData}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Retry Connection
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
