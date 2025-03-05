import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, LineChart, Line } from 'recharts';
import { Calendar, Clock, TrendingUp, Users, Scissors, DollarSign, BarChart2, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data - later to be replaced with API calls
const monthlyTrendsData = [
  { name: 'Jan', clients: 40, appointments: 24, revenue: 1200 },
  { name: 'Feb', clients: 30, appointments: 13, revenue: 800 },
  { name: 'Mar', clients: 20, appointments: 8, revenue: 400 },
  { name: 'Apr', clients: 27, appointments: 15, revenue: 600 },
  { name: 'May', clients: 18, appointments: 12, revenue: 500 },
  { name: 'Jun', clients: 23, appointments: 17, revenue: 700 },
  { name: 'Jul', clients: 34, appointments: 23, revenue: 900 },
  { name: 'Aug', clients: 45, appointments: 32, revenue: 1500 },
  { name: 'Sep', clients: 65, appointments: 45, revenue: 2400 },
  { name: 'Oct', clients: 70, appointments: 55, revenue: 2800 },
  { name: 'Nov', clients: 78, appointments: 66, revenue: 3500 },
  { name: 'Dec', clients: 82, appointments: 70, revenue: 4000 },
];

const weeklyTrendsData = [
  { name: 'Mon', clients: 10, appointments: 8, revenue: 400 },
  { name: 'Tue', clients: 15, appointments: 12, revenue: 600 },
  { name: 'Wed', clients: 20, appointments: 15, revenue: 750 },
  { name: 'Thu', clients: 25, appointments: 20, revenue: 1000 },
  { name: 'Fri', clients: 30, appointments: 25, revenue: 1250 },
  { name: 'Sat', clients: 35, appointments: 30, revenue: 1500 },
  { name: 'Sun', clients: 15, appointments: 10, revenue: 500 },
];

const dailyTrendsData = [
  { name: '8am', clients: 2, appointments: 2, revenue: 100 },
  { name: '10am', clients: 4, appointments: 3, revenue: 150 },
  { name: '12pm', clients: 6, appointments: 5, revenue: 250 },
  { name: '2pm', clients: 8, appointments: 7, revenue: 350 },
  { name: '4pm', clients: 10, appointments: 8, revenue: 400 },
  { name: '6pm', clients: 12, appointments: 10, revenue: 500 },
  { name: '8pm', clients: 6, appointments: 5, revenue: 250 },
];

const popularStylesData = [
  { name: 'Fade', count: 150, percentage: 30 },
  { name: 'Undercut', count: 120, percentage: 24 },
  { name: 'Buzz Cut', count: 100, percentage: 20 },
  { name: 'Pompadour', count: 80, percentage: 16 },
  { name: 'Crew Cut', count: 50, percentage: 10 },
];

const clientDemographicsData = [
  { name: '18-24', count: 120, percentage: 20 },
  { name: '25-34', count: 240, percentage: 40 },
  { name: '35-44', count: 150, percentage: 25 },
  { name: '45+', count: 90, percentage: 15 },
];

const serviceDurationData = [
  { name: 'Haircut', value: 30 },
  { name: 'Haircut + Beard', value: 45 },
  { name: 'Full Service', value: 60 },
  { name: 'Beard Trim', value: 15 },
  { name: 'Hair Styling', value: 20 },
];

const busyPeriodsData = [
  { time: '8am-10am', bookingRate: 40 },
  { time: '10am-12pm', bookingRate: 60 },
  { time: '12pm-2pm', bookingRate: 70 },
  { time: '2pm-4pm', bookingRate: 90 },
  { time: '4pm-6pm', bookingRate: 100 },
  { time: '6pm-8pm', bookingRate: 80 },
  { time: '8pm-10pm', bookingRate: 50 },
];

const customerRetentionData = [
  { name: 'One-time', value: 30 },
  { name: 'Regular (2-5 visits)', value: 45 },
  { name: 'Loyal (6+ visits)', value: 25 },
];

export type DataPeriod = 'daily' | 'weekly' | 'monthly';
export type DataMetric = 'clients' | 'appointments' | 'revenue';

interface TrendAnalyzerProps {
  period?: DataPeriod;
  metric?: DataMetric;
  showControls?: boolean;
  detailedView?: boolean;
  className?: string;
}

export const TrendAnalyzer: React.FC<TrendAnalyzerProps> = ({
  period: initialPeriod = 'monthly',
  metric: initialMetric = 'appointments',
  showControls = true,
  detailedView = false,
  className = '',
}) => {
  const [period, setPeriod] = useState<DataPeriod>(initialPeriod);
  const [metric, setMetric] = useState<DataMetric>(initialMetric);
  const [view, setView] = useState<'chart' | 'stats'>('chart');
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('area');
  
  // Determine which dataset to use based on the period
  const getData = () => {
    switch (period) {
      case 'daily':
        return dailyTrendsData;
      case 'weekly':
        return weeklyTrendsData;
      case 'monthly':
      default:
        return monthlyTrendsData;
    }
  };
  
  // Get color based on metric
  const getMetricColor = (metricName: DataMetric): string => {
    switch (metricName) {
      case 'clients':
        return '#3b82f6'; // blue
      case 'appointments':
        return '#16a34a'; // green
      case 'revenue':
        return '#ef4444'; // red
      default:
        return '#8b5cf6'; // purple
    }
  };
  
  // Get icon based on metric
  const getMetricIcon = (metricName: DataMetric) => {
    switch (metricName) {
      case 'clients':
        return <Users size={18} />;
      case 'appointments':
        return <Calendar size={18} />;
      case 'revenue':
        return <DollarSign size={18} />;
      default:
        return <TrendingUp size={18} />;
    }
  };
  
  // Get period name
  const getPeriodName = (periodType: DataPeriod): string => {
    switch (periodType) {
      case 'daily':
        return 'Hoje';
      case 'weekly':
        return 'Esta Semana';
      case 'monthly':
        return 'Este Mês';
      default:
        return 'Período';
    }
  };
  
  // Get metric name
  const getMetricName = (metricName: DataMetric): string => {
    switch (metricName) {
      case 'clients':
        return 'Clientes';
      case 'appointments':
        return 'Agendamentos';
      case 'revenue':
        return 'Receita';
      default:
        return 'Métrica';
    }
  };
  
  // Format value based on metric
  const formatValue = (value: number, metricName: DataMetric): string => {
    switch (metricName) {
      case 'revenue':
        return `R$ ${value.toLocaleString()}`;
      default:
        return value.toString();
    }
  };
  
  // Calculate statistics
  const calculateStats = () => {
    const data = getData();
    
    // Total
    const total = data.reduce((sum, item) => sum + item[metric], 0);
    
    // Average
    const average = total / data.length;
    
    // Min and Max
    const min = Math.min(...data.map(item => item[metric]));
    const max = Math.max(...data.map(item => item[metric]));
    
    // Growth (comparing first and last periods)
    const first = data[0][metric];
    const last = data[data.length - 1][metric];
    const growth = first > 0 ? ((last - first) / first) * 100 : 0;
    
    return {
      total,
      average,
      min,
      max,
      growth
    };
  };
  
  // Render the chart based on the selected type
  const renderChart = () => {
    const data = getData();
    const color = getMetricColor(metric);
    
    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                borderRadius: '8px',
                borderColor: color,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [formatValue(value, metric), getMetricName(metric)]}
            />
            <Line 
              type="monotone" 
              dataKey={metric} 
              stroke={color} 
              strokeWidth={2}
              dot={{ r: 3, fill: color }}
              activeDot={{ r: 5, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                borderRadius: '8px',
                borderColor: color,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [formatValue(value, metric), getMetricName(metric)]}
            />
            <Bar 
              dataKey={metric} 
              fill={color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                borderRadius: '8px',
                borderColor: color,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [formatValue(value, metric), getMetricName(metric)]}
            />
            <Area 
              type="monotone" 
              dataKey={metric} 
              stroke={color} 
              fill={`${color}33`} // Add transparency to the fill color
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }
  };
  
  // Render additional insights if detailedView is enabled
  const renderDetailedInsights = () => {
    if (!detailedView) return null;
    
    return (
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Popular Styles */}
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center mb-3">
            <Scissors size={18} className="mr-2 text-blue-500" />
            <h3 className="text-sm font-medium">Estilos Populares</h3>
          </div>
          <div className="space-y-2">
            {popularStylesData.map((style, index) => (
              <div key={index} className="flex items-center">
                <span className="text-xs text-muted-foreground w-24">{style.name}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-blue-500 rounded-full`}
                    style={{ width: `${style.percentage}%` }}
                    data-width={style.percentage}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">{style.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Client Demographics */}
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center mb-3">
            <Users size={18} className="mr-2 text-green-500" />
            <h3 className="text-sm font-medium">Demografia de Clientes</h3>
          </div>
          <div className="space-y-2">
            {clientDemographicsData.map((demo, index) => (
              <div key={index} className="flex items-center mb-1.5">
                <span className="text-xs text-muted-foreground w-24 truncate">{demo.name}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-green-500 rounded-full`}
                    style={{ width: `${demo.percentage}%` }}
                    data-width={demo.percentage}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">{demo.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Service Duration */}
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center mb-3">
            <Clock size={18} className="mr-2 text-amber-500" />
            <h3 className="text-sm font-medium">Duração de Serviços</h3>
          </div>
          <div className="space-y-2">
            {serviceDurationData.map((service, index) => (
              <div key={index} className="flex items-center mb-1.5">
                <span className="text-xs text-muted-foreground w-24 truncate">{service.name}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-indigo-500 rounded-full`}
                    style={{ width: `${(service.value / 60) * 100}%` }}
                    data-width={(service.value / 60) * 100}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">{service.value} min</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Busy Periods */}
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center mb-3">
            <BarChart2 size={18} className="mr-2 text-purple-500" />
            <h3 className="text-sm font-medium">Períodos Movimentados</h3>
          </div>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={busyPeriodsData}>
              <XAxis dataKey="time" tick={{ fontSize: 10 }} />
              <YAxis hide />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Taxa de Reserva']}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar 
                dataKey="bookingRate" 
                fill="#8b5cf6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        {/* Customer Retention */}
        <div className="bg-card rounded-lg p-4 border">
          <div className="flex items-center mb-3">
            <PieChart size={18} className="mr-2 text-red-500" />
            <h3 className="text-sm font-medium">Retenção de Clientes</h3>
            </div>
          <div className="space-y-2">
            {customerRetentionData.map((category, index) => (
              <div key={index} className="flex items-center mb-1.5">
                <span className="text-xs text-muted-foreground w-24 truncate">{category.name}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-amber-500 rounded-full`}
                    style={{ width: `${category.value}%` }}
                    data-width={category.value}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  // Render stats view
  const renderStats = () => {
    const stats = calculateStats();
    const color = getMetricColor(metric);

  return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <div className="bg-card rounded-lg p-4 border">
          <p className="text-xs text-muted-foreground mb-1">Total</p>
          <p className="text-xl font-medium">{formatValue(stats.total, metric)}</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <p className="text-xs text-muted-foreground mb-1">Média</p>
          <p className="text-xl font-medium">{formatValue(Math.round(stats.average), metric)}</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <p className="text-xs text-muted-foreground mb-1">Maior</p>
          <p className="text-xl font-medium">{formatValue(stats.max, metric)}</p>
        </div>
        
        <div className="bg-card rounded-lg p-4 border">
          <p className="text-xs text-muted-foreground mb-1">Crescimento</p>
          <p className={`text-xl font-medium ${stats.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {stats.growth >= 0 ? '+' : ''}{stats.growth.toFixed(1)}%
          </p>
        </div>
      </div>
    );
  };
  
  return (
    <div className={`bg-background rounded-lg border ${className}`}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Análise de Tendências
            <span className="ml-2 text-xs text-muted-foreground">
              {getPeriodName(period)}
            </span>
          </h2>
          
          {showControls && (
            <div className="flex space-x-2">
              <button 
                className={`text-xs px-2 py-1 rounded-md ${view === 'chart' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                onClick={() => setView('chart')}
                aria-label="Visualizar gráfico"
              >
                <BarChart2 size={14} />
              </button>
              <button 
                className={`text-xs px-2 py-1 rounded-md ${view === 'stats' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                onClick={() => setView('stats')}
                aria-label="Visualizar estatísticas"
              >
                <TrendingUp size={14} />
              </button>
            </div>
          )}
        </div>
        
        {showControls && (
          <div className="mt-4 flex flex-wrap gap-2">
            <div className="flex">
              <button 
                className={`text-xs px-3 py-1.5 rounded-l-md ${period === 'daily' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                onClick={() => setPeriod('daily')}
              >
                Diário
              </button>
              <button 
                className={`text-xs px-3 py-1.5 ${period === 'weekly' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                onClick={() => setPeriod('weekly')}
              >
                Semanal
              </button>
              <button 
                className={`text-xs px-3 py-1.5 rounded-r-md ${period === 'monthly' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                onClick={() => setPeriod('monthly')}
              >
                Mensal
              </button>
            </div>
            
            <div className="flex">
              <button 
                className={`text-xs px-3 py-1.5 rounded-l-md ${metric === 'appointments' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                onClick={() => setMetric('appointments')}
              >
                Agendamentos
              </button>
              <button 
                className={`text-xs px-3 py-1.5 ${metric === 'clients' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                onClick={() => setMetric('clients')}
              >
                Clientes
              </button>
              <button 
                className={`text-xs px-3 py-1.5 rounded-r-md ${metric === 'revenue' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                onClick={() => setMetric('revenue')}
              >
                Receita
              </button>
          </div>
          
            {view === 'chart' && (
              <div className="flex ml-auto">
                <button 
                  className={`text-xs px-3 py-1.5 rounded-l-md ${chartType === 'area' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                  onClick={() => setChartType('area')}
                >
                  Área
                </button>
                <button 
                  className={`text-xs px-3 py-1.5 ${chartType === 'line' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                  onClick={() => setChartType('line')}
                >
                  Linha
                </button>
                <button 
                  className={`text-xs px-3 py-1.5 rounded-r-md ${chartType === 'bar' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'}`}
                  onClick={() => setChartType('bar')}
                >
                  Barra
                </button>
              </div>
            )}
          </div>
        )}
                </div>
                
      {/* Content */}
      <div>
        {view === 'chart' ? (
          <div className="p-4">
            {renderChart()}
          </div>
        ) : (
          renderStats()
        )}
      </div>
      
      {renderDetailedInsights()}
    </div>
  );
};

export default TrendAnalyzer; 
