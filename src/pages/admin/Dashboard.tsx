import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Scissors, 
  Clock, 
  DollarSign,
  Building,
  AlertTriangle,
  ChevronRight,
  BarChart,
  HelpCircle,
  ShieldAlert,
  Activity,
  ChevronUp,
  ChevronDown,
  Calendar,
  Star,
  MapPin
} from 'lucide-react';

// Dados simulados - em produção viriam de uma API
const PLATFORM_STATS = [
  { 
    icon: Users, 
    label: 'Usuários Ativos', 
    value: '1,248', 
    change: '+12%', 
    period: 'este mês',
    changeType: 'positive'
  },
  { 
    icon: Scissors, 
    label: 'Barbeiros', 
    value: '156', 
    change: '+8%', 
    period: 'este mês',
    changeType: 'positive'
  },
  { 
    icon: Building, 
    label: 'Barbearias', 
    value: '78', 
    change: '+5%', 
    period: 'este mês',
    changeType: 'positive'
  },
  { 
    icon: Clock, 
    label: 'Agendamentos', 
    value: '3,897', 
    change: '+22%', 
    period: '30 dias',
    changeType: 'positive'
  },
  { 
    icon: DollarSign, 
    label: 'Faturamento', 
    value: 'R$ 156.482', 
    change: '+18%', 
    period: 'este mês',
    changeType: 'positive'
  },
  { 
    icon: AlertTriangle, 
    label: 'Reclamações', 
    value: '14', 
    change: '-8%', 
    period: 'este mês',
    changeType: 'negative'
  },
];

const RECENT_ACTIVITIES = [
  { 
    id: 1, 
    type: 'new_user', 
    message: 'Novo usuário cadastrado', 
    detail: 'João Silva se registrou como cliente',
    time: '2 horas atrás',
    icon: Users,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-500/10'
  },
  { 
    id: 2, 
    type: 'new_barber', 
    message: 'Novo barbeiro na plataforma', 
    detail: 'Barbearia Vintage adicionou 2 novos barbeiros',
    time: '3 horas atrás',
    icon: Scissors,
    iconColor: 'text-teal-500',
    iconBg: 'bg-teal-500/10'
  },
  { 
    id: 3, 
    type: 'payment', 
    message: 'Pagamento processado', 
    detail: 'Barbearia Style realizou pagamento mensal: R$ 199,90',
    time: '5 horas atrás',
    icon: DollarSign,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-500/10'
  },
  { 
    id: 4, 
    type: 'issue', 
    message: 'Problema reportado', 
    detail: 'Cliente relatou problema com agendamento #12456',
    time: '6 horas atrás',
    icon: AlertTriangle,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-500/10'
  },
  { 
    id: 5, 
    type: 'support', 
    message: 'Ticket de suporte aberto', 
    detail: 'Barbearia Elite precisa de ajuda com configurações',
    time: '10 horas atrás',
    icon: HelpCircle,
    iconColor: 'text-indigo-500',
    iconBg: 'bg-indigo-500/10'
  },
];

const TOP_BARBERS = [
  {
    id: 1,
    name: 'Barbearia Vintage',
    appointments: 145,
    rating: 4.9,
    revenue: 'R$ 8.750',
    location: 'São Paulo, SP',
    growth: '+12%'
  },
  {
    id: 2,
    name: 'Elite Barber Shop',
    appointments: 132,
    rating: 4.8,
    revenue: 'R$ 7.980',
    location: 'Rio de Janeiro, RJ',
    growth: '+9%'
  },
  {
    id: 3,
    name: 'Barber Kings',
    appointments: 118,
    rating: 4.7,
    revenue: 'R$ 7.250',
    location: 'Belo Horizonte, MG',
    growth: '+15%'
  },
  {
    id: 4,
    name: 'Modern Cut',
    appointments: 105,
    rating: 4.6,
    revenue: 'R$ 6.800',
    location: 'Curitiba, PR',
    growth: '+7%'
  },
  {
    id: 5,
    name: 'Gentleman\'s Club',
    appointments: 98,
    rating: 4.8,
    revenue: 'R$ 6.450',
    location: 'Brasília, DF',
    growth: '+11%'
  }
];

const SUBSCRIPTION_DATA = [
  { name: 'Plano Gratuito', value: 32, fill: '#94a3b8' },
  { name: 'Plano Profissional', value: 48, fill: '#818cf8' },
  { name: 'Plano Premium', value: 20, fill: '#3b82f6' },
];

const TREND_DATA = [
  { name: 'Jan', users: 1200, barbers: 120, barbearias: 48 },
  { name: 'Fev', users: 1350, barbers: 125, barbearias: 52 },
  { name: 'Mar', users: 1500, barbers: 132, barbearias: 58 },
  { name: 'Abr', users: 1580, barbers: 138, barbearias: 62 },
  { name: 'Mai', users: 1620, barbers: 142, barbearias: 65 },
  { name: 'Jun', users: 1750, barbers: 148, barbearias: 68 },
  { name: 'Jul', users: 1890, barbers: 152, barbearias: 72 },
  { name: 'Ago', users: 2050, barbers: 156, barbearias: 78 },
];

// Adicionar uma função auxiliar para calcular a classe de altura com base nos dados
const getHeightClass = (users: number): string => {
  const height = Math.round(users / 30);
  return `h-[${height}px]`;
};

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [showSuccessMetrics, setShowSuccessMetrics] = useState(true);
  const [showPlatformActivity, setShowPlatformActivity] = useState(true);
  const [showBarberRanking, setShowBarberRanking] = useState(true);
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');
  
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
  }, []);
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <ShieldAlert className="mr-2 text-primary" size={28} />
          {greeting}, Administrador
        </h1>
        <p className="text-muted-foreground">
          Painel administrativo da plataforma BarberMatch com métricas gerais e atividades recentes.
        </p>
      </div>
      
      {/* Filtros de Data */}
      <div className="flex justify-end">
        <div className="inline-flex items-center rounded-md border overflow-hidden">
          <button 
            onClick={() => setDateRange('week')} 
            className={`px-3 py-1.5 text-sm font-medium ${
              dateRange === 'week' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card hover:bg-muted'
            }`}
          >
            Semana
          </button>
          <button 
            onClick={() => setDateRange('month')} 
            className={`px-3 py-1.5 text-sm font-medium ${
              dateRange === 'month' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card hover:bg-muted'
            }`}
          >
            Mês
          </button>
          <button 
            onClick={() => setDateRange('year')} 
            className={`px-3 py-1.5 text-sm font-medium ${
              dateRange === 'year' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card hover:bg-muted'
            }`}
          >
            Ano
          </button>
        </div>
      </div>
      
      {/* Cards de Estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {PLATFORM_STATS.map((stat, index) => (
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
              <div className={`p-2 rounded-full ${
                stat.changeType === 'positive' ? 'bg-primary/10' : 'bg-destructive/10'
              }`}>
                <stat.icon size={20} className={
                  stat.changeType === 'positive' ? 'text-primary' : 'text-destructive'
                } />
              </div>
            </div>
            <div className="mt-2 flex items-center text-xs">
              {stat.changeType === 'positive' ? (
                <ChevronUp size={14} className="text-green-500 mr-1" />
              ) : (
                <ChevronDown size={14} className="text-green-500 mr-1" />
              )}
              <span className={`font-medium ${
                stat.changeType === 'positive' ? 'text-green-500' : 'text-green-500'
              }`}>
                {stat.change}
              </span>
              <span className="text-muted-foreground ml-1">{stat.period}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Ranking de Barbearias */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div 
          className="p-4 border-b flex items-center justify-between cursor-pointer"
          onClick={() => setShowBarberRanking(!showBarberRanking)}
        >
          <h2 className="font-semibold flex items-center">
            <Star size={18} className="mr-2 text-primary" />
            Top Barbearias
          </h2>
          <button 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showBarberRanking ? 'Ocultar ranking' : 'Mostrar ranking'}
          >
            {showBarberRanking ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
        </div>
        
        {showBarberRanking && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/40">
                  <th className="px-4 py-3 text-left text-sm font-medium">Barbearia</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Localização</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Agendamentos</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Avaliação</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Faturamento</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Crescimento</th>
                </tr>
              </thead>
              <tbody>
                {TOP_BARBERS.map((barber, index) => (
                  <tr key={barber.id} className="border-b hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">
                      {index + 1}. {barber.name}
                    </td>
                    <td className="px-4 py-3 text-sm flex items-center">
                      <MapPin size={14} className="mr-1 text-muted-foreground" />
                      {barber.location}
                    </td>
                    <td className="px-4 py-3 text-sm flex items-center">
                      <Calendar size={14} className="mr-1 text-muted-foreground" />
                      {barber.appointments}
                    </td>
                    <td className="px-4 py-3 text-sm flex items-center">
                      <Star size={14} className="mr-1 text-amber-500 fill-amber-500" />
                      {barber.rating}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {barber.revenue}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-500 font-medium">
                      {barber.growth}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Métricas de Sucesso */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div 
          className="p-4 border-b flex items-center justify-between cursor-pointer"
          onClick={() => setShowSuccessMetrics(!showSuccessMetrics)}
        >
          <h2 className="font-semibold flex items-center">
            <Activity size={18} className="mr-2 text-primary" />
            Métricas de Crescimento
          </h2>
          <button 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showSuccessMetrics ? 'Ocultar métricas' : 'Mostrar métricas'}
          >
            {showSuccessMetrics ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
        </div>
        
        {showSuccessMetrics && (
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-4">Distribuição de Assinaturas</h3>
                <div className="h-64 flex items-center justify-center">
                  {/* Aqui seria inserido um gráfico de pizza usando Recharts */}
                  <div className="text-center text-muted-foreground">
                    Gráfico de pizza mostrando:
                    <ul className="text-sm mt-2 space-y-1 text-left">
                      <li className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-slate-400 mr-2"></span>
                        Plano Gratuito: 32%
                      </li>
                      <li className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-indigo-400 mr-2"></span>
                        Plano Profissional: 48%
                      </li>
                      <li className="flex items-center">
                        <span className="h-3 w-3 rounded-full bg-blue-500 mr-2"></span>
                        Plano Premium: 20%
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-4">Crescimento da Plataforma</h3>
                <div className="h-64 flex items-center justify-center">
                  {/* Aqui seria inserido um gráfico de linha usando Recharts */}
                  <div className="text-center text-muted-foreground relative w-full h-full">
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/10 to-transparent rounded"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-border"></div>
                    <div className="absolute bottom-10 left-0 right-0 h-px bg-border/50 dashed"></div>
                    <div className="absolute bottom-20 left-0 right-0 h-px bg-border/50 dashed"></div>
                    <div className="absolute bottom-30 left-0 right-0 h-px bg-border/50 dashed"></div>
                    
                    <div className="absolute inset-0 flex items-end justify-between px-2">
                      {TREND_DATA.map((data, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="h-32 w-6 flex items-end">
                            <div 
                              className={`w-6 bg-primary rounded-t ${getHeightClass(data.users)}`}
                            ></div>
                          </div>
                          <span className="text-xs mt-1">{data.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-right">
              <a 
                href="/admin/reports" 
                className="text-primary text-sm font-medium flex items-center justify-end hover:underline"
              >
                Ver relatório completo
                <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Atividades Recentes */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div 
          className="p-4 border-b flex items-center justify-between cursor-pointer"
          onClick={() => setShowPlatformActivity(!showPlatformActivity)}
        >
          <h2 className="font-semibold flex items-center">
            <Activity size={18} className="mr-2 text-primary" />
            Atividades Recentes
          </h2>
          <button 
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPlatformActivity ? 'Ocultar atividades' : 'Mostrar atividades'}
          >
            {showPlatformActivity ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </button>
        </div>
        
        {showPlatformActivity && (
          <div>
            {RECENT_ACTIVITIES.map((activity, index) => (
              <div 
                key={activity.id} 
                className={`p-4 flex items-start gap-4 ${
                  index < RECENT_ACTIVITIES.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className={`p-2 rounded-full ${activity.iconBg}`}>
                  <activity.icon size={16} className={activity.iconColor} />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{activity.message}</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">{activity.detail}</p>
                  <span className="text-xs text-muted-foreground mt-1 block">{activity.time}</span>
                </div>
                
                <div>
                  <a 
                    href="#" 
                    className="text-primary text-xs font-medium hover:underline"
                  >
                    Detalhes
                  </a>
                </div>
              </div>
            ))}
            
            <div className="p-4 text-center border-t">
              <a 
                href="/admin/reports" 
                className="text-primary text-sm font-medium hover:underline"
              >
                Ver todas as atividades
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Ações Rápidas */}
      <div className="grid gap-4 md:grid-cols-3">
        <a 
          href="/admin/users"
          className="bg-card hover:bg-card/80 rounded-xl border p-4 text-center transition-colors"
        >
          <Users size={24} className="mx-auto mb-2 text-primary" />
          <h3 className="font-medium">Gerenciar Usuários</h3>
        </a>
        
        <a 
          href="/admin/barbers"
          className="bg-card hover:bg-card/80 rounded-xl border p-4 text-center transition-colors"
        >
          <Scissors size={24} className="mx-auto mb-2 text-primary" />
          <h3 className="font-medium">Gerenciar Barbeiros</h3>
        </a>
        
        <a 
          href="/admin/financial"
          className="bg-card hover:bg-card/80 rounded-xl border p-4 text-center transition-colors"
        >
          <DollarSign size={24} className="mx-auto mb-2 text-primary" />
          <h3 className="font-medium">Relatórios Financeiros</h3>
        </a>
      </div>
    </div>
  );
};

export default Dashboard; 