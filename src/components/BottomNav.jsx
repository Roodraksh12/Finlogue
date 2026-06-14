import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutGrid, Landmark, Handshake } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from 'framer-motion';
import './BottomNav.css';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Define tabs matching Finlogue's sections
  const tabs = [
    { id: 'home', to: '/', icon: Home, label: 'Home', activeWidth: 102, textWidth: 42 },
    { id: 'portfolio', to: '/#portfolio', icon: LayoutGrid, label: 'Portfolio', activeWidth: 140, textWidth: 80 },
    { id: 'investors', to: '/#investors', icon: Landmark, label: 'Investors', activeWidth: 135, textWidth: 75 },
    { id: 'partner', to: '/partner', icon: Handshake, label: 'Partner', activeWidth: 130, textWidth: 70 }
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
      animate(progress, idx, { type: "spring", stiffness: 450, damping: 22, mass: 0.8 });
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
    animate(progress, index, { type: "spring", stiffness: 450, damping: 22, mass: 0.8 });
    
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
    [0, 1, 2, 3], 
    [102, 140, 135, 130]
  );

  const pillWidth = useTransform(progress, 
    [0, 0.5, 1, 1.5, 2, 2.5, 3], 
    [288, 330, 326, 350, 321, 340, 316]
  );

  // Volume-preserving liquid height compression
  const pillHeight = useTransform(progress,
    [0, 0.5, 1, 1.5, 2, 2.5, 3],
    [64, 52, 64, 52, 64, 52, 64]
  );

  // The Clip Path that perfectly bounds the magnified layer inside the glass lens
  const clipPath = useMotionTemplate`inset(6px calc(100% - (${lensLeft}px + ${lensWidth}px)) 6px ${lensLeft}px round 9999px)`;

  return (
    <nav className="bottom-nav-container">
      <motion.div 
        onPanStart={handlePanStart}
        onPan={handlePan} 
        onPanEnd={handlePanEnd}
        className="bottom-nav-pill"
        style={{ width: pillWidth, height: pillHeight }}
      >
        
        {/* BASE LAYER (Unmagnified) */}
        <div className="tabs-layer z-10">
          {tabs.map((tab, i) => (
            <TabItem 
              key={`base-${tab.id}`} 
              tab={tab} 
              index={i} 
              progress={progress} 
              onClick={() => handleTabClick(tab, i)}
              isMagnified={false}
            />
          ))}
        </div>

        {/* CLEAR GLASS LENS */}
        <motion.div
          className="optical-lens-glass"
          style={{ left: lensLeft, width: lensWidth }}
        />

        {/* MAGNIFIED LAYER (Clipped to the moving glass) */}
        <motion.div 
          className="tabs-layer z-30 pointer-events-none"
          style={{ clipPath }}
        >
          {tabs.map((tab, i) => (
            <TabItem 
              key={`mag-${tab.id}`} 
              tab={tab} 
              index={i} 
              progress={progress} 
              onClick={() => {}} 
              isMagnified={true}
            />
          ))}
        </motion.div>

      </motion.div>
    </nav>
  );
}

function TabItem({ tab, index, progress, onClick, isMagnified }) {
  const tabWidth = useTransform(progress, 
    [index - 1, index, index + 1], 
    [52, tab.activeWidth, 52]
  );
  
  const textOpacity = useTransform(progress, 
    [index - 0.5, index, index + 0.5], 
    [0, 1, 0]
  );

  const Icon = tab.icon;

  return (
    <motion.button
      className="nav-tab-item"
      style={{ width: tabWidth }}
      onClick={onClick}
      tabIndex={isMagnified ? -1 : 0}
      aria-label={tab.label}
    >
      <div 
        className={`nav-icon-inner ${isMagnified ? 'text-black' : 'text-slate-500'}`}
        style={{ 
          transform: isMagnified ? 'scale(1.15)' : 'scale(1)', 
          transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Icon 
          size={24} 
          strokeWidth={isMagnified ? 2.5 : 2} 
          fill={isMagnified ? "currentColor" : "none"} 
        />
      </div>
      <motion.div 
        style={{ 
          opacity: textOpacity,
          width: useTransform(textOpacity, [0, 1], [0, tab.textWidth]),
          paddingLeft: useTransform(textOpacity, [0, 1], [0, 8]),
          overflow: "hidden",
          color: isMagnified ? '#000' : '#475569',
          transform: isMagnified ? 'scale(1.05)' : 'scale(1)',
          transformOrigin: 'left center',
          fontWeight: isMagnified ? '900' : '700'
        }}
        className="morphing-text-container"
      >
        <span className="label-solid-text">
          {tab.label}
        </span>
      </motion.div>
    </motion.button>
  );
}
