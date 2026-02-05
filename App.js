
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { 
  GraduationCap, Menu, X, Target, Compass, 
  ExternalLink, Sun, Moon, Key, Send, Headset,
  ChevronLeft, ChevronRight, Clock, Calendar, ArrowRight, ChevronDown, ChevronUp
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Services ---
const sendMessageToGemini = async (message) => {
  try {
    const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
    if (!apiKey) return "Sistem AI sedang berehat. Sila cuba sebentar lagi.";
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: { systemInstruction: "Anda adalah MyJSS, pembantu digital Jabatan Sains Sosial IPGKT." }
    });
    return response.text;
  } catch (e) { return "Maaf, ralat sambungan AI."; }
};

// --- Sub-Components ---
const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const move = (e) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 w-8 h-8 border-2 border-red-500 rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    />
  );
};

const FluidBackground = ({ isDark }) => (
  <div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor: isDark ? '#001a33' : '#F8FAFC' }}>
    <motion.div 
      animate={{ scale: [1, 1.2, 1], x: [0, 50, -50, 0], y: [0, -30, 30, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-0 left-0 w-full h-full opacity-20 blur-[120px] rounded-full"
      style={{ backgroundColor: isDark ? '#3B82F6' : '#CBD5E1' }}
    />
  </div>
);

const ArtistCard = ({ artist, isDark, onClick }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    onClick={onClick}
    className="group relative h-[400px] overflow-hidden cursor-pointer border rounded-2xl"
    style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', backgroundColor: isDark ? '#000d1a' : '#fff' }}
  >
    <img src={artist.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
      <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">{artist.field}</span>
      <h3 className="text-lg font-heading font-black leading-tight uppercase">{artist.name}</h3>
      <p className="text-[10px] uppercase tracking-widest text-red-500 font-bold mt-2">{artist.position}</p>
    </div>
  </motion.div>
);

// --- Main App ---
const THEMES = {
  light: { bg: '#FFFFFF', text: '#0F172A', border: 'rgba(15,23,42,0.1)', accent: '#EE2A24' },
  dark: { bg: '#001a33', text: '#FFFFFF', border: 'rgba(255,255,255,0.1)', accent: '#EE2A24' }
};

const JSS_STAFF = [
  { id: '1', name: 'Dr. Ahmadi bin Abd Wahab', position: 'Ketua Jabatan', field: 'Geografi & Sejarah', image: 'https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/Staf/Ahmadi.png', description: 'Ketua Jabatan Sains Sosial IPGKT.' },
  { id: '2', name: 'En. Mhd Yusof bin Zakaria', position: 'Pensyarah Kanan', field: 'Unit Sejarah', image: 'https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/Staf/Yusof.png', description: 'Pensyarah Kanan di Unit Sejarah.' },
  { id: '3', name: 'Dr. Jusman bin Aman Setia', position: 'Ketua Unit Sejarah', field: 'Unit Sejarah', image: 'https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/Staf/Jusman.png', description: 'Ketua Unit Sejarah.' },
  { id: '4', name: 'Pn. Aggenes Tona Antonius', position: 'Pensyarah', field: 'Unit Sejarah', image: 'https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/Staf/Aggenes.png', description: 'Pensyarah berpengalaman dalam bidang Sejarah.' },
  { id: '5', name: 'Dr. Muliyati binti Timbang', position: 'Ketua Unit Muzik & Seni', field: 'Unit Muzik & PSV', image: 'https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/Staf/Muliyati.png', description: 'Ketua Unit Muzik dan Seni Visual.' }
];

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const theme = isDarkMode ? THEMES.dark : THEMES.light;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: theme.bg, color: theme.text }}>
      <CustomCursor />
      <FluidBackground isDark={isDarkMode} />
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md border-b" style={{ borderColor: theme.border }}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center font-black text-[10px] text-white">JSS</div>
          <span className="font-heading font-black tracking-tighter text-sm">IPGKT</span>
        </div>
        <div className="flex gap-6 items-center">
          <div className="hidden lg:flex gap-8 text-[10px] font-bold uppercase tracking-widest opacity-60">
            {['Profil', 'Kakitangan', 'Program'].map(i => (
              <button key={i} onClick={() => scrollTo(i.toLowerCase())} className="hover:text-red-500 transition-colors">{i}</button>
            ))}
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-white/10">
            {isDarkMode ? <Sun size={18}/> : <Moon size={18}/>}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 text-center max-w-7xl mx-auto">
        <motion.img 
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          src="https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/logo%20IPGKT.png"
          className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-10"
        />
        <h1 className="text-4xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-4">
          Portal <span className="text-red-600">Rasmi</span>
        </h1>
        <h2 className="text-sm md:text-xl font-heading opacity-60 tracking-widest uppercase">Jabatan Sains Sosial IPGKT</h2>
        <div className="h-1 w-20 bg-red-600 mx-auto mt-8" />
      </section>

      {/* Staff Section */}
      <section id="kakitangan" className="py-24 px-6 max-w-[1600px] mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-3xl md:text-6xl font-heading font-black uppercase">Warga <span className="text-red-600">Akademik</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {JSS_STAFF.map(staff => (
            <ArtistCard key={staff.id} artist={staff} isDark={isDarkMode} onClick={() => setSelectedStaff(staff)} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t text-center opacity-40 text-[10px] font-bold uppercase tracking-[0.4em]" style={{ borderColor: theme.border }}>
        &copy; 2026 Jabatan Sains Sosial IPGKT. Semua Hak Terpelihara.
      </footer>

      {/* Modal Kakitangan */}
      <AnimatePresence>
        {selectedStaff && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelectedStaff(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-4xl rounded-[40px] overflow-hidden flex flex-col md:flex-row shadow-2xl border"
              style={{ backgroundColor: theme.bg, borderColor: theme.border }}
            >
              <div className="md:w-1/2 h-80 md:h-auto"><img src={selectedStaff.image} className="w-full h-full object-cover"/></div>
              <div className="md:w-1/2 p-10 md:p-16">
                <button onClick={() => setSelectedStaff(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-red-500 hover:text-white transition-all"><X/></button>
                <span className="text-xs font-bold text-red-500 uppercase tracking-widest">{selectedStaff.field}</span>
                <h3 className="text-3xl font-heading font-black uppercase mt-4 mb-2">{selectedStaff.name}</h3>
                <p className="text-xs font-bold opacity-40 uppercase tracking-[0.3em] mb-8 pb-4 border-b" style={{ borderColor: theme.border }}>{selectedStaff.position}</p>
                <p className="text-lg leading-relaxed opacity-70 italic">"{selectedStaff.description}"</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
