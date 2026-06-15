import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, Zap, FileText, Eye, Users, Lock } from 'lucide-react';
import SpotlightCard from './SpotlightCard';
import './Offerings.css';

const offeringsData = [
  {
    icon: <CheckCircle2 size={24} strokeWidth={1.5} />,
    title: "Free Expert Analysis",
    description: "Structured financial, operational, or strategic analysis on a real problem at zero cost."
  },
  {
    icon: <Zap size={24} strokeWidth={1.5} />,
    title: "Fast Turnaround",
    description: "Our sprint model is built for speed. We scope tightly and deliver within 1 to 3 weeks."
  },
  {
    icon: <FileText size={24} strokeWidth={1.5} />,
    title: "A Real Deliverable",
    description: "A proper output — financial model, strategy deck, or process map — not just verbal advice."
  },
  {
    icon: <Eye size={24} strokeWidth={1.5} />,
    title: "Fresh Perspective",
    description: "No internal politics, no preconceived notions. We look at your problem with fresh eyes."
  },
  {
    icon: <Users size={24} strokeWidth={1.5} />,
    title: "Access to Talent",
    description: "Hire team members for part-time, freelance, or internship roles. No placement fee."
  },
  {
    icon: <Lock size={24} strokeWidth={1.5} />,
    title: "Confidentiality",
    description: "Everything you share stays within the sprint team. We treat your data with discretion."
  }
];

const Offerings = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section className="section bg-green-band offerings-section" id="offerings" ref={ref}>
      <div className="container">
        <motion.div 
          className="offerings-header"
          style={{ y: yHeader }}
        >
          <span className="mono-label" style={{color: 'rgba(255,255,255,0.7)'}}>CORE CAPABILITIES</span>
          <h2>What is in it for You</h2>
          <p className="cohere-subtitle">
            You get the output of a consulting engagement—structured, professional, and actionable—without the consulting fees.
          </p>
        </motion.div>

        <div className="cohere-card-grid">
          {offeringsData.map((item, index) => (
            <SpotlightCard key={index} className="dark-panel-card">
              <div className="panel-icon">
                {item.icon}
              </div>
              <div className="panel-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
