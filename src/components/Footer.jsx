import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section" id="contact">
      <div className="container">
        <div className="footer-content">
          <h2 className="footer-title">Ready to Get Started?</h2>
          <p className="footer-subtitle">
            <em>We would love to hear about your business challenge.</em>
          </p>
          
          <div className="footer-contact">
            <a href="mailto:24dec032@lnmiit.ac.in">24dec032@lnmiit.ac.in</a>
            <span className="divider">|</span>
            <a href="mailto:24ucc166@lnmiit.ac.in">24ucc166@lnmiit.ac.in</a>
          </div>
          
          <div className="footer-bottom-info">
            <span>LNMIIT, Jaipur</span>
            <span className="divider">|</span>
            <span>Finance Syndicate of LNMIIT</span>
            <span className="divider">|</span>
            <span>2025-26</span>
          </div>

          <div className="footer-socials">
            <a href="https://www.linkedin.com/company/entrepreneuria-lnmiit/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="divider">|</span>
            <a href="https://www.instagram.com/finlogue.lnmiit?igsh=MWw0MnducG4wcGwzYg==" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
