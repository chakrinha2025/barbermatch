import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import './styles.css';

interface MotionCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  withBorder?: boolean;
  withShadow?: boolean;
  glareEffect?: boolean;
  rotateIntensity?: number;
  translateIntensity?: number;
  damping?: number;
  perspective?: number;
}

export const MotionCard: React.FC<MotionCardProps> = ({
  children,
  className,
  withBorder = false,
  withShadow = true,
  glareEffect = true,
  rotateIntensity = 15,
  translateIntensity = 5,
  damping = 30,
  perspective = 1000,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glareOpacityValue, setGlareOpacityValue] = useState(0);
  
  // Motion values for rotation and position
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const translateX = useMotionValue(0);
  const translateY = useMotionValue(0);
  
  // Add spring to make movement smoother
  const springRotateX = useSpring(rotateX, { damping });
  const springRotateY = useSpring(rotateY, { damping });
  const springTranslateX = useSpring(translateX, { damping });
  const springTranslateY = useSpring(translateY, { damping });
  
  // For glare effect
  const glareX = useTransform(rotateY, [-rotateIntensity, 0, rotateIntensity], [0, 50, 100]);
  const glareY = useTransform(rotateX, [rotateIntensity, 0, -rotateIntensity], [0, 50, 100]);
  
  // Update glare opacity based on rotation values
  useEffect(() => {
    const unsubscribeX = springRotateX.onChange(updateGlareOpacity);
    const unsubscribeY = springRotateY.onChange(updateGlareOpacity);
    
    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [springRotateX, springRotateY, isHovered, rotateIntensity]);
  
  const updateGlareOpacity = () => {
    const rotX = springRotateX.get();
    const rotY = springRotateY.get();
    const distance = Math.sqrt(rotX * rotX + rotY * rotY);
    const opacity = isHovered ? Math.min(distance / rotateIntensity * 0.3, 0.3) : 0;
    setGlareOpacityValue(opacity);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position relative to center
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Normalize to -1 to 1 range
    const normalizedX = mouseX / (rect.width / 2);
    const normalizedY = mouseY / (rect.height / 2);
    
    rotateX.set(-normalizedY * rotateIntensity);
    rotateY.set(normalizedX * rotateIntensity);
    
    // Translate the card a bit based on mouse position
    translateX.set(normalizedX * translateIntensity);
    translateY.set(normalizedY * translateIntensity);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    translateX.set(0);
    translateY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Separar as propriedades específicas do motion.div das props extras
  const motionProps: HTMLMotionProps<"div"> = {
    ...props,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: handleMouseEnter,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 }
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'motion-card',
        withBorder && 'with-border',
        withShadow && 'with-shadow',
        className
      )}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
      }}
      {...motionProps}
    >
      <motion.div
        className="motion-card-content"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          x: springTranslateX,
          y: springTranslateY,
        }}
      >
        {children}
        
        {glareEffect && (
          <motion.div
            className="motion-card-glare"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 80%)`,
              opacity: glareOpacityValue,
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default MotionCard; 