import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="mono-label">ABOUT FINLOGUE</span>
            <h2>Not just learned.<br/>It is lived.</h2>
          </motion.div>

          <motion.div 
            className="about-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p>
              Finlogue is the official finance and consulting syndicate of LNMIIT, Jaipur. 
              We are a team of highly motivated students specialising in finance, business analytics, strategy, and operations.
            </p>
            <p>
              We work on live business problems, not textbooks. We run workshops, case studies, and industry sessions throughout the year. Now, we are taking that energy directly to startups and businesses like yours.
            </p>
            <p className="cohere-highlight">
              We are not looking for projects to practise on. We are ready to deliver real work.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
