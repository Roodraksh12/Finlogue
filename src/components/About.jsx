import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollTextReveal from './ScrollTextReveal';
import './About.css';

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section className="section about-section" id="about" ref={ref}>
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ y: yHeader }}
          >
            <span className="mono-label">ABOUT FINLOGUE</span>
            <h2>Not just learned.<br/>It is lived.</h2>
          </motion.div>

          <motion.div 
            className="about-text"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            style={{ y: yText }}
          >
            <p className="mb-8" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
              <ScrollTextReveal text="Finlogue is the official finance and consulting syndicate of LNMIIT, Jaipur. We are a team of highly motivated students specialising in finance, business analytics, strategy, and operations." />
            </p>
            <p className="mb-8" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
              <ScrollTextReveal text="We work on live business problems, not textbooks. We run workshops, case studies, and industry sessions throughout the year. Now, we are taking that energy directly to startups and businesses like yours." />
            </p>
            <p className="cohere-highlight" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
              <ScrollTextReveal text="We are not looking for projects to practise on. We are ready to deliver real work." />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
