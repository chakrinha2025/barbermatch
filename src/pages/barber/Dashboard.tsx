import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Clock, 
  DollarSign,
  Scissors,
  Star,
  ChevronRight,
  BarChart
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { getWidthClass, getHeightClass } from '@/lib/animations';
import LineChart from '@/components/LineChart';

// Dados simulados - em produção viriam de uma API
const TODAY_APPOINTMENTS = [
  { 
    id: 1, 
    clientName: 'João Silva', 
    service: 'Corte + Barba', 
    time: '09:30',
    status: 'confirmed',
    phone: '(41) 98765-4321'
  },
  { 
    id: 2, 
    clientName: 'Carlos Oliveira', 
    service: 'Degradê + Sobrancelha', 
    time: '11:00',
    status: 'confirmed',
    phone: '(41) 99876-5432'
  },
  { 
    id: 3, 
    clientName: 'Rafael Costa', 
    service: 'Barba Completa', 
    time: '14:30',
    status: 'pending',
    phone: '(41) 97654-3210'
  },
  { 
    id: 4, 
    clientName: 'Miguel Santos', 
    service: 'Corte Simples', 
    time: '16:00',
    status: 'confirmed',
    phone: '(41) 98877-6655'
  }
];

const PERFORMANCE_STATS = [
  { icon: Users, label: 'Clientes Atendidos', value: '128', change: '+12%', period: 'este mês' },
  { icon: Scissors, label: 'Serviços Realizados', value: '156', change: '+8%', period: 'este mês' },
  { icon: Star, label: 'Avaliação Média', value: '4.8', change: '+0.2', period: 'últimos 30 dias' },
  { icon: DollarSign, label: 'Faturamento', value: 'R$ 4.562', change: '+15%', period: 'este mês' },
];

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'confirmed':
      return { text: 'Confirmado', classes: 'bg-primary/10 text-primary' };
    case 'pending':
      return { text: 'Pendente', classes: 'bg-amber-500/10 text-amber-500' };
    case 'cancelled':
      return { text: 'Cancelado', classes: 'bg-destructive/10 text-destructive' };
    default:
      return { text: status, classes: 'bg-muted text-muted-foreground' };
  }
};

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const hour = new Date().getHours();
    let newGreeting = '';
    
    if (hour < 12) {
      newGreeting = 'Bom dia';
    } else if (hour < 18) {
      newGreeting = 'Boa tarde';
    } else {
      newGreeting = 'Boa noite';
    }
    
    setGreeting(newGreeting);
    
    // Atualizar o relógio a cada minuto
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Formatar a data atual
  const formattedDate = currentTime.toLocaleDateString('pt-BR', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Capitalizar a primeira letra do dia da semana
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{greeting}, Marcos!</h1>
        <p className="text-muted-foreground">
          {capitalizedDate} • {currentTime.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
      
      {/* Cards de Desempenho */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {PERFORMANCE_STATS.map((stat, index) => (
          <div 
            key={index} 
            className="bg-card rounded-xl border p-4 transition-all hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <stat.icon size={20} className="text-primary" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-green-500 font-medium">{stat.change}</span>
              <span className="text-muted-foreground ml-1">{stat.period}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Agendamentos de Hoje */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center">
            <Calendar size={20} className="mr-2" />
            Agendamentos de Hoje
          </h2>
          <Link 
            to="/barber/appointments" 
            className="text-primary text-sm font-medium flex items-center hover:underline"
          >
            Ver todos
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        
        {TODAY_APPOINTMENTS.length > 0 ? (
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="px-4 py-3 text-left text-sm font-medium">Horário</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Cliente</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Serviço</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Contato</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {TODAY_APPOINTMENTS.map((appointment) => {
                    const status = getStatusLabel(appointment.status);
                    return (
                      <tr key={appointment.id} className="border-b last:border-b-0 hover:bg-muted/20">
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center">
                            <Clock size={14} className="mr-2 text-muted-foreground" />
                            {appointment.time}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">{appointment.clientName}</td>
                        <td className="px-4 py-3 text-sm">{appointment.service}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${status.classes}`}>
                            {status.text}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm">{appointment.phone}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <Link
                            to={`/barber/appointments/${appointment.id}`}
                            className="text-xs font-medium px-2 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                          >
                            Detalhes
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-xl border p-6 text-center">
            <p className="text-muted-foreground">
              Você não tem agendamentos para hoje.
            </p>
          </div>
        )}
      </div>
      
      {/* Estatísticas Rápidas */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-card rounded-xl border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center">
              <Scissors size={18} className="mr-2" />
              Serviços Mais Populares
            </h3>
            <Link 
              to="/barber/statistics" 
              className="text-primary text-xs font-medium hover:underline"
            >
              Ver detalhes
            </Link>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Corte Degradê</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[42%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Barba Completa</span>
                <span className="font-medium">28%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[28%]"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Corte + Barba</span>
                <span className="font-medium">18%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[18%]"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-card rounded-xl border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center">
              <BarChart size={18} className="mr-2" />
              Visão Semanal
            </h3>
            <Link 
              to="/barber/statistics" 
              className="text-primary text-xs font-medium hover:underline"
            >
              Ver detalhes
            </Link>
          </div>
          
          <div className="grid grid-cols-7 gap-1 h-24">
            {[30, 45, 65, 50, 75, 40, 20].map((height, index) => (
              <div key={index} className="flex flex-col items-center justify-end h-full">
                <div 
                  className={`w-full bg-primary/80 rounded-t-sm ${getHeightClass(height)}`} 
                ></div>
                <span className="text-xs text-muted-foreground mt-1">
                  {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][index]}
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Total de 35 agendamentos esta semana</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 