# Master Prompt: Physics-Based Optical Lens Bottom Navigation

You can use the following prompt to ask any AI (or use it as a reference for yourself) to implement the exact same bottom navigation bar in another project. 

---

**Copy and paste the text below into your new AI conversation:**

```text
I want to build a highly interactive, physics-based bottom navigation bar using React, Tailwind CSS, Framer Motion, and Heroicons. I have the exact code and CSS needed. Please create the necessary files in my project and ensure the dependencies are installed.

### 1. Dependencies
First, ensure these dependencies are installed:
npm install framer-motion @heroicons/react react-router-dom

### 2. CSS Styles
Add the following classes to my global CSS file (e.g., `index.css` or `globals.css`) under the `@layer components` directive (if using Tailwind) or just as regular CSS:

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

### 3. Component Code
Create a new file named `BottomNav.jsx` (or `.tsx`) and use the following code. Note that you may need to adjust the imports (like `useStore` or `cn`) depending on how state management and utility functions are handled in this new project.

```jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon as HomeOutline, HeartIcon as HeartOutline, ClipboardDocumentListIcon as OrdersOutline, ShoppingBagIcon as CartOutline } from '@heroicons/react/24/outline';
import { HomeIcon as HomeSolid, HeartIcon as HeartSolid, ClipboardDocumentListIcon as OrdersSolid, ShoppingBagIcon as CartSolid } from '@heroicons/react/24/solid';
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
    { id: 'home', to: '/', iconOutline: HomeOutline, iconSolid: HomeSolid, label: 'Home' },
    { id: 'saved', to: '/wishlist', iconOutline: HeartOutline, iconSolid: HeartSolid, label: 'Saved' },
    { id: 'orders', to: '/orders', iconOutline: OrdersOutline, iconSolid: OrdersSolid, label: 'Orders' },
    { id: 'cart', action: toggleCart, iconOutline: CartOutline, iconSolid: CartSolid, label: 'Cart', badge: cartCount }
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
    
    setActiveTab(tabs[closestIndex].id);
    animate(progress, closestIndex, { type: "spring", stiffness: 450, damping: 32 });

    const tabObj = tabs[closestIndex];
    if (tabObj.action) tabObj.action();
    else navigate(tabObj.to);
  };

  // Maps the lens position based on progress. Adjust these values if tab sizes change.
  const lensLeft = useTransform(progress, 
    [0, 1, 2, 3], 
    [6, 66, 126, 186]
  );
  const lensWidth = 44;

  return (
    <nav className="md:hidden fixed bottom-6 left-4 right-4 z-40 h-[64px] flex items-center justify-center pointer-events-none">
      <motion.div 
        onPanStart={handlePanStart}
        onPan={handlePan} 
        onPanEnd={handlePanEnd}
        className="relative flex items-center gap-[16px] pointer-events-auto bg-white/30 backdrop-blur-sm border border-white/40 p-[6px] rounded-full shadow-lg touch-none"
        style={{ width: 236, height: 56 }}
      >
        {/* ── Native iOS Frosted Glass Lens (z-20) ── */}
        <motion.div
          className="absolute top-[6px] bottom-[6px] optical-lens z-20 rounded-full pointer-events-none"
          style={{ left: lensLeft, width: lensWidth }}
        />

        {/* ── Tab Items ── */}
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
  const IconOutline = tab.iconOutline;
  const IconSolid = tab.iconSolid;

  const opacityRange = [0, 1, 2, 3].map(i => i === index ? 1 : 0);
  const textOpacity = useTransform(progress, [0, 1, 2, 3], opacityRange);
  const inverseOpacity = useTransform(textOpacity, v => 1 - v);

  return (
    <motion.button
      onClick={onClick}
      className="relative flex items-center justify-center w-[44px] h-[44px] rounded-full flex-shrink-0 cursor-pointer"
      aria-label={tab.label}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="relative w-[24px] h-[24px] flex-shrink-0">
          <motion.div style={{ opacity: inverseOpacity }} className="absolute inset-0 z-10 text-slate-500 flex items-center justify-center">
            <IconOutline className="w-[24px] h-[24px]" strokeWidth={1.5} />
          </motion.div>

          <motion.div style={{ opacity: textOpacity }} className="absolute inset-0 z-30 text-blue-600 drop-shadow-sm flex items-center justify-center">
            <IconSolid className="w-[24px] h-[24px]" />
          </motion.div>

          {tab.badge > 0 && (
            <span 
              className="absolute -top-[6px] -right-[6px] z-30 bg-blue-600 text-white text-[9px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center shadow-md"
            >
              {tab.badge > 9 ? '9+' : tab.badge}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
```

### Please integrate this component and render it inside the main App layout wrapper so it appears on mobile screens!
\`\`\`
