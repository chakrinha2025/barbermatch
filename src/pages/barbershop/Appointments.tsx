import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Scissors, 
  PlusCircle, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Calendar as CalendarComponent,
  Search,
  Check,
  X,
  Filter,
  MoreVertical
} from 'lucide-react';
import { format, parseISO, isToday, isTomorrow, addDays, startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';

// Tipos de dados
interface Appointment {
  id: string;
  clientName: string;
  clientId: string;
  clientPhoto?: string;
  barberId: string;
  barberName: string;
  serviceName: string;
  serviceId: string;
  price: number;
  duration: number;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  createdAt: string;
}

interface Barber {
  id: string;
  name: string;
  photo?: string;
}

// Dados mockados
const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'Carlos Silva',
    clientId: 'client1',
    clientPhoto: 'https://i.pravatar.cc/150?img=1',
    barberId: 'barber1',
    barberName: 'Marcelo Alves',
    serviceName: 'Corte Degradê',
    serviceId: 'service1',
    price: 45,
    duration: 40,
    startTime: new Date(new Date().setHours(10, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(10, 40, 0, 0)).toISOString(),
    status: 'scheduled',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3)).toISOString()
  },
  {
    id: '2',
    clientName: 'Bruno Oliveira',
    clientId: 'client2',
    clientPhoto: 'https://i.pravatar.cc/150?img=2',
    barberId: 'barber2',
    barberName: 'Rafael Santos',
    serviceName: 'Barba Completa',
    serviceId: 'service2',
    price: 30,
    duration: 25,
    startTime: new Date(new Date().setHours(11, 30, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(11, 55, 0, 0)).toISOString(),
    status: 'scheduled',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString()
  },
  {
    id: '3',
    clientName: 'Eduardo Lima',
    clientId: 'client3',
    clientPhoto: 'https://i.pravatar.cc/150?img=3',
    barberId: 'barber1',
    barberName: 'Marcelo Alves',
    serviceName: 'Corte + Barba',
    serviceId: 'service3',
    price: 70,
    duration: 60,
    startTime: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date().setHours(15, 0, 0, 0)).toISOString(),
    status: 'scheduled',
    notes: 'Cliente prefere tesoura ao invés de máquina',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
  },
  {
    id: '4',
    clientName: 'Matheus Costa',
    clientId: 'client4',
    clientPhoto: 'https://i.pravatar.cc/150?img=4',
    barberId: 'barber3',
    barberName: 'João Paulo',
    serviceName: 'Corte Social',
    serviceId: 'service4',
    price: 35,
    duration: 30,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(9, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(9, 30, 0, 0)).toISOString(),
    status: 'completed',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString()
  },
  {
    id: '5',
    clientName: 'Lucas Ferreira',
    clientId: 'client5',
    clientPhoto: 'https://i.pravatar.cc/150?img=5',
    barberId: 'barber2',
    barberName: 'Rafael Santos',
    serviceName: 'Corte Degradê',
    serviceId: 'service1',
    price: 45,
    duration: 40,
    startTime: new Date(new Date(new Date().setDate(new Date().getDate() - 2)).setHours(16, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date(new Date().setDate(new Date().getDate() - 2)).setHours(16, 40, 0, 0)).toISOString(),
    status: 'cancelled',
    notes: 'Cliente cancelou por motivos pessoais',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString()
  },
  {
    id: '6',
    clientName: 'Gabriel Almeida',
    clientId: 'client6',
    clientPhoto: 'https://i.pravatar.cc/150?img=6',
    barberId: 'barber1',
    barberName: 'Marcelo Alves',
    serviceName: 'Corte + Barba',
    serviceId: 'service3',
    price: 70,
    duration: 60,
    startTime: new Date(new Date(addDays(new Date(), 1)).setHours(13, 0, 0, 0)).toISOString(),
    endTime: new Date(new Date(addDays(new Date(), 1)).setHours(14, 0, 0, 0)).toISOString(),
    status: 'scheduled',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString()
  },
  {
    id: '7',
    clientName: 'André Gomes',
    clientId: 'client7',
    clientPhoto: 'https://i.pravatar.cc/150?img=7',
    barberId: 'barber3',
    barberName: 'João Paulo',
    serviceName: 'Barba Completa',
    serviceId: 'service2',
    price: 30,
    duration: 25,
    startTime: new Date(new Date(addDays(new Date(), 1)).setHours(15, 30, 0, 0)).toISOString(),
    endTime: new Date(new Date(addDays(new Date(), 1)).setHours(15, 55, 0, 0)).toISOString(),
    status: 'scheduled',
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString()
  }
];

const mockBarbers: Barber[] = [
  { id: 'barber1', name: 'Marcelo Alves', photo: 'https://i.pravatar.cc/150?img=11' },
  { id: 'barber2', name: 'Rafael Santos', photo: 'https://i.pravatar.cc/150?img=12' },
  { id: 'barber3', name: 'João Paulo', photo: 'https://i.pravatar.cc/150?img=13' }
];

const BarberShopAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [barberFilter, setBarberFilter] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'day' | 'week'>('day');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isCompletingAppointment, setIsCompletingAppointment] = useState(false);
  const [isCancellingAppointment, setIsCancellingAppointment] = useState(false);
  
  // Efeito para carregar agendamentos
  useEffect(() => {
    // Simulação de carregamento de dados
    setTimeout(() => {
      setAppointments(mockAppointments);
      setIsLoading(false);
    }, 800);
  }, []);
  
  // Filtrar agendamentos
  const filteredAppointments = appointments.filter(appointment => {
    // Filtro de pesquisa
    const matchesSearch = 
      appointment.clientName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      appointment.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      appointment.barberName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtro de status
    const matchesStatus = !statusFilter || appointment.status === statusFilter;
    
    // Filtro de barbeiro
    const matchesBarber = !barberFilter || appointment.barberId === barberFilter;
    
    // Filtro de data (para visualização diária)
    const appointmentDate = parseISO(appointment.startTime);
    let matchesDate = true;
    
    if (currentView === 'day') {
      matchesDate = isWithinInterval(appointmentDate, {
        start: startOfDay(date),
        end: endOfDay(date)
      });
    } else if (currentView === 'week') {
      const weekStart = startOfDay(new Date(date));
      weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Domingo
      
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6); // Sábado
      weekEnd.setHours(23, 59, 59, 999);
      
      matchesDate = isWithinInterval(appointmentDate, {
        start: weekStart,
        end: weekEnd
      });
    }
    
    return matchesSearch && matchesStatus && matchesBarber && matchesDate;
  });
  
  // Agendamentos pelo status
  const scheduledAppointments = filteredAppointments.filter(a => a.status === 'scheduled');
  const completedAppointments = filteredAppointments.filter(a => a.status === 'completed');
  const cancelledAppointments = filteredAppointments.filter(a => a.status === 'cancelled' || a.status === 'no_show');
  
  // Marcar agendamento como concluído
  const completeAppointment = () => {
    if (!selectedAppointment) return;
    
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === selectedAppointment.id 
        ? { ...appointment, status: 'completed' as const } 
        : appointment
    );
    
    setAppointments(updatedAppointments);
    toast.success(`Agendamento de ${selectedAppointment.clientName} marcado como concluído`);
    setIsCompletingAppointment(false);
    setSelectedAppointment(null);
  };
  
  // Cancelar agendamento
  const cancelAppointment = () => {
    if (!selectedAppointment) return;
    
    const updatedAppointments = appointments.map(appointment => 
      appointment.id === selectedAppointment.id 
        ? { ...appointment, status: 'cancelled' as const } 
        : appointment
    );
    
    setAppointments(updatedAppointments);
    toast.success(`Agendamento de ${selectedAppointment.clientName} cancelado`);
    setIsCancellingAppointment(false);
    setSelectedAppointment(null);
  };
  
  // Formatar data de forma amigável
  const formatAppointmentDate = (dateString: string) => {
    const date = parseISO(dateString);
    
    if (isToday(date)) {
      return `Hoje às ${format(date, 'HH:mm')}`;
    } else if (isTomorrow(date)) {
      return `Amanhã às ${format(date, 'HH:mm')}`;
    } else {
      return format(date, "dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
    }
  };
  
  // Obter badge pelo status
  const getStatusBadge = (status: Appointment['status']) => {
    switch(status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800">Agendado</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">Concluído</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800">Cancelado</Badge>;
      case 'no_show':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-300 border-amber-200 dark:border-amber-800">Não compareceu</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Agendamentos</h1>
            <p className="text-muted-foreground">Gerencie os agendamentos da sua barbearia</p>
          </div>
          <div className="flex gap-2 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{format(date, "dd 'de' MMMM, yyyy", { locale: ptBR })}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button className="flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Novo Agendamento
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Filtros */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar por cliente, serviço ou barbeiro..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 flex-wrap md:flex-nowrap">
                <Select
                  value={statusFilter || ''}
                  onValueChange={(value) => setStatusFilter(value || null)}
                >
                  <SelectTrigger className="w-[160px]">
                    <div className="flex items-center gap-2 truncate">
                      <Filter className="h-4 w-4" />
                      <span className="truncate">
                        {statusFilter === 'scheduled' ? 'Agendados' : 
                         statusFilter === 'completed' ? 'Concluídos' : 
                         statusFilter === 'cancelled' ? 'Cancelados' : 
                         statusFilter === 'no_show' ? 'Não compareceu' : 
                         'Todos os status'}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os status</SelectItem>
                    <SelectItem value="scheduled">Agendados</SelectItem>
                    <SelectItem value="completed">Concluídos</SelectItem>
                    <SelectItem value="cancelled">Cancelados</SelectItem>
                    <SelectItem value="no_show">Não compareceu</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select
                  value={barberFilter || ''}
                  onValueChange={(value) => setBarberFilter(value || null)}
                >
                  <SelectTrigger className="w-[160px]">
                    <div className="flex items-center gap-2 truncate">
                      <Scissors className="h-4 w-4" />
                      <span className="truncate">
                        {barberFilter 
                          ? mockBarbers.find(b => b.id === barberFilter)?.name || 'Barbeiro' 
                          : 'Todos os barbeiros'}
                      </span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Todos os barbeiros</SelectItem>
                    {mockBarbers.map(barber => (
                      <SelectItem key={barber.id} value={barber.id}>
                        {barber.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="ml-auto">
                  <Tabs 
                    value={currentView} 
                    onValueChange={(v) => setCurrentView(v as 'day' | 'week')}
                    className="w-[160px]"
                  >
                    <TabsList className="w-full">
                      <TabsTrigger value="day" className="flex-1">Dia</TabsTrigger>
                      <TabsTrigger value="week" className="flex-1">Semana</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Estatísticas Rápidas */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Agendados</p>
              <p className="text-3xl font-bold">{scheduledAppointments.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
              <p className="text-3xl font-bold">{completedAppointments.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center">
              <CheckCircle className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cancelados</p>
              <p className="text-3xl font-bold">{cancelledAppointments.length}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center">
              <XCircle className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Lista de Agendamentos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Agendamentos {currentView === 'day' ? 'do Dia' : 'da Semana'}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {filteredAppointments.length} {filteredAppointments.length === 1 ? 'agendamento' : 'agendamentos'}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((_, idx) => (
                  <div key={idx} className="p-4 border rounded-lg animate-pulse">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/3" />
                        <div className="h-3 bg-muted rounded w-1/4" />
                      </div>
                      <div className="w-1/4">
                        <div className="h-4 bg-muted rounded w-full" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Nenhum agendamento encontrado</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Não há agendamentos para o período selecionado com os filtros atuais.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredAppointments.map((appointment) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 border rounded-lg ${
                      appointment.status === 'cancelled' || appointment.status === 'no_show' 
                        ? 'opacity-60' 
                        : ''
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={appointment.clientPhoto} />
                          <AvatarFallback>{appointment.clientName.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{appointment.clientName}</h4>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{formatAppointmentDate(appointment.startTime)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="sm:ml-auto flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex flex-col sm:items-end">
                          <div className="flex items-center gap-1 sm:flex-row-reverse">
                            <Badge variant="outline" className="bg-secondary/50">{appointment.serviceName}</Badge>
                            <span className="text-sm font-medium">R$ {appointment.price}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground sm:flex-row-reverse">
                            <span>{appointment.duration} min</span>
                            <span>•</span>
                            <span>{appointment.barberName}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {getStatusBadge(appointment.status)}
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Ações</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setIsCompletingAppointment(true);
                                }}
                                disabled={appointment.status !== 'scheduled'}
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Marcar como concluído
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedAppointment(appointment);
                                  setIsCancellingAppointment(true);
                                }}
                                disabled={appointment.status !== 'scheduled'}
                                className="text-red-600"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancelar agendamento
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                    
                    {appointment.notes && (
                      <div className="mt-2 p-2 bg-muted/50 rounded text-sm">
                        <p className="text-muted-foreground">{appointment.notes}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Dialog de Concluir Agendamento */}
      <Dialog open={isCompletingAppointment} onOpenChange={setIsCompletingAppointment}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Concluir Agendamento</DialogTitle>
            <DialogDescription>
              Confirme a conclusão deste agendamento.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar>
                  <AvatarImage src={selectedAppointment.clientPhoto} />
                  <AvatarFallback>{selectedAppointment.clientName.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{selectedAppointment.clientName}</h4>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.serviceName}</p>
                </div>
                <div className="ml-auto text-right">
                  <p className="font-medium">R$ {selectedAppointment.price}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.duration} min</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Tem certeza que deseja marcar este agendamento como concluído?
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCompletingAppointment(false)}>
              Cancelar
            </Button>
            <Button onClick={completeAppointment}>
              Confirmar Conclusão
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog de Cancelar Agendamento */}
      <Dialog open={isCancellingAppointment} onOpenChange={setIsCancellingAppointment}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancelar Agendamento</DialogTitle>
            <DialogDescription>
              Esta ação informará ao cliente que o agendamento foi cancelado.
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="py-4">
              <div className="flex items-center gap-4 mb-4 p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/10 dark:border-red-900/30">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div>
                  <h4 className="font-medium">{selectedAppointment.clientName}</h4>
                  <p className="text-sm">{formatAppointmentDate(selectedAppointment.startTime)}</p>
                  <p className="text-sm text-muted-foreground">{selectedAppointment.serviceName}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
              </p>
              <p className="text-sm text-muted-foreground">
                O cliente será notificado sobre o cancelamento.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsCancellingAppointment(false)}>
              Voltar
            </Button>
            <Button variant="destructive" onClick={cancelAppointment}>
              Cancelar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BarberShopAppointments; 