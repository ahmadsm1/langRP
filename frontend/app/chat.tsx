'use client';

import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { CornerDownLeft} from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import { fetchLLMResponse } from "@/utils/fetchLLMResponse";
import { remark } from 'remark';
import html from 'remark-html';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

interface ChatProps {
  prompt: string;
  onExit: () => void;
}

export default function Chat({ prompt, onExit }: ChatProps) {
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
  const lastMessageRef = useRef<HTMLDivElement>(null);
  
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
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

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
    <div>
      <div className="flex justify-end mb-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" data-testid="exit-chat-button">Exit</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Exit Chat</AlertDialogTitle>
              <AlertDialogDescription>Are you sure you want to exit the chat?</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onExit} data-testid="continue-exit-button">Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="w-[80vw] max-w-3xl border border-white/40 rounded-lg overflow-y-auto h-[50vh]">
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
          <div ref={lastMessageRef} />
        </ChatMessageList>
      </div>
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
    </div>
  )
}
