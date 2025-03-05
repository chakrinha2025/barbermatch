import { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Scissors, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';

// Dados simulados - em produção viriam de uma API
const INITIAL_APPOINTMENTS = [
  {
    id: 1,
    clientName: 'João Silva',
    clientPhone: '(41) 99999-1234',
    service: 'Corte + Barba',
    date: '2023-09-15',
    time: '14:30',
    duration: 45,
    status: 'confirmed' as 'confirmed' | 'pending' | 'cancelled',
    price: 55,
    notes: 'Cliente prefere corte mais curto nas laterais'
  },
  {
    id: 2,
    clientName: 'Carlos Oliveira',
    clientPhone: '(41) 98765-4321',
    service: 'Barba',
    date: '2023-09-15',
    time: '16:00',
    duration: 20,
    status: 'pending' as 'confirmed' | 'pending' | 'cancelled',
    price: 25,
    notes: ''
  },
  {
    id: 3,
    clientName: 'Roberto Santos',
    clientPhone: '(41) 97777-8888',
    service: 'Degradê',
    date: '2023-09-16',
    time: '10:00',
    duration: 35,
    status: 'confirmed' as 'confirmed' | 'pending' | 'cancelled',
    price: 40,
    notes: 'Primeira visita'
  },
  {
    id: 4,
    clientName: 'Lucas Mendes',
    clientPhone: '(41) 96666-5555',
    service: 'Corte Masculino',
    date: '2023-09-16',
    time: '11:30',
    duration: 30,
    status: 'cancelled' as 'confirmed' | 'pending' | 'cancelled',
    price: 35,
    notes: 'Cancelado pelo cliente'
  },
  {
    id: 5,
    clientName: 'André Costa',
    clientPhone: '(41) 95555-4444',
    service: 'Hidratação',
    date: '2023-09-17',
    time: '15:00',
    duration: 25,
    status: 'confirmed' as 'confirmed' | 'pending' | 'cancelled',
    price: 30,
    notes: ''
  },
];

// Interface para o tipo de agendamento
interface Appointment {
  id: number;
  clientName: string;
  clientPhone: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: number;
  notes: string;
}

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [detailedAppointment, setDetailedAppointment] = useState<Appointment | null>(null);
  
  // Obter a data atual no formato YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  
  // Se não houver data selecionada, usar a data de hoje
  const activeDate = selectedDate || today;
  
  // Filtrar agendamentos com base na data selecionada e na busca
  const filteredAppointments = appointments.filter(appointment => {
    const matchesDate = appointment.date === activeDate;
    const matchesSearch = 
      appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchQuery.toLowerCase());
      
    return searchQuery ? matchesSearch : matchesDate;
  });
  
  // Ordenar agendamentos por horário
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    return a.time.localeCompare(b.time);
  });
  
  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };
  
  // Formatar data para exibição nos dias da semana
  const formatDateForWeekDay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' });
  };
  
  // Obter dias da semana a partir da data atual
  const getWeekDays = () => {
    const days = [];
    const currentDate = new Date();
    
    for (let i = -3; i < 11; i++) {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() + i);
      days.push(day.toISOString().split('T')[0]);
    }
    
    return days;
  };
  
  const weekDays = getWeekDays();
  
  // Navegar para a data anterior
  const goToPreviousDay = () => {
    const currentIndex = weekDays.indexOf(activeDate);
    if (currentIndex > 0) {
      setSelectedDate(weekDays[currentIndex - 1]);
    }
  };
  
  // Navegar para a próxima data
  const goToNextDay = () => {
    const currentIndex = weekDays.indexOf(activeDate);
    if (currentIndex < weekDays.length - 1) {
      setSelectedDate(weekDays[currentIndex + 1]);
    }
  };
  
  // Obter contagem de agendamentos por data
  const getAppointmentCountForDate = (date: string) => {
    return appointments.filter(a => a.date === date).length;
  };
  
  // Obter classe de cor com base no status
  const getStatusColor = (status: 'confirmed' | 'pending' | 'cancelled') => {
    switch (status) {
      case 'confirmed':
        return 'text-green-500 bg-green-50 dark:bg-green-950/30';
      case 'pending':
        return 'text-amber-500 bg-amber-50 dark:bg-amber-950/30';
      case 'cancelled':
        return 'text-red-500 bg-red-50 dark:bg-red-950/30';
      default:
        return 'text-gray-500 bg-gray-50 dark:bg-gray-800/30';
    }
  };
  
  // Obter ícone com base no status
  const getStatusIcon = (status: 'confirmed' | 'pending' | 'cancelled') => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };
  
  // Obter label com base no status
  const getStatusLabel = (status: 'confirmed' | 'pending' | 'cancelled') => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };
  
  // Mudar o status de um agendamento
  const changeAppointmentStatus = (id: number, newStatus: 'confirmed' | 'pending' | 'cancelled') => {
    setAppointments(appointments.map(appointment => 
      appointment.id === id 
        ? { ...appointment, status: newStatus } 
        : appointment
    ));
    
    if (detailedAppointment && detailedAppointment.id === id) {
      setDetailedAppointment({ ...detailedAppointment, status: newStatus });
    }
  };
  
  // Mostrar detalhes de um agendamento
  const showAppointmentDetails = (appointment: Appointment) => {
    setDetailedAppointment(appointment);
  };
  
  // Fechar detalhes de um agendamento
  const closeAppointmentDetails = () => {
    setDetailedAppointment(null);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Agendamentos</h1>
        <p className="text-muted-foreground">
          Gerencie os agendamentos da sua agenda
        </p>
      </div>
      
      {/* Barra de busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          placeholder="Buscar por cliente ou serviço..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
        />
      </div>
      
      {/* Seletor de data */}
      {!searchQuery && (
        <div className="border rounded-lg overflow-hidden">
          <div className="flex items-center justify-between bg-muted/30 px-4 py-2 border-b">
            <button 
              onClick={goToPreviousDay}
              className="p-1 rounded-md hover:bg-muted"
              aria-label="Dia anterior"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center">
              <CalendarIcon size={18} className="mr-2" />
              <span className="font-medium">{formatDate(activeDate)}</span>
            </div>
            
            <button 
              onClick={goToNextDay}
              className="p-1 rounded-md hover:bg-muted"
              aria-label="Próximo dia"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 p-2 bg-card overflow-x-auto">
            {weekDays.slice(0, 7).map(date => {
              const isActive = date === activeDate;
              const isToday = date === today;
              const appointmentCount = getAppointmentCountForDate(date);
              
              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center p-2 rounded-md ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : isToday 
                        ? 'border-primary border-2' 
                        : 'hover:bg-muted'
                  }`}
                >
                  <span className="text-xs uppercase">
                    {formatDateForWeekDay(date).split(' ')[0]}
                  </span>
                  <span className="font-medium">
                    {formatDateForWeekDay(date).split(' ')[1]}
                  </span>
                  {appointmentCount > 0 && (
                    <span className={`text-xs mt-1 px-1.5 rounded-full ${
                      isActive 
                        ? 'bg-primary-foreground/20 text-primary-foreground' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {appointmentCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Lista de Agendamentos */}
      <div className="bg-card border rounded-lg overflow-hidden">
        {sortedAppointments.length > 0 ? (
          <div className="divide-y">
            {sortedAppointments.map(appointment => (
              <div 
                key={appointment.id}
                className="p-4 hover:bg-muted/30 cursor-pointer"
                onClick={() => showAppointmentDetails(appointment)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="text-lg font-medium">{appointment.time}</div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock size={12} className="mr-1" />
                        {appointment.duration} min
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-medium">{appointment.clientName}</div>
                      <div className="text-sm text-muted-foreground">{appointment.service}</div>
                    </div>
                  </div>
                  
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(appointment.status)}`}>
                    {getStatusIcon(appointment.status)}
                    <span className="ml-1">{getStatusLabel(appointment.status)}</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground flex items-center">
                  <Phone size={14} className="mr-1" />
                  {appointment.clientPhone}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-2 text-lg font-medium">
              {searchQuery 
                ? 'Nenhum agendamento encontrado para esta busca' 
                : 'Nenhum agendamento para esta data'}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchQuery 
                ? 'Tente buscar por outro cliente ou serviço' 
                : 'Selecione outra data ou adicione um novo agendamento'}
            </p>
          </div>
        )}
      </div>
      
      {/* Modal de Detalhes do Agendamento */}
      {detailedAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-lg w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold">Detalhes do Agendamento</h3>
                <button 
                  onClick={closeAppointmentDetails}
                  className="p-1 rounded-md hover:bg-muted"
                  aria-label="Fechar"
                >
                  <XCircle size={20} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Data</div>
                    <div className="font-medium flex items-center">
                      <CalendarIcon size={16} className="mr-1" />
                      {formatDate(detailedAppointment.date)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground">Horário</div>
                    <div className="font-medium flex items-center">
                      <Clock size={16} className="mr-1" />
                      {detailedAppointment.time} ({detailedAppointment.duration} min)
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Cliente</div>
                  <div className="font-medium flex items-center">
                    <User size={16} className="mr-1" />
                    {detailedAppointment.clientName}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center mt-1">
                    <Phone size={14} className="mr-1" />
                    {detailedAppointment.clientPhone}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Serviço</div>
                  <div className="font-medium flex items-center">
                    <Scissors size={16} className="mr-1" />
                    {detailedAppointment.service}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Valor: R$ {detailedAppointment.price.toFixed(2)}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className={`px-2 py-1 rounded-full text-sm font-medium inline-flex items-center ${getStatusColor(detailedAppointment.status)}`}>
                    {getStatusIcon(detailedAppointment.status)}
                    <span className="ml-1">{getStatusLabel(detailedAppointment.status)}</span>
                  </div>
                </div>
                
                {detailedAppointment.notes && (
                  <div>
                    <div className="text-sm text-muted-foreground">Observações</div>
                    <div className="p-2 bg-muted/30 rounded-md text-sm">
                      {detailedAppointment.notes}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-4">
                <div className="text-sm font-medium mb-2">Atualizar Status</div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => changeAppointmentStatus(detailedAppointment.id, 'confirmed')}
                    className={`flex-1 py-2 rounded-md flex items-center justify-center text-sm ${
                      detailedAppointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 font-medium' 
                        : 'bg-muted/50 hover:bg-green-50 dark:hover:bg-green-900/20 text-muted-foreground hover:text-green-600 dark:hover:text-green-400'
                    }`}
                  >
                    <CheckCircle size={16} className="mr-1" />
                    Confirmar
                  </button>
                  
                  <button
                    onClick={() => changeAppointmentStatus(detailedAppointment.id, 'pending')}
                    className={`flex-1 py-2 rounded-md flex items-center justify-center text-sm ${
                      detailedAppointment.status === 'pending' 
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 font-medium' 
                        : 'bg-muted/50 hover:bg-amber-50 dark:hover:bg-amber-900/20 text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400'
                    }`}
                  >
                    <AlertCircle size={16} className="mr-1" />
                    Pendente
                  </button>
                  
                  <button
                    onClick={() => changeAppointmentStatus(detailedAppointment.id, 'cancelled')}
                    className={`flex-1 py-2 rounded-md flex items-center justify-center text-sm ${
                      detailedAppointment.status === 'cancelled' 
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400 font-medium' 
                        : 'bg-muted/50 hover:bg-red-50 dark:hover:bg-red-900/20 text-muted-foreground hover:text-red-600 dark:hover:text-red-400'
                    }`}
                  >
                    <XCircle size={16} className="mr-1" />
                    Cancelar
                  </button>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={closeAppointmentDetails}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments; 