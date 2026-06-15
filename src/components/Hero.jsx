import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import AnimatedText from './AnimatedText';
import './Hero.css';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const titleText = "FINLOGUE";
  const letters = titleText.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      filter: "blur(12px)",
      scale: 1.1
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      scale: 1,
      transition: { 
        type: "spring",
        damping: 18,
        stiffness: 100,
      }
    }
  };

  // Mouse Aura Logic
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section 
      className="hero-section" 
      id="hero" 
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Living Aura Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 transition duration-300 hidden md:block"
        style={{
          background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px, rgba(201, 155, 83, 0.08), transparent 60%)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          willChange: 'background',
          transform: 'translateZ(0)'
        }}
      />

      <div className="container hero-container" style={{ position: 'relative', zIndex: 1 }}>
        
        <div className="hero-content">
          <motion.div 
            className="hero-text-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ y: yText, opacity: opacityText }}
          >
            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
            >
              {letters.map((letter, index) => (
                <motion.span 
                  key={index} 
                  variants={letterVariants}
                  style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
            <AnimatedText 
              el="h2" 
              text="The Live Problem Sprint." 
              once={true}
              className="hero-subhead"
            />
            <motion.p 
              className="hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Finance is not just learned at Finlogue—it is lived. We deliver real work, structured analysis, and actionable models to startups at zero cost.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
