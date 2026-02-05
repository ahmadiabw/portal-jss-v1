
import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground = ({ theme = 'dark' }) => {
  const isDark = theme === 'dark';
  return (
    <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-0 w-[80%] h-[80%] bg-blue-900/20 blur-[100px] rounded-full"
      />
    </div>
  );
};
export default FluidBackground;
