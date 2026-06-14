import React from 'react';
import { motion } from 'framer-motion';
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
  return (
    <section className="section process-section" id="process">
      <div className="container">
        
        <div className="process-header">
          <span className="mono-label">HOW IT WORKS</span>
          <h2>Six steps.<br/>We handle most of it.</h2>
        </div>

        <div className="cohere-editorial-list">
          {processSteps.map((step, index) => (
            <motion.div 
              key={index}
              className="editorial-row"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="row-number mono-label">{step.number}</div>
              <div className="row-title"><h3>{step.title}</h3></div>
              <div className="row-description"><p>{step.description}</p></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
