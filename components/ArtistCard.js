
import React from 'react';
import { motion } from 'framer-motion';

const ArtistCard = ({ artist, onClick, theme = 'dark' }) => {
  const isDark = theme === 'dark';
  return (
    <motion.div 
      onClick={onClick}
      whileHover={{ y: -5 }}
      className="relative h-64 rounded-xl overflow-hidden cursor-pointer border"
      style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
    >
      <img src={artist.image} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black text-white">
        <div className="text-[10px] font-bold uppercase opacity-60">{artist.day}</div>
        <div className="text-xs font-black uppercase leading-tight">{artist.name}</div>
      </div>
    </motion.div>
  );
};
export default ArtistCard;
