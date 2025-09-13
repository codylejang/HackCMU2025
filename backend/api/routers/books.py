"""
Books API router for handling book uploads.
"""

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from loguru import logger
from typing import Optional, List
import os
import tempfile
from pathlib import Path

from api.models import BookUploadRequest, BookUploadResponse, SourceResponse

router = APIRouter()


@router.post("/books", response_model=BookUploadResponse)
async def upload_book(
    notebook_id: str = Form(..., description="Notebook ID to add the book to"),
    title: Optional[str] = Form(None, description="Book title"),
    file: UploadFile = File(..., description="Book file to upload"),
    transformations: Optional[str] = Form(default="", description="Comma-separated transformation IDs"),
    embed: bool = Form(False, description="Whether to embed content for vector search"),
    delete_source: bool = Form(False, description="Whether to delete uploaded file after processing")
):
    """Upload a book file and process it as a source."""
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

        # Create uploads directory if it doesn't exist
        uploads_dir = os.path.join(os.getcwd(), "data", "uploads")
        os.makedirs(uploads_dir, exist_ok=True)

        # Generate unique filename
        base_name = Path(file.filename).stem
        counter = 0
        new_filename = file.filename
        while os.path.exists(os.path.join(uploads_dir, new_filename)):
            counter += 1
            new_filename = f"{base_name}_{counter}{file_extension}"

        file_path = os.path.join(uploads_dir, new_filename)

        # Save the uploaded file
        try:
            with open(file_path, "wb") as buffer:
                content = await file.read()
                buffer.write(content)
        except Exception as e:
            logger.error(f"Error saving uploaded file: {str(e)}")
            raise HTTPException(status_code=500, detail="Error saving uploaded file")

        # For now, return a mock response to test the endpoint
        # This will be replaced with actual implementation once dependencies are resolved
        
        return BookUploadResponse(
            id="source:mock123",
            title=title or file.filename,
            topics=["book", "upload"],
            asset=None,
            full_text=f"Mock content for {file.filename}",
            embedded_chunks=0,
            created="2024-01-01T00:00:00Z",
            updated="2024-01-01T00:00:00Z",
            message="Book upload endpoint is working! (Mock response - dependencies need to be resolved)"
        )

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error uploading book: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error uploading book: {str(e)}")


@router.get("/books/{book_id}", response_model=SourceResponse)
async def get_book(book_id: str):
    """Get a specific book by ID (alias for source)."""
    try:
        # Mock response for testing
        return SourceResponse(
            id=book_id,
            title="Mock Book",
            topics=["book", "mock"],
            asset=None,
            full_text="Mock book content",
            embedded_chunks=0,
            created="2024-01-01T00:00:00Z",
            updated="2024-01-01T00:00:00Z",
        )
    except Exception as e:
        logger.error(f"Error fetching book: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching book: {str(e)}")