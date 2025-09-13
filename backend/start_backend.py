#!/usr/bin/env python3
"""
Backend startup script for Open Notebook API
This script starts the Open Notebook API server with proper configuration
"""

import os
import sys
import subprocess
import time
from pathlib import Path

def main():
    """Start the Open Notebook API backend server"""
    
    # Change to backend directory
    backend_dir = Path(__file__).parent
    os.chdir(backend_dir)
    
    print("🚀 Starting Open Notebook API Backend...")
    print(f"📁 Working directory: {backend_dir}")
    
    # Check if we're in the right directory
    if not (backend_dir / "api").exists():
        print("❌ Error: API directory not found. Make sure you're in the backend directory.")
        sys.exit(1)
    
    # Set environment variables
    env = os.environ.copy()
    env["PYTHONPATH"] = str(backend_dir)
    
    # Try to start the simple API server first (for testing)
    print("🔧 Starting Simple API Server for testing...")
    
    try:
        # Start the simple API server
        print(f"🔧 Running from directory: {backend_dir}")
        print(f"🐍 Using Python: {sys.executable}")
        process = subprocess.Popen([
            sys.executable, "simple_api_server.py"
        ], env=env, cwd=backend_dir)
        
        print("✅ Simple API Server started successfully!")
        print("🌐 Server URL: http://localhost:5055")
        print("📚 API Documentation: http://localhost:5055/docs")
        print("🔍 Health Check: http://localhost:5055/health")
        print("\n📋 Available endpoints:")
        print("  - GET  /api/notebooks     - List all notebooks")
        print("  - POST /api/notebooks     - Create new notebook")
        print("  - POST /api/sources       - Upload book/source")
        print("  - POST /api/books         - Upload book (alternative)")
        print("\n⏹️  Press Ctrl+C to stop the server")
        
        # Wait for the process
        process.wait()
        
    except KeyboardInterrupt:
        print("\n🛑 Stopping server...")
        process.terminate()
        process.wait()
        print("✅ Server stopped successfully!")
        
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
