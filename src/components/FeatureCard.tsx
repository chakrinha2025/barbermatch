import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  delay = 0,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    setIsHovered(false);
    
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };
  
  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-xl p-6 border border-primary/5 bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-sm dark:from-gray-900/70 dark:via-gray-900/80 dark:to-gray-900/70 shadow-premium hover:shadow-premium-hover transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 10, duration: 0.5 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Gradientes de fundo animados */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 dark:from-gray-900/10 dark:via-gray-900/5 dark:to-primary/5"></div>
      
      {/* Conteúdo */}
      <div className="relative z-10">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="mb-4 p-3 bg-primary/10 backdrop-blur-sm rounded-lg inline-flex">
              {icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          
          <div className="mt-6 flex justify-end">
            <motion.span 
              className="text-primary text-sm font-medium inline-flex items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
              transition={{ duration: 0.3 }}
            >
              Saiba mais 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;

