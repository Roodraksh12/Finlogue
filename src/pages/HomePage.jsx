import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Offerings from '../components/Offerings';
import Process from '../components/Process';
import Capabilities from '../components/Capabilities';
import Portfolio from '../components/Portfolio';
import Investors from '../components/Investors';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <About />
      <Offerings />
      <Process />
      <Capabilities />
      <Portfolio />
      <Investors />
    </main>
  );
};

export default HomePage;
