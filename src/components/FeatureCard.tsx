
import { ReactNode } from 'react';
import { animationClasses } from '@/lib/animations';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <div 
      className={`p-6 rounded-2xl glass card-hover ${animationClasses.fadeIn}`} 
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default FeatureCard;
