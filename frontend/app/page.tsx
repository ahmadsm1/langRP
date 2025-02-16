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
      <div className="flex h-screen">
        <div className="m-auto">
          <div className={`${specialFont.className} text-5xl font-bold text-center`}>
                langRP
          </div>
          <CardWithForm/>
        </div>
      </div>
    </main>
  );
}
