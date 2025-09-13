// E-Book Library JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const booksContainer = document.getElementById('booksContainer');
    
    // Load books from localStorage on page load
    loadBooksFromStorage();
    
    // Upload area click handler
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // File input change handler
    fileInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (isValidEBookFile(file)) {
                addBookToLibrary(file);
            } else {
                alert('Please select a valid e-book file (.pdf, .epub, .mobi, .txt)');
            }
        });
        // Reset file input
        fileInput.value = '';
    });
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.background = 'rgba(255, 255, 255, 0.1)';
        
        const files = Array.from(e.dataTransfer.files);
        files.forEach(file => {
            if (isValidEBookFile(file)) {
                addBookToLibrary(file);
            } else {
                alert('Please select a valid e-book file (.pdf, .epub, .mobi, .txt)');
            }
        });
    });
    
    // Validate file type
    function isValidEBookFile(file) {
        const validTypes = [
            'application/pdf',
            'application/epub+zip',
            'application/x-mobipocket-ebook',
            'text/plain'
        ];
        const validExtensions = ['.pdf', '.epub', '.mobi', '.txt'];
        
        return validTypes.includes(file.type) || 
               validExtensions.some(ext => file.name.toLowerCase().endsWith(ext));
    }
    
    // Add book to library
    function addBookToLibrary(file) {
        const bookId = 'book_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        const bookName = file.name.replace(/\.[^/.]+$/, ""); // Remove file extension
        
        // Create book element
        const bookElement = createBookElement(bookId, bookName, file);
        booksContainer.appendChild(bookElement);
        
        // Save to localStorage
        saveBookToStorage(bookId, {
            name: bookName,
            fileName: file.name,
            fileSize: file.size,
            uploadDate: new Date().toISOString()
        });
        
        // Show success message
        showNotification(`"${bookName}" added to library!`);
    }
    
    // Create book element
    function createBookElement(bookId, bookName, file) {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.setAttribute('data-book-id', bookId);
        
        const bookCover = document.createElement('div');
        bookCover.className = 'book-cover';
        
        // Create a simple cover based on file type
        const fileExtension = file.name.split('.').pop().toLowerCase();
        const coverText = getCoverText(fileExtension);
        bookCover.textContent = coverText;
        
        const bookTitle = document.createElement('div');
        bookTitle.className = 'book-title';
        bookTitle.textContent = bookName;
        
        bookItem.appendChild(bookCover);
        bookItem.appendChild(bookTitle);
        
        // Add click handler to open/read book
        bookItem.addEventListener('click', function() {
            openBook(file);
        });
        
        return bookItem;
    }
    
    // Get cover text based on file type
    function getCoverText(extension) {
        const coverTexts = {
            'pdf': '📄 PDF',
            'epub': '📚 EPUB',
            'mobi': '📖 MOBI',
            'txt': '📝 TXT'
        };
        return coverTexts[extension] || '📖 BOOK';
    }
    
    // Open book (placeholder - in real app, this would open the book)
    function openBook(file) {
        // For demo purposes, we'll just show an alert
        // In a real application, you would integrate with a PDF viewer or e-book reader
        const reader = new FileReader();
        reader.onload = function(e) {
            // This is just for demonstration - in reality, you'd need proper e-book rendering
            alert(`Opening: ${file.name}\n\nFile size: ${(file.size / 1024 / 1024).toFixed(2)} MB\n\nNote: This is a demo. In a real application, this would open the e-book reader.`);
        };
        reader.readAsDataURL(file);
    }
    
    // Save book to localStorage
    function saveBookToStorage(bookId, bookData) {
        const books = getBooksFromStorage();
        books[bookId] = bookData;
        localStorage.setItem('ebookLibrary', JSON.stringify(books));
    }
    
    // Get books from localStorage
    function getBooksFromStorage() {
        const books = localStorage.getItem('ebookLibrary');
        return books ? JSON.parse(books) : {};
    }
    
    // Load books from localStorage
    function loadBooksFromStorage() {
        const books = getBooksFromStorage();
        Object.keys(books).forEach(bookId => {
            const bookData = books[bookId];
            // Create a mock file object for display purposes
            const mockFile = {
                name: bookData.fileName,
                size: bookData.fileSize
            };
            const bookElement = createBookElement(bookId, bookData.name, mockFile);
            booksContainer.appendChild(bookElement);
        });
    }
    
    // Show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Add some sample books for demonstration
    function addSampleBooks() {
        const sampleBooks = [
            { name: "The Great Gatsby", type: "pdf" },
            { name: "1984", type: "epub" },
            { name: "To Kill a Mockingbird", type: "mobi" }
        ];
        
        sampleBooks.forEach((book, index) => {
            const mockFile = {
                name: book.name + '.' + book.type,
                size: Math.floor(Math.random() * 5000000) + 1000000 // Random size between 1-5MB
            };
            
            setTimeout(() => {
                addBookToLibrary(mockFile);
            }, index * 500); // Stagger the additions
        });
    }
    
    // Uncomment the line below to add sample books on page load
    // addSampleBooks();
});
