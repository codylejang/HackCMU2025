# 📖 Open Notebook - AI-Powered E-Book Reader

A full-stack application that combines a modern e-book reader with AI-powered chat functionality. Upload books (PDF, EPUB, TXT) and ask questions about their content using AI with reference linking.

## ✨ Features

### 🏠 Landing Page & E-Book Reader
- **Book Grid Display**: Beautiful grid layout showing all uploaded books
- **File Upload**: Support for PDF, EPUB, and TXT files with drag & drop
- **Book Metadata**: Display title, author, file type, and upload date
- **Clean Reader Interface**: Distraction-free reading with customizable layout
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Cover Image Display**: Visual book covers for better organization

### 🤖 AI Chat Integration
- **Real-time Chat**: Instant AI responses to your questions about book content
- **Context Awareness**: AI understands the book content for accurate answers
- **Reference Linking**: Each answer includes relevant book passages
- **Chat History**: Persistent conversation history
- **Loading States**: Visual feedback during AI processing
- **Floating AI Button**: Easy access to AI assistance while reading

### 🔍 Interactive QA Views
- **Fullscreen QA Mode**: Detailed view of questions and answers
- **Reference Management**: Expandable/collapsible reference sections
- **Relevance Scoring**: See how relevant each reference is
- **Copy Functionality**: Easy copying of reference text
- **Navigation Links**: Quick access back to reading mode

### 🎨 Modern UI/UX
- **Smooth Animations**: Framer Motion powered transitions
- **Accessibility**: Keyboard navigation and screen reader support
- **Custom Scrollbars**: Polished visual details
- **Mobile-first Design**: Optimized for all devices

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

## 🏗️ Architecture

### Frontend (Next.js)
- **Location**: `/frontend`
- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with Framer Motion animations
- **Icons**: Lucide React
- **Features**: E-book reader, chat interface, file upload
- **Port**: 3000

### Backend (FastAPI)
- **Location**: `/backend`
- **Framework**: FastAPI with Python
- **Features**: API server, AI integration, book processing
- **Port**: 5055

### Key Components
- **Book Upload**: Handles PDF, EPUB, TXT files with metadata extraction
- **AI Integration**: OpenAI API for contextual responses
- **Chat System**: Real-time Q&A about book content with references
- **File Management**: Local storage for uploaded books with cover generation

## 🛠️ API Endpoints

### Core Endpoints
- `GET /health` - Health check
- `GET /api/models` - Available AI models
- `POST /api/search/ask/simple` - Ask questions about books
- `GET /api/books` - List uploaded books
- `POST /api/books` - Upload new book
- `GET /api/covers/[filename]` - Get book cover images

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

## 📁 Project Structure

```
open-notebook/
├── backend/                 # FastAPI backend
│   ├── simple_api_server.py # Main API server
│   ├── .env                 # Environment variables
│   └── data/uploads/        # Uploaded books
├── frontend/                # Next.js frontend
│   ├── src/app/            # App components
│   │   ├── api/            # API routes
│   │   ├── reader/         # Book reader pages
│   │   ├── qa/             # QA interface pages
│   │   └── page.tsx        # Landing page
│   └── package.json        # Dependencies
└── README.md               # This file
```

## 🎯 Usage

### Uploading Books
1. Click "Upload E-Books" on the landing page
2. Select PDF, EPUB, or TXT files (drag & drop supported)
3. Books appear in the grid with metadata and covers

### Reading with AI
1. Click on any book to open the reader
2. Click the chat button (💬) to open AI assistant
3. Ask questions about the book content
4. View references and detailed answers
5. Use "View Full Answer" for expanded QA views

### Managing References
1. In chat, click "Show References" to see source passages
2. Expand/collapse references as needed
3. Copy reference text for external use
4. Navigate back to reading mode easily

## 🔧 Configuration

### Environment Variables
```bash
# Backend (.env file)
OPENAI_API_KEY=your_api_key_here
BACKEND_API_URL=http://localhost:5055
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

## 🚧 Development Roadmap

### Phase 1: Core Infrastructure ✅
- [x] Next.js project setup with TypeScript
- [x] FastAPI backend integration
- [x] File upload functionality
- [x] Basic AI integration

### Phase 2: Enhanced Features 🚧
- [x] Real-time chat interface
- [x] Reference linking system
- [ ] Advanced book processing (PDF/EPUB parsing)
- [ ] Vector database integration

### Phase 3: Advanced Features 📋
- [ ] User authentication
- [ ] Book collections and organization
- [ ] Advanced search and filtering
- [ ] Export and sharing capabilities
- [ ] Offline reading support

### Phase 4: Polish & Optimization 📋
- [ ] Performance optimization
- [ ] Advanced animations
- [ ] Enhanced accessibility
- [ ] Mobile app (React Native)

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **Backend**: FastAPI, Python 3.9+
- **AI/ML**: OpenAI API
- **Database**: (Planned) Vector database + PostgreSQL
- **Deployment**: (Planned) Vercel + Railway/Heroku

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Submit a pull request

## 📞 Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation at http://localhost:5055/docs
3. Check backend logs for error details
4. Ensure all dependencies are installed correctly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- FastAPI for the excellent Python web framework
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- Lucide for the beautiful icon set
- OpenAI for AI capabilities
- The open-source community for inspiration

---

**Built with ❤️ for the future of digital reading and AI-powered learning** 📖✨
