
import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  colorScheme?: "primary" | "secondary" | "purple" | "blue" | "green" | "amber" | "default";
  intensity?: "light" | "medium" | "strong";
}

const Card3D = React.forwardRef<
  HTMLDivElement,
  Card3DProps
>(({ className, children, colorScheme = "default", intensity = "medium", ...props }, ref) => {
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);
  const [scale, setScale] = React.useState(1);
  const cardRef = React.useRef<HTMLDivElement>(null);
  
  // Determine background color based on colorScheme and intensity
  const getBackground = () => {
    const intensityMap = {
      light: { opacity: 10, darkOpacity: 20 },
      medium: { opacity: 20, darkOpacity: 30 },
      strong: { opacity: 30, darkOpacity: 40 }
    };
    
    const { opacity, darkOpacity } = intensityMap[intensity];
    
    switch (colorScheme) {
      case "primary":
        return `bg-gradient-to-br from-primary/${opacity} to-primary/${opacity - 5} dark:from-primary/${darkOpacity} dark:to-primary/${darkOpacity - 5}`;
      case "secondary":
        return `bg-gradient-to-br from-secondary/${opacity} to-secondary/${opacity - 5} dark:from-secondary/${darkOpacity} dark:to-secondary/${darkOpacity - 5}`;
      case "purple":
        return `bg-gradient-to-br from-purple-500/${opacity} to-indigo-500/${opacity - 5} dark:from-purple-900/${darkOpacity} dark:to-indigo-900/${darkOpacity - 5}`;
      case "blue":
        return `bg-gradient-to-br from-blue-500/${opacity} to-cyan-500/${opacity - 5} dark:from-blue-900/${darkOpacity} dark:to-cyan-900/${darkOpacity - 5}`;
      case "green":
        return `bg-gradient-to-br from-emerald-500/${opacity} to-green-500/${opacity - 5} dark:from-emerald-900/${darkOpacity} dark:to-green-900/${darkOpacity - 5}`;
      case "amber":
        return `bg-gradient-to-br from-amber-500/${opacity} to-orange-500/${opacity - 5} dark:from-amber-900/${darkOpacity} dark:to-orange-900/${darkOpacity - 5}`;
      default:
        return `bg-card`;
    }
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    // Calculate rotation based on mouse position (max ±8 degrees)
    const rotateYValue = ((e.clientX - cardCenterX) / (rect.width / 2)) * 8;
    const rotateXValue = ((e.clientY - cardCenterY) / (rect.height / 2)) * 8;
    
    setRotateX(-rotateXValue);
    setRotateY(rotateYValue);
  };
  
  const handleMouseEnter = () => {
    setScale(1.02);
  };
  
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
  };
  
  return (
    <div
      ref={ref}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d"
      }}
      className={cn("relative", className)}
      {...props}
    >
      <motion.div
        ref={cardRef}
        className={cn(
          "rounded-lg border text-card-foreground shadow-sm w-full h-full",
          getBackground()
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20
        }}
        style={{
          transformStyle: "preserve-3d"
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: "translateZ(20px)",
            transformStyle: "preserve-3d"
          }}
        >
          {children}
        </div>
        
        {/* Shine effect */}
        <div 
          className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            transform: "translateZ(5px)"
          }}
        />
      </motion.div>
    </div>
  )
})
Card3D.displayName = "Card3D"

// Re-export the other card components from the original card.tsx
export { Card3D }
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./card"
