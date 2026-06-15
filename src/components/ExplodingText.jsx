import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ExplodingText = ({ text, className = '', align = 'left' }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "center 60%"]
  });

  const letterSpacing = useTransform(scrollYProgress, [0, 1], ["-0.15em", "0em"]);
  const filter = useTransform(scrollYProgress, [0, 1], ["blur(12px)", "blur(0px)"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [45, 0]);

  return (
    <motion.h2 
      ref={containerRef}
      style={{ 
        letterSpacing, 
        filter, 
        opacity, 
        scale,
        rotateX,
        transformOrigin: align === 'center' ? "center center" : "left center",
        display: "block",
        willChange: "transform, filter, opacity, letter-spacing"
      }}
      className={className}
    >
      {text}
    </motion.h2>
  );
};

export default ExplodingText;
