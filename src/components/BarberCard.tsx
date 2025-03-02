
import { Star } from 'lucide-react';
import { animationClasses } from '@/lib/animations';

interface BarberCardProps {
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  imageIndex: number;
  delay?: number;
}

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
      className={`rounded-xl overflow-hidden glass card-hover ${animationClasses.fadeIn}`}
      style={{ animationDelay: `${delay}ms` }}
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
          <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
        </div>
      </div>
    </div>
  );
}

export default BarberCard;
