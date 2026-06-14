import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PartnerPage from './pages/PartnerPage';

function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const location = useLocation();

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div className="app-container">
      {/* Background Ambient Orbs */}
      <motion.div style={{ y }} className="ambient-orb orb-1"></motion.div>
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '-30%']) }} className="ambient-orb orb-2"></motion.div>
      <motion.div style={{ y }} className="ambient-orb orb-3"></motion.div>

      <Navigation />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/partner" element={<PartnerPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
