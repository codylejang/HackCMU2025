#!/usr/bin/env python3
"""
Script to populate default models in the database based on available API keys
"""
import asyncio
import os
from open_notebook.database.repository import db_connection
from open_notebook.domain.models import Model, DefaultModels

async def populate_models():
    """Populate default models based on available API keys"""
    
    # Check which API keys are available
    openai_key = os.getenv("OPENAI_API_KEY")
    openrouter_key = os.getenv("OPENROUTER_API_KEY")
    
    models_to_create = []
    
    if openai_key:
        print("✅ OpenAI API key found - adding OpenAI models")
        models_to_create.extend([
            {
                "name": "gpt-4o-mini",
                "provider": "openai",
                "type": "language"
            },
            {
                "name": "gpt-4o",
                "provider": "openai", 
                "type": "language"
            },
            {
                "name": "text-embedding-3-small",
                "provider": "openai",
                "type": "embedding"
            },
            {
                "name": "tts-1",
                "provider": "openai",
                "type": "text_to_speech"
            }
        ])
    
    if openrouter_key:
        print("✅ OpenRouter API key found - adding OpenRouter models")
        models_to_create.extend([
            {
                "name": "anthropic/claude-3-5-sonnet-20241022",
                "provider": "openrouter",
                "type": "language"
            },
            {
                "name": "google/gemini-pro-1.5",
                "provider": "openrouter",
                "type": "language"
            },
            {
                "name": "mistralai/mistral-7b-instruct",
                "provider": "openrouter",
                "type": "language"
            }
        ])
    
    if not models_to_create:
        print("❌ No API keys found in .env file")
        return
    
    async with db_connection() as connection:
        print(f"Creating {len(models_to_create)} models...")
        
        for model_data in models_to_create:
            try:
                # Check if model already exists
                existing = await connection.query(
                    "SELECT * FROM model WHERE name = $name AND provider = $provider AND type = $type",
                    model_data
                )
                
                if existing:
                    print(f"  ⚠️  Model {model_data['name']} ({model_data['provider']}) already exists")
                    continue
                
                # Create the model
                model = Model(**model_data)
                await model.save()
                print(f"  ✅ Created model: {model_data['name']} ({model_data['provider']}) - {model_data['type']}")
                
            except Exception as e:
                print(f"  ❌ Failed to create model {model_data['name']}: {e}")
        
        # Set default models if none are set
        try:
            defaults = await DefaultModels.get_instance()
            
            if not defaults.default_chat_model and models_to_create:
                # Find the first language model
                language_models = [m for m in models_to_create if m["type"] == "language"]
                if language_models:
                    defaults.default_chat_model = language_models[0]["name"]
                    await defaults.save()
                    print(f"  ✅ Set default chat model: {defaults.default_chat_model}")
            
            if not defaults.default_embedding_model:
                # Find the first embedding model
                embedding_models = [m for m in models_to_create if m["type"] == "embedding"]
                if embedding_models:
                    defaults.default_embedding_model = embedding_models[0]["name"]
                    await defaults.save()
                    print(f"  ✅ Set default embedding model: {defaults.default_embedding_model}")
                    
        except Exception as e:
            print(f"  ❌ Failed to set default models: {e}")
    
    print("✅ Model population complete!")

if __name__ == "__main__":
    asyncio.run(populate_models())
