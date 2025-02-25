import os
import asyncio
from autogen_agentchat.agents import AssistantAgent
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

agent = AssistantAgent(
    name = "geography_assistant",
    model_client=mistral_model_client, 
    system_message="You are a helpful assistant who only responds in Urdu",
)

async def main():
    result =  await agent.run(task="What is the capital of Morocco?")
    print(result)

if __name__ == "__main__":
    asyncio.run(main())