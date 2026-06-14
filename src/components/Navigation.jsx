import React from 'react';
import { Home, LayoutGrid, Users, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
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

      </nav>

      <div className="mobile-bottom-nav mobile-only">
        <a href="#home" className="mobile-tab" onClick={scrollToTop}>
          <Home size={20} />
          <span>Home</span>
        </a>
        <a href="#portfolio" className="mobile-tab" onClick={(e) => scrollToSection(e, 'portfolio')}>
          <LayoutGrid size={20} />
          <span>Portfolio</span>
        </a>
        <a href="#investors" className="mobile-tab" onClick={(e) => scrollToSection(e, 'investors')}>
          <Users size={20} />
          <span>Investors</span>
        </a>
        <a href="/partner" className="mobile-tab" onClick={handlePartnerClick}>
          <Sparkles size={20} />
          <span>Partner</span>
        </a>
      </div>
    </>
  );
};

export default Navigation;
