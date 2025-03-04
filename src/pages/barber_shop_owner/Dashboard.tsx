import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Calendar,
  BarChart3,
  Settings,
  PlusCircle,
  Scissors,
  DollarSign,
  TrendingUp,
  Bell,
  Package,
  Building2,
  MessageSquare,
  CreditCard,
  UserPlus,
  FileSpreadsheet,
  ChevronDown,
  Search,
  Check,
  Edit,
  Trash2,
  Star,
  Info,
  AlertTriangle,
  ArrowRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import axios from "axios";
import { LineChart } from "@/components/LineChart";
import { BarChart } from "@/components/BarChart";
import { DateRangePicker } from "@/components/DateRangePicker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { calcWidthPercentage } from '@/lib/animations';

// Dados simulados para o dashboard
const dadosFinanceiros = {
  faturamentoTotal: 'R$ 18.530,00',
  faturamentoMensal: 'R$ 4.125,80',
  despesas: 'R$ 1.845,30',
  lucroLiquido: 'R$ 2.280,50',
  crescimento: '+12%'
};

// Dados para o gráfico de faturamento
const dadosGraficoFaturamento = {
  labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
  datasets: [
    {
      label: "Faturamento 2023",
      data: [3200, 3500, 3800, 4100, 4300, 4500, 4800, 5100, 5300, 5500, 5700, 6000],
      borderColor: "hsl(var(--primary))",
      backgroundColor: "hsl(var(--primary) / 0.1)",
      tension: 0.3,
    },
    {
      label: "Faturamento 2022",
      data: [2800, 3000, 3200, 3500, 3700, 3900, 4100, 4300, 4500, 4700, 4900, 5100],
      borderColor: "hsl(var(--muted-foreground) / 0.5)",
      backgroundColor: "transparent",
      borderDash: [5, 5],
      tension: 0.3,
    }
  ]
};

// Dados para o gráfico de serviços mais populares
const dadosGraficoServicos = {
  labels: ["Corte Degradê", "Barba", "Corte e Barba", "Sobrancelha", "Navalhado"],
  datasets: [
    {
      label: "Quantidade",
      data: [150, 120, 100, 80, 60],
      backgroundColor: [
        "hsl(var(--primary))",
        "hsl(var(--primary) / 0.8)",
        "hsl(var(--primary) / 0.6)",
        "hsl(var(--primary) / 0.4)",
        "hsl(var(--primary) / 0.2)",
      ],
    }
  ]
};

const funcionarios = [
  { 
    id: 1, 
    nome: 'Carlos Silva', 
    cargo: 'Barbeiro', 
    especialidade: 'Cortes clássicos',
    avatar: 'https://i.pravatar.cc/150?img=33',
    avaliacao: 4.8,
    status: 'ativo',
    agendamentosHoje: 5,
    entrou: '12/01/2023'
  },
  { 
    id: 2, 
    nome: 'Ana Oliveira', 
    cargo: 'Assistente',
    especialidade: 'Agendamentos',
    avatar: 'https://i.pravatar.cc/150?img=47',
    avaliacao: 4.7,
    status: 'ativo',
    agendamentosHoje: 0,
    entrou: '15/03/2023'
  },
  { 
    id: 3, 
    nome: 'Roberto Campos', 
    cargo: 'Barbeiro',
    especialidade: 'Barba e bigode',
    avatar: 'https://i.pravatar.cc/150?img=68',
    avaliacao: 4.9,
    status: 'ativo',
    agendamentosHoje: 7,
    entrou: '05/12/2022'
  },
  { 
    id: 4, 
    nome: 'Bruno Mendes', 
    cargo: 'Barbeiro',
    especialidade: 'Cortes modernos',
    avatar: 'https://i.pravatar.cc/150?img=12',
    avaliacao: 4.6,
    status: 'férias',
    agendamentosHoje: 0,
    entrou: '22/04/2023'
  },
  { 
    id: 5, 
    nome: 'Carla Santana', 
    cargo: 'Assistente',
    especialidade: 'Recepção',
    avatar: 'https://i.pravatar.cc/150?img=23',
    avaliacao: 4.5,
    status: 'ativo',
    agendamentosHoje: 0,
    entrou: '03/05/2023'
  }
];

const agendamentosHoje = [
  {
    id: 1,
    cliente: 'João Pereira',
    horario: '10:00',
    servico: 'Corte Degradê',
    barbeiro: 'Carlos Silva',
    status: 'confirmado',
    valor: 'R$ 45,00'
  },
  {
    id: 2,
    cliente: 'Pedro Santos',
    horario: '11:30',
    servico: 'Barba e Bigode',
    barbeiro: 'Roberto Campos',
    status: 'confirmado',
    valor: 'R$ 35,00'
  },
  {
    id: 3,
    cliente: 'Lucas Mendonça',
    horario: '13:15',
    servico: 'Corte e Barba',
    barbeiro: 'Carlos Silva',
    status: 'aguardando',
    valor: 'R$ 75,00'
  },
  {
    id: 4,
    cliente: 'Miguel Alves',
    horario: '14:45',
    servico: 'Corte Navalhado',
    barbeiro: 'Roberto Campos',
    status: 'confirmado',
    valor: 'R$ 55,00'
  },
  {
    id: 5,
    cliente: 'André Lopes',
    horario: '16:00',
    servico: 'Corte Completo',
    barbeiro: 'Carlos Silva',
    status: 'confirmado',
    valor: 'R$ 60,00'
  }
];

const cargos = [
  { value: 'barbeiro', label: 'Barbeiro' },
  { value: 'assistente', label: 'Assistente' },
  { value: 'gerente', label: 'Gerente' },
  { value: 'recepcionista', label: 'Recepcionista' }
];

// Componente de alerta para período de teste
function TrialAlert() {
  const [isTrial, setIsTrial] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const barbershopData = localStorage.getItem('barbershop_data');
    if (barbershopData) {
      try {
        const data = JSON.parse(barbershopData);
        if (data.plan === 'teste_gratuito' && data.trialEndsAt) {
          setIsTrial(true);
          
          // Calcular dias restantes
          const trialEnd = new Date(data.trialEndsAt);
          const today = new Date();
          const diffTime = trialEnd.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          setDaysLeft(diffDays > 0 ? diffDays : 0);
        }
      } catch (error) {
        console.error('Erro ao carregar dados da barbearia:', error);
      }
    }
  }, []);

  if (!isTrial || hidden) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mb-6 p-4 rounded-lg border flex items-start ${
        daysLeft <= 3 
          ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800' 
          : 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
      }`}
    >
      {daysLeft <= 3 ? (
        <AlertTriangle className={`h-5 w-5 mr-3 flex-shrink-0 ${
          daysLeft <= 3 ? 'text-red-500' : 'text-blue-500'
        }`} />
      ) : (
        <Info className="h-5 w-5 mr-3 flex-shrink-0 text-blue-500" />
      )}
      
      <div className="flex-1">
        <h3 className={`font-medium ${daysLeft <= 3 ? 'text-red-700 dark:text-red-400' : 'text-blue-700 dark:text-blue-400'}`}>
          {daysLeft <= 3 ? 'Seu período de teste está acabando!' : 'Você está em período de teste'}
        </h3>
        <p className="text-sm mt-1 text-muted-foreground">
          {daysLeft <= 3 
            ? `Restam apenas ${daysLeft} dias de teste. Escolha um plano para continuar usando todos os recursos.` 
            : `Você tem ${daysLeft} dias restantes no seu período de teste gratuito.`}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <a 
            href="/pricing" 
            className={`text-sm font-medium px-4 py-1.5 rounded-md inline-flex items-center ${
              daysLeft <= 3 
                ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/40' 
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/40'
            }`}
          >
            Ver planos
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </a>
          <button 
            onClick={() => setHidden(true)} 
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Dispensar
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function BarberShopOwnerDashboard() {
  const [activeTab, setActiveTab] = useState("visaogeral");
  const [searchTerm, setSearchTerm] = useState("");
  const [funcionariosFiltrados, setFuncionariosFiltrados] = useState(funcionarios);
  const [novoFuncionarioDialogOpen, setNovoFuncionarioDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [barbershopInfo, setBarbershopInfo] = useState(null);
  const [novoFuncionario, setNovoFuncionario] = useState({
    nome: "",
    cargo: "",
    especialidade: "",
    email: "",
    telefone: "",
    recebeComissao: true
  });

  // Efeito para carregar dados da barbearia
  useEffect(() => {
    const fetchBarbershopData = async () => {
      try {
        setIsLoading(true);
        console.log("Carregando dados da barbearia...");
        
        // Aqui utilizaríamos a chamada real
        // const response = await axios.get('/api/barbershops/my-barbershop');
        // setBarbershopInfo(response.data);
        
        // Simulando um delay
        setTimeout(() => {
          console.log("Dados da barbearia carregados");
          setBarbershopInfo({
            id: '123',
            name: 'Barbearia Estilo & Classe',
            address: 'Av. Paulista, 1000, São Paulo - SP',
            rating: 4.8,
            totalReviews: 128,
            totalEmployees: 5,
            totalServices: 12
          });
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erro ao carregar dados da barbearia:", error);
        toast.error("Não foi possível carregar os dados da barbearia");
        setIsLoading(false);
      }
    };

    fetchBarbershopData();
  }, []);

  // Filtrar funcionários quando o termo de busca mudar
  useEffect(() => {
    if (searchTerm) {
      const filtered = funcionarios.filter(f => 
        f.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFuncionariosFiltrados(filtered);
    } else {
      setFuncionariosFiltrados(funcionarios);
    }
  }, [searchTerm]);

  const handleNovoFuncionarioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovoFuncionario({
      ...novoFuncionario,
      [name]: value
    });
  };

  const handleCargoChange = (value: string) => {
    setNovoFuncionario({
      ...novoFuncionario,
      cargo: value
    });
  };

  const handleComissaoChange = (checked: boolean) => {
    setNovoFuncionario({
      ...novoFuncionario,
      recebeComissao: checked
    });
  };

  const handleAdicionarFuncionario = async () => {
    try {
      setIsLoading(true);
      // Aqui enviaria os dados para a API
      // await axios.post('/api/barbershops/employees', novoFuncionario);
      
      // Simulando um delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Funcionário adicionado com sucesso!");
      setNovoFuncionarioDialogOpen(false);
      setNovoFuncionario({
        nome: "",
        cargo: "",
        especialidade: "",
        email: "",
        telefone: "",
        recebeComissao: true
      });
    } catch (error) {
      console.error('Erro ao adicionar funcionário:', error);
      toast.error('Erro ao adicionar funcionário');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateRangeChange = (range) => {
    setDateRange(range);
    // Aqui você carregaria novos dados baseados no intervalo de datas
    // fetchDataByDateRange(range);
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'ativo':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'férias':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Férias</Badge>;
      case 'ausente':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Ausente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderAgendamentoStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmado':
        return <Badge className="bg-green-500">Confirmado</Badge>;
      case 'aguardando':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Aguardando</Badge>;
      case 'cancelado':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-[1600px] mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Gerencie sua barbearia e acompanhe métricas importantes
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </Button>
        </div>
      </div>
      
      <TrialAlert />
      
      <Tabs defaultValue="visaogeral" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 md:grid-cols-6 lg:w-[800px]">
          <TabsTrigger value="visaogeral">Visão Geral</TabsTrigger>
          <TabsTrigger value="equipe">Equipe</TabsTrigger>
          <TabsTrigger value="agendamentos">Agendamentos</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="servicos">Serviços</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
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
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Faturamento Mensal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <p className="text-2xl font-bold">{dadosFinanceiros.faturamentoMensal}</p>
                      <p className="text-sm flex items-center gap-1 mt-1 text-green-500">
                        <TrendingUp className="h-3 w-3" /> {dadosFinanceiros.crescimento} este mês
                      </p>
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
                        Agendamentos Hoje
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <p className="text-2xl font-bold">{agendamentosHoje.length}</p>
                      <p className="text-sm text-muted-foreground">
                        {agendamentosHoje.filter(a => a.status === 'confirmado').length} confirmados
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
                        <Users className="h-5 w-5" />
                        Equipe
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <p className="text-2xl font-bold">{funcionarios.length}</p>
                      <p className="text-sm text-muted-foreground">
                        {funcionarios.filter(f => f.cargo === 'Barbeiro').length} barbeiros ativos
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
                        <Package className="h-5 w-5" />
                        Plano Atual
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <p className="text-xl font-bold">Premium</p>
                      <p className="text-sm text-muted-foreground">
                        Válido até 15/12/2023
                      </p>
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
                        Agendamentos de Hoje
                      </CardTitle>
                      <CardDescription>
                        Agendamentos para o dia atual
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Horário</TableHead>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Serviço</TableHead>
                            <TableHead>Barbeiro</TableHead>
                            <TableHead>Valor</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {agendamentosHoje.map((agendamento) => (
                            <TableRow key={agendamento.id}>
                              <TableCell className="font-medium">{agendamento.horario}</TableCell>
                              <TableCell>{agendamento.cliente}</TableCell>
                              <TableCell>{agendamento.servico}</TableCell>
                              <TableCell>{agendamento.barbeiro}</TableCell>
                              <TableCell>{agendamento.valor}</TableCell>
                              <TableCell>{renderAgendamentoStatusBadge(agendamento.status)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter className="border-t p-4">
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
                        <BarChart3 className="h-5 w-5" />
                        Desempenho da Equipe
                      </CardTitle>
                      <CardDescription>
                        Barbeiros ativos hoje
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {funcionarios
                        .filter(f => f.cargo === 'Barbeiro' && f.status === 'ativo')
                        .map((funcionario) => (
                          <div key={funcionario.id} className="flex items-center gap-4">
                            <Avatar className="h-12 w-12 border-2 border-primary">
                              <AvatarImage src={funcionario.avatar} alt={funcionario.nome} />
                              <AvatarFallback>{funcionario.nome.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-semibold">{funcionario.nome}</h4>
                                  <p className="text-sm text-muted-foreground">{funcionario.especialidade}</p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span>{funcionario.avaliacao}</span>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{funcionario.agendamentosHoje} hoje</p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <div className="h-2 w-full bg-muted rounded-full">
                                  <div 
                                    className={`h-full bg-primary rounded-full ${calcWidthPercentage(funcionario.agendamentosHoje, 10)}`}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </CardContent>
                    <CardFooter className="border-t p-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Ver relatório completo
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
                        <FileSpreadsheet className="h-5 w-5" />
                        Resumo Financeiro
                      </CardTitle>
                      <CardDescription>
                        Desempenho financeiro do mês atual
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Faturamento</span>
                          <span className="font-semibold">{dadosFinanceiros.faturamentoMensal}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Despesas</span>
                          <span className="font-semibold">{dadosFinanceiros.despesas}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Lucro Líquido</span>
                          <span className="font-semibold text-green-600">{dadosFinanceiros.lucroLiquido}</span>
                        </div>
                        <Separator />
                        <div className="pt-2">
                          <p className="text-sm text-muted-foreground mb-2">Projeção para o mês</p>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-primary rounded-full w-[65%]" />
                          </div>
                          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                            <span>0%</span>
                            <span>65% atingido</span>
                            <span>100%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Ver relatório detalhado
                      </Button>
                    </CardFooter>
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
                        <Building2 className="h-5 w-5" />
                        Gestão da Barbearia
                      </CardTitle>
                      <CardDescription>
                        Ações rápidas para gerenciamento
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-20 flex flex-col gap-1">
                          <UserPlus className="h-5 w-5" />
                          <span>Adicionar Funcionário</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-1">
                          <MessageSquare className="h-5 w-5" />
                          <span>Mensagens</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-1">
                          <CreditCard className="h-5 w-5" />
                          <span>Pagamentos</span>
                        </Button>
                        <Button variant="outline" className="h-20 flex flex-col gap-1">
                          <Settings className="h-5 w-5" />
                          <span>Configurações</span>
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-4">
                      <Button variant="outline" size="sm" className="w-full">
                        Painel administrativo
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>

            <TabsContent value="equipe" className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Gerenciamento da Equipe</h2>
                  <p className="text-muted-foreground">Gerencie todos os funcionários da sua barbearia</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar funcionário..." 
                      className="pl-10 pr-4 w-full md:w-[250px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Dialog open={novoFuncionarioDialogOpen} onOpenChange={setNovoFuncionarioDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="h-4 w-4 mr-2" />
                        Novo Funcionário
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
                        <DialogDescription>
                          Preencha os dados do novo funcionário. Clique em salvar quando terminar.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 gap-2">
                          <Label htmlFor="nome">Nome completo</Label>
                          <Input 
                            id="nome" 
                            name="nome" 
                            placeholder="Nome do funcionário" 
                            value={novoFuncionario.nome}
                            onChange={handleNovoFuncionarioChange}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="cargo">Cargo</Label>
                            <Select onValueChange={handleCargoChange}>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione um cargo" />
                              </SelectTrigger>
                              <SelectContent>
                                {cargos.map((cargo) => (
                                  <SelectItem key={cargo.value} value={cargo.value}>
                                    {cargo.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="especialidade">Especialidade</Label>
                            <Input 
                              id="especialidade" 
                              name="especialidade" 
                              placeholder="Especialidade" 
                              value={novoFuncionario.especialidade}
                              onChange={handleNovoFuncionarioChange}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              name="email" 
                              type="email" 
                              placeholder="email@exemplo.com" 
                              value={novoFuncionario.email}
                              onChange={handleNovoFuncionarioChange}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="telefone">Telefone</Label>
                            <Input 
                              id="telefone" 
                              name="telefone" 
                              placeholder="(00) 00000-0000" 
                              value={novoFuncionario.telefone}
                              onChange={handleNovoFuncionarioChange}
                            />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <Switch 
                            id="recebeComissao" 
                            checked={novoFuncionario.recebeComissao}
                            onCheckedChange={handleComissaoChange}
                          />
                          <Label htmlFor="recebeComissao">Recebe comissão por serviço</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => setNovoFuncionarioDialogOpen(false)}
                        >
                          Cancelar
                        </Button>
                        <Button 
                          type="submit" 
                          onClick={handleAdicionarFuncionario}
                        >
                          Adicionar Funcionário
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Equipe da Barbearia</CardTitle>
                  <CardDescription>
                    Gerencie seus barbeiros e assistentes
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Funcionário</TableHead>
                        <TableHead>Cargo</TableHead>
                        <TableHead>Especialidade</TableHead>
                        <TableHead>Avaliação</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data de Entrada</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {funcionariosFiltrados.map((funcionario) => (
                        <TableRow key={funcionario.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={funcionario.avatar} alt={funcionario.nome} />
                                <AvatarFallback>{funcionario.nome.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{funcionario.nome}</span>
                            </div>
                          </TableCell>
                          <TableCell>{funcionario.cargo}</TableCell>
                          <TableCell>{funcionario.especialidade}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span>{funcionario.avaliacao}</span>
                            </div>
                          </TableCell>
                          <TableCell>{renderStatusBadge(funcionario.status)}</TableCell>
                          <TableCell>{funcionario.entrou}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <span className="sr-only">Abrir menu</span>
                                  <ChevronDown className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuItem className="flex gap-2 items-center">
                                  <Edit className="h-4 w-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex gap-2 items-center">
                                  <Check className="h-4 w-4" /> Alterar Status
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex gap-2 items-center text-red-600">
                                  <Trash2 className="h-4 w-4" /> Remover
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agendamentos">
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Gerenciamento de Agendamentos</h3>
                <p className="text-muted-foreground max-w-md">
                  Nesta seção você poderá visualizar e gerenciar todos os agendamentos da barbearia.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="financeiro">
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Controle Financeiro</h3>
                <p className="text-muted-foreground max-w-md">
                  Acompanhe todas as informações financeiras da sua barbearia de forma centralizada.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="servicos">
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Scissors className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Catálogo de Serviços</h3>
                <p className="text-muted-foreground max-w-md">
                  Gerencie todos os serviços oferecidos pela sua barbearia.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="marketing">
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Estratégias de Marketing</h3>
                <p className="text-muted-foreground max-w-md">
                  Crie campanhas e promoções para atrair mais clientes para sua barbearia.
                </p>
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </motion.div>
  );
} 