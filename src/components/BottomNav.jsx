import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutGrid, Landmark, Handshake } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import './BottomNav.css';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Define tabs matching Finlogue's sections
  const tabs = [
    { id: 'home', to: '/', icon: Home, label: 'Home' },
    { id: 'portfolio', to: '/#portfolio', icon: LayoutGrid, label: 'Portfolio' },
    { id: 'investors', to: '/#investors', icon: Landmark, label: 'Investors' },
    { id: 'partner', to: '/partner', icon: Handshake, label: 'Partner' }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  const progress = useMotionValue(0);

  // Sync active tab based on location hash or pathname
  useEffect(() => {
    let currentId = 'home';
    if (location.pathname === '/partner') {
      currentId = 'partner';
    } else if (location.hash === '#portfolio') {
      currentId = 'portfolio';
    } else if (location.hash === '#investors') {
      currentId = 'investors';
    }
    
    const idx = tabs.findIndex(t => t.id === currentId);
    if (idx !== -1 && idx !== activeIndex) {
      setActiveTab(tabs[idx].id);
      animate(progress, idx, { type: "spring", stiffness: 400, damping: 32 });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    progress.set(activeIndex);
  }, []);

  const DRAG_STEP_PX = 60;
  const startProgress = useMotionValue(0);

  const handlePanStart = () => startProgress.set(progress.get());

  const handlePan = (e, info) => {
    const rawNewProgress = startProgress.get() + (info.offset.x / DRAG_STEP_PX);
    progress.set(Math.max(0, Math.min(tabs.length - 1, rawNewProgress)));
  };

  const handlePanEnd = (e, info) => {
    const momentumProgress = progress.get() + (info.velocity.x / 1000); 
    const closestIndex = Math.max(0, Math.min(tabs.length - 1, Math.round(momentumProgress)));
    
    handleTabClick(tabs[closestIndex], closestIndex);
  };

  const handleTabClick = (tab, index) => {
    setActiveTab(tab.id);
    animate(progress, index, { type: "spring", stiffness: 450, damping: 32 });
    
    if (tab.to.startsWith('/#')) {
      const sectionId = tab.to.replace('/#', '');
      if (location.pathname !== '/') {
        navigate(tab.to);
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else if (tab.to === '/') {
      if (location.pathname !== '/') {
        navigate('/');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(tab.to);
      window.scrollTo(0, 0);
    }
  };

  const lensLeft = useTransform(progress, 
    [0, 1, 2, 3], 
    [6, 66, 126, 186]
  );
  const lensWidth = 44;

  return (
    <nav className="bottom-nav-container">
      <motion.div 
        onPanStart={handlePanStart}
        onPan={handlePan} 
        onPanEnd={handlePanEnd}
        className="bottom-nav-pill"
      >
        <motion.div
          className="optical-lens"
          style={{ left: lensLeft, width: lensWidth }}
        />

        {tabs.map((tab, i) => (
          <TabItem 
            key={tab.id} 
            tab={tab} 
            index={i} 
            progress={progress} 
            onClick={() => handleTabClick(tab, i)}
          />
        ))}
      </motion.div>
    </nav>
  );
}

function TabItem({ tab, index, progress, onClick }) {
  const Icon = tab.icon;

  const opacityRange = [0, 1, 2, 3].map(i => i === index ? 1 : 0);
  const textOpacity = useTransform(progress, [0, 1, 2, 3], opacityRange);
  const inverseOpacity = useTransform(textOpacity, v => 1 - v);

  return (
    <motion.button
      onClick={onClick}
      className="nav-tab-item"
      aria-label={tab.label}
    >
      <div className="nav-icon-container">
        <div className="nav-icon-inner">
          <motion.div style={{ opacity: inverseOpacity }} className="icon-outline-wrapper">
            <Icon size={24} strokeWidth={1.5} />
          </motion.div>

          <motion.div style={{ opacity: textOpacity }} className="icon-solid-wrapper">
            <Icon size={24} strokeWidth={2.5} />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
}
