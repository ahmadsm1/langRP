export async function fetchLLMResponse(prompt:string): Promise<string | null> {
    const URL = process.env.LOCAL === 'true' ? "http://localhost:8000" : "https://langrp.onrender.com";
    try {
      const response = await fetch(URL, {
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