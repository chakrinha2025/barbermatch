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
  fadeInDelay100: 'animate-fade-in delay-100',
  fadeInDelay200: 'animate-fade-in delay-200',
  fadeInDelay300: 'animate-fade-in delay-300',
  fadeInDelay400: 'animate-fade-in delay-400',
  fadeInDelay500: 'animate-fade-in delay-500',
  scaleIn: 'animate-scale-in',
  scaleInDelay100: 'animate-scale-in delay-100',
  scaleInDelay200: 'animate-scale-in delay-200',
  scaleInDelay300: 'animate-scale-in delay-300',
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

// Função para gerar classes de porcentagem de largura (para barras de progresso)
export const getWidthClass = (percentage: number): string => {
  // Arredondar para o valor mais próximo de 5% para otimizar
  const roundedPercentage = Math.round(percentage / 5) * 5;
  return `w-[${roundedPercentage}%]`;
};

// Função para gerar classes de porcentagem de altura
export const getHeightClass = (percentage: number): string => {
  // Arredondar para o valor mais próximo de 5% para otimizar
  const roundedPercentage = Math.round(percentage / 5) * 5;
  return `h-[${roundedPercentage}%]`;
};

// Função para calcular classes de largura baseadas em um valor e um máximo
export const calcWidthPercentage = (value: number, max: number): string => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const roundedPercentage = Math.round(percentage / 5) * 5;
  return `w-[${roundedPercentage}%]`;
};

// Adicionando keyframes animação de batimento cardíaco (heartbeat) no tailwind.config.ts
