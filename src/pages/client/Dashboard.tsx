import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  Scissors, 
  CalendarCheck, 
  MapPin, 
  Star,
  Search,
  TrendingUp,
  MessageSquare,
  Zap,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';

// Importação de componentes
import { AppNavigation } from '@/components/AppNavigation';
import { RecommendationEngine } from '@/components/RecommendationEngine';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Dados simulados - seriam substituídos por dados da API
const upcomingAppointments = [
  { 
    id: 1, 
    barberName: 'André Martins',
    barberAvatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    service: 'Degradê + Barba',
    date: '2023-09-16',
    time: '14:30',
    duration: 45,
    barberShop: 'BarberKing',
    location: 'Batel, Curitiba',
    price: 75.00
  }
];

const nearbyBarbers = [
  {
    id: 1,
    name: 'Rafael Costa',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    shop: 'Barbearia Vintage',
    rating: 4.8,
    distance: '1.2 km',
    availability: 'Disponível hoje'
  },
  {
    id: 2,
    name: 'André Martins',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    shop: 'BarberKing',
    rating: 4.9,
    distance: '2.5 km',
    availability: 'Disponível amanhã'
  },
  {
    id: 3,
    name: 'Lucas Oliveira',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    shop: 'Cortes & Cia',
    rating: 4.6,
    distance: '3.7 km',
    availability: 'Disponível hoje'
    }
];

export default function ClientDashboard() {
  const [userName, setUserName] = useState('Marcos');
  const [lastLocation, setLastLocation] = useState('Curitiba, PR');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  
    return () => clearTimeout(timer);
  }, []);
  
  // Formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    } else {
      return new Intl.DateTimeFormat('pt-BR', { 
        day: 'numeric', 
        month: 'long' 
      }).format(date);
    }
  };

  // Obter cumprimento com base na hora do dia
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };
  
  return (
    <div className="min-h-screen bg-background">
      <AppNavigation />
      
      {/* Área de conteúdo principal (com padding para evitar sobreposição com navegação) */}
      <main className="container px-4 pb-20 md:pb-8 md:pl-72 pt-6">
        {/* Cabeçalho da página */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold">{getGreeting()}, {userName}!</h1>
          <p className="text-muted-foreground flex items-center mt-1">
            <MapPin size={16} className="mr-1" />
            {lastLocation}
          </p>
        </header>
        
        {/* Botões de ação rápida */}
        <section className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Link to="/app/explore" className="bg-primary/5 hover:bg-primary/10 rounded-xl p-4 text-center transition-colors">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search size={24} className="text-primary" />
                </div>
                        </div>
              <h3 className="font-medium">Encontrar Barbeiro</h3>
              <p className="text-xs text-muted-foreground mt-1">Busque por proximidade</p>
            </Link>

            <Link to="/app/appointments/new" className="bg-primary/5 hover:bg-primary/10 rounded-xl p-4 text-center transition-colors">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar size={24} className="text-primary" />
                      </div>
              </div>
              <h3 className="font-medium">Agendar Corte</h3>
              <p className="text-xs text-muted-foreground mt-1">Rápido e fácil</p>
            </Link>
            
            <Link to="/app/trends" className="bg-primary/5 hover:bg-primary/10 rounded-xl p-4 text-center transition-colors">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp size={24} className="text-primary" />
                                  </div>
                                </div>
              <h3 className="font-medium">Explorar Tendências</h3>
              <p className="text-xs text-muted-foreground mt-1">Descubra novos estilos</p>
            </Link>
            
            <Link to="/app/chat" className="bg-primary/5 hover:bg-primary/10 rounded-xl p-4 text-center transition-colors">
              <div className="flex justify-center mb-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare size={24} className="text-primary" />
                              </div>
                            </div>
              <h3 className="font-medium">Chat com Barbeiros</h3>
              <p className="text-xs text-muted-foreground mt-1">Tire suas dúvidas</p>
            </Link>
          </div>
        </section>
        
        {/* Agendamentos próximos */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Próximo Agendamento</h2>
            <Link to="/app/appointments" className="text-sm text-primary hover:underline flex items-center">
              Ver todos <ArrowRight size={14} className="ml-1" />
            </Link>
                        </div>
          
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map(appointment => (
                <motion.div
                  key={appointment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card rounded-lg shadow-sm border overflow-hidden"
                        >
                  <div className="flex items-center justify-between p-4 bg-primary/5 border-b">
                    <div className="flex items-center">
                      <Calendar className="text-primary mr-2" size={18} />
                      <span className="font-medium">{formatDate(appointment.date)}</span>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <Clock className="text-primary mr-2" size={18} />
                      <span>{appointment.time}</span>
                                </div>
                    <Badge variant="secondary">Confirmado</Badge>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="relative mr-4">
                        <img 
                          src={appointment.barberAvatar} 
                          alt={appointment.barberName} 
                          className="w-16 h-16 rounded-full object-cover" 
                        />
                        <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-medium text-lg">{appointment.barberName}</h3>
                        <p className="text-sm text-muted-foreground">{appointment.barberShop}</p>
                        
                        <div className="flex items-center mt-2">
                          <MapPin size={14} className="text-muted-foreground mr-1" />
                          <span className="text-sm text-muted-foreground">{appointment.location}</span>
                </div>
                
                        <div className="flex justify-between items-center mt-3">
                          <div>
                            <Badge variant="outline" className="mr-2">
                              {appointment.service}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{appointment.duration} min</span>
                          </div>
                          <span className="font-semibold">R$ {appointment.price.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 border-t bg-muted/30 flex justify-between">
                    <Link 
                      to={`/app/chat/${appointment.id}`} 
                      className="text-sm text-primary flex items-center hover:underline"
                    >
                      <MessageSquare size={16} className="mr-1" />
                      Contatar Barbeiro
                    </Link>
                    <Link 
                      to={`/app/appointments/${appointment.id}`} 
                      className="text-sm text-primary flex items-center hover:underline"
                    >
                      Ver Detalhes <ArrowRight size={14} className="ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-card rounded-lg border p-6 text-center">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                  <Calendar size={24} className="text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">Nenhum agendamento</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Você não tem agendamentos próximos. Que tal marcar um corte agora?
                </p>
                <Button asChild>
                  <Link to="/app/appointments/new">Agendar Corte</Link>
                  </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Componente de recomendações inteligentes */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recomendações Personalizadas</h2>
          <RecommendationEngine />
        </section>
        
        {/* Barbeiros próximos */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Barbeiros Próximos</h2>
            <Link to="/app/explore" className="text-sm text-primary hover:underline flex items-center">
              Explorar <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearbyBarbers.map(barber => (
              <motion.div
                key={barber.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="relative mr-3">
                    <img 
                      src={barber.avatar} 
                      alt={barber.name} 
                      className="w-16 h-16 rounded-full object-cover" 
                    />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
      </div>
      
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{barber.name}</h3>
                        <p className="text-sm text-muted-foreground">{barber.shop}</p>
                              </div>
                      <div className="flex items-center text-amber-500">
                        <Star size={14} className="fill-current" />
                        <span className="ml-1 text-sm font-medium">{barber.rating}</span>
          </div>
        </div>
        
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <MapPin size={12} className="mr-1" />
                      <span>{barber.distance}</span>
                      <span className="mx-1">•</span>
                      <span className="text-green-600">{barber.availability}</span>
                  </div>
            </div>
        </div>
        
                <div className="flex justify-between mt-4">
                  <Link 
                    to={`/app/chat/barber/${barber.id}`} 
                    className="text-primary hover:underline text-sm flex items-center"
                  >
                    <MessageSquare size={14} className="mr-1" />
                    Contatar
                  </Link>
                  <Link 
                    to={`/app/barber/${barber.id}`} 
                    className="text-primary hover:underline text-sm flex items-center"
                  >
                    Ver perfil <ArrowRight size={14} className="ml-1" />
                  </Link>
                      </div>
                  </motion.div>
                ))}
        </div>
        </section>
        
        {/* Experimentar estilos */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-primary/20 to-primary/5 rounded-lg border p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold mb-2">Experimente Novos Estilos</h2>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Use nossa tecnologia de realidade aumentada para visualizar como você ficaria com diferentes cortes de cabelo e barba.
                </p>
                <Button asChild>
                  <Link to="/app/try-on" className="flex items-center">
                    <Zap size={16} className="mr-2" />
                    Experimentar Agora
                  </Link>
                </Button>
              </div>
              <div className="hidden md:flex justify-end">
                <img 
                  src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFpcmN1dHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" 
                  alt="Experimentar cortes" 
                  className="w-32 h-32 rounded-lg object-cover"
                />
              </div>
        </div>
      </div>
        </section>
      </main>
    </div>
  );
} 