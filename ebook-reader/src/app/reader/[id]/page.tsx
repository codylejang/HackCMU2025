'use client';

import { useState, useRef, useEffect, use, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MessageCircle, 
  Settings, 
  BookOpen, 
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Send,
  X,
  History,
  Bot,
  User,
  AlertCircle,
  Maximize2,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  references?: string[];
}

interface Reference {
  id: string;
  content: string;
  page?: number;
  chapter?: string;
  startOffset?: number;
  endOffset?: number;
  bookId?: string;
}

interface ContentChunk {
  id: string;
  content: string;
  page: number;
  chapter?: string;
}

const CHUNK_SIZE = 10000; // Characters per chunk (~10k words per page)
const CHUNKS_PER_PAGE = 1; // One chunk per section for single screen fit
const CHUNKS_TO_LOAD = 5; // Number of chunks to load ahead/behind current position
const CHUNK_LOAD_THRESHOLD = 0.8; // Load more chunks when 80% through current set
const MAX_LOADED_CHUNKS = 50; // Maximum number of chunks to keep in memory

// Memoized chat message component
const ChatMessageComponent = memo(({ 
  message, 
  showReferences, 
  references, 
  onToggleReferences,
  isFullscreen,
  onNavigateToReference
}: {
  message: ChatMessage;
  showReferences: string | null;
  references: Record<string, Reference>;
  onToggleReferences: (messageId: string) => void;
  isFullscreen: boolean;
  onNavigateToReference: (pageNumber: number) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`px-4 py-2 rounded-lg ${
      isFullscreen ? 'w-full' : 'max-w-xs'
    } ${
      message.type === 'user' 
        ? 'bg-amber-600 text-white' 
        : 'bg-gray-100 text-gray-900'
    }`}>
      <div className="flex items-start space-x-2">
        {message.type === 'assistant' && (
          <Bot className="h-4 w-4 mt-0.5 flex-shrink-0" />
        )}
        {message.type === 'user' && (
          <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
        )}
        <div className="flex-1">
          <p className={isFullscreen ? 'text-base' : 'text-sm'}>{message.content}</p>
          {message.references && message.references.length > 0 && (
            <div className="mt-2 flex items-center space-x-2 flex-wrap">
              <button
                onClick={() => {
                  onToggleReferences(message.id);
                }}
                className="text-xs inline-flex items-center space-x-2"
                title="Toggle references"
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center">
                  {showReferences === message.id ? (
                    <ChevronDown className="h-3 w-3" />
                  ) : (
                    <ChevronRight className="h-3 w-3" />
                  )}
                </span>
                <span>
                  References ({message.references.length})
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </motion.div>
));

ChatMessageComponent.displayName = 'ChatMessageComponent';

export default function ReaderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [hasNewResponse, setHasNewResponse] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showThinkingIndicator, setShowThinkingIndicator] = useState(false);
  const [showReferences, setShowReferences] = useState<string | null>(null);
  const [references, setReferences] = useState<Record<string, Reference>>({});
  const [bookContent, setBookContent] = useState<string>('');
  const [contentChunks, setContentChunks] = useState<ContentChunk[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookMetadata, setBookMetadata] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Progressive loading state
  const [loadedChunks, setLoadedChunks] = useState<ContentChunk[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isLoadingChunks, setIsLoadingChunks] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastLoadTime, setLastLoadTime] = useState(0);
  
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Cache for referenced books' content and chunks (when refs point to other books)
  const [referencedBooks, setReferencedBooks] = useState<Record<string, { content: string; chunks: ContentChunk[]; chunkStarts: number[]; title?: string }>>({});
  const [loadingBookIds, setLoadingBookIds] = useState<Record<string, boolean>>({});

  // Precompute start offsets for each chunk within the full book content
  const chunkStartOffsets = useMemo(() => {
    const starts: number[] = [];
    let acc = 0;
    for (const chunk of contentChunks) {
      starts.push(acc);
      acc += chunk.content.length;
    }
    return starts;
  }, [contentChunks]);

  const escapeHtml = useCallback((text: string): string => {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }, []);

  const highlightRangeInChunk = useCallback((chunkText: string, chunkStart: number, refStart: number, refEnd: number): string => {
    const chunkEnd = chunkStart + chunkText.length;
    const effectiveStart = Math.max(refStart, chunkStart);
    const effectiveEnd = Math.min(refEnd, chunkEnd);
    if (isNaN(refStart) || isNaN(refEnd) || effectiveStart >= effectiveEnd) {
      return escapeHtml(chunkText);
    }
    const localStart = effectiveStart - chunkStart;
    const localEnd = effectiveEnd - chunkStart;
    const beforeRef = chunkText.substring(0, localStart);
    const refText = chunkText.substring(localStart, localEnd);
    const afterRef = chunkText.substring(localEnd);
    return (
      escapeHtml(beforeRef) +
      '<mark class="bg-yellow-200 px-1 rounded">' + escapeHtml(refText) + '</mark>' +
      escapeHtml(afterRef)
    );
  }, [escapeHtml]);

  // Save current page when component unmounts or page unloads
  useEffect(() => {
    const saveCurrentState = () => {
      if (id && currentPage > 0 && totalPages > 0 && !isInitialLoad) {
        // Save current page
        const pageData = JSON.stringify({ currentPage });
        if (navigator.sendBeacon) {
          navigator.sendBeacon(`/api/books/${id}/current-page`, pageData);
        } else {
          fetch(`/api/books/${id}/current-page`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: pageData,
          }).catch(error => {
            console.error('Error saving current page on exit:', error);
          });
        }
      }
    };

    // Save on page unload
    const handleBeforeUnload = () => {
      saveCurrentState();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      // Also save on component unmount
      saveCurrentState();
    };
  }, [id, currentPage, totalPages, isInitialLoad]);



  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Extract chapter title from content - only look for H1, H2, H3 headings
  const extractChapterTitle = useCallback((content: string): string | undefined => {
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Look for H1 headings (starting with #)
      if (trimmedLine.startsWith('# ')) {
        const title = trimmedLine.replace('# ', '').trim();
        const lowerTitle = title.toLowerCase();
        if (title.length > 5 && 
            !lowerTitle.includes('table of contents') &&
            !lowerTitle.includes('introduction') &&
            !lowerTitle.includes('preface') &&
            !lowerTitle.includes('acknowledgments') &&
            !lowerTitle.includes('notes') &&
            !lowerTitle.includes('index') &&
            !lowerTitle.includes('bibliography') &&
            !lowerTitle.includes('appendix')) {
          return title;
        }
      }
      
      // Look for H2 headings (starting with ##)
      if (trimmedLine.startsWith('## ')) {
        const title = trimmedLine.replace('## ', '').trim();
        const lowerTitle = title.toLowerCase();
        if (title.length > 5 && 
            !lowerTitle.includes('table of contents') &&
            !lowerTitle.includes('introduction') &&
            !lowerTitle.includes('preface') &&
            !lowerTitle.includes('acknowledgments') &&
            !lowerTitle.includes('notes') &&
            !lowerTitle.includes('index') &&
            !lowerTitle.includes('bibliography') &&
            !lowerTitle.includes('appendix')) {
          return title;
        }
      }
      
      // Look for H3 headings (starting with ###)
      if (trimmedLine.startsWith('### ')) {
        const title = trimmedLine.replace('### ', '').trim();
        const lowerTitle = title.toLowerCase();
        if (title.length > 5 && 
            !lowerTitle.includes('table of contents') &&
            !lowerTitle.includes('introduction') &&
            !lowerTitle.includes('preface') &&
            !lowerTitle.includes('acknowledgments') &&
            !lowerTitle.includes('notes') &&
            !lowerTitle.includes('index') &&
            !lowerTitle.includes('bibliography') &&
            !lowerTitle.includes('appendix')) {
          return title;
        }
      }
    }
    return undefined;
  }, []);

  // Utility function to find the best break point at punctuation
  const findBestBreakPoint = useCallback((text: string, maxLength: number): number => {
    console.log(`findBestBreakPoint called: text.length=${text.length}, maxLength=${maxLength}`);
    if (text.length <= maxLength) {
      console.log(`Text length <= maxLength, returning ${text.length}`);
      return text.length;
    }
    
    // Look for break points in order of preference
    const breakPoints = [
      // Paragraph breaks (highest priority)
      { pattern: /\n\n/g, offset: 0 },
      // Sentence endings with proper punctuation
      { pattern: /[.!?]+\s+/g, offset: 1 },
      // Semicolons and colons
      { pattern: /[;:]\s+/g, offset: 1 },
      // Commas (lower priority)
      { pattern: /,\s+/g, offset: 1 },
      // Line breaks
      { pattern: /\n/g, offset: 0 },
      // Spaces (last resort)
      { pattern: /\s+/g, offset: 1 }
    ];
    
    // Start from the maximum length and work backwards
    let searchText = text.substring(0, Math.min(maxLength, text.length));
    
    for (const breakPoint of breakPoints) {
      const matches = Array.from(searchText.matchAll(breakPoint.pattern));
      
      if (matches.length > 0) {
        // Find the last match that's within our target range
        for (let i = matches.length - 1; i >= 0; i--) {
          const match = matches[i];
          const breakPosition = match.index! + match[0].length - breakPoint.offset;
          
          // Ensure we're not too close to the beginning (at least 20% of max length)
          if (breakPosition > maxLength * 0.2) {
            return breakPosition;
          }
        }
      }
    }
    
    // If no good break point found, break at the maximum length
    console.log(`No good break point found, returning maxLength: ${maxLength}`);
    return maxLength;
  }, []);

  // Utility function to chunk content with smart punctuation-based breaking
  const chunkContent = useCallback((content: string): ContentChunk[] => {
    console.log('chunkContent called with content length:', content.length);
    console.log('Content preview:', content.substring(0, 100));
    
    const chunks: ContentChunk[] = [];
    let currentChunk = '';
    let chunkIndex = 0;
    let pageNumber = 1;
    let currentChapter = '';
    let isInTOC = false;
    
    // Split content into lines for processing
    const lines = content.split('\n');
    console.log('Lines count:', lines.length);
    console.log('First few lines:', lines.slice(0, 3));
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const potentialChunk = currentChunk + (currentChunk ? '\n' : '') + line;
      
      if (i < 5) { // Debug first few iterations
        console.log(`Line ${i}:`, line);
        console.log(`Potential chunk length:`, potentialChunk.length);
      }

      // Check if we're in table of contents section (only for first few pages)
      if (pageNumber <= 5 && (
          line.toLowerCase().includes('table of contents') || 
          line.toLowerCase().includes('contents') ||
          (line.toLowerCase().includes('chapter') && line.length < 100) ||
          (line.toLowerCase().includes('part') && line.length < 100) ||
          (line.toLowerCase().includes('book') && line.length < 100) ||
          (line.startsWith('#') && (line.toLowerCase().includes('chapter') || line.toLowerCase().includes('part'))) ||
          (line.match(/^\d+\./) && line.length < 100))) {
        isInTOC = true;
      }
      
      // Reset TOC detection after page 5 or when we encounter actual content
      if (pageNumber > 5 || (line.startsWith('#') && line.length > 20 && !line.toLowerCase().includes('chapter') && !line.toLowerCase().includes('part'))) {
        isInTOC = false;
      }

      // Check if this line is a chapter heading (not in TOC)
      if (!isInTOC) {
        if (line.startsWith('# ') || line.startsWith('## ') || line.startsWith('### ')) {
          const chapterTitle = extractChapterTitle(line);
          if (chapterTitle) {
            currentChapter = chapterTitle;
          }
        }
      }

      // Use different chunk sizes based on content type and page number
      let currentChunkSize;
      if (isInTOC || pageNumber <= 5) {
        currentChunkSize = CHUNK_SIZE * 0.3; // 30% for first 5 pages and TOC
      } else {
        currentChunkSize = CHUNK_SIZE; // Full chunk size for all non-TOC pages
      }
      
      if (i < 5) { // Debug first few iterations
        console.log(`Chunk size:`, currentChunkSize, `isInTOC:`, isInTOC, `pageNumber:`, pageNumber);
      }

      // Check if adding this line would exceed chunk size
      if (potentialChunk.length > currentChunkSize && currentChunk) {
        console.log(`Creating chunk at line ${i}, potentialChunk.length: ${potentialChunk.length}, currentChunkSize: ${currentChunkSize}`);
        
        // Find the best break point using punctuation
        const breakPoint = findBestBreakPoint(currentChunk, currentChunkSize);
        console.log(`Break point found: ${breakPoint}`);
        
        if (breakPoint > 0) {
          const chunkContent = currentChunk.substring(0, breakPoint).trim();
          const chapterTitle = extractChapterTitle(chunkContent);
          chunks.push({
            id: `chunk_${chunkIndex}`,
            content: chunkContent,
            page: pageNumber,
            chapter: chapterTitle || currentChapter
          });
          console.log(`Created chunk ${chunkIndex} with content length: ${chunkContent.length}`);
          
          // Keep the remaining content and add the current line
          currentChunk = currentChunk.substring(breakPoint).trim() + (line ? '\n' + line : '');
        } else {
          // Fallback: save current chunk as is
          const chapterTitle = extractChapterTitle(currentChunk);
          chunks.push({
            id: `chunk_${chunkIndex}`,
            content: currentChunk,
            page: pageNumber,
            chapter: chapterTitle || currentChapter
          });
          console.log(`Created fallback chunk ${chunkIndex} with content length: ${currentChunk.length}`);
          currentChunk = line;
        }
        
        chunkIndex++;
        pageNumber++;
      } else {
        currentChunk = potentialChunk;
      }
    }

    // Add the last chunk if it exists
    console.log(`Final currentChunk length: ${currentChunk.length}, trimmed: ${currentChunk.trim().length}`);
    if (currentChunk.trim()) {
      const chapterTitle = extractChapterTitle(currentChunk);
      chunks.push({
        id: `chunk_${chunkIndex}`,
        content: currentChunk,
        page: pageNumber,
        chapter: chapterTitle || (currentChapter && currentChapter !== 'Steve Jobs' ? currentChapter : undefined)
      });
      console.log(`Created final chunk ${chunkIndex} with content length: ${currentChunk.length}`);
    }
    
    console.log(`Total chunks created: ${chunks.length}`);

    console.log('chunkContent result:', {
      chunksLength: chunks.length,
      chunks: chunks.slice(0, 2) // Show first 2 chunks for debugging
    });
    
    // Emergency fallback: if no chunks were created, create one with the entire content
    if (chunks.length === 0 && content.trim().length > 0) {
      console.log('No chunks created, creating emergency chunk with full content');
      chunks.push({
        id: 'emergency-chunk-full',
        content: content,
        page: 1,
        chapter: 'Full Content'
      });
    }
    
    return chunks;
  }, [extractChapterTitle, findBestBreakPoint]);

  // Progressive loading logic
  const loadChunksAroundIndex = useCallback((centerIndex: number, allChunks: ContentChunk[]) => {
    const startIndex = Math.max(0, centerIndex - CHUNKS_TO_LOAD);
    const endIndex = Math.min(allChunks.length - 1, centerIndex + CHUNKS_TO_LOAD);
    
    return allChunks.slice(startIndex, endIndex + 1);
  }, []);

  const expandChunksUp = useCallback(() => {
    if (contentChunks.length === 0) return;
    
    setIsLoadingChunks(true);
    
    // Get the current first loaded chunk index
    const currentFirstChunk = loadedChunks[0];
    if (!currentFirstChunk) return;
    
    const currentFirstIndex = contentChunks.findIndex(chunk => chunk.id === currentFirstChunk.id);
    if (currentFirstIndex <= 0) {
      setIsLoadingChunks(false);
      return; // Already at the beginning
    }
    
    // Load more chunks before the current first chunk
    const newStartIndex = Math.max(0, currentFirstIndex - CHUNKS_TO_LOAD);
    const newChunks = contentChunks.slice(newStartIndex, currentFirstIndex);
    
    // Prepend new chunks to the beginning, avoiding duplicates
    setLoadedChunks(prev => {
      // Filter out chunks that are already loaded
      const existingIds = new Set(prev.map(chunk => chunk.id));
      const uniqueNewChunks = newChunks.filter(chunk => !existingIds.has(chunk.id));
      
      // If no new unique chunks, don't update
      if (uniqueNewChunks.length === 0) {
        setIsLoadingChunks(false);
        return prev;
      }
      
      const updated = [...uniqueNewChunks, ...prev];
      // Trim from the end if we exceed max chunks
      if (updated.length > MAX_LOADED_CHUNKS) {
        return updated.slice(0, MAX_LOADED_CHUNKS);
      }
      return updated;
    });
    
    console.log('Expanded chunks up:', { 
      requestedChunks: newChunks.length,
      uniqueChunksAdded: newChunks.filter(chunk => !loadedChunks.some(loaded => loaded.id === chunk.id)).length,
      newStartIndex, 
      currentFirstIndex 
    });
    
    setTimeout(() => setIsLoadingChunks(false), 100);
  }, [contentChunks, loadedChunks]);

  const expandChunksDown = useCallback(() => {
    if (contentChunks.length === 0) return;
    
    setIsLoadingChunks(true);
    
    // Get the current last loaded chunk index
    const currentLastChunk = loadedChunks[loadedChunks.length - 1];
    if (!currentLastChunk) return;
    
    const currentLastIndex = contentChunks.findIndex(chunk => chunk.id === currentLastChunk.id);
    if (currentLastIndex >= contentChunks.length - 1) {
      setIsLoadingChunks(false);
      return; // Already at the end
    }
    
    // Load more chunks after the current last chunk
    const newEndIndex = Math.min(contentChunks.length, currentLastIndex + 1 + CHUNKS_TO_LOAD);
    const newChunks = contentChunks.slice(currentLastIndex + 1, newEndIndex);
    
    // Append new chunks to the end, avoiding duplicates
    setLoadedChunks(prev => {
      // Filter out chunks that are already loaded
      const existingIds = new Set(prev.map(chunk => chunk.id));
      const uniqueNewChunks = newChunks.filter(chunk => !existingIds.has(chunk.id));
      
      // If no new unique chunks, don't update
      if (uniqueNewChunks.length === 0) {
        setIsLoadingChunks(false);
        return prev;
      }
      
      const updated = [...prev, ...uniqueNewChunks];
      // Trim from the beginning if we exceed max chunks
      if (updated.length > MAX_LOADED_CHUNKS) {
        return updated.slice(-MAX_LOADED_CHUNKS);
      }
      return updated;
    });
    
    console.log('Expanded chunks down:', { 
      requestedChunks: newChunks.length,
      uniqueChunksAdded: newChunks.filter(chunk => !loadedChunks.some(loaded => loaded.id === chunk.id)).length,
      currentLastIndex, 
      newEndIndex 
    });
    
    setTimeout(() => setIsLoadingChunks(false), 100);
  }, [contentChunks, loadedChunks]);

  // Scroll detection for dynamic expansion
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    setScrollPosition(scrollTop);
    
    // Handle edge cases where scrollHeight equals clientHeight
    if (scrollHeight <= clientHeight) return;
    
    // Calculate scroll position as percentage
    const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
    
    // Define expansion thresholds
    const expandUpThreshold = 0.1; // Expand up when in top 10%
    const expandDownThreshold = 0.9; // Expand down when in bottom 10%
    
    const now = Date.now();
    const timeSinceLastLoad = now - lastLoadTime;
    const minLoadInterval = 500; // Minimum 500ms between loads (faster for better UX)
    
    // Check if we should expand up (user scrolled near the top)
    if (scrollPercentage < expandUpThreshold && timeSinceLastLoad > minLoadInterval) {
      console.log('Expanding chunks up - user near top:', { scrollPercentage });
      setLastLoadTime(now);
      expandChunksUp();
    }
    // Check if we should expand down (user scrolled near the bottom)
    else if (scrollPercentage > expandDownThreshold && timeSinceLastLoad > minLoadInterval) {
      console.log('Expanding chunks down - user near bottom:', { scrollPercentage });
      setLastLoadTime(now);
      expandChunksDown();
    }
  }, [expandChunksUp, expandChunksDown, lastLoadTime]);

  // Load book content from API
  useEffect(() => {
    const loadBook = async () => {
      console.log('Starting to load book, setting isProcessing to true');
      setIsProcessing(true);
      try {
        // Add a test message with references for debugging
        const testRef: Reference = {
          id: 'test-ref-6-37',
          content: 'Test reference content from character range 6-37',
          chapter: 'Test Chapter',
          page: 1,
          startOffset: 6,
          endOffset: 37,
          bookId: 'book_1757773062667_nr0jeva'
        };
        
        const testMessage: ChatMessage = {
          id: 'test-message',
          type: 'assistant',
          content: 'This is a test message with references to demonstrate the functionality using character offsets 6-37 from book_1757773062667_nr0jeva.',
          timestamp: new Date(),
          references: ['test-ref-6-37']
        };
        
        console.log('Setting up test data...');
        setReferences({ [testRef.id]: testRef });
        setChatMessages([testMessage]);
        
        console.log('Test setup complete for book ID:', id, 'Expected: book_1757773062667_nr0jeva');
        console.log('Test message:', testMessage);
        console.log('Test reference:', testRef);
        
        // Optimize: Only fetch the specific book instead of all books
        const response = await fetch(`/api/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Single book API response:', data);
          if (data.success) {
            const book = data.data; // Single book endpoint returns the book directly
            console.log('Book found:', { book: !!book, bookId: id, bookContent: book?.content?.substring(0, 100) });
            if (book) {
              setBookMetadata(book);
              setBookContent(book.content || 'No content available');
              
              // Chunk the content for better performance
              const chunks = chunkContent(book.content || '');
              setContentChunks(chunks);
              setTotalPages(chunks.length);

              // Initialize progressive loading immediately with the chunks
              const initialChunkIndex = book.currentPage && book.currentPage >= 1 && book.currentPage <= chunks.length 
                ? book.currentPage - 1 
                : 0;
              
              // Load initial chunks around the starting position using the chunks directly
              const startIndex = Math.max(0, initialChunkIndex - CHUNKS_TO_LOAD);
              const endIndex = Math.min(chunks.length - 1, initialChunkIndex + CHUNKS_TO_LOAD);
              const initialLoadedChunks = chunks.slice(startIndex, endIndex + 1);
              
              // Ensure we always have at least some chunks loaded
              const finalLoadedChunks = initialLoadedChunks.length > 0 ? initialLoadedChunks : chunks.slice(0, Math.min(CHUNKS_TO_LOAD * 2 + 1, chunks.length));
              
              console.log('Setting loaded chunks:', finalLoadedChunks);
              setLoadedChunks(finalLoadedChunks);
              setCurrentChunkIndex(initialChunkIndex);
              
              // Set current page for compatibility
              setCurrentPage(initialChunkIndex + 1);
              
              // Mark initial load as complete
              setIsInitialLoad(false);
            }
          }
        } else {
          // Fallback: fetch all books if specific book endpoint doesn't exist
        const response = await fetch('/api/books');
        const data = await response.json();
        
        console.log('API response:', { success: data.success, dataLength: data.data?.length });
        
        if (data.success) {
          const book = data.data.find((b: any) => b.id === id);
          console.log('Book found:', { book: !!book, bookId: id, bookContent: book?.content?.substring(0, 100) });
          if (book) {
            setBookMetadata(book);
            const bookContent = book.content || 'No content available';
            setBookContent(bookContent);
            
            console.log('Book content length:', bookContent.length);
            console.log('Book content preview:', bookContent.substring(0, 200));
              
              // Test chunking with a simple string first
              const testChunks = chunkContent('This is a test. This should create at least one chunk.');
              console.log('Test chunking result:', testChunks);
              
              // Chunk the content for better performance
              const chunks = chunkContent(bookContent);
              setContentChunks(chunks);
              setTotalPages(chunks.length);

              // Initialize progressive loading immediately with the chunks
              const initialChunkIndex = book.currentPage && book.currentPage >= 1 && book.currentPage <= chunks.length 
                ? book.currentPage - 1 
                : 0;
              
              // Load initial chunks around the starting position using the chunks directly
              const startIndex = Math.max(0, initialChunkIndex - CHUNKS_TO_LOAD);
              const endIndex = Math.min(chunks.length - 1, initialChunkIndex + CHUNKS_TO_LOAD);
              const initialLoadedChunks = chunks.slice(startIndex, endIndex + 1);
              
              // Ensure we always have at least some chunks loaded
              const finalLoadedChunks = initialLoadedChunks.length > 0 ? initialLoadedChunks : chunks.slice(0, Math.min(CHUNKS_TO_LOAD * 2 + 1, chunks.length));
              
              console.log('Initializing progressive loading:', {
                totalChunks: chunks.length,
                initialChunkIndex,
                loadedChunksCount: finalLoadedChunks.length,
                startIndex,
                endIndex
              });
              
              console.log('Setting loaded chunks:', finalLoadedChunks);
              setLoadedChunks(finalLoadedChunks);
              setCurrentChunkIndex(initialChunkIndex);
              
              // Set current page for compatibility
              setCurrentPage(initialChunkIndex + 1);
              
              // Mark initial load as complete
              setIsInitialLoad(false);
            }
          }
        }
      } catch (error) {
        console.error('Error loading book:', error);
        console.log('Falling back to mock content');
        // Fallback to mock content
        const mockContent = `
# Chapter 1: The Beginning

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Section 1.1: The Journey Begins

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

## Section 1.2: The First Challenge

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.

# Chapter 2: The Middle

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.

## Section 2.1: The Plot Thickens

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

## Section 2.2: The Revelation

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.

# Chapter 3: The End

Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.

At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.

## Section 3.1: The Final Battle

Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.

Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.

## Section 3.2: The Resolution

Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.

Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
        `.trim();
        setBookContent(mockContent);
        const chunks = chunkContent(mockContent);
        setContentChunks(chunks);
        setTotalPages(chunks.length);
        
        // Initialize progressive loading for mock content using chunks directly
        const startIndex = Math.max(0, 0 - CHUNKS_TO_LOAD);
        const endIndex = Math.min(chunks.length - 1, 0 + CHUNKS_TO_LOAD);
        const initialLoadedChunks = chunks.slice(startIndex, endIndex + 1);
        
        // Ensure we always have at least some chunks loaded
        const finalLoadedChunks = initialLoadedChunks.length > 0 ? initialLoadedChunks : chunks.slice(0, Math.min(CHUNKS_TO_LOAD * 2 + 1, chunks.length));
        
        console.log('Setting loaded chunks (mock):', finalLoadedChunks);
        setLoadedChunks(finalLoadedChunks);
        setCurrentChunkIndex(0);
      } finally {
        console.log('Setting isProcessing to false');
        setIsProcessing(false);
      }
      
      // Safety check removed - progressive loading should work now
    };

    loadBook();
  }, [id, chunkContent, loadChunksAroundIndex]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setIsThinking(true);
    setShowThinkingIndicator(false);
    setHasNewResponse(false);
    
    // Close chat and show minimized indicator while thinking (unless in fullscreen mode)
    if (!isFullscreen) {
      setIsChatOpen(false);
      setIsChatMinimized(true);
    }

    try {
      // Call the QA API
      const response = await fetch('/api/qa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: currentMessage,
          bookId: id,
          context: loadedChunks.map(chunk => chunk.content).join('\n\n'),
          loadedChunkCount: loadedChunks.length,
          totalChunkCount: contentChunks.length
        }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: data.data.answer,
          timestamp: new Date(),
          references: data.data.references.map((ref: any) => ref.id),
        };

        // Store references
        const refsMap: Record<string, Reference> = {};
        data.data.references.forEach((ref: any) => {
          refsMap[ref.id] = {
            id: ref.id,
            content: ref.content,
            page: ref.page,
            chapter: ref.chapter,
            startOffset: ref.startOffset,
            endOffset: ref.endOffset,
            bookId: ref.bookId
          };
        });
        setReferences(prev => ({ ...prev, ...refsMap }));

        setChatMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error processing your question. Please try again.',
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
      setShowThinkingIndicator(true);
      
      // Only set new response notification if not in fullscreen mode
      if (!isFullscreen) {
        setHasNewResponse(true);
      }
      
      // Show thinking indicator for 2 seconds, then show notification
      setTimeout(() => {
        setShowThinkingIndicator(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatClick = () => {
    if (hasNewResponse) {
      // Open full screen when there's a new response
      setIsChatOpen(true);
      setIsChatMinimized(false);
      setIsFullscreen(true);
      setHasNewResponse(false);
    } else {
      // Toggle chat normally
      setIsChatOpen(!isChatOpen);
      setIsChatMinimized(false);
      // Only exit fullscreen if we're closing the chat
      if (!isChatOpen) {
        setIsFullscreen(false);
      }
    }
  };

  const toggleReferences = (messageId: string) => {
    const willOpen = showReferences !== messageId;
    setShowReferences(willOpen ? messageId : null);
  };

  const navigateToReference = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Close chat to show the reference
    setIsChatOpen(false);
    setIsChatMinimized(false);
  };


  const loadInlineReferenceContent = (startOffset: number, endOffset?: number) => {
    console.log('Loading inline reference content for book_1757773062667_nr0jeva:', { startOffset, endOffset, bookContentLength: bookContent?.length });
    
    if (bookContent) {
      // If endOffset is provided, use the range; otherwise use startOffset as center point
      const actualStart = endOffset ? startOffset : Math.max(0, startOffset - 25);
      const actualEnd = endOffset ? endOffset : Math.min(bookContent.length, startOffset + 25);
      
      console.log('Actual range:', { actualStart, actualEnd });
      
      // Extract content around the range (e.g., 2000 characters before and after)
      const contextStart = Math.max(0, actualStart - 1000);
      const contextEnd = Math.min(bookContent.length, actualEnd + 1000);
      const content = bookContent.substring(contextStart, contextEnd);
      
      console.log('Context range:', { contextStart, contextEnd, contentLength: content.length });
      
      // Calculate the position of the reference within the context
      const refStartInContext = actualStart - contextStart;
      const refEndInContext = actualEnd - contextStart;
      
      // Split content into before, reference, and after parts
      const beforeRef = content.substring(0, refStartInContext);
      const refText = content.substring(refStartInContext, refEndInContext);
      const afterRef = content.substring(refEndInContext);
      
      console.log('Reference text:', refText);
      
      // Create highlighted content
      const highlightedContent = beforeRef + 
        `<mark class="bg-yellow-200 px-1 rounded">${refText}</mark>` + 
        afterRef;
      
      return highlightedContent;
    }
    return '';
  };



  // Page selection functions
  const handlePageSelect = () => {
    const pageNum = parseInt(pageInput);
    if (pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setShowPageSelector(false);
      setPageInput('');
    }
  };

  const handlePageInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePageSelect();
    } else if (e.key === 'Escape') {
      setShowPageSelector(false);
      setPageInput('');
    }
  };

  // Get loaded chunks for progressive loading
  const allChunks = useMemo(() => {
    console.log('allChunks useMemo:', {
      loadedChunksLength: loadedChunks.length,
      contentChunksLength: contentChunks.length,
      loadedChunks: loadedChunks,
      contentChunks: contentChunks
    });
    return loadedChunks; // Return only loaded chunks for progressive loading
  }, [loadedChunks, contentChunks]);


  // Reset scroll position to top when page changes
  useEffect(() => {
    if (contentContainerRef.current && !isInitialLoad) {
      contentContainerRef.current.scrollTop = 0;
    }
  }, [currentPage, isInitialLoad]);

  // Save current page to database
  const saveCurrentPage = useCallback(async (page: number) => {
    if (id && page > 0 && totalPages > 0) {
      try {
        const response = await fetch(`/api/books/${id}/current-page`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ currentPage: page }),
        });
        await response.json();
      } catch (error) {
        console.error('Error saving current page:', error);
      }
    }
  }, [id, totalPages]);

  // Navigation functions
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  // Memoized markdown component
  const MemoizedMarkdown = memo(({ content }: { content: string }) => {
    return (
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({children}) => <h1 className="text-3xl font-bold text-gray-900 mt-0 mb-4">{children}</h1>,
          h2: ({children}) => <h2 className="text-2xl font-semibold text-gray-800 mt-0 mb-3">{children}</h2>,
          h3: ({children}) => <h3 className="text-xl font-semibold text-gray-700 mt-0 mb-2">{children}</h3>,
          p: ({children}) => <p className="mb-4 leading-relaxed text-base">{children}</p>,
          ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-1 ml-2">{children}</ul>,
          ol: ({children}) => <ol className="list-none mb-4 space-y-1 ml-2">{children}</ol>,
          li: ({children}) => <li className="text-base leading-relaxed">{children}</li>,
          strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
          em: ({children}) => <em className="italic text-gray-700">{children}</em>,
          blockquote: ({children}) => <blockquote className="border-l-4 border-amber-300 pl-4 italic text-gray-600 my-4 text-base">{children}</blockquote>,
          code: ({children}) => <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{children}</code>,
          pre: ({children}) => <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto my-4 text-sm">{children}</pre>,
        }}
      >
        {content}
      </ReactMarkdown>
    );
  });

  MemoizedMarkdown.displayName = 'MemoizedMarkdown';

  // When expanding references for a message, prefetch any referenced book contents not yet loaded
  useEffect(() => {
    const prefetchReferencedBooks = async () => {
      if (!showReferences) return;
      const msg = chatMessages.find(m => m.id === showReferences);
      if (!msg || !msg.references) return;
      const bookIds = new Set<string>();
      for (const refId of msg.references) {
        const ref = references[refId];
        if (ref && ref.bookId && ref.bookId !== id) {
          bookIds.add(ref.bookId);
        }
      }
      for (const bookId of bookIds) {
        if (referencedBooks[bookId] || loadingBookIds[bookId]) continue;
        setLoadingBookIds(prev => ({ ...prev, [bookId]: true }));
        try {
          const resp = await fetch(`/api/books/${bookId}`);
          if (!resp.ok) throw new Error('Failed to fetch referenced book');
          const data = await resp.json();
          if (!data.success || !data.data?.content) throw new Error('Invalid referenced book data');
          const book = data.data;
          const chunks = chunkContent(book.content || '');
          // compute chunk starts
          const starts: number[] = [];
          let acc = 0;
          for (const ch of chunks) {
            starts.push(acc);
            acc += ch.content.length;
          }
          setReferencedBooks(prev => ({ ...prev, [bookId]: { content: book.content || '', chunks, chunkStarts: starts, title: book.title } }));
        } catch (e) {
          console.error('Error prefetching referenced book', bookId, e);
        } finally {
          setLoadingBookIds(prev => ({ ...prev, [bookId]: false }));
        }
      }
    };
    prefetchReferencedBooks();
  }, [showReferences, chatMessages, references, id, referencedBooks, loadingBookIds, chunkContent]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts when not typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'm':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleChatClick();
          }
          break;
        case 'Escape':
          if (isChatOpen) {
            if (isFullscreen) {
              setIsFullscreen(false);
            } else {
              setIsChatOpen(false);
            }
          } else if (isChatMinimized) {
            setIsChatMinimized(false);
          }
          break;
        case 'Home':
          e.preventDefault();
          if (contentContainerRef.current) {
            contentContainerRef.current.scrollTop = 0;
          }
          break;
        case 'End':
          e.preventDefault();
          if (contentContainerRef.current) {
            contentContainerRef.current.scrollTop = contentContainerRef.current.scrollHeight;
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChatOpen, handleChatClick]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </motion.button>
              </Link>
              <div className="flex items-center space-x-3">
                <BookOpen className="h-6 w-6 text-amber-600" />
                <h1 className="text-lg font-semibold text-gray-900">{bookMetadata?.title || 'Loading...'}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Settings (Coming Soon)"
              >
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleChatClick}
                className={`p-2 rounded-lg transition-colors relative ${
                  hasNewResponse 
                    ? 'bg-green-600 hover:bg-green-700 text-white animate-pulse' 
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
                title={hasNewResponse ? "New response available! Click to view" : "Toggle Chat (Ctrl+M)"}
              >
                <MessageCircle className="h-5 w-5" />
                {hasNewResponse && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Reading Area */}
        <main className={`flex-1 h-screen overflow-y-auto transition-all duration-300 ${
          isChatOpen && !isFullscreen ? 'mr-80' : ''
        }`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-full">

            {/* Loading State */}
            {isProcessing && (
              <div className="bg-white rounded-xl shadow-lg p-8 h-[calc(100vh-12rem)] flex flex-col overflow-hidden">
                <div className="text-center mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Processing book content...</p>
                </div>
                
                {/* Loading skeleton */}
                <div className="space-y-3 flex-1 flex flex-col justify-center">
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/5"></div>
                  </div>
                </div>
              </div>
            )}

            {/* Book Content */}
            {!isProcessing && (
              <div className="bg-white rounded-xl shadow-lg p-8 h-[calc(100vh-12rem)] flex flex-col relative">
                {/* Debug info */}
                <div className="text-xs text-gray-400 mb-2">
                  Debug: isProcessing={isProcessing.toString()}, allChunks.length={allChunks.length}, loadedChunks.length={loadedChunks.length}
                </div>
                <div 
                  ref={contentContainerRef}
                  className="text-gray-800 leading-relaxed flex-1 overflow-y-auto"
                  onScroll={handleScroll}
                >
                  {allChunks.map((chunk, index) => {
                    // Create a unique key that includes the chunk's position in the loaded array
                    const uniqueKey = `${chunk.id}-loaded-${index}`;
                    return (
                    <div key={uniqueKey} className="mb-12">
                      {chunk.chapter && index === 0 && chunk.chapter.length > 10 && (
                        <div className="mb-8 p-6 bg-amber-50 border-l-4 border-amber-300 rounded-r-lg">
                          <h2 className="text-2xl font-semibold text-amber-800">{chunk.chapter}</h2>
                        </div>
                      )}
                      <div className="prose prose-lg max-w-none">
                        <MemoizedMarkdown content={chunk.content} />
                      </div>
                    </div>
                    );
                  })}
                  
                  {allChunks.length === 0 && (
                    <div className="text-center text-gray-500 flex items-center justify-center h-full">
                      <div>
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No content available for this section.</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Loading indicator for progressive loading */}
                  {isLoadingChunks && (
                    <div className="fixed top-4 right-4 bg-amber-100 border border-amber-300 rounded-lg px-4 py-2 shadow-lg z-50">
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-600"></div>
                        <span className="text-sm text-amber-800">Expanding content...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reading Progress Indicator */}
            <div className="flex justify-center items-center mt-8">
              <div className="text-sm text-gray-500">
                Dynamic loading - {loadedChunks.length} chunks loaded (max {MAX_LOADED_CHUNKS})
              </div>
            </div>
          </div>
        </main>

        {/* Chat Sidebar */}
        <AnimatePresence>
          {isChatOpen && (
            <motion.aside
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              className={`fixed right-0 top-16 bottom-0 bg-white shadow-xl border-l border-gray-200 flex flex-col z-30 ${
                isFullscreen ? 'w-full' : 'w-80'
              }`}
            >
              {/* Fullscreen expand button on left edge */}
              {!isFullscreen && (
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-16 bg-amber-600 hover:bg-amber-700 text-white rounded-l-lg flex items-center justify-center transition-colors z-40"
                  title="Expand to fullscreen"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              )}
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                      title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? <ChevronUp className="h-4 w-4 text-gray-600" /> : <ChevronUp className="h-4 w-4 text-gray-600" />}
                    </button>
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 py-8">
                    <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>Ask me anything about this book!</p>
                  </div>
                ) : (
                  chatMessages.map((message) => (
                    <div key={message.id} className="space-y-2">
                      <ChatMessageComponent
                        message={message}
                        showReferences={showReferences}
                        references={references}
                        onToggleReferences={toggleReferences}
                        isFullscreen={isFullscreen}
                        onNavigateToReference={navigateToReference}
                      />

                      {/* Inline scrollable pages with highlighted ranges */}
                      <AnimatePresence>
                        {showReferences === message.id && message.references && message.references.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-amber-50 border border-amber-200 rounded-lg p-3"
                          >
                            <h4 className="font-semibold text-amber-900 mb-2 text-sm">References</h4>
                            <div className="space-y-4">
                              {message.references.map((refId) => {
                                const ref = references[refId];
                                if (!ref) return null;

                                // Determine offsets to highlight
                                let refStart = typeof ref.startOffset === 'number' ? ref.startOffset : -1;
                                let refEnd = typeof ref.endOffset === 'number' ? ref.endOffset : -1;
                                // Select the correct book content/chunks depending on ref.bookId
                                const useCurrentBook = !ref.bookId || ref.bookId === id;
                                const sourceContent = useCurrentBook ? bookContent : referencedBooks[ref.bookId!]?.content;
                                const sourceChunks = useCurrentBook ? contentChunks : referencedBooks[ref.bookId!]?.chunks || [];
                                const sourceStarts = useCurrentBook ? chunkStartOffsets : referencedBooks[ref.bookId!]?.chunkStarts || [];

                                if (refStart < 0 && ref.content && sourceContent) {
                                  const idx = sourceContent.indexOf(ref.content);
                                  if (idx >= 0) {
                                    refStart = idx;
                                    refEnd = idx + ref.content.length;
                                  }
                                }

                                if (refStart < 0 || refEnd <= refStart) {
                                  return (
                                    <div key={refId} className="text-xs text-amber-800">
                                      Unable to locate reference range in the book content.
                                    </div>
                                  );
                                }

                                // Find which chunks (pages) intersect the reference range
                                const pagesToRender: number[] = [];
                                for (let i = 0; i < sourceChunks.length; i++) {
                                  const cStart = sourceStarts[i] ?? 0;
                                  const cEnd = cStart + sourceChunks[i].content.length;
                                  if (refStart < cEnd && refEnd > cStart) {
                                    pagesToRender.push(i);
                                  }
                                  if (cStart > refEnd) break;
                                }

                                return (
                                  <div key={refId} className="border border-amber-200 rounded-md bg-white">
                                    <div className="px-3 py-2 border-b border-amber-200 text-sm text-amber-900 flex items-center justify-between">
                                      <div>
                                        {ref.chapter && <strong>{ref.chapter}</strong>}
                                        {ref.page && <span className="ml-2 text-amber-700">(Page {ref.page})</span>}
                                        {!useCurrentBook && ref.bookId && <span className="ml-2 text-gray-600">[{referencedBooks[ref.bookId]?.title || ref.bookId}]</span>}
                                      </div>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                      {pagesToRender.map((pi) => {
                                        const chunk = sourceChunks[pi];
                                        const cStart = sourceStarts[pi] ?? 0;
                                        const html = highlightRangeInChunk(chunk.content, cStart, refStart, refEnd);
                                        return (
                                          <div key={chunk.id} className="p-3 border-b last:border-b-0 border-gray-100">
                                            <div className="text-xs text-gray-500 mb-2">Page {chunk.page}{chunk.chapter ? ` • ${chunk.chapter}` : ''}</div>
                                            <div
                                              className="text-sm leading-relaxed whitespace-pre-wrap"
                                              dangerouslySetInnerHTML={{ __html: html }}
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                )}

                {/* Removed global references section; references now render inline per message */}

                {/* Loading Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    ref={chatInputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about the book..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Minimized Chat */}
        <AnimatePresence>
          {isChatMinimized && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-6 right-6 z-40"
            >
              <div className={`text-white p-4 rounded-lg shadow-lg ${
                hasNewResponse ? 'bg-green-600' : 'bg-amber-600'
              }`}>
                <div className="flex items-center space-x-3">
                  {hasNewResponse ? (
                    <>
                      <AlertCircle className="h-4 w-4 animate-pulse" />
                      <span className="text-sm font-medium">Response ready!</span>
                    </>
                  ) : (
                    <>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm font-medium">AI is thinking...</span>
                    </>
                  )}
                  <button
                    onClick={() => {
                      setIsChatMinimized(false);
                      setIsChatOpen(true);
                      if (hasNewResponse) {
                        setIsFullscreen(true);
                      }
                    }}
                    className="ml-2 p-1 hover:bg-opacity-80 rounded transition-colors"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thinking Indicator */}
        <AnimatePresence>
          {showThinkingIndicator && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed bottom-6 right-6 z-50"
            >
              <div className="bg-green-600 text-white p-4 rounded-full shadow-lg">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 animate-pulse" />
                  <span className="text-sm font-medium">Done thinking!</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </div>
  );
}
