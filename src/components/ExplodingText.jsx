import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ExplodingText = ({ text, className = '', align = 'left' }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 60%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.h2 
      ref={containerRef}
      style={{ 
        opacity, 
        scale,
        rotateX,
        y,
        z: 0,
        transformOrigin: align === 'center' ? "center center" : "left center",
        display: "block",
        willChange: "transform, opacity"
      }}
      className={className}
    >
      {text}
    </motion.h2>
  );
};

export default ExplodingText;
