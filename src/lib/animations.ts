
// Define animation classes for reuse throughout the application
export const animationClasses = {
  fadeIn: 'animate-fadeIn',
  fadeInDelay100: 'animate-fadeInDelay100',
  fadeInDelay200: 'animate-fadeInDelay200',
  fadeInDelay300: 'animate-fadeInDelay300',
  fadeInDelay400: 'animate-fadeInDelay400',
  fadeInDelay500: 'animate-fadeInDelay500',
  fadeInUp: 'animate-fadeInUp',
  fadeInDown: 'animate-fadeInDown',
  zoomIn: 'animate-zoomIn',
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
  float: 'animate-float',
  shimmer: 'animate-shimmer',
  slideInLeft: 'animate-slideInLeft',
  slideInRight: 'animate-slideInRight',
  slideInDown: 'animate-slideInDown',
  slideInUp: 'animate-slideInUp',
  heartbeat: 'animate-heartbeat',
  tiltLeft: 'animate-tiltLeft',
  tiltRight: 'animate-tiltRight',
  rotate3D: 'animate-rotate3D',
  float3D: 'animate-float3D',
};

// Utility functions for working with widths and heights
/**
 * Calculate width percentage for progress bars and other elements
 * Accepts either a single percentage value or a value and max to calculate percentage
 * @param valueOrPercentage - Either the direct percentage or the current value
 * @param max - Optional maximum value to calculate percentage
 * @returns CSS width class string
 */
export const calcWidthPercentage = (valueOrPercentage: number, max?: number): string => {
  // If max is provided, calculate percentage
  const percentage = max !== undefined ? (valueOrPercentage / max) * 100 : valueOrPercentage;
  
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  // Round to nearest 5% for cleaner CSS classes
  const roundedPercentage = Math.round(clampedPercentage / 5) * 5;
  
  return `w-[${roundedPercentage}%]`;
};

export const getWidthClass = (percentage: number): string => {
  if (percentage <= 25) return 'w-1/4';
  if (percentage <= 33) return 'w-1/3';
  if (percentage <= 50) return 'w-1/2';
  if (percentage <= 66) return 'w-2/3';
  if (percentage <= 75) return 'w-3/4';
  return 'w-full';
};

export const getHeightClass = (percentage: number): string => {
  if (percentage <= 25) return 'h-1/4';
  if (percentage <= 33) return 'h-1/3';
  if (percentage <= 50) return 'h-1/2';
  if (percentage <= 66) return 'h-2/3';
  if (percentage <= 75) return 'h-3/4';
  return 'h-full';
};

// Helper function to choose an animation delay class based on input value
export const getDelayClass = (delay: number): string => {
  if (delay === 0) return animationClasses.fadeIn;
  if (delay <= 100) return animationClasses.fadeInDelay100;
  if (delay <= 200) return animationClasses.fadeInDelay200;
  if (delay <= 300) return animationClasses.fadeInDelay300;
  if (delay <= 400) return animationClasses.fadeInDelay400;
  if (delay <= 500) return animationClasses.fadeInDelay500;
  return animationClasses.fadeInDelay500;
};

/**
 * Generate a 3D transform string for creating perspective effects
 * @param rotateX - X-axis rotation in degrees
 * @param rotateY - Y-axis rotation in degrees
 * @param rotateZ - Z-axis rotation in degrees
 * @param translateZ - Z-axis translation in pixels
 * @returns CSS transform string
 */
export const generate3DTransform = (
  rotateX = 0, 
  rotateY = 0, 
  rotateZ = 0, 
  translateZ = 0
): string => {
  return `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateZ(${translateZ}px)`;
};

/**
 * Generate a gradient background with appropriate contrasting text color
 * @param startColor - Starting color of gradient (hex code)
 * @param endColor - Ending color of gradient (hex code)
 * @param direction - Direction of gradient (e.g., 'to right', 'to bottom')
 * @returns CSS classes for background and text color
 */
export const generateGradientClasses = (
  startColor: string, 
  endColor: string, 
  direction = 'to right'
): string => {
  return `bg-gradient-[${direction},${startColor},${endColor}]`;
};
