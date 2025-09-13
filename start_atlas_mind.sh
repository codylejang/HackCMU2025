#!/bin/bash

# Open Notebook Startup Script
# Starts all services and stops everything on Ctrl+C

echo "🚀 Starting Open Notebook..."

# Get script directory and navigate to open-notebook folder
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/open-notebook"

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

# Start services
echo "Starting SurrealDB..."
surreal start --allow-all --bind 0.0.0.0:8000 --user root --pass root memory > /dev/null 2>&1 &
SURREAL_PID=$!
sleep 1

echo "Starting API Backend..."
uv run run_api.py > /dev/null 2>&1 &
API_PID=$!
sleep 1

echo "Starting Background Worker..."
uv run --env-file .env surreal-commands-worker --import-modules commands > /dev/null 2>&1 &
WORKER_PID=$!
sleep 1

echo "Starting Streamlit UI..."
uv run --env-file .env streamlit run app_home.py > /dev/null 2>&1 &
STREAMLIT_PID=$!
sleep 1

echo ""
echo "✅ Open Notebook started successfully!"
echo "🌐 Access at: http://localhost:8502"
echo "🔧 API Docs: http://localhost:5055/docs"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Keep script running and monitor processes
while true; do
    sleep 1
    
    # Check if any process died
    if ! kill -0 $SURREAL_PID 2>/dev/null || \
       ! kill -0 $API_PID 2>/dev/null || \
       ! kill -0 $WORKER_PID 2>/dev/null || \
       ! kill -0 $STREAMLIT_PID 2>/dev/null; then
        echo "❌ One or more services stopped unexpectedly"
        cleanup
        exit 1
    fi
done
