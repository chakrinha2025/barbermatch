
import React from 'react';
import AnimatedCard from './AnimatedCard';
import { Lock } from 'lucide-react';

interface Feature3DCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  className?: string;
  colorScheme?: number;
  isPremium?: boolean;
  onPremiumClick?: () => void;
}

const COLOR_SCHEMES = [
  "bg-gradient-to-br from-purple-500/10 to-indigo-500/10 dark:from-purple-950/20 dark:to-indigo-950/20",
  "bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-950/20 dark:to-cyan-950/20",
  "bg-gradient-to-br from-emerald-500/10 to-green-500/10 dark:from-emerald-950/20 dark:to-green-950/20",
  "bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-950/20 dark:to-orange-950/20",
  "bg-gradient-to-br from-red-500/10 to-pink-500/10 dark:from-red-950/20 dark:to-pink-950/20",
  "bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 dark:from-fuchsia-950/20 dark:to-pink-950/20"
];

export function Feature3DCard({ 
  title, 
  description, 
  icon, 
  delay = 0,
  className = "",
  colorScheme = 0,
  isPremium = false,
  onPremiumClick
}: Feature3DCardProps) {
  const cardColor = COLOR_SCHEMES[colorScheme % COLOR_SCHEMES.length];
  
  return (
    <AnimatedCard 
      backgroundColor={cardColor}
      delay={delay / 10} // Reducing the delay to make cards appear faster
      className={`h-full ${className}`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="mb-4 p-3 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 flex items-center">
          {title}
          {isPremium && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs font-medium">
              <Lock size={12} className="mr-1" /> Premium
            </span>
          )}
        </h3>
        <p className="text-muted-foreground flex-grow">{description}</p>
        
        <div className="mt-4 flex justify-end">
          {isPremium ? (
            <button 
              onClick={onPremiumClick}
              className="text-primary text-sm font-medium flex items-center"
            >
              Ver planos premium
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
                <path d="M4.16675 10H15.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.8334 5L15.8334 10L10.8334 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div className="text-primary text-sm font-medium flex items-center">
              Saiba mais
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
                <path d="M4.16675 10H15.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.8334 5L15.8334 10L10.8334 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          )}
        </div>
      </div>
    </AnimatedCard>
  );
}

export default Feature3DCard;
