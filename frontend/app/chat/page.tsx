'use client';

import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { CornerDownLeft} from "lucide-react";
import { useEffect, useState } from 'react';
import { usePrompt } from "../context/PromptContext";

async function fetchLLMResponse(prompt:string): Promise<string | null> {
  try {
    const response = await fetch("http://localhost:8000/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({prompt: prompt})
    });
    if (!response.ok){
      throw new Error("Network response error");
    }
    const data = await response.json();
    return data.response;
    
  } catch (error) {
    console.log("Error bro:", error);
    return null;
  }
}

export default function ChatPage() {
  const { prompt } = usePrompt();

  interface ChatMessageType {
    id: number;
    message: string;
    sender: 'user' | 'bot';
    isLoading?: boolean;
  }

  const [messages, setMessages] = useState<ChatMessageType[]>([{
    id: 1,
    message: '',
    sender: 'bot',
    isLoading: true,
  }]);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const initializeChat = async () => {
      if (prompt) {
        setIsLoading(true);
        const response = await fetchLLMResponse(prompt);
        if (response) {
          console.log(response);
          setMessages([
            {
              id: 1,
              message: response,
              sender: 'bot',
            }
          ]);
        }
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [prompt]);


  return (
    <ChatMessageList>
      {messages.map((message, index) => {
        const variant = message.sender === 'user' ? 'sent' : 'received';
        return (
          <ChatBubble key={index} variant={variant}>
            <ChatBubbleAvatar fallback={variant === 'sent' ? 'Me' : 'AI'} />
            <ChatBubbleMessage isLoading={message.isLoading}>
              {message.message}
            </ChatBubbleMessage>
          </ChatBubble>
        )
      })}
    <form className="rounded-lg border bg-background">
      <ChatInput
        placeholder="Type your message here..."
        className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
      />
      <div className="flex items-center p-3 pt-0">
        <Button size="sm" className="ml-auto gap-1.5">
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
    </ChatMessageList>
  )
}
