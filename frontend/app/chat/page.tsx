'use client';

import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { Button } from "@/components/ui/button";
import { CornerDownLeft} from "lucide-react";

export default function ChatPage() {
  const messages = [
    {
      id: 1,
      message: 'Hello, how has your day been? I hope you are doing well.',
      sender: 'user',
    },
    {
      id: 2,
      message: 'Hi, I am doing well, thank you for asking. How can I help you today?',
      sender: 'bot',
    },
    {
      id: 3,
      message: '',
      sender: 'bot',
      isLoading: true,
    },
  ];

  return (
    <ChatMessageList>
      {messages.map((message, index) => {
        const variant = message.sender === 'user' ? 'sent' : 'received';
        return (
          <ChatBubble key={message.id} variant={variant}>
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
