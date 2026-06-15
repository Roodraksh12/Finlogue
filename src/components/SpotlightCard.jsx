import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useMotionTemplate, useTransform, useSpring } from 'framer-motion';

const SpotlightCard = ({ children, className = '' }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Normalized coordinates from -0.5 to 0.5
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  // Map to a maximum rotation of 7 degrees for subtle premium feel
  const rotateX = useTransform(cardY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(cardX, [-0.5, 0.5], [-7, 7]);

  // Apply spring physics for smooth return to resting state
  const smoothRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;
    const { left, top, width, height } = divRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);
    
    cardX.set((x / width) - 0.5);
    cardY.set((y / height) - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        position: 'relative', 
        overflow: 'hidden',
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformPerspective: 1000
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px transition duration-300"
        style={{
          opacity: isHovered || isFocused ? 1 : 0,
          background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,.1), transparent 40%)`,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 1,
          willChange: 'background, opacity',
          transform: 'translateZ(0)'
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </motion.div>
  );
};

export default SpotlightCard;
