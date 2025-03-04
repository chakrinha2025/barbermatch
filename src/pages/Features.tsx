import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Scissors, 
  Calendar, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  Store,
  ChevronRight,
  BarChart,
  Users,
  Smartphone,
  Star,
  User
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  to: string;
  index: number;
  premium?: boolean;
  features?: string[];
  metrics?: { value: string; label: string }[];
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  title, 
  description, 
  icon, 
  iconBg, 
  iconColor, 
  to, 
  index, 
  premium = false,
  features = [],
  metrics = []
}) => {
  // Extrair a base da cor para uso em gradientes
  const baseColor = iconBg.replace(/\/\d+$/, '');
  
  // Define diferentes classes de animação com base no índice para criar efeito escalonado
  const animationClass = [
    'animate-fade-in-up-1',
    'animate-fade-in-up-2',
    'animate-fade-in-up-3',
    'animate-fade-in-up-2',
    'animate-fade-in-up-1',
    'animate-fade-in-up-3',
  ][index % 6];

  return (
    <motion.div 
      className={`relative group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-card ${animationClass}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
        boxShadow: `0 10px 25px -5px ${baseColor}/20, 0 8px 10px -6px ${baseColor}/10` 
      }}
    >
      {premium && (
        <motion.div 
          className="absolute top-4 right-4 bg-primary/90 text-white text-xs font-medium py-1 px-2.5 rounded-full z-10 flex items-center gap-1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <Star size={10} className="mr-0.5" />
          Premium
        </motion.div>
      )}
      
      {premium && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"
          style={{ 
            backgroundSize: '200% 200%',
            backgroundImage: premium ? 
              `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${baseColor.replace('#', '')}' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")` : 
              'none'
          }}
        />
      )}
      
      {premium && (
        <motion.div 
          className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden" 
          aria-hidden="true"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute -inset-[100%] top-1/2 h-0.5 w-[300%] rotate-[30deg] bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" />
          </div>
        </motion.div>
      )}
      
      <div className="p-6">
        <div className={`w-12 h-12 rounded-lg ${iconBg} flex items-center justify-center mb-5`}>
          <div className={`${iconColor}`}>
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-5">{description}</p>
        
        {features.length > 0 && (
          <motion.ul className="space-y-2 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {features.map((feature, featureIndex) => (
              <motion.li 
                key={featureIndex} 
                className="flex items-start gap-2 text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + featureIndex * 0.1 }}
              >
                <ChevronRight size={16} className={iconColor + " mt-0.5 flex-shrink-0"} />
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        )}
        
        {metrics.length > 0 && (
          <motion.div 
            className="grid grid-cols-2 gap-2 mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {metrics.map((metric, metricIndex) => (
              <motion.div 
                key={metricIndex} 
                className="bg-muted/40 rounded-lg p-3 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + metricIndex * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.p 
                  className={`text-xl font-bold ${iconColor}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                >
                  {metric.value}
                </motion.p>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <Link 
          to={to} 
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
        >
          <span>Explorar</span>
          <ChevronRight size={16} className="ml-1 group-hover:ml-2 transition-all" />
        </Link>
      </div>
    </motion.div>
  );
};

export default function Features() {
  const resources = [
    // Premium resources
    { 
      title: 'Análise de Tendências', 
      description: 'Descubra o que está bombando no mundo da barbearia com insights baseados em IA',
      icon: <TrendingUp size={24} />,
      iconBg: 'bg-purple-100 dark:bg-purple-900/30',
      iconColor: 'text-purple-600 dark:text-purple-400',
      to: '/recursos/analise-tendencias',
      premium: true,
      features: [
        'Previsões de tendências com 2 semanas de antecedência',
        'Análise de hashtags populares em redes sociais',
        'Recomendações de conteúdo para seu perfil',
        'Insights demográficos de clientes potenciais'
      ],
      metrics: [
        { value: '+67%', label: 'em novos clientes' },
        { value: '98%', label: 'de satisfação' },
        { value: '25.000+', label: 'usuários ativos' }
      ]
    },
    { 
      title: 'Experiência Virtual', 
      description: 'Pré-visualize cortes em você mesmo antes de ir à barbearia com nossa tecnologia de AR',
      icon: <Sparkles size={24} />,
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      to: '/recursos/experiencia-virtual',
      premium: true,
      features: [
        'Tecnologia de mapeamento facial em 3D',
        'Catálogo com mais de 200 estilos e cortes',
        'Compartilhamento de resultados com amigos',
        'Sugestões baseadas no formato do seu rosto'
      ],
      metrics: [
        { value: '98%', label: 'de satisfação' },
        { value: '75%', label: 'mais satisfeitos com seus cortes após usar AR' },
        { value: '20%', label: 'de economia em serviços com promoções exclusivas' }
      ]
    },
    { 
      title: 'Gestão de Negócio', 
      description: 'Dashboard completo para administrar sua barbearia com relatórios e estatísticas',
      icon: <Store size={24} />,
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      to: '/recursos/gestao-negocio',
      premium: true,
      features: [
        'Controle financeiro completo com relatórios',
        'Gestão de equipe e comissões',
        'Análise de desempenho e lucratividade',
        'Controle de estoque de produtos'
      ],
      metrics: [
        { value: '35%', label: 'otimização na agenda de funcionários' },
        { value: '25%', label: 'redução em custos operacionais' },
        { value: '53%', label: 'aumento na taxa de fidelização de clientes' },
        { value: '40', label: 'barbeiros' }
      ]
    },
    
    // Agendamento resources
    { 
      title: 'Agendamento Inteligente', 
      description: 'Sistema avançado para marcar horários perfeitos com seus clientes e reduzir faltas',
      icon: <Calendar size={24} />,
      iconBg: 'bg-green-100 dark:bg-green-900/30',
      iconColor: 'text-green-600 dark:text-green-400',
      to: '/recursos/agendamento-inteligente',
      features: [
        'Lembretes automáticos via WhatsApp e SMS',
        'Sincronização com Google Calendar e Outlook',
        'Confirmação em um clique para clientes',
        'Gestão inteligente de horários disponíveis'
      ],
      metrics: [
        { value: '98%', label: 'de satisfação' },
        { value: '15 minutos', label: 'redução média no tempo de espera' }
      ]
    },
    { 
      title: 'Descoberta de Barbeiros', 
      description: 'Encontre os melhores profissionais por localização, especialidade e avaliações',
      icon: <MapPin size={24} />,
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      to: '/recursos/descoberta-barbeiros',
      features: [
        'Filtros avançados por estilo e especialidade',
        'Geolocalização para encontrar barbeiros próximos',
        'Avaliações e feedback detalhados',
        'Visualização de portfólios de trabalhos realizados'
      ],
      metrics: [
        { value: '98%', label: 'de satisfação' },
        { value: '75%', label: 'mais satisfeitos com seus cortes após usar AR' }
      ]
    },
    { 
      title: 'Previsão de Espera', 
      description: 'Saiba exatamente quanto tempo seu atendimento levará sem surpresas',
      icon: <Clock size={24} />,
      iconBg: 'bg-cyan-100 dark:bg-cyan-900/30',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
      to: '/recursos/previsao-espera',
      features: [
        'Cálculo preciso baseado em histórico real',
        'Notificações de atrasos em tempo real',
        'Visualização da fila de espera atual',
        'Sugestão de horários alternativos com menor espera'
      ],
      metrics: [
        { value: '20 minutos', label: 'redução média no tempo de espera' },
        { value: '20%', label: 'de economia em serviços com promoções exclusivas' }
      ]
    },
    { 
      title: 'Chat com Barbeiros', 
      description: 'Comunique-se diretamente com seu barbeiro para resultados perfeitos',
      icon: <MessageSquare size={24} />,
      iconBg: 'bg-rose-100 dark:bg-rose-900/30',
      iconColor: 'text-rose-600 dark:text-rose-400',
      to: '/recursos/chat-barbeiros',
      features: [
        'Envio de fotos e referências de cortes',
        'Comunicação em tempo real antes do agendamento',
        'Esclarecimento de dúvidas sobre serviços',
        'Histórico completo de conversas anteriores'
      ],
      metrics: [
        { value: '98%', label: 'de satisfação' }
      ]
    },
    { 
      title: 'Recomendações de Estilo', 
      description: 'Sugestões personalizadas de cortes com base no formato do seu rosto e preferências',
      icon: <Scissors size={24} />,
      iconBg: 'bg-orange-100 dark:bg-orange-900/30',
      iconColor: 'text-orange-600 dark:text-orange-400',
      to: '/recursos/experiencia-virtual',
      features: [
        'Análise do formato do rosto com IA',
        'Sugestões baseadas em tendências atuais',
        'Recomendações por tipo de cabelo e estilo',
        'Personalização conforme ocasiões específicas'
      ],
      metrics: [
        { value: '98%', label: 'de satisfação' },
        { value: '75%', label: 'mais satisfeitos com seus cortes após usar AR' },
        { value: '20%', label: 'de economia em serviços com promoções exclusivas' }
      ]
    },
    
    // Additional resources
    { 
      title: 'Avaliações e Reviews', 
      description: 'Sistema completo de feedback para melhorar a qualidade do seu atendimento',
      icon: <Star size={24} />,
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/30',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      to: '/recursos/agendamento',
      features: [
        'Avaliações detalhadas por critérios específicos',
        'Fotos de resultados dos clientes satisfeitos',
        'Resposta a feedback e gestão de reputação',
        'Destaques de avaliações positivas no seu perfil'
      ],
      metrics: [
        { value: '98%', label: 'de satisfação' },
        { value: '20%', label: 'de economia em serviços com promoções exclusivas' }
      ]
    },
    { 
      title: 'Análise de Desempenho', 
      description: 'Métricas detalhadas para acompanhar o crescimento do seu negócio',
      icon: <BarChart size={24} />,
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      to: '/recursos/gestao-negocio',
      features: [
        'Dashboards interativos com métricas-chave',
        'Comparativo de desempenho mensal e anual',
        'Análise de serviços mais lucrativos',
        'Identificação de horários de pico'
      ],
      metrics: [
        { value: '53%', label: 'aumento na taxa de fidelização de clientes' },
        { value: '43%', label: 'crescimento no engajamento em redes sociais' },
        { value: '85%', label: 'relatam aumento significativo no faturamento' }
      ]
    },
    { 
      title: 'Fidelização de Clientes', 
      description: 'Programe ofertas e promoções para manter seus clientes voltando sempre',
      icon: <Users size={24} />,
      iconBg: 'bg-violet-100 dark:bg-violet-900/30',
      iconColor: 'text-violet-600 dark:text-violet-400',
      to: '/recursos/gestao-negocio',
      features: [
        'Programas de pontos e recompensas',
        'Ofertas exclusivas para clientes recorrentes',
        'Lembretes automáticos para retorno',
        'Aniversários e datas especiais'
      ],
      metrics: [
        { value: '53%', label: 'aumento na taxa de fidelização de clientes' },
        { value: '20%', label: 'de economia em serviços com promoções exclusivas' }
      ]
    },
    { 
      title: 'App para Clientes', 
      description: 'Aplicativo dedicado para seus clientes fazerem agendamentos pelo celular',
      icon: <Smartphone size={24} />,
      iconBg: 'bg-pink-100 dark:bg-pink-900/30',
      iconColor: 'text-pink-600 dark:text-pink-400',
      to: '/download',
      features: [
        'Disponível para iOS e Android',
        'Interface intuitiva e fácil de usar',
        'Notificações push de lembretes',
        'Histórico completo de serviços realizados'
      ],
      metrics: [
        { value: '98%', label: 'de satisfação' },
        { value: '20%', label: 'de economia em serviços com promoções exclusivas' }
      ]
    }
  ];

  // Separar recursos premium dos regulares
  const premiumResources = resources.filter(r => r.premium);
  const regularResources = resources.filter(r => !r.premium);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <section className="relative py-20 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-bold mb-4">Recursos Exclusivos do BarberMatch</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                Explore todas as ferramentas e funcionalidades que fazem do BarberMatch a plataforma perfeita para barbeiros e clientes
              </p>
              
              <div className="flex flex-wrap gap-3 justify-center mb-12">
                <motion.div 
                  className="inline-flex items-center bg-primary/10 text-primary text-sm rounded-full px-4 py-1.5"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <TrendingUp size={16} className="mr-2" />
                  +67% em novos clientes
                </motion.div>
                <motion.div 
                  className="inline-flex items-center bg-primary/10 text-primary text-sm rounded-full px-4 py-1.5"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  <Star size={16} className="mr-2" />
                  98% de satisfação
                </motion.div>
                <motion.div 
                  className="inline-flex items-center bg-primary/10 text-primary text-sm rounded-full px-4 py-1.5"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
                >
                  <Users size={16} className="mr-2" />
                  25.000+ usuários ativos
                </motion.div>
              </div>
            </motion.div>

            {/* Seção Premium Destacada */}
            <div className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-r from-purple-600/10 via-indigo-600/10 to-blue-600/10 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-blue-900/20 p-8 pb-12 rounded-2xl backdrop-blur-sm border border-indigo-200/30 dark:border-indigo-800/30 relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/20 rounded-full filter blur-2xl opacity-60"></div>
                <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/20 rounded-full filter blur-2xl opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center space-x-2 mb-6">
                    <div className="w-7 h-7 bg-indigo-500 rounded-full flex items-center justify-center">
                      <Sparkles size={14} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-indigo-900 dark:text-indigo-200">Recursos Premium</h2>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
                    Descubra os recursos exclusivos que transformarão como você gerencia seu negócio e interage com clientes
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {premiumResources.map((resource, index) => (
                      <ResourceCard 
                        key={resource.title}
                        {...resource}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Outros Recursos */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-10">Todos os Recursos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {regularResources.map((resource, index) => (
                  <ResourceCard 
                    key={resource.title}
                    {...resource}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-r from-primary/5 via-background to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Como o BarberMatch está transformando barbearias</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <Scissors className="text-primary mr-2 h-5 w-5" />
                    Para Barbeiros
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>Aumento médio de 67% em novos clientes</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>Redução de 80% em faltas e cancelamentos</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>Crescimento de 43% no engajamento em redes sociais</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>85% relatam aumento significativo no faturamento</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <Store className="text-primary mr-2 h-5 w-5" />
                    Para Barbearias
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>Otimização de 35% na agenda de funcionários</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>Redução de 25% em custos operacionais</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>Aumento de 53% na taxa de fidelização de clientes</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>Gestão eficiente de equipes com até 40 barbeiros</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-card border rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-3 flex items-center">
                    <User className="text-primary mr-2 h-5 w-5" />
                    Para Clientes
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>98% de satisfação com os serviços agendados</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>Redução média de 15 minutos no tempo de espera</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>75% mais satisfeitos com seus cortes após usar AR</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <span className="text-primary mr-2">•</span>
                      <span>Economia média de 20% em serviços com promoções exclusivas</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-6">Não encontrou o que procura?</h2>
                <p className="text-muted-foreground mb-8">
                  O BarberMatch está sempre evoluindo e adicionando novos recursos. Entre em contato conosco para solicitar uma funcionalidade ou tirar dúvidas sobre nossa plataforma.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link 
                    to="/pricing" 
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Ver Planos e Preços
                  </Link>
                  <Link 
                    to="/contact"
                    className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                  >
                    Fale Conosco
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
} 