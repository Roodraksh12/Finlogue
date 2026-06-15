import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Offerings from '../components/Offerings';
import Process from '../components/Process';
import Capabilities from '../components/Capabilities';
import Portfolio from '../components/Portfolio';
import Investors from '../components/Investors';

const HomePage = () => {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <Hero />
      <About />
      <Offerings />
      <Process />
      <Capabilities />
      <Portfolio />
      <Investors />
    </motion.main>
  );
};

export default HomePage;
