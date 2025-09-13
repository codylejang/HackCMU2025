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