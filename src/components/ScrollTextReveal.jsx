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

const ScrollTextReveal = ({ text, className = '', externalProgress = null, baseRange = [0, 1] }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 45%"]
  });

  const progressToUse = externalProgress || scrollYProgress;
  const words = text.split(" ");
  const [rangeStart, rangeEnd] = baseRange;
  const rangeDiff = rangeEnd - rangeStart;
  
  return (
    <span ref={containerRef} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }} className={className}>
      {words.map((word, i) => {
        const wordStart = i / words.length;
        const wordEnd = wordStart + (1.5 / words.length);
        
        const actualStart = rangeStart + (wordStart * rangeDiff);
        const actualEnd = rangeStart + (wordEnd * rangeDiff);

        return (
          <ScrollWord key={i} progress={progressToUse} range={[actualStart, actualEnd]}>
            {word}
          </ScrollWord>
        );
      })}
    </span>
  );
};

export default ScrollTextReveal;
