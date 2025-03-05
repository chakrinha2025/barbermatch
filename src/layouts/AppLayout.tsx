import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppNavigation } from '@/components/AppNavigation';

// Transições entre páginas
const pageVariants = {
  initial: {
    opacity: 0,
    y: 10
  },
  in: {
    opacity: 1,
    y: 0
  },
  out: {
    opacity: 0,
    y: -10
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3
};

export function AppLayout() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="container px-4 pb-20 md:pb-8 md:pl-72 pt-6"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
    </div>
  );
} 