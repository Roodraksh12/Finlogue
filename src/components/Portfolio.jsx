import React from 'react';
import { motion } from 'framer-motion';
import './Portfolio.css';

const startups = [
  { name: "FlexziStay", url: "" }, { name: "CloudGlance", url: "" }, { name: "Mr. Coconut", url: "" }, { name: "ProwPlus AI", url: "" },
  { name: "PlotPatta", url: "" }, { name: "Snooze", url: "" }, { name: "Quable", url: "" }, { name: "SkyThrinetra", url: "" },
  { name: "ModuloBytes", url: "" }, { name: "Scrap on Wheels", url: "" }, { name: "SensoVision", url: "" }, { name: "AugAid", url: "" },
  { name: "Cit-Peels", url: "" }, { name: "Cubicles.com", url: "" }, { name: "IrrigaTech", url: "" }, { name: "LokChakra", url: "" },
  { name: "AquAgri", url: "" }, { name: "Leucine", url: "" }, { name: "Eventz Book", url: "" }, { name: "Vzeya", url: "" }
];

const Portfolio = () => {
  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container">
        
        <div className="portfolio-header">
          <span className="mono-label">OUR WORK</span>
          <h2>Over 50 Startups Across Three Years</h2>
          <p className="cohere-trust-text">
            From fintech and agritech to SaaS and consumer brands, we deliver structured, high-impact solutions at no cost.
          </p>
        </div>

        <div className="potr-band">
          <div className="potr-content">
            <span className="mono-label" style={{color: 'rgba(255,255,255,0.7)'}}>FLAGSHIP EVENT</span>
            <h3>Pitch on the Rocks (POTR) 2026</h3>
            <p>
              Our annual startup-investor engagement event marking structured evaluation, quality screening, and high-impact founder-investor interactions.
            </p>
            <div className="potr-stats">
              <div className="stat-item">
                <span className="stat-value">₹30 Cr+</span>
                <span className="stat-label mono-label">Funding Ask</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">25+</span>
                <span className="stat-label mono-label">Startups Pitched</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">6+</span>
                <span className="stat-label mono-label">Active Investors</span>
              </div>
            </div>
          </div>
        </div>

        <div className="cohere-trust-strip">
          {startups.map((startup, index) => (
            <motion.div 
              key={index}
              className="trust-logo-text"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (index % 10) * 0.05 }}
            >
              {startup.url ? (
                <a href={startup.url} target="_blank" rel="noopener noreferrer" className="startup-link">
                  {startup.name}
                </a>
              ) : (
                startup.name
              )}
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Portfolio;
