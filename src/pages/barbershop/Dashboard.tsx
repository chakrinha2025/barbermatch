import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
  Users, Calendar, DollarSign, BarChart3, Clock, ArrowRight, TrendingUp, TrendingDown,
  ScissorsLineDashed, Star, CircleUser, ShoppingBag, Bell, Settings, MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Dados mockados para o dashboard
const weeklyData = [
  { day: 'Segunda', appointments: 12, revenue: 650 },
  { day: 'Terça', appointments: 9, revenue: 420 },
  { day: 'Quarta', appointments: 15, revenue: 780 },
  { day: 'Quinta', appointments: 18, revenue: 950 },
  { day: 'Sexta', appointments: 22, revenue: 1250 },
  { day: 'Sábado', appointments: 25, revenue: 1400 },
  { day: 'Domingo', appointments: 5, revenue: 250 },
];

const upcomingAppointments = [
  { id: 1, clientName: 'Rafael Silva', time: '13:30', service: 'Corte Degradê', photo: '/assets/avatar-1.jpg' },
  { id: 2, clientName: 'Bruno Oliveira', time: '14:15', service: 'Barba Completa', photo: '/assets/avatar-2.jpg' },
  { id: 3, clientName: 'Miguel Alves', time: '15:00', service: 'Corte Social', photo: '/assets/avatar-3.jpg' },
  { id: 4, clientName: 'Gabriel Santos', time: '16:30', service: 'Corte e Barba', photo: '/assets/avatar-4.jpg' },
];

const popularServices = [
  { name: 'Corte Degradê', count: 58, revenue: 2900 },
  { name: 'Barba Completa', count: 42, revenue: 1680 },
  { name: 'Corte e Barba', count: 36, revenue: 2520 },
  { name: 'Corte Social', count: 23, revenue: 920 },
];

const BarberShopDashboard = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrame, setTimeFrame] = useState('week');
  const [stats, setStats] = useState({
    totalAppointments: 106,
    totalRevenue: 5450,
    averageRating: 4.8,
    newClients: 14
  });
  
  // Simulação de carregamento de dados
  useEffect(() => {
    const loadData = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(loadData);
  }, []);
  
  const compareWithPreviousPeriod = (value: number, percentage: number) => {
    const isPositive = percentage >= 0;
    
    return (
      <div className="flex items-center mt-1">
        <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
          {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
          {isPositive ? '+' : ''}{percentage}% vs período anterior
        </span>
      </div>
    );
  };
  
  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard da Barbearia</h1>
            <p className="text-muted-foreground">Bem-vindo de volta, {user?.name || 'Proprietário'}</p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <Button size="sm" variant="outline" className="flex items-center">
              <Bell className="h-4 w-4 mr-2" /> Notificações
            </Button>
            <Button size="sm" variant="outline" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" /> Configurações
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Agendamentos</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAppointments}</div>
              {compareWithPreviousPeriod(stats.totalAppointments, 12.5)}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Faturamento</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ {stats.totalRevenue}</div>
              {compareWithPreviousPeriod(stats.totalRevenue, 8.2)}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avaliação</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating} / 5</div>
              {compareWithPreviousPeriod(stats.averageRating, 3.2)}
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Novos Clientes</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newClients}</div>
              {compareWithPreviousPeriod(stats.newClients, -5.3)}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Gráficos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Análise de Desempenho</CardTitle>
                <CardDescription>Visão geral de agendamentos e faturamento</CardDescription>
              </div>
              <Tabs defaultValue="week" value={timeFrame} onValueChange={setTimeFrame}>
                <TabsList>
                  <TabsTrigger value="week">Semana</TabsTrigger>
                  <TabsTrigger value="month">Mês</TabsTrigger>
                  <TabsTrigger value="year">Ano</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="appointments" fill="#8b5cf6" name="Agendamentos" />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Faturamento (R$)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Layouts inferiores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Próximos Agendamentos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Próximos Agendamentos</CardTitle>
                <Button variant="outline" size="sm">
                  Ver todos
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center space-x-4 p-3 rounded-lg border border-muted">
                    <Avatar>
                      <AvatarImage src={appointment.photo} alt={appointment.clientName} />
                      <AvatarFallback>{appointment.clientName.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{appointment.clientName}</div>
                      <div className="text-sm text-muted-foreground">{appointment.service}</div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">{appointment.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                Gerenciar Agenda <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
        
        {/* Serviços Mais Populares */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Serviços Mais Populares</CardTitle>
                <Badge variant="secondary" className="flex items-center">
                  <BarChart3 className="h-3 w-3 mr-1" /> Estatísticas
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-4">
                {popularServices.map((service, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ScissorsLineDashed className="h-4 w-4 text-primary mr-2" />
                        <span className="font-medium">{service.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{service.count} agendamentos</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(service.count / 60) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-muted-foreground text-right">
                      R$ {service.revenue} em faturamento
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                Gerenciar Serviços <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      
      {/* Seção inferior - Atalhos rápidos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="mt-6"
      >
        <h2 className="text-xl font-bold mb-4">Atalhos Rápidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
            <Calendar className="h-8 w-8 mb-2" />
            <span>Novo Agendamento</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
            <CircleUser className="h-8 w-8 mb-2" />
            <span>Adicionar Cliente</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
            <ShoppingBag className="h-8 w-8 mb-2" />
            <span>Registrar Venda</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
            <MessageSquare className="h-8 w-8 mb-2" />
            <span>Mensagens</span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default BarberShopDashboard; 