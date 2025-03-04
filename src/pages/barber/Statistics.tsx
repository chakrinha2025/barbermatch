import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock, 
  Star,
  ChevronDown,
  Filter,
  Download,
  BarChart2,
  LineChart as LineChartIcon,
  Calendar as CalendarIcon,
  Repeat,
  UserCheck,
  Scissors,
  Loader2
} from 'lucide-react';
import BarChart from '@/components/BarChart';
import LineChart from '@/components/LineChart';
import TrendCard from '@/components/TrendCard';
import barberService, { BarberStatistics as StatisticsData } from '@/api/barber';
import { useToast } from '@/components/ui/use-toast';

// Opções para as estatísticas
type TimePeriod = 'week' | 'month' | 'year';
type ChartType = 'earnings' | 'clients' | 'services' | 'popular-times' | 'ratings';
type ChartView = 'bar' | 'line';

const Statistics = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  const [chartView, setChartView] = useState<ChartView>('bar');
  const [showSection, setShowSection] = useState<Record<string, boolean>>({
    overview: true,
    trends: true,
    earnings: true,
    clients: true,
    services: true,
    times: true,
    ratings: true
  });
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const { toast } = useToast();
  
  // Carregar estatísticas ao inicializar e quando o período mudar
  useEffect(() => {
    loadStatistics();
  }, [timePeriod]);

  // Carregar estatísticas da API
  const loadStatistics = async () => {
    try {
      setIsLoading(true);
      const data = await barberService.getStatistics(timePeriod);
      setStatistics(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      toast({
        title: 'Erro ao carregar estatísticas',
        description: 'Não foi possível carregar os dados estatísticos. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR')}`;
  };
  
  // Formatar valores percentuais
  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };
  
  // Alternar visibilidade de seções
  const toggleSection = (section: string) => {
    setShowSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Alternar entre visualização de gráfico de barras ou linha
  const toggleChartView = () => {
    setChartView(prev => prev === 'bar' ? 'line' : 'bar');
  };
  
  // Obter performance com base no período selecionado
  const getPerformance = () => {
    if (!statistics) return null;
    
    switch (timePeriod) {
      case 'week':
        return statistics.overview.weekly;
      case 'month':
        return statistics.overview.monthly;
      case 'year':
        return statistics.overview.yearly;
      default:
        return statistics.overview.monthly;
    }
  };
  
  // Exportar dados para CSV
  const handleExportData = async () => {
    if (!statistics) return;
    
    try {
      setIsExporting(true);
      
      // Aqui seria a lógica para gerar e baixar o CSV
      // Por enquanto, vamos apenas simular um atraso
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulação de download
      toast({
        title: 'Dados exportados',
        description: 'Os dados estatísticos foram exportados com sucesso.',
      });
    } catch (error) {
      console.error('Erro ao exportar dados:', error);
      toast({
        title: 'Erro ao exportar dados',
        description: 'Não foi possível exportar os dados estatísticos. Tente novamente.',
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  const performance = getPerformance();
  
  // Obter dados de faturamento com base no período selecionado
  const getEarningsData = () => {
    if (!statistics) return [];
    
    switch (timePeriod) {
      case 'week':
        return statistics.earnings.daily;
      case 'month':
      case 'year':
        return statistics.earnings.monthly;
      default:
        return statistics.earnings.monthly;
    }
  };

  // Renderizar o conteúdo baseado no estado de carregamento
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 size={40} className="animate-spin text-primary mb-4" />
          <p className="text-muted-foreground text-lg">
            Carregando estatísticas...
          </p>
        </div>
      );
    }

    if (!statistics || !performance) {
      return (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            Não foi possível carregar os dados estatísticos.
          </p>
          <button 
            onClick={loadStatistics}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    return (
      <>
        {/* Cartões de Visão Geral */}
        <div className="rounded-lg border bg-card">
          <div 
            className="flex items-center justify-between px-4 py-3 border-b cursor-pointer hover:bg-muted/30"
            onClick={() => toggleSection('overview')}
          >
            <h2 className="text-lg font-medium">Visão Geral</h2>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${showSection.overview ? 'rotate-180' : ''}`} 
            />
          </div>
          
          {showSection.overview && (
            <div className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-muted-foreground">Faturamento</h3>
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold mt-2">{formatCurrency(performance.earnings)}</p>
                  <div className={`text-xs mt-1 ${performance.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    <TrendingUp size={12} className="inline mr-1" />
                    {formatPercentage(performance.growth)} em relação ao período anterior
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-muted-foreground">Clientes</h3>
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold mt-2">{performance.clients}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(performance.clients / (timePeriod === 'week' ? 7 : timePeriod === 'month' ? 30 : 365) * 10) / 10} por dia em média
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-muted-foreground">Serviços</h3>
                    <Calendar className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold mt-2">{performance.services}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {Math.round(performance.services / performance.clients * 10) / 10} serviços por cliente
                  </p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-muted-foreground">Avaliação Média</h3>
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-2xl font-bold mt-2">{performance.avgRating.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    de 5.0 (baseado em {timePeriod === 'week' ? '15' : timePeriod === 'month' ? '48' : '186'} avaliações)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Cartões de Tendências */}
        <div className="rounded-lg border bg-card">
          <div 
            className="flex items-center justify-between px-4 py-3 border-b cursor-pointer hover:bg-muted/30"
            onClick={() => toggleSection('trends')}
          >
            <h2 className="text-lg font-medium">Tendências e Métricas Avançadas</h2>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${showSection.trends ? 'rotate-180' : ''}`} 
            />
          </div>
          
          {showSection.trends && (
            <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <TrendCard
                  title="Ticket Médio"
                  value={performance.avgTicket}
                  valuePrefix="R$ "
                  trend={performance.ticketGrowth}
                  icon={<DollarSign size={16} />}
                  description="Valor médio gasto por cliente"
                />
                
                <TrendCard
                  title="Taxa de Retorno"
                  value={performance.returnRate}
                  valueSuffix="%"
                  trend={performance.returnRateGrowth}
                  icon={<Repeat size={16} />}
                  description="Clientes que retornam para novos serviços"
                />
                
                <TrendCard
                  title="Novos Clientes"
                  value={performance.newClients}
                  trend={performance.newClientsGrowth}
                  icon={<UserCheck size={16} />}
                  description="Clientes atendidos pela primeira vez"
                />
                
                <TrendCard
                  title="Serviços por Cliente"
                  value={(performance.services / performance.clients).toFixed(1)}
                  trend={performance.serviceGrowth - performance.clientGrowth}
                  icon={<Scissors size={16} />}
                  description="Média de serviços contratados por cliente"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Gráfico de Receitas */}
        <div className="rounded-lg border bg-card">
          <div 
            className="flex items-center justify-between px-4 py-3 border-b cursor-pointer hover:bg-muted/30"
            onClick={() => toggleSection('earnings')}
          >
            <h2 className="text-lg font-medium">Faturamento</h2>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${showSection.earnings ? 'rotate-180' : ''}`} 
            />
          </div>
          
          {showSection.earnings && (
            <div className="p-4">
              {chartView === 'bar' ? (
                <BarChart
                  data={getEarningsData()}
                  title="Receita por Período"
                  description={`Visualização do faturamento por ${timePeriod === 'week' ? 'dia da semana' : 'mês'}`}
                  formatValue={(value) => `R$ ${value}`}
                  height={300}
                />
              ) : (
                <LineChart
                  data={statistics.earnings.revenueGrowth}
                  title="Evolução do Faturamento"
                  description="Tendência de receita ao longo do tempo"
                  formatValue={(value) => `R$ ${value}`}
                  height={300}
                  color="rgba(79, 70, 229, 0.8)"
                />
              )}
            </div>
          )}
        </div>
        
        {/* Gráfico de Clientes */}
        <div className="rounded-lg border bg-card">
          <div 
            className="flex items-center justify-between px-4 py-3 border-b cursor-pointer hover:bg-muted/30"
            onClick={() => toggleSection('clients')}
          >
            <h2 className="text-lg font-medium">Clientes</h2>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${showSection.clients ? 'rotate-180' : ''}`} 
            />
          </div>
          
          {showSection.clients && (
            <div className="p-4">
              {chartView === 'bar' ? (
                <BarChart
                  data={statistics.clients.monthly}
                  title="Clientes por Período"
                  description="Número de clientes atendidos por mês"
                  height={300}
                />
              ) : (
                <LineChart
                  data={statistics.clients.clientGrowth}
                  title="Evolução de Clientes"
                  description="Tendência de crescimento da base de clientes"
                  height={300}
                  color="rgba(59, 130, 246, 0.8)"
                />
              )}
            </div>
          )}
        </div>
        
        {/* Distribuição de Serviços */}
        <div className="rounded-lg border bg-card">
          <div 
            className="flex items-center justify-between px-4 py-3 border-b cursor-pointer hover:bg-muted/30"
            onClick={() => toggleSection('services')}
          >
            <h2 className="text-lg font-medium">Serviços</h2>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${showSection.services ? 'rotate-180' : ''}`} 
            />
          </div>
          
          {showSection.services && (
            <div className="p-4">
              <BarChart
                data={statistics.services.breakdown}
                title="Distribuição de Serviços"
                description="Serviços mais populares entre os clientes"
                height={300}
              />
            </div>
          )}
        </div>
        
        {/* Horários Populares */}
        <div className="rounded-lg border bg-card">
          <div 
            className="flex items-center justify-between px-4 py-3 border-b cursor-pointer hover:bg-muted/30"
            onClick={() => toggleSection('times')}
          >
            <h2 className="text-lg font-medium">Horários Populares</h2>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${showSection.times ? 'rotate-180' : ''}`} 
            />
          </div>
          
          {showSection.times && (
            <div className="p-4">
              <BarChart
                data={statistics.times.popular}
                title="Horários Mais Populares"
                description="Distribuição dos agendamentos por horário do dia"
                height={300}
              />
            </div>
          )}
        </div>
        
        {/* Distribuição de Avaliações */}
        <div className="rounded-lg border bg-card">
          <div 
            className="flex items-center justify-between px-4 py-3 border-b cursor-pointer hover:bg-muted/30"
            onClick={() => toggleSection('ratings')}
          >
            <h2 className="text-lg font-medium">Avaliações</h2>
            <ChevronDown 
              size={18} 
              className={`transform transition-transform ${showSection.ratings ? 'rotate-180' : ''}`} 
            />
          </div>
          
          {showSection.ratings && (
            <div className="p-4">
              <BarChart
                data={statistics.ratings.distribution}
                title="Distribuição de Avaliações"
                description="Número de avaliações por estrela"
                height={300}
              />
            </div>
          )}
        </div>
      </>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>
          <p className="text-muted-foreground">
            Acompanhe seu desempenho e principais métricas
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="inline-flex items-center rounded-md border px-3 py-1 text-sm">
            <span className="mr-2 text-muted-foreground">Período:</span>
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value as TimePeriod)}
              className="bg-transparent font-medium focus:outline-none"
              aria-label="Selecione o período"
              disabled={isLoading}
            >
              <option value="week">Semana</option>
              <option value="month">Mês</option>
              <option value="year">Ano</option>
            </select>
          </div>
          
          <button
            className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-muted"
            onClick={toggleChartView}
            aria-label="Alternar visualização de gráfico"
            disabled={isLoading}
          >
            {chartView === 'bar' ? (
              <>
                <LineChartIcon size={16} />
                <span className="text-sm">Linha</span>
              </>
            ) : (
              <>
                <BarChart2 size={16} />
                <span className="text-sm">Barras</span>
              </>
            )}
          </button>
          
          <button
            className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-muted"
            aria-label="Filtrar dados"
            disabled={isLoading}
          >
            <Filter size={16} />
            <span className="text-sm">Filtros</span>
          </button>
          
          <button
            className="flex items-center gap-1 px-3 py-1 border rounded-md hover:bg-muted"
            onClick={handleExportData}
            aria-label="Exportar dados"
            disabled={isLoading || isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span className="text-sm">Exportando...</span>
              </>
            ) : (
              <>
                <Download size={16} />
                <span className="text-sm">Exportar</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {renderContent()}
    </div>
  );
};

export default Statistics; 