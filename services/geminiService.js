
import { GoogleGenAI } from "@google/genai";

export const sendMessageToGemini = async (message) => {
  try {
    const apiKey = process.env.API_KEY || '';
    if (!apiKey) return "Sistem AI sedang berehat (API Key tiada).";
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: "Anda adalah pembantu MyJSS di IPGKT.",
      },
    });
    return response.text;
  } catch (error) {
    return "Ralat sambungan AI.";
  }
};
