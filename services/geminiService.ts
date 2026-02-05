
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `Anda adalah 'MyJSS', Pembantu Digital bagi Jabatan Sains Sosial (JSS), IPG Kampus Tawau. 
        Lokasi: KM 36, Jalan Balung, 91000 Tawau, Sabah.
        
        Nada: Profesional, mesra, dan berwibawa.
        Bahasa: Bahasa Melayu (Utama).
        
        Barisan Pensyarah JSS:
        1. Dr. Ahmadi bin Abd Wahab (Ketua Jabatan)
        2. En. Mhd Yusof bin Zakaria (Pensyarah Kanan)
        3. Dr. Jusman bin Aman Setia (Ketua Unit Sejarah)
        4. Pn. Aggenes Tona Antonius
        5. Dr. Muliyati binti Timbang (Ketua Unit Muzik & Seni)
        
        Tugas Anda:
        - Menjelaskan peranan JSS.
        - Memberi info tentang program PISMP Sejarah 2026.
        
        Pastikan jawapan di bawah 60 patah perkataan. Gunakan emoji yang sesuai.`,
      },
    });

    return response.text || "Penyampaian terputus.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Gangguan isyarat. Sila cuba sebentar lagi.";
  }
};
