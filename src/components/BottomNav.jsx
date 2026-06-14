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
    { id: 'home', to: '/', icon: Home, label: 'Home', activeWidth: 110, textWidth: 50 },
    { id: 'portfolio', to: '/#portfolio', icon: LayoutGrid, label: 'Portfolio', activeWidth: 150, textWidth: 90 },
    { id: 'investors', to: '/#investors', icon: Landmark, label: 'Investors', activeWidth: 150, textWidth: 90 },
    { id: 'partner', to: '/partner', icon: Handshake, label: 'Partner', activeWidth: 140, textWidth: 80 }
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

  const DRAG_STEP_PX = 58;
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
    [0, 0.5, 1, 1.5, 2, 2.5, 3], 
    [6,   6,  64,  64, 122, 122, 180]
  );
  
  const lensWidth = useTransform(progress, 
    [0, 0.5,  1, 1.5,  2, 2.5,  3], 
    [110, 208, 150, 208, 150, 198, 140]
  );

  const pillWidth = useTransform(progress, 
    [0, 1, 2, 3], 
    [296, 336, 336, 326]
  );

  return (
    <nav className="bottom-nav-container">
      <motion.div 
        onPanStart={handlePanStart}
        onPan={handlePan} 
        onPanEnd={handlePanEnd}
        className="bottom-nav-pill"
        style={{ width: pillWidth }}
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

  const widthRange = [0, 1, 2, 3].map(i => i === index ? tab.activeWidth : 52);
  const tabWidth = useTransform(progress, [0, 1, 2, 3], widthRange);

  const opacityRange = [0, 1, 2, 3].map(i => i === index ? 1 : 0);
  const textOpacity = useTransform(progress, [0, 1, 2, 3], opacityRange);
  const inverseOpacity = useTransform(textOpacity, v => 1 - v);

  return (
    <motion.button
      onClick={onClick}
      style={{ width: tabWidth }}
      className="nav-tab-item"
      aria-label={tab.label}
    >
      <div className="tab-content-wrapper">
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
        
        <motion.div 
          style={{ 
            opacity: textOpacity,
            width: useTransform(textOpacity, [0, 1], [0, tab.textWidth]),
            paddingLeft: useTransform(textOpacity, [0, 1], [0, 8]),
            overflow: "hidden"
          }}
          className="morphing-text-container"
        >
          <span className="label-solid-text">
            {tab.label}
          </span>
        </motion.div>
      </div>
    </motion.button>
  );
}
