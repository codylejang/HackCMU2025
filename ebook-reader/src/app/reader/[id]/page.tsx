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
  references: Record<string, Reference[]>;
  onToggleReferences: (messageId: string) => void;
  isFullscreen: boolean;
  onNavigateToReference: (offset: number) => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`px-4 py-2 rounded-lg ${
      isFullscreen ? 'max-w-4xl' : 'max-w-xs'
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
                onClick={() => onToggleReferences(message.id)}
                className="text-xs underline hover:no-underline"
              >
                {showReferences === message.id ? 'Hide' : 'Show'} References ({message.references.length})
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
  const [references, setReferences] = useState<Record<string, Reference[]>>({});
  const [bookContent, setBookContent] = useState<string>('');
  const [contentChunks, setContentChunks] = useState<ContentChunk[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bookMetadata, setBookMetadata] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showPageSelector, setShowPageSelector] = useState(false);
  const [pageInput, setPageInput] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showReferenceViewer, setShowReferenceViewer] = useState(false);
  const [referenceContent, setReferenceContent] = useState('');
  const [referenceOffset, setReferenceOffset] = useState(0);
  
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

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

  // Utility function to chunk content
  const chunkContent = useCallback((content: string): ContentChunk[] => {
    const chunks: ContentChunk[] = [];
    const lines = content.split('\n');
    let currentChunk = '';
    let chunkIndex = 0;
    let pageNumber = 1;
    let currentChapter = '';
    let isInTOC = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const potentialChunk = currentChunk + (currentChunk ? '\n' : '') + line;

      // Check if we're in table of contents section (only for first few pages)
      if (pageNumber <= 5 && (
          line.toLowerCase().includes('table of contents') || 
          line.toLowerCase().includes('contents') ||
          (line.toLowerCase().includes('chapter') && line.length < 100) ||
          (line.toLowerCase().includes('part') && line.length < 100) ||
          (line.toLowerCase().includes('book') && line.length < 100) ||
          (line.startsWith('#') && (line.toLowerCase().includes('chapter') || line.toLowerCase().includes('part'))) ||
          (line.match(/^\d+\./) && line.length < 100))) { // Numbered list items that are likely TOC entries
        isInTOC = true;
      }
      
      // Reset TOC detection after page 5 or when we encounter actual content
      if (pageNumber > 5 || (line.startsWith('#') && line.length > 20 && !line.toLowerCase().includes('chapter') && !line.toLowerCase().includes('part'))) {
        isInTOC = false;
      }

      // Check if this line is a chapter heading (not in TOC)
      if (!isInTOC) {
        // Only look for H1, H2, H3 headings
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

      // Check if adding this line would exceed chunk size
      if (potentialChunk.length > currentChunkSize && currentChunk) {
        // For TOC, try to break at line boundaries to preserve complete entries
        if (isInTOC) {
          const lastNewline = currentChunk.lastIndexOf('\n');
          if (lastNewline > currentChunkSize * 0.8) { // If we have a good line break
            const chunkContent = currentChunk.substring(0, lastNewline).trim();
            const chapterTitle = extractChapterTitle(chunkContent);
            chunks.push({
              id: `chunk_${chunkIndex}`,
              content: chunkContent,
              page: pageNumber,
              chapter: chapterTitle || currentChapter
            });
            currentChunk = currentChunk.substring(lastNewline + 1) + (line ? '\n' + line : '');
          } else {
            // Save current chunk as is
            const chapterTitle = extractChapterTitle(currentChunk);
            chunks.push({
              id: `chunk_${chunkIndex}`,
              content: currentChunk,
              page: pageNumber,
              chapter: chapterTitle || currentChapter
            });
            currentChunk = line;
          }
        } else {
          // Try to break at a paragraph boundary if possible
          const lastParagraphBreak = currentChunk.lastIndexOf('\n\n');
          if (lastParagraphBreak > currentChunkSize * 0.7) { // If we have a good paragraph break
            const chunkContent = currentChunk.substring(0, lastParagraphBreak).trim();
            const chapterTitle = extractChapterTitle(chunkContent);
            chunks.push({
              id: `chunk_${chunkIndex}`,
              content: chunkContent,
              page: pageNumber,
              chapter: chapterTitle || currentChapter
            });
            currentChunk = currentChunk.substring(lastParagraphBreak + 2) + (line ? '\n' + line : '');
          } else {
            // Save current chunk as is
            const chapterTitle = extractChapterTitle(currentChunk);
            chunks.push({
              id: `chunk_${chunkIndex}`,
              content: currentChunk,
              page: pageNumber,
              chapter: chapterTitle || currentChapter
            });
            currentChunk = line;
          }
        }
        
        chunkIndex++;
        pageNumber++; // Each chunk is now one section
      } else {
        currentChunk = potentialChunk;
      }
    }

    // Add the last chunk if it exists
    if (currentChunk.trim()) {
      const chapterTitle = extractChapterTitle(currentChunk);
      chunks.push({
        id: `chunk_${chunkIndex}`,
        content: currentChunk,
        page: pageNumber,
        chapter: chapterTitle || (currentChapter && currentChapter !== 'Steve Jobs' ? currentChapter : undefined)
      });
    }

    return chunks;
  }, [extractChapterTitle]);

  // Load book content from API
  useEffect(() => {
    const loadBook = async () => {
      setIsProcessing(true);
      try {
        // Add a test message with references for debugging
        const testMessage: ChatMessage = {
          id: 'test-message',
          type: 'assistant',
          content: 'This is a test message with references to demonstrate the functionality using character offsets 6-37 from book_1757773062667_nr0jeva.',
          timestamp: new Date(),
          references: ['test-ref-6-37']
        };
        
        const testRef: Reference = {
          id: 'test-ref-6-37',
          content: 'Test reference content from character range 6-37',
          chapter: 'Test Chapter',
          page: 1,
          startOffset: 6,
          endOffset: 37,
          bookId: 'book_1757773062667_nr0jeva'
        };
        
        setChatMessages([testMessage]);
        setReferences({ 'test-ref-6-37': [testRef] });
        
        console.log('Test setup complete for book ID:', id, 'Expected: book_1757773062667_nr0jeva');
        
        // Optimize: Only fetch the specific book instead of all books
        const response = await fetch(`/api/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            const book = data.data;
            setBookMetadata(book);
            setBookContent(book.content || 'No content available');
            
            // Chunk the content asynchronously for better performance
            setTimeout(() => {
              const chunks = chunkContent(book.content || '');
              setContentChunks(chunks);
              setTotalPages(chunks.length);
            }, 0);

            // Open directly at the saved current page
            if (book.currentPage && book.currentPage >= 1) {
              setCurrentPage(book.currentPage);
            } else {
              setCurrentPage(1); // Fallback to page 1 if no valid saved page
            }
            
            
            // Mark initial load as complete
            setIsInitialLoad(false);
          }
        } else {
          // Fallback: fetch all books if specific book endpoint doesn't exist
        const response = await fetch('/api/books');
        const data = await response.json();
        if (data.success) {
          const book = data.data.find((b: any) => b.id === id);
          if (book) {
            setBookMetadata(book);
            setBookContent(book.content || 'No content available');
              
              // Chunk the content for better performance
              const chunks = chunkContent(book.content || '');
              setContentChunks(chunks);
              setTotalPages(chunks.length);

              // Open directly at the saved current page
              if (book.currentPage && book.currentPage >= 1 && book.currentPage <= chunks.length) {
                setCurrentPage(book.currentPage);
              } else {
                setCurrentPage(1); // Fallback to page 1 if no valid saved page
              }
              
              
              // Mark initial load as complete
              setIsInitialLoad(false);
            }
          }
        }
      } catch (error) {
        console.error('Error loading book:', error);
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
        setTotalPages(Math.ceil(chunks.length / CHUNKS_PER_PAGE));
      } finally {
        setIsProcessing(false);
      }
    };

    loadBook();
  }, [id, chunkContent]);

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
    
    // Close chat and show minimized indicator while thinking
    setIsChatOpen(false);
    setIsChatMinimized(true);

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
          context: bookContent
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
        const refsMap: Record<string, Reference[]> = {};
        data.data.references.forEach((ref: any) => {
          refsMap[ref.id] = [{
            id: ref.id,
            content: ref.content,
            page: ref.page,
            chapter: ref.chapter
          }];
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
      setHasNewResponse(true);
      
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
      setIsFullscreen(false);
    }
  };

  const toggleReferences = (messageId: string) => {
    console.log('Toggling references for message:', messageId, 'Current showReferences:', showReferences);
    setShowReferences(showReferences === messageId ? null : messageId);
  };

  const navigateToReference = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    setShowReferenceViewer(false);
    // Close chat to show the reference
    setIsChatOpen(false);
    setIsChatMinimized(false);
  };

  const loadReferenceContent = (startOffset: number, endOffset?: number) => {
    if (bookContent) {
      // If endOffset is provided, use the range; otherwise use startOffset as center point
      const actualStart = endOffset ? startOffset : Math.max(0, startOffset - 25);
      const actualEnd = endOffset ? endOffset : Math.min(bookContent.length, startOffset + 25);
      
      // Extract content around the range (e.g., 2000 characters before and after)
      const contextStart = Math.max(0, actualStart - 1000);
      const contextEnd = Math.min(bookContent.length, actualEnd + 1000);
      const content = bookContent.substring(contextStart, contextEnd);
      
      // Calculate the position of the reference within the context
      const refStartInContext = actualStart - contextStart;
      const refEndInContext = actualEnd - contextStart;
      
      // Split content into before, reference, and after parts
      const beforeRef = content.substring(0, refStartInContext);
      const refText = content.substring(refStartInContext, refEndInContext);
      const afterRef = content.substring(refEndInContext);
      
      // Create highlighted content
      const highlightedContent = beforeRef + 
        `<mark class="bg-yellow-200 px-1 rounded">${refText}</mark>` + 
        afterRef;
      
      setReferenceContent(highlightedContent);
      setReferenceOffset(actualStart);
      setShowReferenceViewer(true);
    }
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

  // Get current page chunks (each chunk is now one page)
  const currentPageChunks = useMemo(() => {
    const chunkIndex = currentPage - 1; // Convert page number to 0-based index
    
    if (chunkIndex >= 0 && chunkIndex < contentChunks.length) {
      const chunk = contentChunks[chunkIndex];
      return [chunk]; // Return single chunk as array
    }
    return [];
  }, [contentChunks, currentPage]);


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

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle shortcuts when not typing in input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goToPreviousPage();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goToNextPage();
          break;
        case 'm':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleChatClick();
          }
          break;
        case 'Escape':
          if (showPageSelector) {
            setShowPageSelector(false);
            setPageInput('');
          } else if (isChatOpen) {
            if (isFullscreen) {
              setIsFullscreen(false);
            } else {
              setIsChatOpen(false);
            }
          } else if (isChatMinimized) {
            setIsChatMinimized(false);
          }
          break;
        case 'g':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setShowPageSelector(true);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPreviousPage, goToNextPage, isChatOpen, showPageSelector]);

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
                <div 
                  ref={contentContainerRef}
                  className="text-gray-800 leading-relaxed flex-1 overflow-y-auto"
                >
                  {currentPageChunks.map((chunk, index) => (
                    <div key={chunk.id} className="mb-8">
                      {chunk.chapter && index === 0 && chunk.chapter.length > 10 && (
                        <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-300 rounded-r-lg">
                          <h2 className="text-xl font-semibold text-amber-800">{chunk.chapter}</h2>
                        </div>
                      )}
                      <div className="prose prose-lg max-w-none">
                        <MemoizedMarkdown content={chunk.content} />
                      </div>
                    </div>
                  ))}
                  
                  {currentPageChunks.length === 0 && (
                    <div className="text-center text-gray-500 flex items-center justify-center h-full">
                      <div>
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No content available for this section.</p>
                      </div>
                    </div>
                  )}
              </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <div className="flex items-center space-x-2">
              <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Previous page (←)"
              >
                <ChevronUp className="h-4 w-4" />
                  <span>Previous</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-1">
                {/* Calculate sliding window of page numbers */}
                {(() => {
                  const maxVisible = 5;
                  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
                  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
                  
                  // Adjust start if we're near the end
                  if (endPage - startPage < maxVisible - 1) {
                    startPage = Math.max(1, endPage - maxVisible + 1);
                  }
                  
                  const pages = [];
                  
                  // Add first page and ellipsis if needed
                  if (startPage > 1) {
                    pages.push(
                      <button
                        key={1}
                        onClick={() => setCurrentPage(1)}
                        className="w-8 h-8 rounded text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        1
                      </button>
                    );
                    if (startPage > 2) {
                      pages.push(
                        <button
                          key="ellipsis-start"
                          onClick={() => setShowPageSelector(true)}
                          className="w-8 h-8 rounded text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          title="Select section (Ctrl+G)"
                        >
                          ...
                        </button>
                      );
                    }
                  }
                  
                  // Add visible page range
                  for (let i = startPage; i <= endPage; i++) {
                    const isActive = i === currentPage;
                    pages.push(
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i)}
                        className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                          isActive 
                            ? 'bg-amber-600 text-white' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {i}
                      </button>
                    );
                  }
                  
                  // Add ellipsis and last page if needed
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <button
                          key="ellipsis-end"
                          onClick={() => setShowPageSelector(true)}
                          className="w-8 h-8 rounded text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                          title="Select section (Ctrl+G)"
                        >
                          ...
                        </button>
                      );
                    }
                    pages.push(
                      <button
                        key={totalPages}
                        onClick={() => setCurrentPage(totalPages)}
                        className="w-8 h-8 rounded text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        {totalPages}
              </button>
                    );
                  }
                  
                  return pages;
                })()}
              </div>
              
              <div className="flex items-center space-x-2">
              <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Next page (→)"
                >
                  <span>Next</span>
                <ChevronDown className="h-4 w-4" />
              </button>
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
                    {!isFullscreen && (
                      <button
                        onClick={() => setIsChatMinimized(true)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Minimize"
                      >
                        <ChevronDown className="h-4 w-4 text-gray-600" />
                      </button>
                    )}
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
                    <ChatMessageComponent
                      key={message.id}
                      message={message}
                      showReferences={showReferences}
                      references={references}
                      onToggleReferences={toggleReferences}
                      isFullscreen={isFullscreen}
                      onNavigateToReference={navigateToReference}
                    />
                  ))
                )}

                {/* References */}
                <AnimatePresence>
                  {showReferences && references[showReferences] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-amber-50 border border-amber-200 rounded-lg p-4"
                    >
                      <h4 className="font-semibold text-amber-900 mb-2">References</h4>
                      {references[showReferences].map((ref) => (
                        <div key={ref.id} className="mb-4 last:mb-0">
                          <div className="text-sm text-amber-800">
                            <strong>{ref.chapter}</strong>
                            {ref.page && <span className="ml-2 text-amber-600">(Page {ref.page})</span>}
                            {ref.startOffset && ref.endOffset && (
                              <span className="ml-2 text-blue-600">(Chars {ref.startOffset}:{ref.endOffset})</span>
                            )}
                            {ref.bookId && (
                              <span className="ml-2 text-gray-600">(Book: {ref.bookId})</span>
                            )}
                          </div>
                          <div className="text-xs text-amber-700 mt-1 italic">
                            "{ref.content}"
                          </div>
                          <div className="mt-2 flex space-x-2">
                            <button
                              onClick={() => navigateToReference(ref.page || 1)}
                              className="text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 px-2 py-1 rounded transition-colors flex items-center space-x-1"
                            >
                              <ExternalLink className="h-3 w-3" />
                              <span>Go to section</span>
                            </button>
                          </div>
                          
                          {/* Inline reference content - always shown when references are expanded */}
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 bg-gray-50 border border-gray-200 rounded-lg p-3"
                          >
                            <div className="text-xs text-gray-600 mb-2 font-medium">
                              Book Content Context {ref.startOffset && ref.endOffset && `(Chars ${ref.startOffset}:${ref.endOffset})`}
                              {ref.bookId && ` - ${ref.bookId}`}
                            </div>
                            <div 
                              className="text-sm text-gray-800 leading-relaxed max-h-64 overflow-y-auto"
                              dangerouslySetInnerHTML={{ 
                                __html: loadInlineReferenceContent(
                                  ref.startOffset || 0, 
                                  ref.endOffset
                                ) 
                              }}
                            />
                          </motion.div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

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

      {/* Reference Viewer Modal */}
      <AnimatePresence>
        {showReferenceViewer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowReferenceViewer(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl w-4/5 h-4/5 max-w-6xl mx-4 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Reference Content</h3>
                <button
                  onClick={() => setShowReferenceViewer(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="prose prose-lg max-w-none">
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
                    {referenceContent}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Selector Modal */}
      <AnimatePresence>
        {showPageSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowPageSelector(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-80 max-w-sm mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Go to Section</h3>
                <button
                  onClick={() => setShowPageSelector(false)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter section number (1-{totalPages})
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    onKeyPress={handlePageInputKeyPress}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder={`1-${totalPages}`}
                    autoFocus
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowPageSelector(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handlePageSelect}
                    disabled={!pageInput || parseInt(pageInput) < 1 || parseInt(pageInput) > totalPages}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Go
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
