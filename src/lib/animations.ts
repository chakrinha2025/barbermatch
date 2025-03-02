
import { useEffect, useState } from 'react';

// Animation variants for staggered animations
export const staggeredFadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const slideUp = (delay: number = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const fadeIn = (delay: number = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const scaleIn = (delay: number = 0) => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

// Custom hook for detecting when element is in viewport
export function useInView() {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { ref: setRef, isInView };
}

// Animation classes for elements
export const animationClasses = {
  fadeIn: 'animate-fade-in',
  scaleIn: 'animate-scale-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideInRight: 'animate-slide-in-right',
  slideInLeft: 'animate-slide-in-left',
  pulse: 'animate-pulse',
  float: 'animate-float',
  spin: 'animate-spin',
  ping: 'animate-ping',
  bounce: 'animate-bounce',
  heartbeat: 'animate-heartbeat',
};

// Adicionando keyframes animação de batimento cardíaco (heartbeat) no tailwind.config.ts
