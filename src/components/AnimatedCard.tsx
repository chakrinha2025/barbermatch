
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  delay?: number;
}

export function AnimatedCard({ 
  children, 
  className = "",
  backgroundColor = "bg-secondary",
  delay = 0 
}: AnimatedCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position (reduced from 15 to 8 degrees for smoother movement)
    const rotateYValue = ((e.clientX - cardCenterX) / (rect.width / 2)) * 8;
    const rotateXValue = ((e.clientY - cardCenterY) / (rect.height / 2)) * 8;
    
    setRotateX(-rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseEnter = () => {
    setScale(1.03); // Reduced scale for smoother animation
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${backgroundColor} transition-shadow hover:shadow-xl ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          delay: delay,
          duration: 0.3 // Faster animation
        }
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div
        className="relative z-10 w-full h-full"
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: scale
        }}
        transition={{
          type: "spring",
          stiffness: 400, // Higher stiffness for faster response
          damping: 20
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center center"
        }}
      >
        <div 
          className="relative z-10 w-full h-full group"
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {children}
        </div>
        
        {/* Light effect on hover */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
      </motion.div>
      
      {/* Card highlight effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
    </motion.div>
  );
}

export default AnimatedCard;
