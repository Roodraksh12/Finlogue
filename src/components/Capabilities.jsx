import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section className="section capabilities-section" id="capabilities" ref={ref}>
      <div className="container">
        <motion.div 
          className="capabilities-header"
          style={{ y: yHeader }}
        >
          <span className="mono-label">EXPERTISE</span>
          <h2>A flexible skill set.</h2>
          <p>
            Whatever your core problem is, we likely have someone who has looked at it before. Our capabilities cover a broad range of business needs.
          </p>
        </motion.div>

        <div className="cohere-taxonomy-chips">
          {capabilitiesList.map((skill, index) => (
            <motion.div 
              key={index}
              className="blog-filter-chip interactive"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ scale: 1.05, backgroundColor: "var(--color-primary)", color: "var(--color-canvas)" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ type: "spring", stiffness: 120, damping: 15, delay: index * 0.05 }}
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
