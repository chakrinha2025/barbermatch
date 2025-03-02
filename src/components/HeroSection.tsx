
import { useState, useEffect } from 'react';
import { animationClasses } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className={`space-y-8 ${loaded ? animationClasses.fadeIn : 'opacity-0'}`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full border text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse"></span>
              Revolucionando a Experiência de Barbearia
            </div>
            
            <h1 className="heading-1">
              Encontre seu <span className="text-gradient">Corte Perfeito</span> com IA
            </h1>
            
            <p className="sub-heading max-w-xl">
              O BarberMatch usa IA e RA para ajudar você a visualizar cortes, encontrar o barbeiro perfeito e agendar horários sem complicações.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#download"
                className="bg-primary text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-premium-hover"
              >
                Começar Agora <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#virtual-try-on"
                className="border px-6 py-3 rounded-full font-medium flex items-center justify-center hover:bg-secondary transition-colors"
              >
                Experimente Cortes Virtuais
              </a>
            </div>
            
            <div className="pt-4 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-background bg-secondary"
                  />
                ))}
              </div>
              <div className="text-sm">
                <span className="font-bold">4.000+</span> clientes satisfeitos
              </div>
            </div>
          </div>
          
          <div className={`relative h-[500px] ${loaded ? animationClasses.slideInRight : 'opacity-0'}`}>
            <div className="absolute inset-0 rounded-2xl overflow-hidden glass">
              <div className="w-full h-full bg-gradient-to-br from-background via-secondary to-background opacity-75" />
            </div>
            
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm font-medium">Experimente Virtual</span>
                </div>
                
                <div className="glass px-4 py-2 rounded-full">
                  <span className="text-sm font-medium">Impulsionado por IA</span>
                </div>
              </div>
              
              <div className="flex justify-end">
                <div className="glass px-4 py-2 rounded-full animate-float">
                  <span className="text-sm font-medium">Encontre o Match Perfeito</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
