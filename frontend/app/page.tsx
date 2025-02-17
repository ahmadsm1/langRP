'use client'

import { CardWithForm } from "./menu_card";
import localFont from 'next/font/local'

const specialFont = localFont({
  src: '../public/fonts/Noe-Display-Bold.ttf',
  display: 'swap',
})

export default function Home() {


  return (
    <main>
      <div className="flex h-screen justify-center items-center">
        <div className="text-center flex flex-col items-center space-y-4">
          <div className={`${specialFont.className} text-5xl font-bold`}>
        langRP
          </div>
          <div>
        Practice your language skills through natural conversations
          </div>
          <CardWithForm />
        </div>
      </div>
    </main>
  );
}
