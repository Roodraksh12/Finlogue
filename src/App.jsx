import React, { useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PartnerPage from './pages/PartnerPage';
import Noise from './components/Noise';

function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const location = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <>
      <div className="app-container">
        <Noise />
        {/* Background Ambient Orbs */}
        <motion.div style={{ y, willChange: 'transform', transform: 'translateZ(0)' }} className="ambient-orb orb-1"></motion.div>
        <motion.div style={{ y: y2, willChange: 'transform', transform: 'translateZ(0)' }} className="ambient-orb orb-2"></motion.div>
        <motion.div style={{ y, willChange: 'transform', transform: 'translateZ(0)' }} className="ambient-orb orb-3"></motion.div>

        <Navigation />
        
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/partner" element={<PartnerPage />} />
          </Routes>
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
}

export default App;
