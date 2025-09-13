#!/bin/bash

# Frontend startup script for E-Book Reader
# This script starts the Next.js frontend development server

echo "🚀 Starting E-Book Reader Frontend..."
echo "📁 Working directory: $(pwd)"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the frontend directory."
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Set environment variables
export NEXT_PUBLIC_API_URL="http://localhost:5055"

echo "✅ Starting Next.js development server..."
echo "🌐 Frontend URL: http://localhost:3000"
echo "🔗 Backend API: $NEXT_PUBLIC_API_URL"
echo ""
echo "📋 Available pages:"
echo "  - http://localhost:3000              - Original frontend (local API)"
echo "  - http://localhost:3000/backend      - Backend-connected frontend"
echo ""
echo "⏹️  Press Ctrl+C to stop the server"

# Start the development server
npm run dev
