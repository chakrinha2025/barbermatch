import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, Calendar, Clock, Bell, CheckCircle, X, User, 
  Smartphone, CalendarCheck, ChevronRight, Check, Scissors, 
  Zap, AlertCircle, MapPin, Star, CreditCard, CalendarDays, 
  PlusCircle, MinusCircle
} from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';

// Tipos para agendamento
interface Barber {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  shop: string;
  location: string;
  distance: string;
  specialties: string[];
  availableToday: boolean;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: 'corte' | 'barba' | 'tratamento' | 'combo';
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

// Passos do agendamento
type SchedulingStep = 'barber' | 'service' | 'datetime' | 'confirm';

const SmartScheduling = () => {
  // Estado atual do agendamento
  const [currentStep, setCurrentStep] = useState<SchedulingStep>('barber');
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  
  // Lista de barbeiros
  const [barbers, setBarbers] = useState<Barber[]>([
    {
      id: '1',
      name: 'Rafael Costa',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.8,
      reviewCount: 156,
      shop: 'Barbearia Vintage',
      location: 'Centro, Curitiba',
      distance: '1.2 km',
      specialties: ['Degradê', 'Barba', 'Navalhado'],
      availableToday: true
    },
    {
      id: '2',
      name: 'André Martins',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
      rating: 4.9,
      reviewCount: 238,
      shop: 'BarberKing',
      location: 'Batel, Curitiba',
      distance: '2.5 km',
      specialties: ['Corte Clássico', 'Penteados', 'Coloração'],
      availableToday: true
    },
    {
      id: '3',
      name: 'Lucas Oliveira',
      avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
      rating: 4.6,
      reviewCount: 94,
      shop: 'Cortes & Cia',
      location: 'Água Verde, Curitiba',
      distance: '3.7 km',
      specialties: ['Degradê', 'Undercut', 'Barba Personalizada'],
      availableToday: false
    },
    {
      id: '4',
      name: 'Matheus Silva',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      rating: 4.7,
      reviewCount: 182,
      shop: 'Barba Negra',
      location: 'Santa Felicidade, Curitiba',
      distance: '5.3 km',
      specialties: ['Barba Lenhador', 'Corte Moderno', 'Relaxamento'],
      availableToday: true
    }
  ]);
  
  // Lista de serviços
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'Corte Masculino',
      description: 'Corte tradicional com acabamento perfeito',
      price: 45,
      duration: 30,
      category: 'corte'
    },
    {
      id: '2',
      name: 'Degradê',
      description: 'Corte moderno com máquina e tesoura',
      price: 55,
      duration: 40,
      category: 'corte'
    },
    {
      id: '3',
      name: 'Barba Completa',
      description: 'Modelagem, hidratação e acabamento',
      price: 35,
      duration: 25,
      category: 'barba'
    },
    {
      id: '4',
      name: 'Combo Corte + Barba',
      description: 'Corte masculino tradicional com barba completa',
      price: 70,
      duration: 55,
      category: 'combo'
    },
    {
      id: '5',
      name: 'Tratamento Capilar',
      description: 'Hidratação, nutrição e selagem',
      price: 60,
      duration: 45,
      category: 'tratamento'
    }
  ]);
  
  // Horários disponíveis
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  
  // Atualiza horários disponíveis com base na data selecionada
  useEffect(() => {
    if (selectedDate) {
      // Simulando horários disponíveis
      const baseHours = [9, 10, 11, 13, 14, 15, 16, 17, 18];
      const minutes = [0, 30];
      const slots: TimeSlot[] = [];
      
      baseHours.forEach(hour => {
        minutes.forEach(minute => {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const isAvailable = Math.random() > 0.3; // 30% de chance de horário indisponível
          
          slots.push({
            id: `${hour}-${minute}`,
            time,
            available: isAvailable
          });
        });
      });
      
      setTimeSlots(slots);
    }
  }, [selectedDate, selectedBarber, selectedService]);
  
  // Função para formatar data
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };
  
  // Função para navegar para o próximo passo
  const goToNextStep = () => {
    switch (currentStep) {
      case 'barber':
        if (selectedBarber) setCurrentStep('service');
        break;
      case 'service':
        if (selectedService) setCurrentStep('datetime');
        break;
      case 'datetime':
        if (selectedTime) setCurrentStep('confirm');
        break;
      case 'confirm':
        // Simulação de confirmação de agendamento
        alert('Agendamento confirmado com sucesso!');
        // Reiniciar o processo
        setCurrentStep('barber');
        setSelectedBarber(null);
        setSelectedService(null);
        setSelectedDate(new Date());
        setSelectedTime(null);
        setAdditionalNotes('');
        break;
    }
  };
  
  // Função para voltar ao passo anterior
  const goToPreviousStep = () => {
    switch (currentStep) {
      case 'service':
        setCurrentStep('barber');
        break;
      case 'datetime':
        setCurrentStep('service');
        break;
      case 'confirm':
        setCurrentStep('datetime');
        break;
    }
  };
  
  // Função para mudar a data selecionada
  const changeDate = (days: number) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };
  
  // Renderiza o progresso do agendamento
  const renderProgress = () => {
    const steps = [
      { id: 'barber', label: 'Barbeiro' },
      { id: 'service', label: 'Serviço' },
      { id: 'datetime', label: 'Data/Hora' },
      { id: 'confirm', label: 'Confirmação' }
    ];
    
    return (
      <div className="flex items-center justify-center mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={`flex flex-col items-center ${
                currentStep === step.id
                  ? 'text-emerald-600'
                  : steps.findIndex(s => s.id === currentStep) > index
                  ? 'text-emerald-600'
                  : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep === step.id
                  ? 'bg-emerald-600 text-white'
                  : steps.findIndex(s => s.id === currentStep) > index
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {steps.findIndex(s => s.id === currentStep) > index ? (
                  <Check size={16} />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs font-medium">{step.label}</span>
            </div>
            
            {index < steps.length - 1 && (
              <div className={`w-16 h-1 mx-2 ${
                steps.findIndex(s => s.id === currentStep) > index
                  ? 'bg-emerald-600'
                  : 'bg-gray-200'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };
  
  // Renderiza a seleção de barbeiro
  const renderBarberSelection = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 text-center">Escolha um Barbeiro</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {barbers.map((barber) => (
            <div 
              key={barber.id}
              onClick={() => setSelectedBarber(barber.id)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedBarber === barber.id 
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-200'
              }`}
            >
              <div className="flex items-center">
                <div className="relative">
                  <img 
                    src={barber.avatar} 
                    alt={barber.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {barber.availableToday && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{barber.name}</h4>
                    <div className="flex items-center">
                      <Star size={14} className="text-amber-500 fill-current" />
                      <span className="text-sm ml-1">{barber.rating}</span>
                      <span className="text-xs text-gray-500 ml-1">({barber.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">{barber.shop}</p>
                  
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <MapPin size={12} className="mr-1" />
                    <span>{barber.location} • {barber.distance}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {barber.specialties.map((specialty, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={goToNextStep}
            disabled={!selectedBarber}
            className={`px-6 py-2 rounded-lg font-medium flex items-center ${
              selectedBarber 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar
            <ChevronRight size={16} className="ml-2" />
          </button>
        </div>
      </motion.div>
    );
  };
  
  // Renderiza a seleção de serviço
  const renderServiceSelection = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 text-center">Escolha um Serviço</h3>
        
        <div className="space-y-4">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                selectedService === service.id 
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-gray-200 hover:border-emerald-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{service.name}</h4>
                  <p className="text-sm text-gray-500">{service.description}</p>
                  
                  <div className="flex items-center mt-2 text-sm">
                    <Clock size={14} className="text-emerald-600 mr-1" />
                    <span>{service.duration} min</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-lg font-semibold text-gray-800">
                    R$ {service.price.toFixed(2)}
                  </span>
                  
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                    service.category === 'corte' ? 'bg-blue-100 text-blue-700' :
                    service.category === 'barba' ? 'bg-amber-100 text-amber-700' :
                    service.category === 'tratamento' ? 'bg-purple-100 text-purple-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>
                    {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={goToPreviousStep}
            className="px-6 py-2 rounded-lg font-medium flex items-center text-gray-600 hover:bg-gray-100"
          >
            <ChevronLeft size={16} className="mr-2" />
            Voltar
          </button>
          
          <button
            onClick={goToNextStep}
            disabled={!selectedService}
            className={`px-6 py-2 rounded-lg font-medium flex items-center ${
              selectedService 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar
            <ChevronRight size={16} className="ml-2" />
          </button>
        </div>
      </motion.div>
    );
  };
  
  // Renderiza a seleção de data e hora
  const renderDateTimeSelection = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 text-center">Escolha Data e Horário</h3>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 bg-emerald-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => changeDate(-1)}
                className="p-1 rounded-full hover:bg-gray-200"
                aria-label="Dia anterior"
              >
                <ChevronLeft size={20} />
              </button>
              
              <h4 className="font-medium text-gray-800">
                {formatDate(selectedDate)}
              </h4>
              
              <button 
                onClick={() => changeDate(1)}
                className="p-1 rounded-full hover:bg-gray-200"
                aria-label="Próximo dia"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="p-4">
            <h5 className="font-medium mb-3">Horários Disponíveis:</h5>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTime === slot.time
                      ? 'bg-emerald-600 text-white'
                      : slot.available
                      ? 'bg-white border border-gray-200 hover:border-emerald-500 text-gray-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            
            {timeSlots.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                Carregando horários disponíveis...
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h5 className="font-medium mb-3">Observações Adicionais (opcional):</h5>
          
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="Ex: Preferência de acabamento, detalhes sobre o corte..."
            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            rows={3}
          ></textarea>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={goToPreviousStep}
            className="px-6 py-2 rounded-lg font-medium flex items-center text-gray-600 hover:bg-gray-100"
          >
            <ChevronLeft size={16} className="mr-2" />
            Voltar
          </button>
          
          <button
            onClick={goToNextStep}
            disabled={!selectedTime}
            className={`px-6 py-2 rounded-lg font-medium flex items-center ${
              selectedTime 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar
            <ChevronRight size={16} className="ml-2" />
          </button>
        </div>
      </motion.div>
    );
  };
  
  // Renderiza a confirmação do agendamento
  const renderConfirmation = () => {
    const selectedBarberData = barbers.find(b => b.id === selectedBarber);
    const selectedServiceData = services.find(s => s.id === selectedService);
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <h3 className="text-xl font-semibold text-gray-800 text-center">Confirmar Agendamento</h3>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-start mb-4">
            <div className="bg-emerald-100 p-2 rounded-full mr-3">
              <User size={20} className="text-emerald-600" />
            </div>
            <div>
              <h5 className="font-medium">Barbeiro</h5>
              <p className="text-gray-700">{selectedBarberData?.name}</p>
              <p className="text-sm text-gray-500">{selectedBarberData?.shop}</p>
            </div>
          </div>
          
          <div className="flex items-start mb-4">
            <div className="bg-emerald-100 p-2 rounded-full mr-3">
              <Scissors size={20} className="text-emerald-600" />
            </div>
            <div>
              <h5 className="font-medium">Serviço</h5>
              <p className="text-gray-700">{selectedServiceData?.name}</p>
              <p className="text-sm text-gray-500">{selectedServiceData?.description}</p>
            </div>
          </div>
          
          <div className="flex items-start mb-4">
            <div className="bg-emerald-100 p-2 rounded-full mr-3">
              <CalendarDays size={20} className="text-emerald-600" />
            </div>
            <div>
              <h5 className="font-medium">Data e Horário</h5>
              <p className="text-gray-700">
                {formatDate(selectedDate)} às {selectedTime}
              </p>
              <p className="text-sm text-gray-500">Duração estimada: {selectedServiceData?.duration} minutos</p>
            </div>
          </div>
          
          <div className="flex items-start mb-4">
            <div className="bg-emerald-100 p-2 rounded-full mr-3">
              <CreditCard size={20} className="text-emerald-600" />
            </div>
            <div>
              <h5 className="font-medium">Preço</h5>
              <p className="text-gray-700">R$ {selectedServiceData?.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Pagamento na barbearia</p>
            </div>
          </div>
          
          {additionalNotes && (
            <div className="flex items-start mb-4">
              <div className="bg-emerald-100 p-2 rounded-full mr-3">
                <AlertCircle size={20} className="text-emerald-600" />
              </div>
              <div>
                <h5 className="font-medium">Observações</h5>
                <p className="text-gray-700">{additionalNotes}</p>
              </div>
            </div>
          )}
          
          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <h5 className="font-medium flex items-center mb-2">
              <Bell size={16} className="mr-2 text-emerald-600" />
              Lembretes
            </h5>
            
            <div className="flex items-center text-sm text-gray-700 mb-2">
              <CheckCircle size={14} className="mr-2 text-emerald-600" />
              Você receberá um lembrete por SMS 24 horas antes
            </div>
            
            <div className="flex items-center text-sm text-gray-700">
              <CheckCircle size={14} className="mr-2 text-emerald-600" />
              Você receberá um lembrete por WhatsApp 1 hora antes
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 flex items-start">
          <AlertCircle size={16} className="mr-2 mt-0.5 flex-shrink-0" />
          <p>
            Cancelamentos com menos de 4 horas de antecedência podem estar sujeitos a cobrança de taxa. Consulte a política de cancelamento da barbearia.
          </p>
        </div>
        
        <div className="flex justify-between">
          <button
            onClick={goToPreviousStep}
            className="px-6 py-2 rounded-lg font-medium flex items-center text-gray-600 hover:bg-gray-100"
          >
            <ChevronLeft size={16} className="mr-2" />
            Voltar
          </button>
          
          <button
            onClick={goToNextStep}
            className="px-6 py-2 rounded-lg font-medium flex items-center bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Confirmar Agendamento
            <Zap size={16} className="ml-2" />
          </button>
        </div>
      </motion.div>
    );
  };
  
  // Renderiza o conteúdo baseado no passo atual
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'barber':
        return renderBarberSelection();
      case 'service':
        return renderServiceSelection();
      case 'datetime':
        return renderDateTimeSelection();
      case 'confirm':
        return renderConfirmation();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-b from-green-800 to-emerald-900 overflow-hidden">
          <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <Link to="/" className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors">
                  <ChevronLeft size={16} className="mr-2" />
                  Voltar para Home
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Agendamento <span className="text-green-300">Inteligente</span>
                </h1>
                <p className="text-lg text-green-100 mb-8 max-w-lg">
                  Marque horários com facilidade, receba lembretes automáticos e reduza faltas em até 80%. Uma nova forma de gerenciar sua agenda.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    to="/signup?feature=scheduling&plan=basic" 
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg font-medium text-white shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Agendar Agora
                  </Link>
                  <Link 
                    to="/pricing?highlight=scheduling" 
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-medium text-white hover:bg-white/20 transition-all"
                  >
                    Ver Planos
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md mx-auto"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-center mb-6">
                      Agende seu corte em 4 passos simples
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-medium mr-3">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium">Escolha seu barbeiro</h4>
                          <p className="text-sm text-gray-500">Selecione entre os melhores profissionais</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-medium mr-3">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium">Selecione o serviço</h4>
                          <p className="text-sm text-gray-500">Escolha entre cortes, barbas e tratamentos</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-medium mr-3">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium">Defina data e hora</h4>
                          <p className="text-sm text-gray-500">Veja horários disponíveis em tempo real</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-medium mr-3">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium">Confirme e pronto!</h4>
                          <p className="text-sm text-gray-500">Receba lembretes automáticos</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-emerald-50 rounded-lg flex items-center text-sm">
                      <Zap size={20} className="text-emerald-600 mr-3" />
                      <p>Agendamento inteligente baseado nos seus horários mais convenientes e histórico de preferências.</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Sistema de Agendamento */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4">Agende seu Horário</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Experimente nosso sistema de agendamento inteligente e marque seu horário em poucos cliques.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-10">
                <div className="p-6">
                  {renderProgress()}
                  {renderCurrentStep()}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Recursos Exclusivos</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Nosso sistema de agendamento inteligente foi projetado para facilitar sua vida e reduzir faltas
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Bell size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Lembretes Automáticos</h3>
                <p className="text-gray-600 mb-4">
                  Receba lembretes via WhatsApp, SMS e e-mail para nunca mais esquecer um compromisso
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Notificações 24h e 1h antes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Confirmação em um clique</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Reagendamento facilitado</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Sincronização de Calendários</h3>
                <p className="text-gray-600 mb-4">
                  Integre com Google Calendar, Outlook e outros aplicativos de calendário
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Atualização em tempo real</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Compatível com múltiplas plataformas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Detecção de conflitos de horários</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 border border-gray-100 rounded-xl bg-white shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock size={24} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Gestão Inteligente de Horários</h3>
                <p className="text-gray-600 mb-4">
                  Algoritmo que otimiza a agenda do barbeiro e reduz tempos ociosos
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Sugestão de melhores horários</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Previsão precisa de duração</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle size={16} className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Ajuste automático em caso de atrasos</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Como Funciona</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Agendar um horário nunca foi tão fácil e eficiente
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full text-white text-sm flex items-center justify-center font-bold">1</span>
                  <User size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Escolha o Barbeiro</h3>
                <p className="text-sm text-gray-600">
                  Selecione o profissional de sua preferência
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full text-white text-sm flex items-center justify-center font-bold">2</span>
                  <Calendar size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Selecione a Data</h3>
                <p className="text-sm text-gray-600">
                  Escolha o dia que melhor se encaixa na sua agenda
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full text-white text-sm flex items-center justify-center font-bold">3</span>
                  <Clock size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Escolha o Horário</h3>
                <p className="text-sm text-gray-600">
                  Veja os horários disponíveis e escolha o melhor para você
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4 relative">
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full text-white text-sm flex items-center justify-center font-bold">4</span>
                  <CalendarCheck size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">Confirme e Pronto</h3>
                <p className="text-sm text-gray-600">
                  Receba a confirmação e lembretes automáticos
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">O Que Nossos Usuários Dizem</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Veja como o agendamento inteligente está transformando a experiência de barbeiros e clientes
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <User className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Ricardo Almeida</h4>
                    <p className="text-sm text-gray-500">Cliente</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Nunca mais esqueci um agendamento desde que comecei a usar o BarberMatch. Os lembretes são perfeitos e reagendar é super fácil quando preciso."
                </p>
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <User className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Carlos Ferreira</h4>
                    <p className="text-sm text-gray-500">Barbeiro</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Reduzi as faltas em quase 80% desde que implementei o sistema de agendamento do BarberMatch. Minha agenda está sempre otimizada e os clientes adoram a facilidade."
                </p>
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <User className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Marcos Silva</h4>
                    <p className="text-sm text-gray-500">Proprietário de Barbearia</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "A sincronização com nosso sistema de gestão é perfeita. Consigo ver toda a agenda da equipe em um só lugar e os relatórios me ajudam a tomar decisões melhores."
                </p>
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Simplifique Seus Agendamentos Hoje</h2>
            <p className="text-lg text-green-100 mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de barbeiros e clientes que já estão aproveitando os benefícios do agendamento inteligente.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mr-4">
                  <X className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">-80%</div>
                  <div className="text-sm text-green-200">Redução em faltas</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mr-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">+35%</div>
                  <div className="text-sm text-green-200">Otimização da agenda</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center max-w-xs">
                <div className="w-12 h-12 bg-green-500/30 rounded-full flex items-center justify-center mr-4">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold">98%</div>
                  <div className="text-sm text-green-200">Taxa de satisfação</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/signup?feature=scheduling&plan=free" 
                className="px-8 py-3 bg-white text-green-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Comece Agora
              </Link>
              <Link 
                to="/download?feature=scheduling" 
                className="px-8 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Baixar o App
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SmartScheduling; 