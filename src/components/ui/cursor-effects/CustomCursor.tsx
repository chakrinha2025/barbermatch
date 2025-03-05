import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './styles.css';

interface CustomCursorProps {
  variant?: 'primary' | 'inverted' | 'rainbow';
  size?: 'small' | 'medium' | 'large';
  enableRipple?: boolean;
  enableTrail?: boolean;
  trailAmount?: number;
}

type Position = {
  x: number;
  y: number;
};

type TrailDot = {
  id: number;
  position: Position;
  opacity: number;
  scale: number;
};

export const CustomCursor: React.FC<CustomCursorProps> = ({
  variant = 'primary',
  size = 'medium',
  enableRipple = false,
  enableTrail = false,
  trailAmount = 5,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState<Position | null>(null);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailTimerRef = useRef<number | null>(null);
  
  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  // Spring physics for smooth movement
  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);
  
  // Get cursor size based on prop
  const getCursorSize = () => {
    switch (size) {
      case 'small': return 16;
      case 'large': return 36;
      case 'medium':
      default: return 24;
    }
  };
  
  const cursorSize = getCursorSize();
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      cursorX.set(clientX);
      cursorY.set(clientY);
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.onclick !== null ||
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    
    const handleClick = (e: MouseEvent) => {
      if (enableRipple) {
        setClickPosition({ x: e.clientX, y: e.clientY });
        setTimeout(() => setClickPosition(null), 600);
      }
    };
    
    document.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('click', handleClick);
    
    // Initialize cursor position to prevent jumps on load
    const initialPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    setMousePosition(initialPos);
    cursorX.set(initialPos.x);
    cursorY.set(initialPos.y);
    
    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('click', handleClick);
      
      if (trailTimerRef.current) {
        window.clearInterval(trailTimerRef.current);
      }
    };
  }, [cursorX, cursorY, enableRipple]);
  
  // Handle the trail effect
  useEffect(() => {
    if (!enableTrail) return;
    
    const updateTrail = () => {
      setTrail(prevTrail => {
        // Add new position to beginning of trail
        const newTrail = [
          {
            id: Date.now(),
            position: { ...mousePosition },
            opacity: 0.8,
            scale: 0.8
          },
          ...prevTrail.slice(0, trailAmount - 1).map(dot => ({
            ...dot,
            opacity: dot.opacity * 0.92,
            scale: dot.scale * 0.95
          }))
        ].filter(dot => dot.opacity > 0.08);
        
        return newTrail;
      });
    };
    
    trailTimerRef.current = window.setInterval(updateTrail, 50);
    
    return () => {
      if (trailTimerRef.current) {
        window.clearInterval(trailTimerRef.current);
        trailTimerRef.current = null;
      }
    };
  }, [enableTrail, mousePosition, trailAmount]);
  
  // Don't render cursor on touch devices
  if (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) {
    return null;
  }
  
  return (
    <>
      {/* Trail dots */}
      {enableTrail && trail.map((dot, i) => (
        <motion.div
          key={dot.id}
          className={`cursor-trail cursor-${variant}`}
          style={{
            position: 'fixed',
            left: dot.position.x,
            top: dot.position.y,
            width: cursorSize * 0.5,
            height: cursorSize * 0.5,
            x: '-50%',
            y: '-50%',
            opacity: dot.opacity,
            scale: dot.scale,
            zIndex: 9999 - i,
          }}
        />
      ))}
      
      {/* Main cursor */}
      <motion.div
        className={`custom-cursor ${isVisible ? 'visible' : ''} cursor-${variant} ${isPointer ? 'is-pointer' : ''}`}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: cursorSize,
          height: cursorSize,
          zIndex: 10000,
          pointerEvents: 'none',
        }}
      />
      
      {/* Click ripple effect */}
      {clickPosition && (
        <motion.div
          className={`cursor-ripple cursor-${variant}`}
          initial={{ scale: 0, opacity: 0.8, x: '-50%', y: '-50%' }}
          animate={{ scale: 2, opacity: 0 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: clickPosition.x,
            top: clickPosition.y,
            width: cursorSize * 2,
            height: cursorSize * 2,
            borderRadius: '50%',
            zIndex: 9997,
            pointerEvents: 'none',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor; 