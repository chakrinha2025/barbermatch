
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'white' | 'dark';
  className?: string;
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  size = 'md', 
  variant = 'primary',
  className = ''
}) => {
  const getSize = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8';
      case 'md': return 'w-12 h-12';
      case 'lg': return 'w-16 h-16';
      case 'xl': return 'w-24 h-24';
      default: return 'w-12 h-12';
    }
  };

  const getColor = () => {
    switch (variant) {
      case 'primary': return 'text-primary';
      case 'white': return 'text-white';
      case 'dark': return 'text-gray-800 dark:text-white';
      default: return 'text-primary';
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.1
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className={`${getSize()} ${getColor()} ${className} flex items-center justify-center`}
      initial="hidden"
      animate="visible"
      variants={logoVariants}
    >
      <motion.svg 
        viewBox="0 0 40 40" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <motion.path 
          variants={itemVariants}
          d="M12 8L20 2L28 8V22L20 28L12 22V8Z" 
          fill="currentColor" 
          stroke="currentColor" 
          strokeWidth="1.5" 
        />
        <motion.path 
          variants={itemVariants}
          d="M20 28V38" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        <motion.path 
          variants={itemVariants}
          d="M14 32H26" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
        />
        <motion.path 
          variants={itemVariants}
          d="M9 16L20 22L31 16" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
        />
      </motion.svg>
    </motion.div>
  );
};

export default AnimatedLogo;
export { AnimatedLogo };
