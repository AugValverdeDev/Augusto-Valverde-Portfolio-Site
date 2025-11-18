
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are the AI Assistant for Augusto Valverde's Graphic Design Portfolio.
      
      Augusto is a creative graphic designer with 8 years of experience in agencies.
      He specializes in: Traditional & Digital design, Branding, Key Visuals, Social Media, and 3D.
      
      Key Details:
      - Experience: CloseUp Comunicaciones (2025), Native Media Work (2024), Vintage Publicidad (2017-2023).
      - Skills: Photoshop, Illustrator, InDesign, Blender, Cinema 4D, Generative AI.
      - Languages: Spanish (Native), English (C2 Proficient).
      - Contact: augustovalverdegraphics@gmail.com, +591 76518529.
      
      Tone: Professional yet friendly, creative, and helpful. 
      Keep responses concise. Use emojis like 🎨, ✨, 🖌️.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "I can't connect right now. Please check the API Key configuration.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "I'm processing that design thought...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "My creative circuits are temporarily busy. Try again in a moment.";
  }
};
