import { useEffect, useState } from 'react';
import { keyframes } from 'tailwindcss/lib/util/flattenColorPalette';

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
  fadeIn: 'animate-fadeIn',
  fadeInDelay100: 'animate-fadeInDelay100',
  fadeInDelay200: 'animate-fadeInDelay200',
  fadeInUp: 'animate-fadeInUp',
  fadeInDown: 'animate-fadeInDown',
  zoomIn: 'animate-zoomIn',
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  float: 'animate-float',
  shimmer: 'animate-shimmer',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideInRight: 'animate-slide-in-right',
  slideInLeft: 'animate-slide-in-left',
  heartbeat: 'animate-heartbeat',
};

// Keyframes para animações personalizadas
export const customKeyframes = {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  fadeInUp: {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeInDown: {
    '0%': { opacity: '0', transform: 'translateY(-20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  zoomIn: {
    '0%': { opacity: '0', transform: 'scale(0.95)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },
  float: {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' },
  },
  shimmer: {
    '0%': { transform: 'translateX(-100%)' },
    '100%': { transform: 'translateX(100%)' },
  },
  // Novas animações para os cartões de recursos
  fadeInUp1: {
    '0%': { opacity: '0', transform: 'translateY(30px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeInUp2: {
    '0%': { opacity: '0', transform: 'translateY(40px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  fadeInUp3: {
    '0%': { opacity: '0', transform: 'translateY(50px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
  pulseGlow: {
    '0%': { boxShadow: '0 0 0 0 rgba(var(--primary-rgb), 0.4)' },
    '70%': { boxShadow: '0 0 0 15px rgba(var(--primary-rgb), 0)' },
    '100%': { boxShadow: '0 0 0 0 rgba(var(--primary-rgb), 0)' },
  }
};

// Configurações de animações para o Tailwind
export const animations = {
  keyframes: customKeyframes,
  animation: {
    fadeIn: 'fadeIn 0.7s ease-in forwards',
    fadeInDelay100: 'fadeIn 0.7s ease-in 0.1s forwards',
    fadeInDelay200: 'fadeIn 0.7s ease-in 0.2s forwards',
    fadeInUp: 'fadeInUp 0.7s ease-out forwards',
    fadeInDown: 'fadeInDown 0.7s ease-out forwards',
    zoomIn: 'zoomIn 0.5s ease-out forwards',
    float: 'float 3s ease-in-out infinite',
    shimmer: 'shimmer 2s infinite linear',
    // Novas animações para os cartões de recursos
    'fade-in-up-1': 'fadeInUp1 0.6s ease-out forwards',
    'fade-in-up-2': 'fadeInUp2 0.8s ease-out 0.1s forwards',
    'fade-in-up-3': 'fadeInUp3 1s ease-out 0.2s forwards',
    'pulse-glow': 'pulseGlow 2s infinite',
  },
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
