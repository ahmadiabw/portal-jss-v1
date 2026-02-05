
import React from 'react';
import { motion } from 'framer-motion';

const GradientText = ({ text, className = '', theme = 'dark' }) => {
  const isDark = theme === 'dark';
  return (
    <span className={`font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-red-500 to-white ${className}`}>
      {text}
    </span>
  );
};
export default GradientText;
