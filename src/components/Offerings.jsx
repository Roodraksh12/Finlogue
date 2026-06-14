import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, FileText, Eye, Users, Lock } from 'lucide-react';
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
  return (
    <section className="section bg-green-band offerings-section" id="offerings">
      <div className="container">
        <div className="offerings-header">
          <span className="mono-label" style={{color: 'rgba(255,255,255,0.7)'}}>CORE CAPABILITIES</span>
          <h2>What is in it for You</h2>
          <p className="cohere-subtitle">
            You get the output of a consulting engagement—structured, professional, and actionable—without the consulting fees.
          </p>
        </div>

        <div className="cohere-card-grid">
          {offeringsData.map((item, index) => (
            <motion.div 
              key={index}
              className="dark-panel-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="panel-icon">
                {item.icon}
              </div>
              <div className="panel-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
