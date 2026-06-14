import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        
        <div className="hero-content">
          <motion.div 
            className="hero-text-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>FINLOGUE</h1>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '24px', fontWeight: 400 }}>The Live Problem Sprint.</h2>
            <p className="hero-subtitle">
              Finance is not just learned at Finlogue—it is lived. We deliver real work, structured analysis, and actionable models to startups at zero cost.
            </p>
          </motion.div>


        </div>

      </div>
    </section>
  );
};

export default Hero;
