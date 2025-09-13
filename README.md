# 📖 E-Book Reader with AI QA and Referencing

A modern web-based e-book reader integrated with Large Language Model (LLM) capabilities for real-time Question & Answer with reference linking.

## ✨ Features

### 🏠 Landing Page
- **Book Grid Display**: Beautiful grid layout showing all uploaded books
- **File Upload**: Support for PDF, EPUB, and TXT files
- **Drag & Drop**: Intuitive file upload with visual feedback
- **Book Metadata**: Display title, author, file type, and upload date
- **Responsive Design**: Works seamlessly on desktop and mobile

### 📚 Reading Experience
- **Clean Reader Interface**: Distraction-free reading with customizable layout
- **Floating AI Button**: Easy access to AI assistance while reading
- **Smooth Scrolling**: Optimized for long-form content
- **Page Navigation**: Quick access to top/bottom of content

### 🤖 AI Chat Integration
- **Real-time Chat**: Instant AI responses to your questions
- **Context Awareness**: AI understands the book content
- **Reference Linking**: Each answer includes relevant book passages
- **Chat History**: Persistent conversation history
- **Loading States**: Visual feedback during AI processing

### 🔍 Interactive QA Views
- **Fullscreen QA Mode**: Detailed view of questions and answers
- **Reference Management**: Expandable/collapsible reference sections
- **Relevance Scoring**: See how relevant each reference is
- **Copy Functionality**: Easy copying of reference text
- **Navigation Links**: Quick access back to reading mode

### 🎨 Modern UI/UX
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Keyboard navigation and screen reader support
- **Dark Mode Ready**: Prepared for theme switching
- **Custom Scrollbars**: Polished visual details

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ebook-reader
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Architecture

### Frontend (Next.js 14)
- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

### Backend (Next.js API Routes)
- **API Routes**: RESTful endpoints for book management and QA
- **File Processing**: Support for multiple e-book formats
- **Mock LLM Integration**: Simulated AI responses with references

### Planned Backend Integration
- **Vector Database**: Pinecone/Weaviate for semantic search
- **LLM Integration**: OpenAI/Anthropic for real AI responses
- **File Processing**: PDF/EPUB text extraction
- **Embeddings**: Content vectorization for similarity search

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── books/          # Book management API
│   │   └── qa/             # Question-Answer API
│   ├── reader/
│   │   └── [id]/           # Dynamic reader pages
│   ├── qa/
│   │   └── [chatId]/       # Fullscreen QA views
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
└── components/             # Reusable components (future)
```

## 🔧 API Endpoints

### Books API (`/api/books`)
- `GET /api/books` - Retrieve all books
- `POST /api/books` - Upload new book

### QA API (`/api/qa`)
- `POST /api/qa` - Send question, get AI response with references

## 🎯 Usage

### Uploading Books
1. Click "Upload E-Books" on the landing page
2. Select PDF, EPUB, or TXT files
3. Books appear in the grid with metadata

### Reading with AI
1. Click on any book to open the reader
2. Click the chat button (💬) to open AI assistant
3. Ask questions about the book content
4. View references and detailed answers

### Managing References
1. In chat, click "Show References" to see source passages
2. Click "View Full Answer" for detailed QA view
3. Expand/collapse references as needed
4. Copy reference text for external use

## 🚧 Development Roadmap

### Phase 1: Core Infrastructure ✅
- [x] Next.js project setup
- [x] Basic UI components
- [x] File upload functionality
- [x] Mock API responses

### Phase 2: Real Backend Integration 🚧
- [ ] Vector database setup (Pinecone/Weaviate)
- [ ] LLM integration (OpenAI/Anthropic)
- [ ] PDF/EPUB text extraction
- [ ] Embedding generation and storage

### Phase 3: Advanced Features 📋
- [ ] User authentication
- [ ] Book collections and organization
- [ ] Advanced search and filtering
- [ ] Export and sharing capabilities
- [ ] Offline reading support

### Phase 4: Polish & Optimization 📋
- [ ] Performance optimization
- [ ] Advanced animations
- [ ] Accessibility improvements
- [ ] Mobile app (React Native)

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Backend**: Next.js API Routes
- **Database**: (Planned) Vector database + PostgreSQL
- **AI/ML**: (Planned) OpenAI/Anthropic APIs
- **Deployment**: (Planned) Vercel/Netlify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Framer Motion for smooth animations
- Lucide for the beautiful icon set
- The open-source community for inspiration

---

**Built with ❤️ for the future of digital reading**
# Open Notebook - AI-Powered E-Book Reader

A full-stack application that combines an e-book reader with AI-powered chat functionality. Upload books (PDF, EPUB, TXT) and ask questions about their content using AI.

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- OpenAI API Key (optional, for AI features)

### 1. Clone and Setup
```bash
git clone <repository-url>
cd open-notebook
```

### 2. Backend Setup
```bash
cd backend
pip install python-dotenv fastapi uvicorn httpx
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Environment Configuration
Create a `.env` file in the `backend` directory:
```bash
cd backend
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

### 5. Start the System

**Option A: Start Both Servers (Recommended)**
```bash
# From project root
chmod +x start_full_stack.sh
./start_full_stack.sh
```

**Option B: Start Servers Manually**
```bash
# Terminal 1 - Backend
cd backend
python simple_api_server.py

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5055
- **API Docs**: http://localhost:5055/docs

## 📚 Features

### E-Book Reader
- Upload PDF, EPUB, and TXT files
- Clean, responsive reading interface
- Page navigation and bookmarks
- Cover image display

### AI Chat Integration
- Ask questions about uploaded books
- Context-aware responses using book content
- Real-time chat interface
- Reference tracking

### Backend API
- RESTful API endpoints
- Book management
- AI-powered question answering
- Health monitoring

## 🛠️ API Endpoints

### Core Endpoints
- `GET /health` - Health check
- `GET /api/models` - Available AI models
- `POST /api/search/ask/simple` - Ask questions about books
- `GET /api/books` - List uploaded books
- `POST /api/books` - Upload new book

### Example API Usage
```bash
# Ask a question about a book
curl -X POST http://localhost:5055/api/search/ask/simple \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is this book about?",
    "context": "Book content here...",
    "bookId": "book-123"
  }'
```

## 🏗️ Architecture

### Frontend (Next.js)
- **Location**: `/frontend`
- **Framework**: Next.js 15 with TypeScript
- **Features**: E-book reader, chat interface, file upload
- **Port**: 3000

### Backend (FastAPI)
- **Location**: `/backend`
- **Framework**: FastAPI with Python
- **Features**: API server, AI integration, book processing
- **Port**: 5055

### Key Components
- **Book Upload**: Handles PDF, EPUB, TXT files
- **AI Integration**: OpenAI API for contextual responses
- **Chat System**: Real-time Q&A about book content
- **File Management**: Local storage for uploaded books

## 🔧 Configuration

### Environment Variables
```bash
# Backend (.env file)
OPENAI_API_KEY=your_api_key_here
BACKEND_API_URL=http://localhost:5055
```

### File Structure
```
open-notebook/
├── backend/                 # FastAPI backend
│   ├── simple_api_server.py # Main API server
│   ├── .env                 # Environment variables
│   └── data/uploads/        # Uploaded books
├── frontend/                # Next.js frontend
│   ├── src/app/            # App components
│   └── package.json        # Dependencies
└── README.md               # This file
```

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**
```bash
# Check Python version
python --version

# Install missing dependencies
pip install python-dotenv fastapi uvicorn httpx

# Check if port 5055 is free
lsof -i :5055
```

**Frontend won't start:**
```bash
# Install dependencies
cd frontend
npm install

# Check Node version
node --version

# Clear cache if needed
rm -rf node_modules package-lock.json
npm install
```

**AI responses not working:**
- Verify OpenAI API key in `.env` file
- Check backend logs for API errors
- Ensure context is being passed correctly

### Port Conflicts
```bash
# Kill processes on ports
lsof -ti:3000,5055 | xargs kill -9

# Or use different ports
# Backend: python simple_api_server.py --port 5056
# Frontend: npm run dev -- -p 3001
```

## 📝 Development

### Adding New Features
1. **Backend**: Add endpoints in `simple_api_server.py`
2. **Frontend**: Add components in `frontend/src/app/`
3. **Integration**: Update API calls in frontend

### Testing
```bash
# Test backend
curl http://localhost:5055/health

# Test frontend
curl http://localhost:3000

# Test AI integration
curl -X POST http://localhost:5055/api/search/ask/simple \
  -H "Content-Type: application/json" \
  -d '{"question": "test", "context": "test context"}'
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation at http://localhost:5055/docs
3. Check backend logs for error details
4. Ensure all dependencies are installed correctly

---

**Happy Reading! 📖✨**