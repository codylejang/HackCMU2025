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

## Installation Guide

### Prerequisites

Before setting up Open Notebook, ensure you have:
- **Python 3.11+** (recommended: 3.11.13)
- **Conda** (Anaconda or Miniconda)
- **Node.js 18+** (for frontend components if applicable)
- **Git**

### System Dependencies

Install required system tools:
```bash
# Install SurrealDB
brew install surrealdb

# Install UV package manager
brew install uv

# Install Git (if not already installed)
brew install git
```

### Environment Setup

#### Method 1: Using Exported Environment (Recommended)

```bash
# 1. Clone the repository
git clone https://github.com/lfnovo/open-notebook
cd open-notebook

# 2. Create conda environment from exported file
conda env create -f environment.yml

# 3. Activate the environment
conda activate open-notebook
```

#### Method 2: Manual Environment Creation

```bash
# 1. Clone the repository
git clone https://github.com/lfnovo/open-notebook
cd open-notebook

# 2. Create conda environment with Python 3.11
conda create -n open-notebook python=3.11.13

# 3. Activate the environment
conda activate open-notebook

# 4. Install the package and dependencies
pip install -e .
```

#### Method 3: Quick Activation (if environment already exists)

```bash
# Activate existing conda environment
source ~/.bash_profile && conda activate open-notebook
```

### Environment Configuration

1. **Create .env file** (copy from .env.example):
```bash
cp .env.example .env
```

2. **Configure essential environment variables**:
```bash
# Edit .env file with your preferred editor
nano .env

# Required configurations:
SURREAL_URL="ws://localhost:8000/rpc"
SURREAL_USER="root"
SURREAL_PASSWORD="root"
SURREAL_NAMESPACE="open_notebook"
SURREAL_DATABASE="staging"

# Add your AI provider API keys:
OPENROUTER_API_KEY="your-openrouter-api-key"
# or
OPENAI_API_KEY="your-openai-api-key"
# or other provider keys...
```

### Verify Installation

```bash
# Check Python version
python --version  # Should show Python 3.11.x

# Check if packages are installed
python -c "import open_notebook; print('✅ Open Notebook installed successfully')"

# Check UV installation
uv --version

# Check SurrealDB installation
surreal version
```

## Setup & Usage Commands

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

### Installation Issues

1. **Conda environment creation fails**:
   ```bash
   # Solution: Update conda first
   conda update conda
   conda clean --all

   # Then retry environment creation
   conda env create -f environment.yml
   ```

2. **Package installation errors**:
   ```bash
   # Solution: Clear pip cache and reinstall
   pip cache purge
   pip install --no-cache-dir -e .
   ```

3. **SurrealDB not found**:
   ```bash
   # Solution: Install SurrealDB
   brew install surrealdb
   # or on Linux:
   curl --proto '=https' --tlsv1.2 -sSf https://install.surrealdb.com | sh
   ```

4. **UV command not found**:
   ```bash
   # Solution: Install UV
   brew install uv
   # or
   pip install uv
   ```

5. **Environment variables not loading**:
   ```bash
   # Solution: Verify .env file exists and has correct format
   ls -la .env
   cat .env | grep SURREAL_URL

   # Ensure no trailing spaces or quotes issues
   ```

### Runtime Issues

1. **Docker error with `make start-all`**:
   - Install Docker Desktop and ensure it's running
   - Alternative: Use the manual startup commands above

2. **Services not starting**: Check if ports 8000, 5055, and 8502 are available

3. **Database connection issues**:
   - Ensure SurrealDB is running: `ps aux | grep surreal`
   - Check correct URL in .env: `SURREAL_URL="ws://localhost:8000/rpc"`
   - Verify SurrealDB is accessible: `surreal sql --conn ws://localhost:8000 --user root --pass root`

4. **Worker fails to start**:
   ```bash
   # Common error: "nodename nor servname provided"
   # Solution: Fix SURREAL_URL in .env file
   SURREAL_URL="ws://localhost:8000/rpc"  # Correct
   # NOT: ws://surrealdb/rpc:8000         # Incorrect
   ```

5. **API errors**: Check the API logs and ensure all environment variables are set

6. **Missing dependencies after installation**: Rerun `pip install -e .` in the conda environment

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

## Environment Export

The repository includes an `environment.yml` file that captures the exact package versions of a working Open Notebook installation:

### Key Environment Details
- **Python Version**: 3.11.13
- **Core Package**: open-notebook==0.3.2
- **Total Dependencies**: 200+ packages including:
  - FastAPI (0.116.1) + Uvicorn (0.35.0) for API backend
  - Streamlit (1.49.1) for web UI
  - SurrealDB (1.0.6) + surreal-commands (1.1.1) for database
  - LangChain ecosystem (0.3.x) for AI integrations
  - Multiple AI provider libraries (OpenAI, Anthropic, Google, etc.)

### Regenerating Environment Export
If you make changes to the environment and want to create a new export:
```bash
# Activate the environment
conda activate open-notebook

# Export to environment.yml
conda env export -n open-notebook > environment.yml
```

### Using the Environment File
```bash
# Create identical environment on another machine
conda env create -f environment.yml

# Update existing environment
conda env update -f environment.yml
```

This ensures consistent installations across different development environments and makes it easy to reproduce the exact working setup.