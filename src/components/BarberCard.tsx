
import { Scissors, Star } from "lucide-react";
import { animationClasses } from "@/lib/animations";

interface BarberCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  imageIndex: number;
  delay?: number;
}

// Função auxiliar para escolher a classe de delay com base no valor de delay
const getDelayClass = (delay: number): string => {
  if (delay === 0) return animationClasses.fadeIn;
  if (delay <= 100) return animationClasses.fadeInDelay100;
  if (delay <= 200) return animationClasses.fadeInDelay200;
  // Use apenas as classes disponíveis em animationClasses
  if (delay <= 300) return animationClasses.fadeInDelay200;
  if (delay <= 400) return animationClasses.fadeInDelay200;
  return animationClasses.fadeInDelay200;
};

export function BarberCard({ 
  name, 
  specialty, 
  rating, 
  reviewCount, 
  imageIndex,
  delay = 0 
}: BarberCardProps) {
  return (
    <div 
      className={`rounded-xl overflow-hidden glass card-hover ${getDelayClass(delay)}`}
    >
      <div className="aspect-[3/4] bg-secondary relative">
        {/* This would be an image in a real app */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
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
    </div>
  );
}

export default BarberCard;
