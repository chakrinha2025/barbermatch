import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Scissors, 
  Star,
  ChevronRight,
  Search,
  Filter,
  Sparkles,
  TrendingUp,
  Award,
  Gift,
  Bell,
  CreditCard
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import BarChart from "@/components/BarChart";
import TrendCard from "@/components/TrendCard";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { calcWidthPercentage } from '@/lib/animations';

// Dados simulados - em produção viriam de uma API
const UPCOMING_APPOINTMENTS = [
  { 
    id: 1, 
    barberName: 'Alex Martin', 
    service: 'Corte + Barba', 
    date: '2023-11-15', 
    time: '14:30',
    location: 'Barbearia VIP, Centro',
    price: 55,
    status: 'confirmed'
  },
  { 
    id: 2, 
    barberName: 'Marcus Johnson', 
    service: 'Barba Completa', 
    date: '2023-11-22', 
    time: '10:00',
    location: 'Studio Johnson, Batel',
    price: 25,
    status: 'pending'
  }
];

const RECOMMENDED_BARBERS = [
  { 
    id: 1, 
    name: "Alex Martin", 
    specialty: "Degradês & Cortes Clássicos", 
    rating: 4.9, 
    reviewCount: 324, 
    imageIndex: 1,
    distance: "1.2 km"
  },
  { 
    id: 2, 
    name: "Marcus Johnson", 
    specialty: "Estilização de Barba", 
    rating: 4.7, 
    reviewCount: 221, 
    imageIndex: 2,
    distance: "2.5 km"
  },
  { 
    id: 3, 
    name: "Ryan Garcia", 
    specialty: "Estilos Modernos", 
    rating: 4.8, 
    reviewCount: 189, 
    imageIndex: 3,
    distance: "3.7 km"
  },
];

const RECENT_STYLES = [
  { id: 1, name: 'Degradê Clássico', popularity: 87, imageIndex: 1 },
  { id: 2, name: 'Pompadour Moderno', popularity: 76, imageIndex: 2 },
  { id: 3, name: 'Undercut Estilizado', popularity: 82, imageIndex: 3 },
  { id: 4, name: 'Barba Definida', popularity: 91, imageIndex: 4 },
];

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-primary/10 text-primary';
    case 'pending':
      return 'bg-amber-500/10 text-amber-500';
    case 'cancelled':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getStatusText = (status: string) => {
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

const notificacoes = [
  {
    id: 1,
    tipo: "agendamento",
    titulo: "Agendamento Confirmado",
    mensagem: "Seu agendamento com Carlos Silva foi confirmado.",
    data: "Hoje, 10:30",
    lido: false
  },
  {
    id: 2,
    tipo: "promocao",
    titulo: "Oferta Exclusiva",
    mensagem: "20% de desconto no próximo corte com barba.",
    data: "Ontem, 15:45",
    lido: true
  },
  {
    id: 3,
    tipo: "sistema",
    titulo: "Atualização de Perfil",
    mensagem: "Seu perfil foi atualizado com sucesso.",
    data: "22/10/2023, 08:15",
    lido: true
  }
];

const dadosGastos = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      label: 'Gastos',
      data: [320, 280, 350, 290, 420, 380],
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      borderColor: 'rgb(99, 102, 241)',
      borderWidth: 1,
    }
  ]
};

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');
  const [nearbyBarbers, setNearbyBarbers] = useState(RECOMMENDED_BARBERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("visaogeral");
  
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
    
    // Simulação de busca de localização do cliente
    // Em produção, usaríamos a API de Geolocalização
    setTimeout(() => {
      console.log('Localização do cliente obtida');
    }, 1000);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(72), 500);
    return () => clearTimeout(timer);
  }, []);
  
  // Filtragem de barbeiros com base na busca
  const filteredBarbers = nearbyBarbers.filter(barber => 
    barber.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    barber.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <motion.h1 
            className="text-3xl font-bold tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Olá, João
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bem-vindo de volta ao seu painel de cliente
          </motion.p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Bell className="h-4 w-4" />
            <span className="relative">
              Notificações
              {UPCOMING_APPOINTMENTS.filter(n => n.status !== "confirmed").length > 0 && (
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
              )}
            </span>
          </Button>
          <Button className="gap-1">
            <Calendar className="h-4 w-4" />
            Agendar
          </Button>
                  </div>
                </div>
                
      <Tabs defaultValue="visaogeral" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="visaogeral">Visão Geral</TabsTrigger>
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="descubra">Descubra</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="visaogeral" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-violet-500 to-purple-700 text-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Programa de Fidelidade
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm opacity-90">
                          <span>Progresso</span>
                          <span>72%</span>
                        </div>
                        <Progress value={progress} className="h-2 bg-white/20" />
                        <p className="text-sm mt-2 font-medium">Faltam 2 cortes para um grátis!</p>
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
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <Scissors className="h-5 w-5" />
                        Último Corte
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <p className="font-medium">Degradê com Barba</p>
                      <p className="text-sm text-muted-foreground">Barbearia Vintage</p>
                      <p className="text-sm flex items-center gap-1 mt-1">
                        <Calendar className="h-3 w-3" /> 02/10/2023
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Economia
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <p className="font-medium">R$ 220,00</p>
                      <p className="text-sm text-muted-foreground">Economizados com descontos</p>
                      <p className="text-sm flex items-center gap-1 mt-1 text-green-500">
                        <TrendingUp className="h-3 w-3" /> 15% a mais que o mês passado
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Avaliações
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <p className="font-medium">12 avaliações feitas</p>
                      <p className="text-sm text-muted-foreground">Média de 4.8 estrelas</p>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-3 w-3 ${star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} 
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  className="md:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Próximos Agendamentos
                      </CardTitle>
                      <CardDescription>
                        Seus agendamentos para os próximos dias
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {UPCOMING_APPOINTMENTS.length > 0 ? (
                        UPCOMING_APPOINTMENTS.map((appointment) => (
                          <motion.div 
                            key={appointment.id}
                            className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12 border-2 border-primary">
                                <AvatarImage src={`https://i.pravatar.cc/150?img=${appointment.id}`} alt={appointment.barberName} />
                              </Avatar>
                              <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-semibold">{appointment.service}</h4>
                                  <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                                    {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{appointment.barberName}</p>
                                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{formatDate(appointment.date)}</span>
                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{appointment.time}</span>
                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span>{appointment.location}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">Você não tem agendamentos próximos</p>
                          <Button variant="outline" className="mt-4">
                            Agendar agora
                          </Button>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Ver todos os agendamentos
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        Tendências
                      </CardTitle>
                      <CardDescription>
                        Cortes em alta no momento
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {RECENT_STYLES.map((style) => (
                        <motion.div 
                          key={style.id}
                          className="group relative overflow-hidden rounded-lg"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <div className="relative h-24 w-full overflow-hidden rounded-lg">
                            <img 
                              src={`/images/styles/style-${style.imageIndex}.jpg`} 
                              alt={style.name} 
                              className="h-full w-full object-cover transition-transform group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                              <p className="text-white text-sm font-medium">{style.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="w-full bg-white/20 rounded-full h-1.5">
                                  <div 
                                    className={`bg-white h-1.5 rounded-full ${calcWidthPercentage(style.popularity, 100)}`}
                                  />
                                </div>
                                <span className="text-white text-xs">{style.popularity}%</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Explorar tendências
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
                  </div>
                  
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Gastos com Serviços
                      </CardTitle>
                      <CardDescription>
                        Acompanhe seus gastos com serviços nos últimos meses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[220px]">
                        <BarChart data={dadosGastos} />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Gift className="h-5 w-5" />
                        Ofertas Exclusivas
                      </CardTitle>
                      <CardDescription>
                        Promoções especiais para você
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="rounded-lg overflow-hidden border border-primary/20 bg-primary/5 p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                            <Scissors className="h-6 w-6 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">25% OFF no primeiro agendamento</h4>
                            <p className="text-sm text-muted-foreground">
                              Use o código: <span className="font-mono text-primary">BEMVINDO25</span>
                            </p>
                            <p className="text-xs">Válido até 31/12/2023</p>
                          </div>
                  </div>
                </div>
                
                      <div className="rounded-lg overflow-hidden border p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                            <Star className="h-6 w-6 text-yellow-500" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="font-medium">Combo Corte + Barba com 15% OFF</h4>
                            <p className="text-sm text-muted-foreground">
                              Em todas as barbearias premium
                            </p>
                            <p className="text-xs">Válido até 15/11/2023</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" size="sm" className="w-full">
                        Ver todas as ofertas
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="agendamentos" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Seus Agendamentos</h2>
                  <p className="text-muted-foreground">Gerencie todos os seus agendamentos</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input placeholder="Buscar agendamento..." className="max-w-[300px]" />
                  <Button>
                    <Calendar className="h-4 w-4 mr-2" />
                    Novo Agendamento
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="proximos" className="w-full">
                <TabsList className="grid grid-cols-4 w-full md:w-[500px] mb-6">
                  <TabsTrigger value="proximos">Próximos</TabsTrigger>
                  <TabsTrigger value="passados">Passados</TabsTrigger>
                  <TabsTrigger value="cancelados">Cancelados</TabsTrigger>
                  <TabsTrigger value="todos">Todos</TabsTrigger>
                </TabsList>

                <TabsContent value="proximos" className="space-y-4">
                  {UPCOMING_APPOINTMENTS.map((appointment) => (
                    <Card key={appointment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center gap-4">
                          <Avatar className="h-16 w-16 border-2 border-primary">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${appointment.id}`} alt={appointment.barberName} />
                          </Avatar>

                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{appointment.service}</h3>
                                <p className="text-muted-foreground">{appointment.barberName}</p>
          </div>
                              <div className="text-right">
                                <Badge variant={appointment.status === "confirmed" ? "default" : "outline"}>
                                  {appointment.status === "confirmed" ? "Confirmado" : "Pendente"}
                                </Badge>
                                <p className="mt-1 font-semibold">{appointment.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </div>
      </div>
      
                            <div className="flex flex-wrap gap-4 mt-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{formatDate(appointment.date)}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{appointment.location}</span>
            </div>
          </div>
        </div>
        
                          <div className="flex flex-col sm:flex-row md:flex-col gap-2 min-w-[120px]">
                            <Button size="sm" className="w-full">Ver detalhes</Button>
                            <Button size="sm" variant="outline" className="w-full">Reagendar</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="passados">
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Histórico de Agendamentos</h3>
                    <p className="text-muted-foreground max-w-md">
                      Aqui você verá seus agendamentos passados. Eles aparecem após a data do serviço.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="cancelados">
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhum cancelamento</h3>
                    <p className="text-muted-foreground max-w-md">
                      Você não tem agendamentos cancelados recentemente.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="todos">
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <Scissors className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Todos os Agendamentos</h3>
                    <p className="text-muted-foreground max-w-md">
                      Aqui você verá todos os seus agendamentos, passados e futuros.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            <TabsContent value="descubra" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Descubra</h2>
                  <p className="text-muted-foreground">Encontre os melhores barbeiros próximos a você</p>
                </div>
                <div>
                  <Input placeholder="Buscar por nome, especialidade..." className="max-w-[300px]" />
            </div>
        </div>
        
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {RECOMMENDED_BARBERS.map((barber) => (
                  <motion.div 
                    key={barber.id}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Card className="overflow-hidden h-full">
                      <div className="p-6">
                        <div className="flex justify-between mb-4">
                          <Avatar className="h-16 w-16 border-2 border-primary">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${barber.id}`} alt={barber.name} />
                          </Avatar>
                          <div className="flex items-start gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{barber.rating}</span>
        </div>
      </div>
      
                        <h3 className="font-semibold text-lg">{barber.name}</h3>
                        <p className="text-muted-foreground">{barber.specialty}</p>

                        <div className="flex flex-wrap gap-2 mt-3">
                          <Badge variant="outline" className="bg-primary/10">
                            {barber.specialty}
                          </Badge>
                          <Badge variant="outline" className="bg-muted/50">
                            <MapPin className="h-3 w-3 mr-1" />
                            {barber.distance}
                          </Badge>
                        </div>

                        <div className="mt-4 pt-4 border-t flex justify-between">
                          <Button variant="outline" size="sm">Ver perfil</Button>
                          <Button size="sm">Agendar</Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
        </div>
        
              <div className="mt-4">
                <Card className="bg-muted/30">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Tendências de Cortes
                    </CardTitle>
                    <CardDescription>
                      Estilos que estão fazendo sucesso nas barbearias
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {RECENT_STYLES.map((style) => (
                        <motion.div 
              key={style.id}
                          className="group relative rounded-lg overflow-hidden aspect-video"
                          whileHover={{ scale: 1.03 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          <img 
                            src={`/images/styles/style-${style.imageIndex}.jpg`} 
                            alt={style.name} 
                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white font-medium">{style.name}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="w-full bg-white/20 rounded-full h-1.5">
                                <div 
                                  className={`bg-white h-1.5 rounded-full ${calcWidthPercentage(style.popularity, 100)}`}
                                />
                              </div>
                              <span className="text-white text-xs">{style.popularity}%</span>
                </div>
              </div>
                        </motion.div>
          ))}
        </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Ver mais tendências
                    </Button>
                  </CardFooter>
                </Card>
      </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default Dashboard; 