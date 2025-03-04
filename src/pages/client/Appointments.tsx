import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Scissors, AlertCircle, CheckCircle, XCircle, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Phone } from 'lucide-react';
import { format, isToday, isFuture, isPast, parseISO, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import { appointmentService, Appointment } from '@/api/appointments.service';

// Tipos
interface Appointment {
  id: number;
  barberName: string;
  barberShopName: string;
  barberPhone: string;
  service: string;
  date: string; // ISO string
  time: string;
  duration: number; // em minutos
  status: 'confirmed' | 'pending' | 'completed' | 'canceled';
  price: number;
  address: string;
  notes?: string;
  barberImage: string;
}

// Dados mockados
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    barberName: "Carlos Oliveira",
    barberShopName: "Barbearia Vintage",
    barberPhone: "(11) 98765-4321",
    service: "Corte de Cabelo + Barba",
    date: "2023-08-15T00:00:00.000Z",
    time: "14:30",
    duration: 60,
    status: 'completed',
    price: 85,
    address: "Rua das Flores, 123",
    notes: "Traga referência do corte desejado",
    barberImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    barberName: "Felipe Santos",
    barberShopName: "BarberShop Premium",
    barberPhone: "(11) 91234-5678",
    service: "Corte Degradê",
    date: new Date().toISOString().split('T')[0] + "T00:00:00.000Z", // Hoje
    time: "10:00",
    duration: 45,
    status: 'confirmed',
    price: 65,
    address: "Av. Principal, 500",
    barberImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 3,
    barberName: "Ricardo Almeida",
    barberShopName: "Corte & Arte",
    barberPhone: "(11) 95555-7777",
    service: "Corte + Tratamento Facial",
    date: "2023-08-25T00:00:00.000Z", // Futuro
    time: "16:00",
    duration: 90,
    status: 'pending',
    price: 120,
    address: "Rua das Palmeiras, 78",
    barberImage: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 4,
    barberName: "Alex Martin",
    barberShopName: "Barbearia Elite",
    barberPhone: "(11) 93333-2222",
    service: "Barba Completa",
    date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), // 3 dias no futuro
    time: "11:30",
    duration: 30,
    status: 'confirmed',
    price: 45,
    address: "Av. Central, 200",
    barberImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 5,
    barberName: "João Silva",
    barberShopName: "Master Barber",
    barberPhone: "(11) 97777-8888",
    service: "Corte Especial + Hidratação",
    date: "2023-07-10T00:00:00.000Z", // Passado
    time: "15:00",
    duration: 75,
    status: 'canceled',
    price: 95,
    address: "Rua dos Artistas, 45",
    notes: "Cliente cancelou por motivos pessoais",
    barberImage: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

// Componente principal
const ClientAppointments = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  const [pastAppointments, setPastAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await appointmentService.getAppointments();
      
      const now = new Date();
      const upcoming: Appointment[] = [];
      const past: Appointment[] = [];

      response.data.forEach((appointment) => {
        const appointmentDate = parseISO(`${appointment.date}T${appointment.time}`);
        
        if (isAfter(appointmentDate, now) && appointment.status !== 'cancelled') {
          upcoming.push(appointment);
        } else {
          past.push(appointment);
        }
      });

      setUpcomingAppointments(upcoming);
      setPastAppointments(past);
    } catch (error) {
      toast.error('Erro ao carregar agendamentos');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async () => {
    if (!selectedAppointment) return;
    
    try {
      setCancelLoading(true);
      await appointmentService.cancelAppointment(selectedAppointment.id);
      
      toast.success('Agendamento cancelado com sucesso');
      setCancelDialogOpen(false);
      
      // Atualizar a lista de agendamentos
      fetchAppointments();
    } catch (error) {
      toast.error('Erro ao cancelar agendamento');
      console.error(error);
    } finally {
      setCancelLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500">Confirmado</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-amber-500 text-amber-500">Aguardando</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Concluído</Badge>;
      case 'no_show':
        return <Badge variant="outline" className="border-red-500 text-red-500">Não Compareceu</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatAppointmentDate = (date: string) => {
    return format(parseISO(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  const formatAppointmentTime = (time: string) => {
    return time.substring(0, 5) + 'h';
  };

  const renderAppointmentCard = (appointment: Appointment) => {
    const appointmentDate = formatAppointmentDate(appointment.date);
    const appointmentTime = formatAppointmentTime(appointment.time);
    
    const canCancel = appointment.status !== 'cancelled' && 
                      appointment.status !== 'completed' && 
                      appointment.status !== 'no_show' &&
                      isAfter(parseISO(`${appointment.date}T${appointment.time}`), new Date());
    
    return (
      <Card key={appointment.id} className="mb-4 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {appointmentDate}
              </CardTitle>
              <CardDescription className="text-sm mt-1 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {appointmentTime} • {appointment.duration} min
              </CardDescription>
            </div>
            {getStatusBadge(appointment.status)}
          </div>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={appointment.barber?.photo} alt={appointment.barber?.name} />
              <AvatarFallback>{appointment.barber?.name?.substring(0, 2).toUpperCase() || 'BB'}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2">
              <div>
                <div className="font-medium flex items-center">
                  <User className="w-4 h-4 mr-1 text-muted-foreground" />
                  {appointment.barber?.name || 'Barbeiro não informado'}
                </div>
                <div className="text-sm text-muted-foreground flex items-center mt-0.5">
                  <Scissors className="w-4 h-4 mr-1" />
                  {appointment.service?.name || 'Serviço não informado'}
                </div>
              </div>
              
              {appointment.barbershop_id && (
                <div className="text-sm flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                  {appointment.barber?.barbershop?.name || 'Barbearia não informada'}
                </div>
              )}
            </div>
          </div>
          
          {appointment.notes && (
            <div className="mt-4">
              <Separator className="mb-2" />
              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="pt-2">
          <div className="flex justify-between w-full items-center">
            <div className="text-lg font-semibold">
              {appointment.price ? `R$ ${appointment.price.toFixed(2)}` : 'Preço não informado'}
            </div>
            
            <div className="flex gap-2">
              {canCancel && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => {
                    setSelectedAppointment(appointment);
                    setCancelDialogOpen(true);
                  }}
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
              )}
              
              <Button 
                variant="default" 
                size="sm"
                asChild
              >
                <Link to={`/app/appointments/${appointment.id}`}>
                  Detalhes
                </Link>
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Meus Agendamentos</h1>
        <Button asChild>
          <Link to="/app/find-barbers">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Link>
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upcoming">Próximos</TabsTrigger>
          <TabsTrigger value="past">Anteriores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4">
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Carregando agendamentos...</p>
            </div>
          ) : upcomingAppointments.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="pr-4">
                {upcomingAppointments.map(renderAppointmentCard)}
              </div>
            </ScrollArea>
          ) : (
            <div className="py-12 text-center">
              <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Sem agendamentos</h3>
              <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
                Você não possui agendamentos próximos. Que tal agendar um corte agora?
              </p>
              <Button className="mt-6" asChild>
                <Link to="/app/find-barbers">
                  Encontrar Barbeiros
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-4">
          {isLoading ? (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Carregando agendamentos...</p>
            </div>
          ) : pastAppointments.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="pr-4">
                {pastAppointments.map(renderAppointmentCard)}
              </div>
            </ScrollArea>
          ) : (
            <div className="py-12 text-center">
              <div className="rounded-full bg-muted w-12 h-12 flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Sem histórico</h3>
              <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
                Você ainda não possui histórico de agendamentos anteriores.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar Agendamento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja cancelar este agendamento? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          
          {selectedAppointment && (
            <div className="py-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-8 w-8 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium">{formatAppointmentDate(selectedAppointment.date)}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatAppointmentTime(selectedAppointment.time)} • {selectedAppointment.service?.name}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)} disabled={cancelLoading}>
              Voltar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancelAppointment}
              disabled={cancelLoading}
            >
              {cancelLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Cancelando...
                </>
              ) : (
                <>Confirmar Cancelamento</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientAppointments; 