# Open Notebook Backend - Claude Setup Guide

## 🚀 Quick Backend Setup

### Prerequisites
- Python 3.9+
- OpenAI API Key (for AI features)

### Installation
```bash
cd backend
pip install python-dotenv fastapi uvicorn httpx
```

### Environment Setup
Create `.env` file in backend directory:
```bash
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

### Start Backend Server
```bash
python simple_api_server.py
```

## 📡 API Endpoints

### Core Endpoints
- `GET /health` - Health check
- `GET /api/models` - Available AI models
- `POST /api/search/ask/simple` - Ask questions about books
- `GET /api/notebooks` - List notebooks
- `POST /api/notebooks` - Create notebook
- `POST /api/sources` - Upload book/source
- `POST /api/books` - Upload book (alternative)

### Example Usage
```bash
# Health check
curl http://localhost:5055/health

# Ask a question
curl -X POST http://localhost:5055/api/search/ask/simple \
  -H "Content-Type: application/json" \
  -d '{
    "question": "What is this book about?",
    "context": "Book content here...",
    "bookId": "book-123"
  }'
```

## 🏗️ Architecture

### Main Components
- **simple_api_server.py** - Main FastAPI server
- **open_notebook/** - Core domain logic
- **api/** - API services and routers
- **data/uploads/** - Uploaded book storage

### Key Features
- **Book Processing** - Handles PDF, EPUB, TXT uploads
- **AI Integration** - OpenAI API for contextual responses
- **Chat System** - Real-time Q&A about book content
- **File Management** - Local storage for uploaded books

## 🔧 Configuration

### Environment Variables
```bash
OPENAI_API_KEY=your_api_key_here
BACKEND_API_URL=http://localhost:5055
```

### Port Configuration
- **Default Port**: 5055
- **API Docs**: http://localhost:5055/docs
- **Health Check**: http://localhost:5055/health

## 🐛 Troubleshooting

### Common Issues

**Server won't start:**
```bash
# Check Python version
python --version

# Install missing dependencies
pip install python-dotenv fastapi uvicorn httpx

# Check if port 5055 is free
lsof -i :5055
```

**AI responses not working:**
- Verify OpenAI API key in `.env` file
- Check backend logs for API errors
- Ensure context is being passed correctly

**Port conflicts:**
```bash
# Kill processes on port 5055
lsof -ti:5055 | xargs kill -9
```

## 📝 Development

### Adding New Endpoints
1. Add route in `simple_api_server.py`
2. Test with curl or API docs
3. Update frontend integration

### Testing
```bash
# Test health endpoint
curl http://localhost:5055/health

# Test AI endpoint
curl -X POST http://localhost:5055/api/search/ask/simple \
  -H "Content-Type: application/json" \
  -d '{"question": "test", "context": "test context"}'
```

## 🔗 Integration

### Frontend Connection
- Frontend calls backend at `http://localhost:5055`
- CORS enabled for all origins
- JSON API responses

### Book Context Integration
- Frontend sends book content as `context` parameter
- Backend uses context for AI responses
- Real-time chat with book-specific answers

---

**Backend is running on http://localhost:5055** 🚀
