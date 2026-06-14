# Master Prompt: Physics-Based Optical Lens Bottom Navigation (Morphing Pill Type)

You can use the following prompt to ask any AI (or use it as a reference for yourself) to implement the exact same bottom navigation bar in another project. This version uses **lucide-react** for the icons, includes the **expanding pill shape** (morphs from `52px` to `110px` with text), and perfectly replicates the **native iOS frosted glass blur** over the active tab!

---

**Copy and paste the text below into your new AI conversation:**

```text
I want to build a highly interactive, physics-based bottom navigation bar using React, Tailwind CSS, Framer Motion, and Lucide React. I have the exact code and CSS needed. Please create the necessary files in my project and ensure the dependencies are installed.

### 1. Dependencies
First, ensure these dependencies are installed:
npm install framer-motion lucide-react react-router-dom

### 2. CSS Styles (The Optical Blur Effect)
Add the following classes to my global CSS file (e.g., `index.css` or `globals.css`) under the `@layer components` directive (if using Tailwind) or just as regular CSS. This creates the exact frosted glass refraction look for the active tab pill:

```css
@layer components {
  /* ── Optical Glass System ── */
  .optical-lens {
    @apply bg-white/20;
    backdrop-filter: blur(12px) saturate(160%);
    -webkit-backdrop-filter: blur(12px) saturate(160%);
    box-shadow: 
      inset 0 2px 4px rgba(255, 255, 255, 0.9),
      inset 0 -2px 6px rgba(0, 0, 0, 0.1),
      inset 0 0 12px rgba(255, 255, 255, 0.5),
      0 4px 12px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-top: 1px solid rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 9999px;
  }
}
```

### 3. Component Code (The Morphing Pill Logic)
Create a new file named `BottomNav.jsx` (or `.tsx`) and use the following code. Note that you may need to adjust the imports (like `useStore` or `cn`) depending on how state management and utility functions are handled in this new project.

```jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Heart, ClipboardList, ShoppingBasket } from 'lucide-react';
// Replace this with your project's store or prop logic
import { useStore } from '../store/useStore'; 
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export default function BottomNav() {
  // Replace with your actual state logic
  const { getCartItemCount, toggleCart } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = getCartItemCount();

  // Define tabs
  const tabs = [
    { id: 'home', to: '/', icon: Home, label: 'Home' },
    { id: 'saved', to: '/wishlist', icon: Heart, label: 'Saved' },
    { id: 'orders', to: '/orders', icon: ClipboardList, label: 'Orders' },
    { id: 'cart', action: toggleCart, icon: ShoppingBasket, label: 'Cart', badge: cartCount }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  const progress = useMotionValue(0);

  useEffect(() => {
    const idx = tabs.findIndex(t => t.to === location.pathname);
    if (idx !== -1 && idx !== activeIndex) {
      setActiveTab(tabs[idx].id);
      animate(progress, idx, { type: "spring", stiffness: 400, damping: 32 });
    }
  }, [location.pathname]);

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
    
    setActiveTab(tabs[closestIndex].id);
    animate(progress, closestIndex, { type: "spring", stiffness: 450, damping: 32 });

    const tabObj = tabs[closestIndex];
    if (tabObj.action) tabObj.action();
    else navigate(tabObj.to);
  };

  const lensLeft = useTransform(progress, 
    [0, 0.5, 1, 1.5, 2, 2.5, 3], 
    [6,   6,  64,  64, 122, 122, 180]
  );
  
  // The expanding morph width for the glass pill
  const lensWidth = useTransform(progress, 
    [0, 0.5,  1, 1.5,  2, 2.5,  3], 
    [110, 168, 110, 168, 110, 168, 110]
  );

  return (
    <nav className="md:hidden fixed bottom-6 left-4 right-4 z-40 h-[64px] flex items-center justify-center pointer-events-none">
      <motion.div 
        onPanStart={handlePanStart}
        onPan={handlePan} 
        onPanEnd={handlePanEnd}
        className="relative flex items-center gap-[6px] pointer-events-auto bg-white/30 backdrop-blur-sm border border-white/40 p-[6px] rounded-full shadow-lg touch-none"
        style={{ width: 296, height: 64 }}
      >
        <motion.div
          className="absolute top-[6px] bottom-[6px] optical-lens z-20 rounded-full pointer-events-none"
          style={{ left: lensLeft, width: lensWidth }}
        />

        {tabs.map((tab, i) => (
          <TabItem 
            key={tab.id} 
            tab={tab} 
            index={i} 
            progress={progress} 
            onClick={() => {
              setActiveTab(tab.id);
              animate(progress, i, { type: "spring", stiffness: 450, damping: 32 });
              if (tab.action) tab.action();
              else navigate(tab.to);
            }}
          />
        ))}
      </motion.div>
    </nav>
  );
}

function TabItem({ tab, index, progress, onClick }) {
  const Icon = tab.icon;

  // Expanding Pill Width Morphing
  const widthRange = [0, 1, 2, 3].map(i => i === index ? 110 : 52);
  const tabWidth = useTransform(progress, [0, 1, 2, 3], widthRange);

  const opacityRange = [0, 1, 2, 3].map(i => i === index ? 1 : 0);
  const textOpacity = useTransform(progress, [0, 1, 2, 3], opacityRange);
  const inverseOpacity = useTransform(textOpacity, v => 1 - v);

  return (
    <motion.button
      onClick={onClick}
      style={{ width: tabWidth }}
      className="relative flex items-center justify-center h-[52px] rounded-full flex-shrink-0 cursor-pointer"
      aria-label={tab.label}
    >
      <div className="relative flex items-center justify-center min-w-max">
        
        <div className="relative w-[24px] h-[24px] flex-shrink-0">
          <motion.div style={{ opacity: inverseOpacity }} className="absolute inset-0 z-10 text-slate-500 flex items-center justify-center">
            <Icon size={24} strokeWidth={1.8} />
          </motion.div>

          <motion.div style={{ opacity: textOpacity }} className="absolute inset-0 z-30 text-blue-600 drop-shadow-sm flex items-center justify-center">
            <Icon size={24} strokeWidth={2.5} />
          </motion.div>

          {tab.badge > 0 && (
            <motion.span 
              style={{ opacity: inverseOpacity }}
              className="absolute -top-[6px] -right-[6px] z-30 bg-blue-600 text-white text-[9px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center shadow-md"
            >
              {tab.badge > 9 ? '9+' : tab.badge}
            </motion.span>
          )}
        </div>

        {/* Morphing Text Label */}
        <motion.div 
          style={{ 
            opacity: textOpacity,
            width: useTransform(textOpacity, [0, 1], [0, 50]),
            paddingLeft: useTransform(textOpacity, [0, 1], [0, 8]),
            overflow: "hidden"
          }}
          className="relative z-30 flex items-center justify-start"
        >
          <span className="font-label text-[11px] font-bold uppercase tracking-widest text-blue-600 whitespace-nowrap drop-shadow-sm">
            {tab.label}
          </span>
        </motion.div>
      </div>
    </motion.button>
  );
}
```

### Please integrate this component and render it inside the main App layout wrapper so it appears on mobile screens!
\`\`\`
