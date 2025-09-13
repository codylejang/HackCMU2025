#!/usr/bin/env python3
"""
Setup minimal test models for the chunk ask functionality to work.
"""
import asyncio
import sys
from pathlib import Path

# Add the current directory to Python path so imports work
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

from open_notebook.database.repository import db_connection
from open_notebook.domain.models import Model, DefaultModels

async def setup_test_models():
    """Setup minimal test models for testing."""

    test_models = [
        {
            "name": "openrouter/sonoma-dusk-alpha",
            "provider": "openrouter",
            "type": "language"
        },
        {
            "name": "test-embedding-model",
            "provider": "openai",
            "type": "embedding"
        }
    ]

    async with db_connection() as connection:
        print(f"Creating {len(test_models)} test models...")

        for model_data in test_models:
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

        # Set default models using actual model IDs from database
        try:
            # Get the created models by querying the database
            language_models = await connection.query(
                "SELECT * FROM model WHERE type = 'language'"
            )
            embedding_models = await connection.query(
                "SELECT * FROM model WHERE type = 'embedding'"
            )

            if language_models and embedding_models:
                defaults = await DefaultModels.get_instance()

                # Use the actual model ID from database (convert to string)
                chat_model_id = str(language_models[0]['id'])
                embedding_model_id = str(embedding_models[0]['id'])

                # Set default models using the database IDs
                defaults.default_chat_model = chat_model_id
                defaults.default_embedding_model = embedding_model_id

                # Save using the record model's update method
                await defaults.update()
                print(f"  ✅ Set default chat model: {chat_model_id}")
                print(f"  ✅ Set default embedding model: {embedding_model_id}")
            else:
                print("  ⚠️  Could not find created models to set as defaults")

        except Exception as e:
            print(f"  ❌ Failed to set default models: {e}")
            import traceback
            traceback.print_exc()

    print("✅ Test model setup complete!")

if __name__ == "__main__":
    asyncio.run(setup_test_models())