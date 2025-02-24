import os
import asyncio
from autogen_core.models import UserMessage
from autogen_ext.models.semantic_kernel import SKChatCompletionAdapter
from semantic_kernel import Kernel
from semantic_kernel.connectors.ai.mistral_ai import MistralAIChatCompletion, MistralAIChatPromptExecutionSettings
from semantic_kernel.memory.null_memory import NullMemory

sk_client = MistralAIChatCompletion(
    ai_model_id="mistral-large-latest",
    api_key=os.environ["MISTRAL_API_KEY"],
)
settings = MistralAIChatPromptExecutionSettings(
    temperature=0.2,
)

mistral_model_client = SKChatCompletionAdapter(
    sk_client, kernel=Kernel(memory=NullMemory()), prompt_settings=settings
)

# Call the model directly.
async def fetch_model_result(message):
    model_result = await mistral_model_client.create(
        messages=[UserMessage(content=message, source="User")]
    )
    print(model_result)

async def main():
    result = await fetch_model_result("What is the capital of France?")
    print(result)

if __name__ == "__main__":
    asyncio.run(main())