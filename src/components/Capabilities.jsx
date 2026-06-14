import React from 'react';
import { motion } from 'framer-motion';
import './Capabilities.css';

const capabilitiesList = [
  "Pitch Deck Creation",
  "Financial Modelling",
  "Market Research",
  "Go-To-Market Strategy",
  "Valuation Analysis",
  "Competitor Benchmarking",
  "Supply Chain Optimisation",
  "Customer Journey Mapping",
  "Pricing Strategy",
  "Investment Teasers"
];

const Capabilities = () => {
  return (
    <section className="section capabilities-section" id="capabilities">
      <div className="container">
        <div className="capabilities-header">
          <span className="mono-label">EXPERTISE</span>
          <h2>A flexible skill set.</h2>
          <p>
            Whatever your core problem is, we likely have someone who has looked at it before. Our capabilities cover a broad range of business needs.
          </p>
        </div>

        <div className="cohere-taxonomy-chips">
          {capabilitiesList.map((skill, index) => (
            <motion.div 
              key={index}
              className="blog-filter-chip"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
