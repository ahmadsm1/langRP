'use client'

import { CardWithForm } from "./menu_card";
import Chat from "./chat";
import localFont from 'next/font/local'
import { useState } from 'react';

const specialFont = localFont({
  src: '../public/fonts/Noe-Display-Bold.ttf',
  display: 'swap',
})

export default function Home() {
  const [showChat, setShowChat] = useState(false);
  const [prompt, setPrompt] = useState("");

  const handlePromptReceived = (prompt: string) => {
    setPrompt(prompt);
    setShowChat(true);
  };

  return (
    <main>
      <div className="flex h-screen justify-center items-center">
        <div className="text-center flex flex-col items-center space-y-4">
          <div className="space-y-2">
            <div className={`${specialFont.className} text-5xl font-bold`}>
              langRP
            </div>
            <div>
              Practice your language skills through natural conversations
            </div> 
          </div>
        {!showChat ? (
          <CardWithForm onPromptReceived={handlePromptReceived}/>
        ): (
            <Chat prompt={prompt}/>
        )}
        </div>
      </div>
    </main>
  );
}
