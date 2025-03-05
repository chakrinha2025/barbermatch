import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import './styles.css';

interface AnimatedBackgroundProps {
  className?: string;
  variant?: 'gradient' | 'particles' | 'waves' | 'grid';
  intensity?: number;
  color?: string;
  secondaryColor?: string;
  interactOnHover?: boolean;
  children?: React.ReactNode;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  className,
  variant = 'gradient',
  intensity = 5,
  color,
  secondaryColor,
  interactOnHover = true,
  children
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; speed: number }[]>([]);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
      
      const handleResize = () => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  useEffect(() => {
    if (variant === 'particles' && dimensions.width > 0) {
      // Generate particles
      const particleCount = Math.floor(dimensions.width * dimensions.height / 15000) * intensity;
      const newParticles = Array.from({ length: particleCount }).map(() => ({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1
      }));
      setParticles(newParticles);
    }
  }, [variant, dimensions, intensity]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (interactOnHover) {
      const rect = e.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };
  
  const getBackgroundStyle = () => {
    const baseStyle: React.CSSProperties = {};
    
    switch (variant) {
      case 'gradient':
        baseStyle.background = color && secondaryColor
          ? `linear-gradient(45deg, ${color}, ${secondaryColor})`
          : 'linear-gradient(45deg, var(--gradient-start, hsl(var(--primary))), var(--gradient-end, hsl(var(--secondary))))';
        return baseStyle;
      case 'particles':
      case 'waves':
      case 'grid':
        // Cores serão tratadas no CSS através de variáveis
        return baseStyle;
      default:
        return baseStyle;
    }
  };
  
  return (
    <motion.div
      className={cn(
        'animated-background',
        `background-${variant}`,
        className
      )}
      style={{
        ...getBackgroundStyle(),
        '--mouse-x': `${mousePosition.x}px`,
        '--mouse-y': `${mousePosition.y}px`,
        '--intensity': intensity.toString(),
        ...(color && { '--primary-color': color }),
        ...(secondaryColor && { '--secondary-color': secondaryColor }),
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {variant === 'gradient' && (
        <motion.div 
          className="gradient-overlay"
          animate={{ 
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) ${30 * intensity}%)` 
          }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {variant === 'particles' && (
        <div className="particles-container">
          {particles.map((particle, index) => (
            <motion.div
              key={index}
              className="particle"
              initial={{ 
                x: particle.x, 
                y: particle.y, 
                scale: particle.size / 2 
              }}
              animate={{ 
                y: [particle.y, particle.y - 200 * particle.speed], 
                x: [
                  particle.x, 
                  particle.x + Math.sin(index) * 50 * particle.speed
                ] 
              }}
              transition={{ 
                repeat: Infinity, 
                repeatType: "reverse", 
                duration: 10 - particle.speed * 5,
                ease: "linear" 
              }}
              style={{ 
                width: `${particle.size}px`, 
                height: `${particle.size}px` 
              }}
            />
          ))}
        </div>
      )}
      
      {variant === 'waves' && (
        <div className="waves-container">
          {Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              className="wave"
              style={{ 
                opacity: 0.1 + index * 0.05,
                animationDelay: `${index * 0.4}s`
              }}
            />
          ))}
        </div>
      )}
      
      {variant === 'grid' && (
        <div className="grid-container">
          <div className="grid-lines horizontal">
            {Array.from({ length: Math.floor(dimensions.height / 50) }).map((_, index) => (
              <div key={`h-${index}`} className="grid-line horizontal" style={{ top: `${index * 50}px` }} />
            ))}
          </div>
          <div className="grid-lines vertical">
            {Array.from({ length: Math.floor(dimensions.width / 50) }).map((_, index) => (
              <div key={`v-${index}`} className="grid-line vertical" style={{ left: `${index * 50}px` }} />
            ))}
          </div>
          <motion.div 
            className="grid-highlight"
            animate={{ 
              x: mousePosition.x - 150,
              y: mousePosition.y - 150
            }}
            transition={{ type: 'spring', damping: 20 }}
          />
        </div>
      )}
      
      {children}
    </motion.div>
  );
}; 