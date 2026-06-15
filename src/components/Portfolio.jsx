import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SpotlightCard from './SpotlightCard';
import './Portfolio.css';

const startups = [
  { name: "FlexziStay", url: "https://www.linkedin.com/company/flexzistay/" },
  { name: "CloudGlance", url: "https://www.linkedin.com/company/cloudglancelab/" },
  { name: "Mr. Coconut", url: "https://www.linkedin.com/company/mr-coconut/" },
  { name: "ProwPlus AI", url: "https://www.linkedin.com/company/prowplus/" },
  { name: "PlotPatta", url: "https://www.linkedin.com/company/plotpatta/" },
  { name: "Snooze", url: "https://www.linkedin.com/company/snoozemattressco/" },
  { name: "Quable", url: "https://www.linkedin.com/company/quable/" },
  { name: "SkyThrinetra", url: "https://www.linkedin.com/company/skythrinetra/" },
  { name: "ModuloBytes", url: "https://www.linkedin.com/company/modulobytes/" },
  { name: "Scrap on Wheels", url: "https://www.linkedin.com/company/scrap-on-wheels/" },
  { name: "SensoVision", url: "https://www.linkedin.com/company/sensovision/" },
  { name: "AugAid", url: "https://www.linkedin.com/company/augaid/" },
  { name: "Cit-Peels", url: "https://www.linkedin.com/company/cit-peels-naturals/" },
  { name: "Cubicles.com", url: "https://www.linkedin.com/company/cubicles-com/" },
  { name: "IrrigaTech", url: "https://www.linkedin.com/company/irrigatech/" },
  { name: "LokaChakra", url: "https://www.linkedin.com/company/lokachakra/" },
  { name: "AquAgri", url: "https://www.linkedin.com/company/aquagri/" },
  { name: "Leucine", url: "https://www.linkedin.com/company/leucine/" },
  { name: "Eventz Book", url: "https://www.linkedin.com/company/eventz-book/" },
  { name: "Vzeya", url: "https://www.linkedin.com/company/vzeya/" }
];

const Portfolio = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section className="section portfolio-section" id="portfolio" ref={ref}>
      <div className="container">

        <motion.div
          className="portfolio-header"
          style={{ y: yHeader }}
        >
          <span className="mono-label">OUR WORK</span>
          <h2>Over 50 Startups Across Three Years</h2>
          <p className="cohere-trust-text">
            From fintech and agritech to SaaS and consumer brands, we deliver structured, high-impact solutions at no cost.
          </p>
        </motion.div>

        <div className="potr-glow-wrapper">
          <SpotlightCard className="potr-band">
            <div className="potr-content">
              <span className="mono-label" style={{ color: 'rgba(255,255,255,0.7)' }}>FLAGSHIP EVENT</span>
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
          </SpotlightCard>
        </div>

        <div className="marquee-container">
          <div className="marquee-content">
            {[...startups, ...startups].map((startup, index) => (
              <div
                key={index}
                className="trust-logo-text interactive"
              >
                {startup.url ? (
                  <a href={startup.url} target="_blank" rel="noopener noreferrer" className="startup-link interactive">
                    {startup.name}
                  </a>
                ) : (
                  startup.name
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
