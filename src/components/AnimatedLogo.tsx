
import { useState, useEffect } from 'react';
import { Scissors, Heart } from 'lucide-react';

export function AnimatedLogo({ size = 'default' }: { size?: 'small' | 'default' | 'large' }) {
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Configurações de tamanho baseadas no parâmetro
  const sizes = {
    small: {
      container: 'h-8 w-8',
      icon: 16,
      text: 'text-lg'
    },
    default: {
      container: 'h-10 w-10',
      icon: 20,
      text: 'text-xl'
    },
    large: {
      container: 'h-14 w-14',
      icon: 28,
      text: 'text-2xl'
    }
  };

  const sizeConfig = sizes[size];
  
  // Efeito para ativar a animação periodicamente
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Resetar a animação após ela completar
      setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="flex items-center gap-2 cursor-pointer" 
      onMouseEnter={() => setIsAnimating(true)}
      onMouseLeave={() => setTimeout(() => setIsAnimating(false), 2000)}
    >
      <div className={`relative ${sizeConfig.container} flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white shadow-premium overflow-hidden`}>
        <Scissors 
          size={sizeConfig.icon} 
          className={`transform -rotate-45 transition-all duration-500 ${isAnimating ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} 
        />
        <Heart 
          size={sizeConfig.icon} 
          className={`absolute transition-all duration-500 text-white ${isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          fill="white"
        />
        <div className={`absolute inset-0 bg-gradient-to-tr from-primary/0 to-white/30 transition-opacity duration-500 ${isAnimating ? 'animate-ping opacity-100' : 'opacity-0'}`}></div>
      </div>
      <span className={`font-heading font-bold ${sizeConfig.text} tracking-tight`}>
        Barber<span className="text-primary">Match</span>
      </span>
    </div>
  );
}

export default AnimatedLogo;
