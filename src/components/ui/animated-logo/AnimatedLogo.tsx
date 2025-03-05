import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';
import { cn } from '@/lib/utils';
import './styles.css';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'minimal' | 'expanded';
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const logoVariants = {
  default: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  },
  hover: {
    scissors: {
      rotate: [0, -15, 0, 15, 0],
      transition: { duration: 1.2, ease: "easeInOut" }
    },
    text: {
      y: [0, -5, 0],
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  }
};

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  size = 'md',
  variant = 'default',
  className,
  onMouseEnter,
  onMouseLeave
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    onMouseEnter && onMouseEnter(e);
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
    onMouseLeave && onMouseLeave(e);
  };
  
  return (
    <motion.div 
      className={cn(
        'animated-logo',
        `logo-${size}`,
        `logo-${variant}`,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial="initial"
      animate="animate"
    >
      <motion.div 
        className="logo-icon"
        animate={isHovered ? "hover" : "animate"}
        variants={{
          hover: logoVariants.hover.scissors
        }}
      >
        <Scissors className="scissors-icon" />
        {variant === 'expanded' && (
          <motion.svg
            className="logo-circle"
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            fill="none"
          >
            <motion.circle 
              cx="50" 
              cy="50" 
              r="45" 
              stroke="currentColor"
              strokeWidth="2"
              variants={logoVariants.default}
            />
          </motion.svg>
        )}
      </motion.div>
      
      {variant !== 'minimal' && (
        <motion.div 
          className="logo-text"
          animate={isHovered ? "hover" : "animate"}
          variants={{
            hover: logoVariants.hover.text
          }}
        >
          <motion.span 
            className="logo-text-barber"
            variants={logoVariants.default}
          >
            Barber
          </motion.span>
          <motion.span 
            className="logo-text-match"
            variants={logoVariants.default}
          >
            Match
          </motion.span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedLogo; 