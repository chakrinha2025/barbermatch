
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Scissors, Calendar, Phone, MessageSquare, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BasicAppointmentForm from '../../components/BasicAppointmentForm';

// Mock data for barber profile
const MOCK_BARBER = {
  id: '1',
  name: 'Carlos Silva',
  specialty: 'Cortes Modernos',
  rating: 4.8,
  reviewCount: 127,
  location: 'Centro, São Paulo',
  address: 'Rua Augusta, 1500 - Centro',
  bio: 'Especialista em cortes modernos e degradês. Mais de 10 anos de experiência em barbearias de alta qualidade.',
  workHours: 'Segunda a Sábado, 09:00 - 19:00',
  services: [
    { id: 'corte', name: 'Corte de Cabelo', price: 35, duration: 30 },
    { id: 'barba', name: 'Barba', price: 25, duration: 20 },
    { id: 'combo', name: 'Combo (Corte + Barba)', price: 50, duration: 45 },
    { id: 'hidratacao', name: 'Hidratação', price: 40, duration: 40 },
  ],
  portfolio: [1, 2, 3, 4]
};

const BarberProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'sobre' | 'servicos' | 'agenda'>('sobre');
  const barber = MOCK_BARBER; // In a real app, you would fetch this data based on the ID
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl md:text-3xl font-bold text-primary">{barber.name.charAt(0)}</span>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{barber.name}</h1>
                <p className="text-lg text-muted-foreground mb-4">{barber.specialty}</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                    <span className="ml-1 font-medium">{barber.rating}</span>
                    <span className="ml-1 text-muted-foreground">({barber.reviewCount})</span>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="ml-1 text-muted-foreground">{barber.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="ml-1 text-muted-foreground">{barber.workHours}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveTab('agenda')}
                    className="px-4 py-2 bg-primary text-white rounded-lg font-medium flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Agendar Horário
                  </button>
                  
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Contato
                  </button>
                  
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-medium flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Mensagem
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tabs Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="border-b border-gray-200 dark:border-gray-800 mb-8">
              <div className="flex overflow-x-auto no-scrollbar">
                <button
                  onClick={() => setActiveTab('sobre')}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                    activeTab === 'sobre' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Sobre
                </button>
                
                <button
                  onClick={() => setActiveTab('servicos')}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                    activeTab === 'servicos' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Serviços
                </button>
                
                <button
                  onClick={() => setActiveTab('agenda')}
                  className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 ${
                    activeTab === 'agenda' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Agenda
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {activeTab === 'sobre' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Sobre {barber.name}</h2>
                    <p className="text-muted-foreground mb-6">{barber.bio}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Localização</h3>
                      <p className="text-muted-foreground mb-2">{barber.address}</p>
                      <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <MapPin className="h-8 w-8 text-gray-400" />
                        <span className="ml-2 text-gray-500">Mapa não disponível na versão gratuita</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Portfólio</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {barber.portfolio.map((item, index) => (
                          <div key={index} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                            <img 
                              src={`/images/real-haircut-${item}.jpg`} 
                              alt={`Trabalho ${item}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'https://via.placeholder.com/300?text=Portfolio';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'servicos' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Serviços Oferecidos</h2>
                    <div className="space-y-4">
                      {barber.services.map(service => (
                        <div 
                          key={service.id}
                          className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-primary/20 transition-colors"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{service.name}</h3>
                              <p className="text-sm text-muted-foreground">Duração: {service.duration} minutos</p>
                            </div>
                            <div className="text-lg font-bold">{formatPrice(service.price)}</div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <button
                              onClick={() => setActiveTab('agenda')}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-md text-sm font-medium flex items-center gap-1"
                            >
                              Agendar
                              <ChevronRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'agenda' && (
                  <div>
                    <h2 className="text-xl font-bold mb-4">Agende seu Horário</h2>
                    <BasicAppointmentForm barberName={barber.name} barberId={barber.id} />
                  </div>
                )}
              </div>
              
              <div className="md:col-span-1">
                <div className="sticky top-4">
                  <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-6 mb-6">
                    <h3 className="font-bold mb-3">Horário de Funcionamento</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Segunda-feira</span>
                        <span>09:00 - 19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Terça-feira</span>
                        <span>09:00 - 19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Quarta-feira</span>
                        <span>09:00 - 19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Quinta-feira</span>
                        <span>09:00 - 19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Sexta-feira</span>
                        <span>09:00 - 19:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Sábado</span>
                        <span>09:00 - 19:00</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Domingo</span>
                        <span>Fechado</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 p-6">
                    <h3 className="font-bold mb-3">Recursos Disponíveis</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Agendamento Básico</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Visualização de Perfil</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Lista de Serviços</span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <Lock className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Chat em Tempo Real</span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <Lock className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Visualização 3D de Estilos</span>
                      </li>
                      <li className="flex items-start opacity-50">
                        <Lock className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
                        <span>Histórico Completo</span>
                      </li>
                    </ul>
                    <div className="mt-6">
                      <a 
                        href="/pricing" 
                        className="block w-full py-2 text-center bg-primary text-white rounded-lg text-sm font-medium"
                      >
                        Veja nossos planos premium
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BarberProfile;
