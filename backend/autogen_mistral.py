import os
import asyncio
from autogen_agentchat.agents import AssistantAgent
from autogen_ext.models.semantic_kernel import SKChatCompletionAdapter
from autogen_agentchat.conditions import TextMentionTermination, MaxMessageTermination
from autogen_agentchat.teams import RoundRobinGroupChat
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

primary_agent = AssistantAgent(
    name = "cathy",
    model_client=mistral_model_client, 
    system_message="Your name is Cathy and you love the color blue and are very vocal about it.",
)

critic_agent = AssistantAgent(
    name = "joe",
    model_client=mistral_model_client, 
    system_message="Your name is Joe and you do not like the color blue and are very vocal about it.",
)

text_termination = MaxMessageTermination(max_messages=5)

team = RoundRobinGroupChat([primary_agent, critic_agent], termination_condition=text_termination)

async def main():
    result =  await team.run(task="What do you think about the color blue?")
    print(result)

if __name__ == "__main__":
    asyncio.run(main())