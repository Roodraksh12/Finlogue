import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Investors.css';

const investorsData = [
  {
    name: "Aman M. Tekriwal",
    initials: "AT",
    image: "/investors/aman.jpg",
    linkedin: "",
    role: "Angel Investor | Venture Partner",
    desc: "A visionary in finance and entrepreneurship, Mr. Aman Tekriwal is the Co-Founder of Maxar.vc, one of India's leading angel syndicates, and a Venture Partner at PitchRight Ventures."
  },
  {
    name: "Krishna Dev Pathak",
    initials: "KP",
    image: "/investors/krishna.jpg",
    linkedin: "",
    role: "Investment Banking",
    desc: "Private markets, Value Bridge Capital. A finance professional with a specialization in investment banking and private markets, Mr. Krishna Dev Pathak combines analytical precision with strategic insight."
  },
  {
    name: "Sidharth Pandey",
    initials: "SP",
    image: "/investors/sidharth.jpg",
    linkedin: "",
    role: "VP, Paytm (Former)",
    desc: "As VP of Paytm, he built and scaled a $2B payments and distribution business, pioneering QR payments and subscription services like Paytm First."
  },
  {
    name: "Siddhant Gupta",
    initials: "SG",
    image: "/investors/siddhant.jpg",
    linkedin: "",
    role: "Founder, Skillson | Former VP, Sixth Sense Ventures",
    desc: "An ISB Gold Medalist MBA, Mr. Siddhant Gupta is the Founder of Skillson, a platform redefining career readiness in Venture Capital and Consulting."
  },
  {
    name: "Vartul Jain",
    initials: "VJ",
    image: "/investors/vartul.jpg",
    linkedin: "",
    role: "Angel Investor | Strategic Inv. Advisor",
    desc: "An emerging leader in strategic finance, Mr. Vartul Jain brings expertise in venture analysis, startup evaluation, and growth strategy. Having started his investment journey with Inflection Point Ventures."
  },
  {
    name: "Garima Seth",
    initials: "GS",
    image: "/investors/garima.jpg",
    linkedin: "",
    role: "VP, Value Bridge Capital | Former Founder, Boon Capital",
    desc: "With over 20 years of experience in investment banking and venture funding."
  },
  {
    name: "Ninad Karpe",
    initials: "NK",
    image: "/investors/ninad.jpg",
    linkedin: "",
    role: "Founder, Karpe Diem Ventures | Partner, 100X.VC",
    desc: "Founder of Karpe Diem Ventures which invests in early stage startups in India. He is also the Founder & Partner at 100X.VC."
  }
];

const Investors = () => {
  const [imgErrors, setImgErrors] = useState({});

  const handleImgError = (index) => {
    setImgErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <section className="investors-section" id="investors">
      <div className="container">
        
        <div className="investors-header">
          <span className="mono-label">OUR NETWORK</span>
          <h2>Esteemed Investors & Mentors</h2>
        </div>

        <div className="investors-grid">
          {investorsData.map((investor, index) => (
            <motion.div 
              key={index}
              className="investor-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            >
              <div className="investor-avatar">
                {investor.image && !imgErrors[index] ? (
                  <img 
                    src={investor.image} 
                    alt={investor.name} 
                    className="investor-img" 
                    onError={() => handleImgError(index)}
                  />
                ) : (
                  <span className="investor-initials">{investor.initials}</span>
                )}
              </div>
              {investor.linkedin ? (
                <a href={investor.linkedin} target="_blank" rel="noopener noreferrer" className="investor-name-link">
                  <h3 className="investor-name">{investor.name}</h3>
                </a>
              ) : (
                <h3 className="investor-name">{investor.name}</h3>
              )}
              <div className="investor-role">{investor.role}</div>
              <p className="investor-desc">{investor.desc}</p>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Investors;
