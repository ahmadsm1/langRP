'use client'

import Image from "next/image";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import * as React from "react";

async function fetchHello(): Promise<string | null> {
  try {
    const response = await fetch("http://localhost:8000/");
    if (!response.ok){
      throw new Error("Network response error");
    }
    const data = await response.text();
    return data;
    
  } catch (error) {
    console.log("Error bro:", error);
    return null;
  }
}

export default function Home() {

  const handleClick = async () => {
    const data = await fetchHello();
    console.log(data);
    if (data){
      toast("Message received:", {
        description: data,
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  }

  return (
    <main>
      Hello, world!
      <div>
        <Button onClick={handleClick}>
          Show Toast
        </Button>
      </div>
    </main>
  );
}
