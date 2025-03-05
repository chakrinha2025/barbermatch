
import { Scissors, Star } from "lucide-react";
import { animationClasses, getDelayClass } from "@/lib/animations";
import AnimatedCard from "./AnimatedCard";

interface BarberCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  imageIndex: number;
  delay?: number;
}

const CARD_COLORS = [
  "bg-gradient-to-br from-purple-500/20 to-indigo-500/20 dark:from-purple-950/30 dark:to-indigo-950/30",
  "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 dark:from-blue-950/30 dark:to-cyan-950/30",
  "bg-gradient-to-br from-emerald-500/20 to-green-500/20 dark:from-emerald-950/30 dark:to-green-950/30",
  "bg-gradient-to-br from-amber-500/20 to-orange-500/20 dark:from-amber-950/30 dark:to-orange-950/30"
];

export function BarberCard({ 
  name, 
  specialty, 
  rating, 
  reviewCount, 
  imageIndex,
  delay = 0 
}: BarberCardProps) {
  // Get a color based on image index to ensure it's consistent
  const cardColor = CARD_COLORS[imageIndex % CARD_COLORS.length];
  
  return (
    <AnimatedCard 
      backgroundColor={cardColor}
      delay={delay}
      className="card-hover"
    >
      <div className="aspect-[3/4] relative">
        {/* This would be an image in a real app */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center transform transition-transform group-hover:scale-110">
            <span className="font-bold text-primary">{name.charAt(0)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{specialty}</p>
        
        <div className="flex items-center gap-1">
          <Star size={16} className="text-amber-500 fill-amber-500" />
          <span className="font-medium">{rating}</span>
          <span className="text-xs text-muted-foreground">({reviewCount} avaliações)</span>
        </div>
      </div>
    </AnimatedCard>
  );
}

export default BarberCard;
