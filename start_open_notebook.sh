#!/bin/bash

# Open Notebook Startup Script
# Starts all services and stops everything on Ctrl+C

echo "🚀 Starting Open Notebook..."

# Get script directory and navigate to open-notebook folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/open-notebook"

# Create logs directory
mkdir -p "$SCRIPT_DIR/logs"

# Store process IDs for cleanup
SURREAL_PID=""
API_PID=""
WORKER_PID=""
STREAMLIT_PID=""

# Cleanup function
cleanup() {
    echo ""
    echo "🛑 Stopping all services..."
    
    [ ! -z "$STREAMLIT_PID" ] && kill $STREAMLIT_PID 2>/dev/null
    [ ! -z "$WORKER_PID" ] && kill $WORKER_PID 2>/dev/null
    [ ! -z "$API_PID" ] && kill $API_PID 2>/dev/null
    [ ! -z "$SURREAL_PID" ] && kill $SURREAL_PID 2>/dev/null
    
    # Force kill any remaining processes
    pkill -f "surreal start" 2>/dev/null
    pkill -f "run_api.py" 2>/dev/null
    pkill -f "surreal-commands-worker" 2>/dev/null
    pkill -f "streamlit run app_home.py" 2>/dev/null
    
    echo "✅ All services stopped"
    exit 0
}

# Set up Ctrl+C handler
trap cleanup SIGINT SIGTERM

# Activate conda environment
eval "$(conda shell.bash hook)"
conda activate open-notebook

# Start services with output redirected to log files
echo "Starting SurrealDB..."
surreal start --allow-all --bind 0.0.0.0:8000 --user root --pass root memory > "$SCRIPT_DIR/logs/surreal.log" 2>&1 &
SURREAL_PID=$!
sleep 3

echo "Starting API Backend..."
uv run run_api.py > "$SCRIPT_DIR/logs/api.log" 2>&1 &
API_PID=$!
sleep 3

echo "Starting Background Worker..."
uv run --env-file .env surreal-commands-worker --import-modules commands > "$SCRIPT_DIR/logs/worker.log" 2>&1 &
WORKER_PID=$!
sleep 2

echo "Starting Streamlit UI..."
uv run --env-file .env streamlit run app_home.py > "$SCRIPT_DIR/logs/streamlit.log" 2>&1 &
STREAMLIT_PID=$!
sleep 5

echo ""
echo "✅ Open Notebook started successfully!"
echo "🌐 Access at: http://localhost:8502"
echo "🔧 API Docs: http://localhost:5055/docs"
echo ""
echo "📁 Log files:"
echo "  - SurrealDB:      $SCRIPT_DIR/logs/surreal.log"
echo "  - API Backend:    $SCRIPT_DIR/logs/api.log"
echo "  - Worker:         $SCRIPT_DIR/logs/worker.log"
echo "  - Streamlit UI:   $SCRIPT_DIR/logs/streamlit.log"
echo ""
echo "📋 View logs in real-time:"
echo "  tail -f $SCRIPT_DIR/logs/api.log"
echo "  tail -f $SCRIPT_DIR/logs/streamlit.log"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Keep script running and monitor processes
while true; do
    sleep 5
    
    # Check if any process died
    if ! kill -0 $SURREAL_PID 2>/dev/null; then
        echo "❌ SurrealDB stopped unexpectedly"
        cleanup
        exit 1
    fi
    
    if ! kill -0 $API_PID 2>/dev/null; then
        echo "❌ API Backend stopped unexpectedly"
        cleanup
        exit 1
    fi
    
    if ! kill -0 $WORKER_PID 2>/dev/null; then
        echo "❌ Background Worker stopped unexpectedly"
        cleanup
        exit 1
    fi
    
    if ! kill -0 $STREAMLIT_PID 2>/dev/null; then
        echo "❌ Streamlit UI stopped unexpectedly"
        cleanup
        exit 1
    fi
done