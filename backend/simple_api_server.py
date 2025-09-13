#!/usr/bin/env python3
"""
Simple API server for testing the book upload fix
This server runs without the problematic dependencies
"""

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import json
import os
from typing import Optional, List
import tempfile
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Open Notebook API - Test Server")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mock data storage
notebooks_db = []
sources_db = []

@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "API server is running"}

@app.get("/api/models")
async def get_models():
    """Get available AI models"""
    return [
        {
            "id": "gpt-3.5-turbo",
            "name": "GPT-3.5 Turbo",
            "type": "chat",
            "description": "Fast and efficient chat model"
        },
        {
            "id": "gpt-4",
            "name": "GPT-4",
            "type": "chat", 
            "description": "Advanced reasoning model"
        }
    ]

@app.post("/api/search/ask/simple")
async def ask_simple(request: dict):
    """Simple ask endpoint that uses OpenAI API with book context"""
    try:
        question = request.get("question", "")
        context = request.get("context", "")
        book_id = request.get("bookId", "")
        
        if not question:
            raise HTTPException(status_code=400, detail="Question is required")
        
        # Get OpenAI API key from environment
        openai_api_key = os.getenv("OPENAI_API_KEY")
        if not openai_api_key:
            raise HTTPException(status_code=500, detail="OpenAI API key not configured")
        
        # Build system message with context if available
        system_message = "You are a helpful AI assistant that answers questions about books and content. Provide detailed, accurate, and helpful responses."
        
        if context:
            system_message += f"\n\nYou have access to the following book content to help answer questions:\n\n{context[:4000]}"  # Limit context to avoid token limits
        
        # Call OpenAI API
        import httpx
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {openai_api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": "gpt-3.5-turbo",
                    "messages": [
                        {
                            "role": "system",
                            "content": system_message
                        },
                        {
                            "role": "user",
                            "content": question
                        }
                    ],
                    "max_tokens": 1000,
                    "temperature": 0.7
                },
                timeout=30.0
            )
            
            if response.status_code != 200:
                raise HTTPException(status_code=500, detail=f"OpenAI API error: {response.text}")
            
            data = response.json()
            answer = data["choices"][0]["message"]["content"]
            
            return {
                "answer": answer,
                "question": question
            }
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing question: {str(e)}")

@app.get("/api/notebooks")
async def get_notebooks():
    """Get all notebooks"""
    return notebooks_db

@app.post("/api/notebooks")
async def create_notebook(data: dict):
    """Create a new notebook"""
    notebook_id = f"notebook:{len(notebooks_db) + 1}"
    notebook = {
        "id": notebook_id,
        "name": data.get("name", "Untitled Notebook"),
        "description": data.get("description", ""),
        "created": "2024-01-01T00:00:00Z",
        "updated": "2024-01-01T00:00:00Z"
    }
    notebooks_db.append(notebook)
    return notebook

@app.post("/api/books")
async def upload_book(
    notebook_id: str = Form(..., description="Notebook ID to add the book to"),
    title: Optional[str] = Form(None, description="Book title"),
    file: UploadFile = File(..., description="Book file to upload"),
    transformations: Optional[str] = Form(default="", description="Comma-separated transformation IDs"),
    embed: bool = Form(False, description="Whether to embed content for vector search"),
    delete_source: bool = Form(False, description="Whether to delete uploaded file after processing")
):
    """Upload a book file and process it as a source"""
    try:
        # Validate file
        if not file.filename:
            raise HTTPException(status_code=400, detail="No file provided")

        # Check file extension
        file_extension = Path(file.filename).suffix.lower()
        supported_extensions = ['.pdf', '.epub', '.txt', '.md', '.docx', '.doc', '.html', '.htm']
        if file_extension not in supported_extensions:
            raise HTTPException(
                status_code=400, 
                detail=f"Unsupported file type. Supported types: {', '.join(supported_extensions)}"
            )

        # Check if notebook exists
        notebook_exists = any(nb["id"] == notebook_id for nb in notebooks_db)
        if not notebook_exists:
            raise HTTPException(
                status_code=404, 
                detail=f"Notebook with ID '{notebook_id}' not found. Please create a notebook first or use a valid notebook ID."
            )

        # Save the uploaded file
        uploads_dir = os.path.join(os.getcwd(), "data", "uploads")
        os.makedirs(uploads_dir, exist_ok=True)
        
        file_path = os.path.join(uploads_dir, file.filename)
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)

        # Create source record
        source_id = f"source:{len(sources_db) + 1}"
        source = {
            "id": source_id,
            "title": title or file.filename,
            "topics": ["book", "upload"],
            "asset": {
                "file_path": file_path,
                "url": None
            },
            "full_text": f"Mock content for {file.filename}",
            "embedded_chunks": 0,
            "created": "2024-01-01T00:00:00Z",
            "updated": "2024-01-01T00:00:00Z"
        }
        sources_db.append(source)

        # Return success response
        return {
            "id": source_id,
            "title": source["title"],
            "topics": source["topics"],
            "asset": source["asset"],
            "full_text": source["full_text"],
            "embedded_chunks": source["embedded_chunks"],
            "created": source["created"],
            "updated": source["updated"],
            "message": "Book uploaded and processed successfully"
        }

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading book: {str(e)}")

@app.get("/api/books/{book_id}")
async def get_book(book_id: str):
    """Get a specific book by ID"""
    source = next((s for s in sources_db if s["id"] == book_id), None)
    if not source:
        raise HTTPException(status_code=404, detail="Book not found")
    
    return source

# Add /api/sources endpoint for compatibility with existing frontend
@app.post("/api/sources")
async def upload_source(
    notebook_id: str = Form(..., description="Notebook ID to add the source to"),
    title: Optional[str] = Form(None, description="Source title"),
    file: UploadFile = File(..., description="Source file to upload"),
    transformations: Optional[str] = Form(default="", description="Comma-separated transformation IDs"),
    embed: bool = Form(False, description="Whether to embed content for vector search"),
    delete_source: bool = Form(False, description="Whether to delete uploaded file after processing")
):
    """Upload a source file (alias for /api/books for compatibility)"""
    # This is just an alias that calls the same logic as /api/books
    return await upload_book(notebook_id, title, file, transformations, embed, delete_source)

if __name__ == "__main__":
    print("🚀 Starting Simple API Server for Book Upload Testing")
    print("📚 This server simulates the Open Notebook API without dependencies")
    print("🌐 Server will be available at: http://localhost:5055")
    print("📖 Test page: http://localhost:5055/test_book_upload_fix.html")
    print("🔧 API docs: http://localhost:5055/docs")
    
    uvicorn.run(app, host="127.0.0.1", port=5055)
