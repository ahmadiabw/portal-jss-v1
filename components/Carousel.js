
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDES = [
  { id: 1, image: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Carousel/penanda%20aras%201.jpg?raw=true', title: 'Penanda Aras Strategik' },
  { id: 2, image: 'https://github.com/ahmadiabw/portal-jss/blob/main/aset/Carousel/Sekolah%20Pengajar%201.jpg?raw=true', title: 'Sekolah Pengajar' },
];

const Carousel = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex(p => (p+1)%SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="h-96 relative overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.img 
          key={index}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          src={SLIDES[index].image} 
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h2 className="text-3xl font-heading text-white">{SLIDES[index].title}</h2>
      </div>
    </div>
  );
};
export default Carousel;
