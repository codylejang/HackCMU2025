#!/bin/bash

# Full Stack Startup Script for E-Book Reader
# This script starts both the backend API and frontend development server

echo "🎉 Starting Full Stack E-Book Reader Application"
echo "================================================"

# Get the script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$SCRIPT_DIR/backend"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

echo "📁 Project root: $SCRIPT_DIR"
echo "🔧 Backend directory: $BACKEND_DIR"
echo "🎨 Frontend directory: $FRONTEND_DIR"
echo ""

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "✅ Backend server stopped"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "✅ Frontend server stopped"
    fi
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server
echo "🚀 Starting Backend API Server..."
cd "$BACKEND_DIR"
echo "📁 Backend working directory: $(pwd)"
python3 start_backend.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Check if backend is running
if kill -0 $BACKEND_PID 2>/dev/null; then
    echo "✅ Backend server started (PID: $BACKEND_PID)"
else
    echo "❌ Failed to start backend server"
    exit 1
fi

# Start frontend server
echo "🎨 Starting Frontend Development Server..."
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 5

# Check if frontend is running
if kill -0 $FRONTEND_PID 2>/dev/null; then
    echo "✅ Frontend server started (PID: $FRONTEND_PID)"
else
    echo "❌ Failed to start frontend server"
    cleanup
    exit 1
fi

echo ""
echo "🎉 Full Stack Application Started Successfully!"
echo "================================================"
echo ""
echo "🌐 Frontend URLs:"
echo "  - Original (Local API): http://localhost:3000"
echo "  - Backend Connected:    http://localhost:3000/backend"
echo ""
echo "🔧 Backend URLs:"
echo "  - API Server:           http://localhost:5055"
echo "  - API Documentation:    http://localhost:5055/docs"
echo "  - Health Check:         http://localhost:5055/health"
echo ""
echo "📋 Available Endpoints:"
echo "  - GET  /api/notebooks     - List all notebooks"
echo "  - POST /api/notebooks     - Create new notebook"
echo "  - POST /api/sources       - Upload book/source"
echo "  - POST /api/books         - Upload book (alternative)"
echo ""
echo "🔧 Backend Features:"
echo "  - Automatic notebook creation"
echo "  - File upload handling"
echo "  - Mock responses for testing"
echo ""
echo "🎨 Frontend Features:"
echo "  - Book upload with automatic notebook creation"
echo "  - Real-time backend connection status"
echo "  - Error handling and retry functionality"
echo ""
echo "⏹️  Press Ctrl+C to stop all servers"
echo ""

# Wait for user to stop
wait
