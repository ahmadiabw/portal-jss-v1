
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-6 h-6 border-2 border-red-500 rounded-full pointer-events-none z-[9999] hidden md:block"
      animate={{ x: pos.x - 12, y: pos.y - 12 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
    />
  );
};
export default CustomCursor;
