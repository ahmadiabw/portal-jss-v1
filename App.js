
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Menu, X, 
  Target, Compass, ExternalLink,
  Sun, Moon, Key
} from 'lucide-react';
import FluidBackground from './components/FluidBackground.js';
import GradientText from './components/GlitchText.js';
import CustomCursor from './components/CustomCursor.js';
import ArtistCard from './components/ArtistCard.js';
import AIChat from './components/AIChat.js';
import Carousel from './components/Carousel.js';
import NewsSection from './components/NewsSection.js';

const THEMES = {
  light: {
    bgPrimary: '#FFFFFF',    
    bgSecondary: '#F8FAFC',  
    textPrimary: '#0F172A',  
    textSecondary: '#64748B',
    accentRed: '#EE2A24',    
    accentBlue: '#003366',   
    border: 'rgba(15, 23, 42, 0.06)',
    navBg: '#FFFFFF'
  },
  dark: {
    bgPrimary: '#001a33',    
    bgSecondary: '#000d1a',  
    textPrimary: '#FFFFFF',  
    textSecondary: '#94A3B8',
    accentRed: '#EE2A24',    
    accentBlue: '#3B82F6',   
    border: 'rgba(255, 255, 255, 0.08)',
    navBg: '#000d1a'
  }
};

const LOGO_URL = "https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/logo%20IPGKT.png";
const FALLBACK_LOGO = "https://upload.wikimedia.org/wikipedia/commons/8/87/Logo_IPGM.png";

const JSS_STAFF = [
  { id: '1', name: 'Dr. Ahmadi bin Abd Wahab', position: 'Ketua Jabatan', field: 'Geografi & Sejarah', image: 'https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/Staf/Ahmadi.png', description: 'Beliau merupakan Ketua Jabatan yang memiliki kelayakan PhD dalam Sains Bumi.' },
  { id: '2', name: 'En. Mhd Yusof bin Zakaria', position: 'Pensyarah Kanan', field: 'Unit Sejarah', image: 'https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/Staf/Yusof.png', description: 'Pensyarah Kanan Sejarah.' },
  { id: '3', name: 'Dr. Jusman bin Aman Setia', position: 'Ketua Unit Sejarah', field: 'Unit Sejarah', image: 'https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/Staf/Jusman.png', description: 'Ketua Unit Sejarah.' },
  { id: '4', name: 'Pn. Aggenes Tona Antonius', position: 'Pensyarah', field: 'Unit Sejarah', image: 'https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/Staf/Aggenes.png', description: 'Pensyarah Sejarah.' },
  { id: '5', name: 'Dr. Muliyati binti Timbang', position: 'Ketua Unit Muzik & Seni', field: 'Unit Muzik & PSV', image: 'https://raw.githubusercontent.com/ahmadiabw/portal-jss/main/aset/Staf/Muliyati.png', description: 'Ketua Unit Muzik & Seni.' },
];

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [logoHasError, setLogoHasError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const theme = isDarkMode ? THEMES.dark : THEMES.light;

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setIsDarkMode(true);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary }}>
      <CustomCursor />
      <FluidBackground theme={isDarkMode ? 'dark' : 'light'} />
      <AIChat theme={isDarkMode ? 'dark' : 'light'} />
      
      {/* Navbar & Hero Content here (disingkatkan untuk penjimatan ruang XML) */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md border-b" style={{ borderColor: theme.border }}>
        <div className="font-heading font-black">JSS IPGKT</div>
        <div className="flex gap-4">
          <button onClick={toggleTheme}>{isDarkMode ? <Sun size={20}/> : <Moon size={20}/>}</button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden"><Menu/></button>
          <div className="hidden lg:flex gap-6 uppercase text-[10px] font-bold tracking-widest">
            {['Profil', 'Kakitangan', 'Berita', 'Program'].map(i => (
              <button key={i} onClick={() => scrollToSection(i.toLowerCase())}>{i}</button>
            ))}
          </div>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-6 text-center">
        <motion.img 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          src={logoHasError ? FALLBACK_LOGO : LOGO_URL} 
          className="w-32 h-32 mx-auto mb-10"
          onError={() => setLogoHasError(true)}
        />
        <GradientText text="PORTAL RASMI" className="text-5xl md:text-7xl block mb-4" theme={isDarkMode ? 'dark' : 'light'} />
        <h2 className="text-xl font-heading opacity-60">JABATAN SAINS SOSIAL IPGKT</h2>
      </section>

      <Carousel theme={isDarkMode ? 'dark' : 'light'} />
      
      <section id="kakitangan" className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-4">
          {JSS_STAFF.map(staff => (
            <ArtistCard 
              key={staff.id} 
              artist={{...staff, genre: staff.position, day: staff.field}} 
              theme={isDarkMode ? 'dark' : 'light'}
              onClick={() => setSelectedStaff(staff)}
            />
          ))}
        </div>
      </section>

      <NewsSection theme={isDarkMode ? 'dark' : 'light'} />
      
      <footer className="p-10 text-center opacity-40 text-[10px] uppercase font-bold tracking-widest">
        &copy; 2026 JABATAN SAINS SOSIAL IPGKT
      </footer>
    </div>
  );
};

export default App;
