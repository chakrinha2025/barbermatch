import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/api/supabase-client';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Users, 
  Scissors, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  Activity,
  Clock,
  Map
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Cores personalizadas para gráficos
const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

// Tipos de dados para gráficos
interface StatsData {
  appointments: number;
  clients: number;
  barbers: number;
  barbershops: number;
  revenue: number;
  averageRating: number;
}

interface ChartData {
  name: string;
  value: number;
}

interface TrendData {
  name: string;
  clients: number;
  appointments: number;
  revenue: number;
}

interface PopularHairstyle {
  id: string;
  name: string;
  count: number;
  category: string;
  image_url: string;
}

const StatsDashboard = () => {
  const { user } = useAuth();
  const [statsData, setStatsData] = useState<StatsData>({
    appointments: 0,
    clients: 0,
    barbers: 0,
    barbershops: 0,
    revenue: 0,
    averageRating: 0
  });
  const [timeRange, setTimeRange] = useState<string>('month');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [popularHairstyles, setPopularHairstyles] = useState<PopularHairstyle[]>([]);
  const [appointmentsByDayData, setAppointmentsByDayData] = useState<ChartData[]>([]);
  const [revenueByServiceData, setRevenueByServiceData] = useState<ChartData[]>([]);

  // Carregar dados das estatísticas
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Em um projeto real, você buscaria esses dados do Supabase
        // Exemplo de simulação para demonstração:
        
        // Simulação de resumo de estatísticas
        setStatsData({
          appointments: 1248,
          clients: 856,
          barbers: 124,
          barbershops: 47,
          revenue: 78650,
          averageRating: 4.7
        });

        // Simulação de dados de tendências
        const mockTrendData = [
          { name: 'Jan', clients: 120, appointments: 150, revenue: 9000 },
          { name: 'Fev', clients: 150, appointments: 200, revenue: 12000 },
          { name: 'Mar', clients: 180, appointments: 220, revenue: 13500 },
          { name: 'Abr', clients: 210, appointments: 280, revenue: 16800 },
          { name: 'Mai', clients: 250, appointments: 320, revenue: 19200 },
          { name: 'Jun', clients: 280, appointments: 350, revenue: 21000 },
          { name: 'Jul', clients: 310, appointments: 380, revenue: 22800 },
          { name: 'Ago', clients: 330, appointments: 400, revenue: 24000 },
          { name: 'Set', clients: 360, appointments: 430, revenue: 25800 },
          { name: 'Out', clients: 400, appointments: 470, revenue: 28200 },
          { name: 'Nov', clients: 440, appointments: 510, revenue: 30600 },
          { name: 'Dez', clients: 480, appointments: 550, revenue: 33000 }
        ];
        setTrendData(mockTrendData);

        // Simulação de cortes populares
        setPopularHairstyles([
          { id: '1', name: 'Degradê com Topete', count: 243, category: 'corte', image_url: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=500&auto=format&fit=crop' },
          { id: '2', name: 'Barba Cheia Aparada', count: 187, category: 'barba', image_url: 'https://images.unsplash.com/photo-1595099821771-3f31769354a7?w=500&auto=format&fit=crop' },
          { id: '3', name: 'Corte Social Moderno', count: 156, category: 'corte', image_url: 'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=500&auto=format&fit=crop' },
          { id: '4', name: 'Undercut', count: 143, category: 'corte', image_url: 'https://images.unsplash.com/photo-1519345274080-69eebe935e3d?w=500&auto=format&fit=crop' },
          { id: '5', name: 'Barba Estilizada', count: 118, category: 'barba', image_url: 'https://images.unsplash.com/photo-1473187983305-f615310e7daa?w=500&auto=format&fit=crop' }
        ]);

        // Dados de agendamentos por dia da semana
        setAppointmentsByDayData([
          { name: 'Segunda', value: 147 },
          { name: 'Terça', value: 134 },
          { name: 'Quarta', value: 156 },
          { name: 'Quinta', value: 165 },
          { name: 'Sexta', value: 212 },
          { name: 'Sábado', value: 245 },
          { name: 'Domingo', value: 89 }
        ]);

        // Dados de receita por tipo de serviço
        setRevenueByServiceData([
          { name: 'Corte Básico', value: 23500 },
          { name: 'Barba', value: 15800 },
          { name: 'Corte Premium', value: 19200 },
          { name: 'Coloração', value: 8500 },
          { name: 'Tratamentos', value: 11650 }
        ]);

      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [timeRange]);

  // Componente de cartão de estatística
  const StatCard = ({ 
    title, 
    value, 
    suffix = '', 
    prefix = '', 
    icon, 
    change, 
    changeType = 'positive' 
  }: { 
    title: string; 
    value: number; 
    suffix?: string; 
    prefix?: string; 
    icon: React.ReactNode; 
    change?: number; 
    changeType?: 'positive' | 'negative' | 'neutral'; 
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
          </div>
          {change !== undefined && (
            <p className="text-xs mt-1 flex items-center">
              vs. período anterior
              <span className={`ml-1 flex items-center ${
                changeType === 'positive' ? 'text-green-500' : 
                changeType === 'negative' ? 'text-red-500' : 'text-orange-500'
              }`}>
                {changeType === 'positive' ? <ChevronUp size={14} /> : 
                 changeType === 'negative' ? <ChevronDown size={14} /> : null}
                {change}%
              </span>
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold">Estatísticas da Plataforma</h1>
          <p className="text-muted-foreground">Análise detalhada do desempenho do BarberMatch</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
              <SelectItem value="all">Todo o Período</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard 
          title="Clientes Registrados" 
          value={statsData.clients} 
          icon={<Users size={18} />} 
          change={8.7} 
          changeType="positive" 
        />
        <StatCard 
          title="Agendamentos" 
          value={statsData.appointments} 
          icon={<Calendar size={18} />} 
          change={12.3} 
          changeType="positive" 
        />
        <StatCard 
          title="Faturamento" 
          value={statsData.revenue} 
          prefix="R$ " 
          icon={<DollarSign size={18} />}
          change={5.2} 
          changeType="positive" 
        />
        <StatCard 
          title="Avaliação Média" 
          value={statsData.averageRating} 
          icon={<TrendingUp size={18} />} 
          change={0.3} 
          changeType="neutral" 
        />
      </div>

      {/* Tabs para gráficos */}
      <Tabs defaultValue="overview" className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="revenue">Faturamento</TabsTrigger>
            <TabsTrigger value="trends">Tendências</TabsTrigger>
          </TabsList>
        </motion.div>

        <TabsContent value="overview" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Crescimento da Plataforma</CardTitle>
                <CardDescription>
                  Comparativo de crescimento de clientes, agendamentos e faturamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="clients" stroke="#8b5cf6" activeDot={{ r: 8 }} name="Clientes" />
                      <Line type="monotone" dataKey="appointments" stroke="#ec4899" name="Agendamentos" />
                      <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Faturamento (R$)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Agendamentos por Dia da Semana</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={appointmentsByDayData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8b5cf6" name="Agendamentos" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Distribuição de Faturamento por Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueByServiceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {revenueByServiceData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="appointments" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Análise de Agendamentos</CardTitle>
                    <CardDescription>Detalhamento de agendamentos por período e tipo</CardDescription>
                  </div>
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="appointments" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} name="Total de Agendamentos" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Horário com maior procura: 15:00 - 19:00</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver relatório completo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Taxa de Ocupação das Barbearias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Seg', value: 62 },
                          { name: 'Ter', value: 58 },
                          { name: 'Qua', value: 65 },
                          { name: 'Qui', value: 70 },
                          { name: 'Sex', value: 85 },
                          { name: 'Sáb', value: 94 },
                          { name: 'Dom', value: 45 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Bar dataKey="value" fill="#10b981" name="Ocupação (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status dos Agendamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Concluídos', value: 755 },
                            { name: 'Agendados', value: 342 },
                            { name: 'Cancelados', value: 121 },
                            { name: 'No-shows', value: 30 }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill="#10b981" />
                          <Cell fill="#3b82f6" />
                          <Cell fill="#f59e0b" />
                          <Cell fill="#ef4444" />
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Análise de Faturamento</CardTitle>
                    <CardDescription>Evolução do faturamento ao longo do tempo</CardDescription>
                  </div>
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                      <Legend />
                      <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.5} name="Faturamento (R$)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Crescimento anual de 32.5%</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Exportar dados <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ticket Médio por Barbearia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Premium', value: 105 },
                          { name: 'Standard', value: 72 },
                          { name: 'Básico', value: 45 }
                        ]}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => `R$ ${value}`} />
                        <Bar dataKey="value" fill="#8b5cf6" name="Ticket médio (R$)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Receita por Categoria de Serviço</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={revenueByServiceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {revenueByServiceData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Cortes de Cabelo Mais Populares</CardTitle>
                  <CardDescription>Baseado no número de agendamentos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {popularHairstyles.slice(0, 5).map((style, index) => (
                      <motion.div 
                        key={style.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-4"
                      >
                        <div className="w-12 h-12 rounded-md overflow-hidden">
                          <img 
                            src={style.image_url} 
                            alt={style.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{style.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">{style.category}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="font-bold">{style.count}</span>
                          <Scissors className="ml-2 h-4 w-4 text-muted-foreground" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">Distribuição Geográfica</CardTitle>
                  <CardDescription>Atividade por região</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[340px] flex items-center justify-center">
                    <div className="text-center">
                      <Map className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                      <p className="text-muted-foreground">Mapa de distribuição geográfica</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        (Funcionalidade em desenvolvimento)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Análise de Tendências Sazonais</CardTitle>
                <CardDescription>
                  Como as tendências de cortes e barbas variam ao longo do ano
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: 'Jan', degrade: 120, barba: 80, social: 90, undercut: 60, coloracao: 30 },
                        { month: 'Fev', degrade: 130, barba: 85, social: 95, undercut: 62, coloracao: 32 },
                        { month: 'Mar', degrade: 140, barba: 90, social: 100, undercut: 70, coloracao: 35 },
                        { month: 'Abr', degrade: 150, barba: 100, social: 90, undercut: 75, coloracao: 40 },
                        { month: 'Mai', degrade: 145, barba: 110, social: 85, undercut: 85, coloracao: 45 },
                        { month: 'Jun', degrade: 155, barba: 115, social: 80, undercut: 90, coloracao: 50 },
                        { month: 'Jul', degrade: 160, barba: 120, social: 75, undercut: 95, coloracao: 55 },
                        { month: 'Ago', degrade: 170, barba: 125, social: 80, undercut: 100, coloracao: 60 },
                        { month: 'Set', degrade: 180, barba: 120, social: 85, undercut: 90, coloracao: 65 },
                        { month: 'Out', degrade: 190, barba: 115, social: 90, undercut: 85, coloracao: 70 },
                        { month: 'Nov', degrade: 200, barba: 110, social: 95, undercut: 80, coloracao: 75 },
                        { month: 'Dez', degrade: 220, barba: 105, social: 100, undercut: 75, coloracao: 80 },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#888" strokeOpacity={0.2} />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="degrade" stroke="#8b5cf6" name="Degradê" />
                      <Line type="monotone" dataKey="barba" stroke="#ec4899" name="Barba" />
                      <Line type="monotone" dataKey="social" stroke="#3b82f6" name="Corte Social" />
                      <Line type="monotone" dataKey="undercut" stroke="#10b981" name="Undercut" />
                      <Line type="monotone" dataKey="coloracao" stroke="#f59e0b" name="Coloração" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-muted-foreground">Degradê continua sendo o corte mais procurado</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver análise completa <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatsDashboard; 