import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';
import ExplodingText from './ExplodingText';
import './Process.css';

const processSteps = [
  {
    number: "01",
    title: "You Share Your Problem",
    description: "Fill a short form or have a 30-minute call with us. Tell us the challenge you are facing."
  },
  {
    number: "02",
    title: "We Scope It Together",
    description: "A Finlogue lead sits with you to understand the problem in depth and agree on the final deliverable."
  },
  {
    number: "03",
    title: "We Assign a Dedicated Team",
    description: "We put together a team of 3 to 5 members matched to your problem type."
  },
  {
    number: "04",
    title: "The Sprint Begins",
    description: "Our team works on your problem over 1 to 3 weeks with 1 to 2 quick check-ins."
  },
  {
    number: "05",
    title: "We Present and Deliver",
    description: "A structured debrief, clear recommendations, and a final deliverable you can act on immediately."
  },
  {
    number: "06",
    title: "You Decide What Happens Next",
    description: "No fee. No pressure. The deliverable is yours to keep."
  }
];

const Process = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section className="section process-section" id="process" ref={ref}>
      <div className="container">
        
        <div className="process-layout">
          <div className="process-header-sticky">
            <motion.div 
              className="process-header"
              style={{ y: yHeader, perspective: "1000px" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <span className="mono-label">HOW IT WORKS</span>
              <ExplodingText text="Six steps. We handle most of it." />
            </motion.div>
          </div>

          <div className="cohere-editorial-list">
            <div className="scroll-path-container">
              <div className="scroll-path-bg" />
              <motion.div className="scroll-path-fill" style={{ scaleY: scrollYProgress }} />
            </div>
            {processSteps.map((step, index) => {
              return (
                <motion.div 
                  key={index}
                  className="editorial-row interactive"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 10, backgroundColor: "rgba(0,0,0,0.02)" }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ type: "spring", stiffness: 120, damping: 20, delay: index * 0.1 }}
                  style={{ borderRadius: "8px", padding: "16px", transition: "background-color 0.3s" }}
                >
                  <div className="row-number mono-label">{step.number}</div>
                  <div className="row-title"><h3>{step.title}</h3></div>
                  <div className="row-description">
                    <p><TextReveal text={step.description} /></p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
