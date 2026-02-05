
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Headset } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService.js';

const AIChat = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Selamat sejahtera! Saya MyJSS AI. Ada apa yang boleh saya bantu?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    const response = await sendMessageToGemini(input);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} className="mb-4 w-80 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="p-4 bg-blue-900 flex justify-between">
              <span className="text-xs font-bold text-white">MYJSS AI</span>
              <button onClick={() => setIsOpen(false)}><X size={16} className="text-white"/></button>
            </div>
            <div className="h-64 p-4 overflow-y-auto space-y-2 text-xs">
              {messages.map((m, i) => (
                <div key={i} className={`p-2 rounded-lg ${m.role==='user'?'bg-blue-600 ml-10':'bg-white/10 mr-10'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/10 flex gap-2">
              <input value={input} onChange={e=>setInput(e.target.value)} className="bg-transparent flex-1 text-xs outline-none" placeholder="Tanya sesuatu..."/>
              <button onClick={handleSend}><Send size={14}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center shadow-xl">
        <Headset className="text-white"/>
      </button>
    </div>
  );
};
export default AIChat;
