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