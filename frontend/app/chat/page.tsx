'use client';

import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { CornerDownLeft} from "lucide-react";
import { useEffect, useState } from 'react';
import { usePrompt } from "../context/PromptContext";
import { fetchLLMResponse } from "@/utils/fetchLLMResponse";
import { remark } from 'remark';
import html from 'remark-html';

const MessageContent = ({ message }: { message: string }) => {
  const [htmlMessage, setHtmlMessage] = useState<string>('');

  useEffect(() => {
    const mdToHtml = async () => {
      const result = await remark().use(html).process(message);
      setHtmlMessage(result.toString().trim());
    };
    mdToHtml();
  }, [message]);

  return <div dangerouslySetInnerHTML={{ __html: htmlMessage }} />;
};

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

  const isAnyMessageLoading = messages.some(message => message.isLoading);
  
  const handleSendMessage = async (message: string) => {
    // Write a chat for the user's message
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        message: message,
        sender: 'user',
      }
    ]);

    // Loading state while waiting for the AI's response
    setMessages(prevMessages => [
      ...prevMessages,
      {
        id: prevMessages.length + 1,
        message: '',
        sender: 'bot',
        isLoading: true,
      }
    ]);

    // Write a chat for the AI's message
    const response = await fetchLLMResponse(message);
    if (response) {
      setMessages(prevMessages => {
        const newMessages = [...prevMessages];

          // Replace message and set isLoading to false
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            message: response,
            isLoading: false,
              };

        return newMessages;
      });
    }
  };

  useEffect(() => {
    const initializeChat = async () => {
      if (prompt) {
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
            <ChatBubbleMessage 
              isLoading={message.isLoading} 
              data-testid="chat-bubble-message"
              data-loading={message.isLoading}
            >
              <MessageContent message={message.message} />
            </ChatBubbleMessage>
          </ChatBubble>
        )
      })}
    <form onSubmit={(e) => {
      e.preventDefault();
      const userMessage = ((e.target as HTMLFormElement).elements[0] as HTMLInputElement).value;
      handleSendMessage(userMessage);
      (e.target as HTMLFormElement).reset();
      }} className="rounded-lg border border-white/40 bg-background">
      <ChatInput
        placeholder="Type your message here..."
        className="min-h-12 resize-none rounded-lg border-0 p-3 shadow-none focus-visible:ring-0 border-white"
        disabled={isAnyMessageLoading}
      />
      <div className="flex items-center p-3 pt-0">
        <Button size="sm" className="ml-auto gap-1.5" disabled={isAnyMessageLoading}>
          Send Message
          <CornerDownLeft className="size-3.5" />
        </Button>
      </div>
    </form>
    </ChatMessageList>
  )
}
