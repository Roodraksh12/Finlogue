import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';
import MagneticButton from './MagneticButton';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = ["About", "Offerings", "Process", "Capabilities", "Portfolio", "Investors"];

  const scrollToSection = (e, id) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
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
    }
  };

  const scrollToTop = (e) => {
    if (e) e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePartnerClick = (e) => {
    e.preventDefault();
    navigate('/partner');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <nav className="cohere-nav">
        <div className="nav-logo interactive" style={{ cursor: 'pointer' }} onClick={scrollToTop}>
          <div className="logo-text">
            <img 
              src="/logo-black.png" 
              alt="Finlogue Logo" 
              style={{ height: "2.4em", marginRight: "12px", objectFit: "contain", display: "block" }} 
            />
            <span className="desktop-only-flex" style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: "var(--color-coral)" }}>FIN</span>
              <span className="logo-highlight">LOGUE</span>
            </span>
          </div>
        </div>

        <div className="nav-links desktop-only">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="nav-link interactive" onClick={(e) => scrollToSection(e, link.toLowerCase())}>
              {link}
            </a>
          ))}
        </div>

        <div className="nav-actions desktop-only">
          <MagneticButton className="btn btn-primary interactive" onClick={handlePartnerClick}>
            Partner With Us
          </MagneticButton>
        </div>

      </nav>
      <BottomNav />
    </>
  );
};

export default Navigation;
