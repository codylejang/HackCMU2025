# Open Notebook - Claude Code Setup Guide

## Project Overview

Open Notebook is an open source, privacy-focused alternative to Google's Notebook LM. It empowers you to take control of your research workflows while leveraging AI capabilities.

### Key Features
- 🔒 **Privacy-First**: Your data stays under your control - no cloud dependencies
- 🤖 **Multi-Model AI Support**: 16+ providers including OpenAI, Anthropic, Ollama, OpenRouter, and more
- 📚 **Universal Content Support**: PDFs, videos, audio, web pages, Office docs, and more
- 🎙️ **Professional Podcast Generation**: Advanced multi-speaker podcasts with Episode Profiles
- 🔍 **Intelligent Search**: Full-text and vector search across all your content
- 💬 **Context-Aware Chat**: AI conversations powered by your research materials
- 🔧 **REST API**: Full programmatic access for custom integrations

## Setup & Usage Commands

### Environment Setup
```bash
# Activate conda environment
source ~/.bash_profile && conda activate open-notebook
```

### Starting the Application

**Quick Start (Without Docker - Recommended for this setup):**
```bash
# Start all services manually (run each in separate terminals or with & for background)
source ~/.bash_profile && conda activate open-notebook

# 1. Start SurrealDB
surreal start --allow-all --bind 0.0.0.0:8000 --user root --pass root memory &

# 2. Start API Backend
uv run run_api.py &

# 3. Start Background Worker
uv run --env-file .env surreal-commands-worker --import-modules commands &

# 4. Start Streamlit UI (this will block the terminal)
uv run --env-file .env streamlit run app_home.py
```

**With Docker (requires Docker Desktop):**
```bash
make start-all
```

**Individual Components:**
```bash
# Each component separately
source ~/.bash_profile && conda activate open-notebook

# Database only
surreal start --allow-all --bind 0.0.0.0:8000 --user root --pass root memory

# API only
uv run run_api.py

# Worker only
uv run --env-file .env surreal-commands-worker --import-modules commands

# UI only
uv run --env-file .env streamlit run app_home.py
```

### Service Management
```bash
# Stop all services
make stop-all

# Check service status
make status

# Start individual components
make database    # Start only SurrealDB
make api        # Start only API
make worker     # Start only background worker
```

### Development Commands
```bash
# Run linting
make lint

# Run code formatting
make ruff

# Clean cache directories
make clean-cache
```

## Access Points

Once the application is running:
- **Main Interface**: http://localhost:8502 (Streamlit UI)
- **API Endpoint**: http://localhost:5055
- **API Documentation**: http://localhost:5055/docs (Interactive Swagger UI)

## Configuration

The application uses environment variables defined in `.env`:

### OpenRouter Configuration (Current Setup)
```bash
OPENROUTER_BASE_URL="https://openrouter.ai/api/v1"
OPENROUTER_API_KEY="your-openrouter-api-key"
```

### SurrealDB Configuration
```bash
SURREAL_URL="ws://localhost:8000/rpc"
SURREAL_USER="root"
SURREAL_PASSWORD="root"
SURREAL_NAMESPACE="open_notebook"
SURREAL_DATABASE="staging"
```

## Supported AI Providers

| Provider     | LLM Support | Embedding Support | Speech-to-Text | Text-to-Speech |
|--------------|-------------|------------------|----------------|----------------|
| OpenAI       | ✅          | ✅               | ✅             | ✅             |
| Anthropic    | ✅          | ❌               | ❌             | ❌             |
| OpenRouter   | ✅          | ❌               | ❌             | ❌             |
| Groq         | ✅          | ❌               | ✅             | ❌             |
| Google (GenAI) | ✅          | ✅               | ❌             | ✅             |
| Ollama       | ✅          | ✅               | ❌             | ❌             |
| DeepSeek     | ✅          | ❌               | ❌             | ❌             |
| Mistral      | ✅          | ✅               | ❌             | ❌             |

## Project Structure

- `app_home.py` - Main Streamlit application entry point
- `api/` - FastAPI backend implementation
- `open_notebook/` - Core application modules
- `commands/` - Background worker commands
- `pages/` - Streamlit page components
- `migrations/` - Database migration scripts
- `.env` - Environment configuration (created during setup)

## Troubleshooting

### Common Issues

1. **Docker error with `make start-all`**:
   - Install Docker Desktop and ensure it's running
   - Alternative: Use the manual startup commands above
2. **Services not starting**: Check if ports 8000, 5055, and 8502 are available
3. **Database connection issues**: Ensure SurrealDB is running on port 8000
4. **API errors**: Check the API logs and ensure all environment variables are set
5. **Missing dependencies**: Rerun `pip install -e .` in the conda environment
6. **uv command not found**: Install with `brew install uv`

### Useful Commands for Debugging
```bash
# Check running processes
ps aux | grep -E "(surreal|streamlit|uvicorn)"

# Check port usage
lsof -i :8000  # SurrealDB
lsof -i :5055  # API
lsof -i :8502  # Streamlit

# View logs
tail -f ~/.streamlit/logs/streamlit.log
```

## Getting Help

- **Discord Server**: https://discord.gg/37XJPXfz2w
- **GitHub Issues**: https://github.com/lfnovo/open-notebook/issues
- **Documentation**: https://www.open-notebook.ai
- **API Documentation**: http://localhost:5055/docs (when running)

## Current Model Configuration

**Model**: `deepseek/deepseek-chat-v3-0324:free`
**Provider**: OpenRouter
**Base URL**: `https://openrouter.ai/api/v1`

This setup provides access to DeepSeek's chat model through OpenRouter's API with the free tier.