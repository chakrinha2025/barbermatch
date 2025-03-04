import { useState, useEffect } from 'react';
import { animationClasses } from '@/lib/animations';
import { ArrowRight, Scissors, Store, User, Zap, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(1);
  
  useEffect(() => {
    setLoaded(true);
    
    // Animação para alternar entre estilos de corte
    const interval = setInterval(() => {
      setCurrentImage(prev => prev < 4 ? prev + 1 : 1);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl opacity-50 transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2" />
        
        {/* Elementos decorativos animados */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/10 rounded-full"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 left-1/5 w-24 h-24 bg-secondary/20 rounded-full"
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.2, 0.5, 0.2] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
            ease: "easeInOut",
            delay: 1 
          }}
        />
      </div>

      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center">
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
              <Link
                to="/#test-tool"
                className="bg-primary text-white px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-premium-hover"
              >
                Começar Agora <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/barbershop-login?tab=register"
                className="border px-6 py-3 rounded-full font-medium flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Store className="w-4 h-4 mr-2" />
                Para Barbearias
              </Link>
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
          
          {/* Nova área animada e chamativa */}
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl glass opacity-70 z-10"></div>
            
            {/* Animação principal - Face com cortes se alternando */}
            <div className="relative z-20 h-[500px] rounded-2xl overflow-hidden">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full flex items-center justify-center"
              >
                {/* Círculo brilhante por trás do perfil */}
                <div className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/10 animate-pulse-slow"></div>
                
                {/* Silhueta do rosto */}
                <div className="relative">
                  <motion.div className="relative z-30">
                    <svg width="300" height="300" viewBox="0 0 100 100" className="drop-shadow-glow">
                      <defs>
                        <linearGradient id="silhouetteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
                        </linearGradient>
                      </defs>
                      <path d="M50,10 C30,10 20,30 20,50 C20,75 35,90 50,90 C65,90 80,75 80,50 C80,30 70,10 50,10 Z" fill="url(#silhouetteGradient)" />
                    </svg>
                    
                    {/* Diferentes estilos de cabelo que alternam */}
                    <motion.div 
                      className="absolute top-0 left-0 right-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentImage === 1 ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg width="300" height="300" viewBox="0 0 100 100" className="drop-shadow-glow">
                        <path d="M30,10 C20,15 10,25 15,35 C20,45 30,30 50,30 C70,30 80,45 85,35 C90,25 80,15 70,10 Z" fill="#222" />
                      </svg>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute top-0 left-0 right-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentImage === 2 ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg width="300" height="300" viewBox="0 0 100 100" className="drop-shadow-glow">
                        <path d="M20,15 C20,25 30,35 50,35 C70,35 80,25 80,15 C80,5 70,0 50,0 C30,0 20,5 20,15 Z" fill="#222" />
                      </svg>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute top-0 left-0 right-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentImage === 3 ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg width="300" height="300" viewBox="0 0 100 100" className="drop-shadow-glow">
                        <path d="M15,10 C25,5 35,10 40,15 L30,30 C30,30 20,25 15,20 C10,15 5,15 15,10 Z" fill="#222" />
                        <path d="M85,10 C75,5 65,10 60,15 L70,30 C70,30 80,25 85,20 C90,15 95,15 85,10 Z" fill="#222" />
                      </svg>
                    </motion.div>
                    
                    <motion.div 
                      className="absolute top-0 left-0 right-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: currentImage === 4 ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg width="300" height="300" viewBox="0 0 100 100" className="drop-shadow-glow">
                        <path d="M30,15 C20,15 15,25 20,30 C25,35 40,25 50,25 C60,25 75,35 80,30 C85,25 80,15 70,15 Z" fill="#222" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Elementos UI de IA */}
                <motion.div 
                  className="absolute top-8 left-10 glass px-4 py-2 rounded-full flex items-center gap-2"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Zap size={14} className="text-primary" />
                  <span className="text-sm font-medium">IA Analisando</span>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-10 right-10 glass px-4 py-2 rounded-full flex items-center gap-2"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <CheckCircle size={14} className="text-primary" />
                  <span className="text-sm font-medium">Match encontrado!</span>
                </motion.div>
                
                {/* Indicadores de estilo em destaque */}
                <motion.div 
                  className="absolute bottom-32 left-10 flex flex-col gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                >
                  {[1, 2, 3, 4].map((index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full ${currentImage === index ? 'bg-primary' : 'bg-white/30'}`} 
                    />
                  ))}
                </motion.div>
                
                {/* Linha de scan de IA */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div 
                    className="w-full h-1 bg-primary/40"
                    animate={{ 
                      y: [-100, 100, -100],
                      opacity: [0.8, 0.4, 0.8]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
            
            {/* Etiqueta de estilo */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30">
              <motion.div 
                className="glass px-5 py-2 rounded-full text-center"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <span className="font-medium">Estilo #{currentImage}: </span>
                <span className="text-primary">
                  {currentImage === 1 ? 'Degradê Moderno' : 
                   currentImage === 2 ? 'Clássico Elegante' :
                   currentImage === 3 ? 'Undercut Lateral' : 'Crew Cut'}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
