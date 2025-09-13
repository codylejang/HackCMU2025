# 📖 E-Book Reader with AI QA - Claude Code Setup Guide

## Project Overview

This project is an advanced e-book reader with integrated AI-powered Question & Answer capabilities. It combines a modern Next.js frontend with Open Notebook as the AI backend, providing real-time Q&A with reference linking for uploaded e-books.

### 🎯 Key Features

- **📚 Universal E-book Support**: Upload and read PDF, EPUB, and TXT files
- **🤖 AI-Powered Q&A**: Ask questions about book content and get intelligent answers
- **🔗 Smart Citations**: AI responses include references to specific passages
- **🎨 Modern UI**: Clean, responsive interface built with Next.js 14 and Tailwind CSS
- **🔒 Privacy-First**: Uses Open Notebook backend - your data stays under your control
- **⚡ Multi-Model Support**: 16+ AI providers including OpenAI, Anthropic, Ollama, DeepSeek
- **🔍 Semantic Search**: Vector-based search through book content
- **📱 Mobile-Friendly**: Responsive design for all devices

### 🏗️ Architecture

**Frontend (Next.js 14)**
- React with TypeScript for type safety
- Tailwind CSS for styling
- Framer Motion for smooth animations
- Drag & drop file uploads
- Real-time Q&A interface

**Backend Integration (Open Notebook)**
- FastAPI with Python backend
- SurrealDB for data persistence
- Vector embeddings for semantic search
- LLM integration for intelligent responses
- Background processing workers

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+ (for Open Notebook backend)
- SurrealDB

### Setup Instructions

1. **Start Open Notebook Backend**
   ```bash
   # Navigate to open-notebook directory
   cd ../open-notebook

   # Activate environment and start services
   source ~/.bash_profile && conda activate open-notebook

   # Start SurrealDB
   surreal start --allow-all --bind 0.0.0.0:8000 --user root --pass root memory &

   # Start API Backend
   uv run run_api.py &

   # Start Background Worker
   uv run --env-file .env surreal-commands-worker --import-modules commands &

   # Start Streamlit UI (optional)
   uv run --env-file .env streamlit run app_home.py &
   ```

2. **Start E-book Reader Frontend**
   ```bash
   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

3. **Access the Application**
   - **E-book Reader**: http://localhost:3000
   - **Open Notebook API**: http://localhost:5055
   - **Open Notebook UI**: http://localhost:8502 (optional)

## 📖 Usage Guide

### Uploading E-books

1. **Via Web Interface**:
   - Go to http://localhost:3000
   - Click "Upload E-Books" or drag & drop files
   - Supported formats: PDF, EPUB, TXT (up to 10MB)
   - Books are automatically processed by AI backend

2. **Via API**:
   ```bash
   curl -X POST http://localhost:3000/api/books \
     -F "file=@your-book.pdf" \
     -F "author=Author Name"
   ```

### Reading and Q&A

1. **Open a Book**: Click on any uploaded book to open the reader
2. **Ask Questions**: Click the chat button (💬) to open AI assistant
3. **Get AI Answers**: Ask questions like:
   - "What are the main themes in this book?"
   - "Explain the concept of X mentioned in chapter 3"
   - "What does the author say about Y?"
4. **View References**: AI responses include citations and source passages
5. **Detailed View**: Click "View Full Answer" for expanded Q&A interface

### API Endpoints

**Books Management**
- `GET /api/books` - List all uploaded books
- `POST /api/books` - Upload new e-book
- `GET /api/books/{id}` - Get specific book details
- `DELETE /api/books?id={id}` - Delete book

**Q&A System**
- `POST /api/qa` - Ask questions about book content
  ```json
  {
    "question": "Your question here",
    "bookId": "book_id_from_upload"
  }
  ```

## ⚙️ Configuration

### Environment Variables

The application uses the following environment variables:

```bash
# Open Notebook Backend Configuration
OPEN_NOTEBOOK_API_URL=http://localhost:5055
OPEN_NOTEBOOK_API_PREFIX=/api

# Public variants for client-side access
NEXT_PUBLIC_OPEN_NOTEBOOK_API_URL=http://localhost:5055
NEXT_PUBLIC_OPEN_NOTEBOOK_API_PREFIX=/api
```

### AI Model Configuration

AI models are configured in Open Notebook. Current setup uses:
- **Chat Model**: DeepSeek via OpenRouter (free tier)
- **Embedding Model**: For vector search and semantic understanding
- **Provider**: OpenRouter API

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── books/          # Book management API
│   │   └── qa/             # AI Q&A API (integrated with Open Notebook)
│   ├── reader/[id]/        # Book reader interface
│   ├── qa/[chatId]/        # Detailed Q&A view
│   └── page.tsx            # Landing page
├── lib/
│   ├── database.ts         # Local book database
│   ├── openNotebook.ts     # Open Notebook API client
│   └── fileUpload.ts       # File processing utilities
└── components/             # Reusable UI components
```

## 🔄 Data Flow

1. **Upload**: User uploads e-book → Frontend extracts text content
2. **Processing**: Frontend creates notebook in Open Notebook backend
3. **Storage**: Book content sent as source to Open Notebook for vectorization
4. **Q&A**: User asks question → Frontend sends to Open Notebook
5. **AI Response**: Open Notebook returns AI answer with citations
6. **Display**: Frontend shows answer with reference passages

## 🧪 Testing

### Manual Testing

1. **Upload Test Book**:
   ```bash
   curl -X POST http://localhost:3000/api/books \
     -F "file=@test-book.txt" \
     -F "author=Test Author"
   ```

2. **Test Q&A**:
   ```bash
   curl -X POST http://localhost:3000/api/qa \
     -H "Content-Type: application/json" \
     -d '{"question": "What is this book about?", "bookId": "book_id_here"}'
   ```

### Expected Results
- Book upload creates notebook and source in Open Notebook
- Q&A returns AI-generated answers with proper citations
- References include relevant passages from the book

## 🐛 Troubleshooting

### Common Issues

1. **"Book not yet processed" Error**
   - Wait for Open Notebook to finish processing the book
   - Check Open Notebook backend logs for errors
   - Verify SurrealDB is running

2. **"Open Notebook models not configured properly"**
   - Ensure AI models are set up in Open Notebook
   - Check `.env` file in open-notebook directory
   - Verify API keys for AI providers

3. **CORS Issues**
   - Open Notebook has CORS enabled by default
   - Check that Open Notebook API is running on port 5055

4. **File Upload Fails**
   - Check file size (max 10MB)
   - Verify file type (PDF, EPUB, TXT only)
   - Ensure sufficient disk space

### Debug Commands

```bash
# Check running services
ps aux | grep -E "(surreal|streamlit|uvicorn)"

# Check port usage
lsof -i :3000  # Next.js
lsof -i :5055  # Open Notebook API
lsof -i :8000  # SurrealDB

# Test API connectivity
curl http://localhost:5055/health
```

## 🎯 Advanced Usage

### Custom AI Providers

To use different AI providers:
1. Configure models in Open Notebook backend
2. Update environment variables in `open-notebook/.env`
3. Restart Open Notebook services

### Batch Processing

Upload multiple books programmatically:
```bash
for book in *.pdf; do
  curl -X POST http://localhost:3000/api/books \
    -F "file=@$book" \
    -F "author=Unknown"
done
```

## 🤝 Integration Details

This project integrates two main components:

**HackCMU2025 E-book Reader** (Frontend)
- Handles file uploads and user interface
- Manages book library and reading experience
- Provides Q&A chat interface

**Open Notebook** (AI Backend)
- Processes document content and creates embeddings
- Provides AI-powered question answering
- Manages vector search and semantic understanding

The integration creates a seamless experience where users can upload books and immediately start asking AI-powered questions about the content.

## 📚 Additional Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **Open Notebook Repository**: https://github.com/lfnovo/open-notebook
- **Tailwind CSS**: https://tailwindcss.com/docs
- **SurrealDB**: https://surrealdb.com/docs

---

**Built for HackCMU 2025** - Combining modern web technologies with AI-powered document understanding.