import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = ["About", "Offerings", "Process", "Capabilities", "Portfolio", "Investors"];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      setMobileMenuOpen(false);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handlePartnerClick = (e) => {
    e.preventDefault();
    navigate('/partner');
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="cohere-nav">
        <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={scrollToTop}>
          <span className="logo-text">FINLOGUE</span>
        </div>

        <div className="nav-links desktop-only">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link" onClick={(e) => scrollToSection(e, link.toLowerCase())}>
              {link}
            </a>
          ))}
        </div>

        <div className="nav-actions desktop-only">
          <a href="/partner" className="btn btn-primary" onClick={handlePartnerClick}>Partner With Us</a>
        </div>

        <button 
          className="mobile-menu-btn mobile-only" 
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} color="#111" />
        </button>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="mobile-menu-header">
              <div className="nav-logo" style={{ cursor: 'pointer' }} onClick={() => { scrollToTop(); setMobileMenuOpen(false); }}>
                <span className="logo-text">FINLOGUE</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} color="#111" />
              </button>
            </div>
            <div className="mobile-nav-links">
              {links.map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`} 
                  className="mobile-nav-link"
                  onClick={(e) => scrollToSection(e, link.toLowerCase())}
                >
                  {link}
                </a>
              ))}
              <div className="mobile-nav-divider"></div>
              <a href="/partner" className="btn btn-primary" onClick={handlePartnerClick}>
                Partner With Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
