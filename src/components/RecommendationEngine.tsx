import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Star, Clock, Scissors, ArrowRight, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecommendationProps {
  userId?: string;
  location?: string;
  previousServices?: string[];
  onSelectRecommendation?: (recommendation: Recommendation) => void;
  className?: string;
}

interface Recommendation {
  id: string;
  type: 'service' | 'barber' | 'timeslot';
  name: string;
  description: string;
  image?: string;
  rating?: number;
  price?: number;
  duration?: number;
  relevanceScore: number; // 0-100, quanto maior mais relevante
  barberId?: string;
  serviceId?: string;
  availableAt?: string;
}

export function RecommendationEngine({
  userId,
  location,
  previousServices,
  onSelectRecommendation,
  className
}: RecommendationProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'services' | 'barbers' | 'slots'>('all');

  // Simulação de dados - seria substituída por chamadas de API reais
  useEffect(() => {
    // Simulação de carregamento de dados
    setIsLoading(true);
    
    // Simulação de chamada à API
    setTimeout(() => {
      const mockRecommendations: Recommendation[] = [
        {
          id: '1',
          type: 'service',
          name: 'Degradê Moderno',
          description: 'O estilo mais procurado atualmente, perfeito para seu tipo de cabelo',
          image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          price: 45,
          duration: 45,
          relevanceScore: 95,
          barberId: '2'
        },
        {
          id: '2',
          type: 'barber',
          name: 'André Martins',
          description: 'Especialista em degradês e cortes modernos',
          image: 'https://randomuser.me/api/portraits/men/44.jpg',
          rating: 4.9,
          relevanceScore: 92
        },
        {
          id: '3',
          type: 'timeslot',
          name: 'Horário Sugerido',
          description: 'Amanhã às 14:30 - Baseado no seu histórico de agendamentos',
          relevanceScore: 88,
          barberId: '2',
          serviceId: '1',
          availableAt: '2023-09-16T14:30:00'
        },
        {
          id: '4',
          type: 'service',
          name: 'Barba Completa',
          description: 'Modelagem e hidratação, complemento perfeito para seu corte',
          image: 'https://images.unsplash.com/photo-1621605774941-06134b0b46fa?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJlYXJkfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          price: 35,
          duration: 30,
          relevanceScore: 87
        },
        {
          id: '5',
          type: 'barber',
          name: 'Rafael Costa',
          description: 'Os clientes adoram o atendimento deste barbeiro',
          image: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: 4.8,
          relevanceScore: 85
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 1000);
  }, [userId, location, previousServices]);
  
  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(rec => rec.type === (
        selectedCategory === 'slots' ? 'timeslot' : 
        selectedCategory === 'services' ? 'service' : 'barber'
      ));
  
  return (
    <div className={`bg-card rounded-lg border overflow-hidden ${className}`}>
      <div className="p-4 border-b bg-muted/30">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Recomendações para Você
          </h3>
          <div className="flex space-x-1">
            <button 
              onClick={() => setSelectedCategory('all')} 
              className={`px-2.5 py-1 text-xs rounded-md ${
                selectedCategory === 'all' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
              aria-label="Mostrar todas as recomendações"
            >
              Todas
            </button>
            <button 
              onClick={() => setSelectedCategory('services')} 
              className={`px-2.5 py-1 text-xs rounded-md ${
                selectedCategory === 'services' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
              aria-label="Mostrar serviços recomendados"
            >
              Serviços
            </button>
            <button 
              onClick={() => setSelectedCategory('barbers')} 
              className={`px-2.5 py-1 text-xs rounded-md ${
                selectedCategory === 'barbers' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
              aria-label="Mostrar barbeiros recomendados"
            >
              Barbeiros
            </button>
            <button 
              onClick={() => setSelectedCategory('slots')} 
              className={`px-2.5 py-1 text-xs rounded-md ${
                selectedCategory === 'slots' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted hover:bg-muted/80'
              }`}
              aria-label="Mostrar horários recomendados"
            >
              Horários
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecommendations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhuma recomendação encontrada para esta categoria.
              </div>
            ) : (
              filteredRecommendations.map((recommendation) => (
                <motion.div
                  key={recommendation.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-background rounded-lg border p-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onSelectRecommendation && onSelectRecommendation(recommendation)}
                >
                  <div className="flex items-center">
                    {recommendation.image && (
                      <div className="relative mr-3 flex-shrink-0">
                        <img 
                          src={recommendation.image} 
                          alt={recommendation.name} 
                          className={`${recommendation.type === 'barber' ? 'rounded-full' : 'rounded-md'} w-16 h-16 object-cover`}
                        />
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs rounded-full px-1.5 -mt-1 -mr-1">
                          {recommendation.relevanceScore}%
                        </div>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{recommendation.name}</h4>
                          <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                        </div>
                        
                        <div className="flex items-center">
                          {recommendation.type === 'service' && (
                            <div className="flex flex-col items-end">
                              <span className="font-semibold">R$ {recommendation.price?.toFixed(2)}</span>
                              <span className="text-xs text-muted-foreground flex items-center">
                                <Clock size={12} className="mr-1" />
                                {recommendation.duration} min
                              </span>
                            </div>
                          )}
                          
                          {recommendation.type === 'barber' && recommendation.rating && (
                            <div className="flex items-center text-amber-500">
                              <Star size={16} className="fill-current" />
                              <span className="ml-1 font-medium">{recommendation.rating}</span>
                            </div>
                          )}
                          
                          {recommendation.type === 'timeslot' && (
                            <div className="text-xs bg-primary/10 text-primary rounded-full px-2.5 py-1 flex items-center">
                              <Calendar size={12} className="mr-1" />
                              Disponível
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-2 flex justify-end">
                        {recommendation.type === 'service' && (
                          <button className="text-xs text-primary flex items-center">
                            Agendar <ArrowRight size={12} className="ml-1" />
                          </button>
                        )}
                        
                        {recommendation.type === 'barber' && (
                          <button className="text-xs text-primary flex items-center">
                            Ver perfil <ArrowRight size={12} className="ml-1" />
                          </button>
                        )}
                        
                        {recommendation.type === 'timeslot' && (
                          <button className="text-xs text-primary flex items-center">
                            Confirmar <ArrowRight size={12} className="ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
} 