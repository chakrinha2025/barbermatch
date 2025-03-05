import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import './styles.css';

interface ParallaxLayerProps {
  speed?: number;
  className?: string;
  children: React.ReactNode;
  offset?: number;
}

const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  children,
  speed = 0.5,
  className,
  offset = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, speed * 100]);
  
  return (
    <motion.div
      ref={ref}
      className={cn('parallax-layer', className)}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
  bgParallaxSpeed?: number;
  bgOverlayOpacity?: number;
  bgOverlayColor?: string;
}

// Estendendo a interface do componente para incluir a propriedade Layer
interface ParallaxSectionComponent extends React.FC<ParallaxSectionProps> {
  Layer: React.FC<ParallaxLayerProps>;
}

export const ParallaxSection: ParallaxSectionComponent = ({
  children,
  className,
  bgImage,
  bgParallaxSpeed = 0.2,
  bgOverlayOpacity = 0.5,
  bgOverlayColor = '#000000'
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  
  useEffect(() => {
    const updateHeight = () => {
      if (sectionRef.current) {
        setSectionHeight(sectionRef.current.offsetHeight);
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });
  
  const bgY = useTransform(scrollYProgress, [0, 1], [0, sectionHeight * bgParallaxSpeed]);
  
  return (
    <div
      ref={sectionRef}
      className={cn('parallax-section', className)}
    >
      {bgImage && (
        <motion.div
          className="parallax-bg"
          style={{
            y: bgY,
            backgroundImage: `url(${bgImage})`,
          }}
        >
          <div
            className="parallax-overlay"
            style={{
              backgroundColor: bgOverlayColor,
              opacity: bgOverlayOpacity
            }}
          />
        </motion.div>
      )}
      
      <div className="parallax-content">
        {children}
      </div>
    </div>
  );
};

ParallaxSection.Layer = ParallaxLayer;

export default ParallaxSection; 