import React from 'react';
import { cn } from "@/lib/utils";

interface PremiumCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  buttonText?: string;
  onSelect?: () => void;
}

export function PremiumCard({
  title,
  description,
  price,
  features,
  isPopular = false,
  buttonText = "Selecionar",
  onSelect
}: PremiumCardProps) {
  return (
    <div className={cn(
      "relative flex flex-col rounded-2xl border p-6 shadow-sm transition-all duration-200",
      "hover:shadow-lg hover:scale-[1.02]",
      isPopular ? "border-primary bg-primary/5" : "border-border"
    )}>
      {isPopular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
          Mais Popular
        </div>
      )}
      
      <div className="mb-5 space-y-2">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      <div className="mb-5">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Gratuito' && <span className="text-muted-foreground">/mês</span>}
      </div>
      
      <ul className="mb-6 space-y-2 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-sm">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="mr-2 h-5 w-5 text-primary" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                clipRule="evenodd" 
              />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      <button
        onClick={onSelect}
        className={cn(
          "mt-auto rounded-lg px-4 py-2 text-sm font-medium transition-colors",
          isPopular 
            ? "bg-primary text-primary-foreground hover:bg-primary/90" 
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        {buttonText}
      </button>
    </div>
  );
} 