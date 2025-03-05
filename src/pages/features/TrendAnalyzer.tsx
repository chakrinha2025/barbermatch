import React from 'react';
import { TrendAnalyzer } from '@/components/TrendAnalyzer';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Brain, 
  BarChart2, 
  Users, 
  Scissors, 
  DollarSign, 
  CalendarDays, 
  ChevronRight, 
  User, 
  Clock, 
  UserCog, 
  TrendingUp 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TrendAnalyzerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analise de Tendências</h1>
            <Link to="/" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar para Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4"
          >
            Análise de Tendências com IA
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300"
          >
            Descubra os estilos e tendências mais populares para barba e cabelo, personalizados para diferentes formatos de rosto.
          </motion.p>
        </div>

        {/* Cards Section */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            O que nossa análise de tendências oferece:
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureCards.map((card, index) => (
              <FeatureCard key={index} {...card} index={index} />
            ))}
          </div>
        </div>

        {/* Main Analysis Component */}
        <div className="mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dashboard de Análise de Tendências</h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Visualize dados em tempo real sobre as tendências mais populares
              </p>
            </div>
            <div className="p-6">
              <TrendAnalyzer enableAIRecommendations={true} detailedView={true} />
            </div>
          </div>
        </div>

        {/* Integration Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 rounded-xl shadow-xl overflow-hidden">
            <div className="p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Integração com Detecção Facial</h3>
              <p className="text-lg opacity-90 mb-6">
                Nossa análise de tendências agora se integra com nosso sistema de detecção facial para oferecer recomendações personalizadas com base no formato de rosto do cliente.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <Brain className="h-6 w-6 mr-2 text-amber-300" />
                    <h4 className="text-lg font-medium">Análise de Formato de Rosto</h4>
                  </div>
                  <p className="text-white/80">
                    O sistema detecta automaticamente o formato de rosto do cliente e fornece recomendações de cortes adequados.
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-5">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="h-6 w-6 mr-2 text-amber-300" />
                    <h4 className="text-lg font-medium">Análise de Tendências Sazonais</h4>
                  </div>
                  <p className="text-white/80">
                    Combinamos dados de tendências sazonais com preferências por formato de rosto para sugestões de alta precisão.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/virtual-experience" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Experimente a Detecção Facial
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Benefícios para Barbearias e Profissionais
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefitCards.map((card, index) => (
              <BenefitCard key={index} {...card} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Feature Cards Data
const featureCards = [
  {
    title: 'Análise por Formato de Rosto',
    description: 'Descubra quais estilos estão em alta para cada formato de rosto específico.',
    icon: User,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    title: 'Tendências Sazonais',
    description: 'Veja como as preferências mudam de acordo com as estações do ano.',
    icon: CalendarDays,
    color: 'from-amber-500 to-orange-600'
  },
  {
    title: 'Dashboards Interativos',
    description: 'Explore dados através de gráficos interativos e visualizações dinâmicas.',
    icon: BarChart2,
    color: 'from-emerald-500 to-green-600'
  },
  {
    title: 'Previsões com IA',
    description: 'Algoritmos de inteligência artificial preveem as próximas tendências.',
    icon: Brain,
    color: 'from-purple-500 to-fuchsia-600'
  }
];

// Benefit Cards Data
const benefitCards = [
  {
    title: 'Atendimento Personalizado',
    description: 'Ofereça recomendações baseadas em dados para cada cliente, aumentando a satisfação e fidelidade.',
    icon: UserCog
  },
  {
    title: 'Gestão de Estoque Inteligente',
    description: 'Antecipe-se às tendências para melhor gerenciar seus produtos e treinamentos da equipe.',
    icon: TrendingUp
  },
  {
    title: 'Eficiência Operacional',
    description: 'Otimize agendamentos e serviços com base nos dados de popularidade e tempo médio de execução.',
    icon: Clock
  }
];

// Feature Card Component
const FeatureCard = ({ title, description, icon: Icon, color, index }: { 
  title: string, 
  description: string, 
  icon: React.ElementType, 
  color: string,
  index: number
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.1 * index }}
    className={`bg-gradient-to-br ${color} rounded-xl shadow-lg overflow-hidden`}
  >
    <div className="p-6 text-white">
      <Icon className="h-10 w-10 mb-4" />
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-white/80">{description}</p>
    </div>
  </motion.div>
);

// Benefit Card Component
const BenefitCard = ({ title, description, icon: Icon }: { 
  title: string, 
  description: string, 
  icon: React.ElementType
}) => (
  <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-800">
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h4 className="text-lg font-semibold ml-4 text-gray-900 dark:text-white">{title}</h4>
      </div>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  </div>
);

export default TrendAnalyzerPage; 