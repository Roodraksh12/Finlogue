import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollWord = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity, willChange: 'opacity' }} className="inline-block mr-2">
      {children}
    </motion.span>
  );
};

const ScrollTextReveal = ({ text, className = '' }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 45%"]
  });

  const words = text.split(" ");
  
  return (
    <span ref={containerRef} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        // make the end overlap slightly for smoother effect
        const end = start + (1.5 / words.length);
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </ScrollWord>
        );
      })}
    </span>
  );
};

export default ScrollTextReveal;
