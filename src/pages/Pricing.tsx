import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, X, Zap, Award, TrendingUp, Store, Users, Calendar, BarChart, Clock, Settings, MessageSquare, Star, Sparkles, Scissors, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Tipos de planos
type PlanType = 'barbershops' | 'clients';
type BillingCycle = 'monthly' | 'annual';

// Planos para barbearias com recursos atualizados
const BARBERSHOP_PLANS = [
  {
    name: 'Gratuito',
    price: { monthly: 0, annual: 0 },
    description: 'Para barbearias iniciantes que querem experimentar a plataforma',
    features: [
      { text: 'Perfil básico da barbearia', included: true },
      { text: 'Limite de 3 agendamentos por dia', included: true },
      { text: 'Gerenciamento de 1 barbeiro', included: true },
      { text: 'Visibilidade local limitada', included: true },
      { text: 'Integração com redes sociais (links básicos)', included: true },
      { text: 'Análise básica de desempenho', included: false },
      { text: 'Análise de tendências sociais', included: false },
      { text: 'Suporte prioritário', included: false },
      { text: 'Promoções em destaque', included: false },
      { text: 'Insights para criação de conteúdo viral', included: false },
      { text: 'Relatórios detalhados de clientes', included: false },
    ]
  },
  {
    name: 'Básico',
    price: { monthly: 99.90, annual: 999.00 },
    description: 'Ideal para barbearias pequenas com até 3 barbeiros',
    features: [
      { text: 'Perfil completo da barbearia', included: true },
      { text: 'Agendamentos ilimitados', included: true },
      { text: 'Gerenciamento de até 3 barbeiros', included: true },
      { text: 'Destaque médio nas buscas', included: true },
      { text: 'Integração avançada com redes sociais', included: true },
      { text: 'Análise completa de desempenho', included: true },
      { text: 'Análise básica de tendências sociais', included: true },
      { text: 'Suporte via chat em horário comercial', included: true },
      { text: '1 promoção em destaque por mês', included: true },
      { text: 'Insights básicos para conteúdo', included: false },
      { text: 'Relatórios detalhados de clientes', included: false },
    ]
  },
  {
    name: 'Profissional',
    price: { monthly: 199.90, annual: 1999.00 },
    description: 'Para barbearias em crescimento com foco em expansão',
    features: [
      { text: 'Tudo do plano Básico', included: true },
      { text: 'Gerenciamento de até 8 barbeiros', included: true },
      { text: 'Destaque alto nas buscas locais', included: true },
      { text: 'Integração completa com redes sociais', included: true },
      { text: 'Análise avançada de tendências sociais', included: true },
      { text: 'Suporte prioritário 7 dias por semana', included: true },
      { text: '4 promoções em destaque por mês', included: true },
      { text: 'Insights avançados para conteúdo viral', included: true },
      { text: 'Relatórios detalhados de clientes', included: true },
      { text: 'Acesso a todos os dados de tendências', included: false },
      { text: 'IA para otimização de conteúdo', included: false },
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: { monthly: 349.90, annual: 3499.00 },
    description: 'Solução completa para barbearias estabelecidas',
    features: [
      { text: 'Tudo do plano Profissional', included: true },
      { text: 'Barbeiros ilimitados', included: true },
      { text: 'Máximo destaque nas buscas', included: true },
      { text: 'Integração premium com redes sociais', included: true },
      { text: 'Análise completa de tendências sociais', included: true },
      { text: 'Suporte VIP 24/7', included: true },
      { text: 'Promoções ilimitadas em destaque', included: true },
      { text: 'Sistema completo de IA para conteúdo viral', included: true },
      { text: 'Previsão de tendências com 2 semanas de antecedência', included: true },
      { text: 'Consultoria de marketing digital mensal', included: true },
      { text: 'Acesso antecipado a novos recursos', included: true },
    ]
  }
];

// Planos para barbeiros independentes com recursos atualizados
const BARBER_PLANS = [
  {
    name: 'Gratuito',
    price: { monthly: 0, annual: 0 },
    description: 'Para barbeiros iniciantes que querem experimentar a plataforma',
    features: [
      { text: 'Perfil básico de barbeiro', included: true },
      { text: 'Limite de 3 agendamentos por dia', included: true },
      { text: 'Visibilidade local limitada', included: true },
      { text: 'Integração com redes sociais (links básicos)', included: true },
      { text: 'Análise básica de desempenho', included: false },
      { text: 'Análise de tendências sociais', included: false },
      { text: 'Suporte prioritário', included: false },
      { text: 'Insights para criação de conteúdo viral', included: false },
    ]
  },
  {
    name: 'Profissional',
    price: { monthly: 79.90, annual: 799.00 },
    description: 'Para barbeiros independentes que buscam crescimento',
    features: [
      { text: 'Perfil completo de barbeiro', included: true },
      { text: 'Agendamentos ilimitados', included: true },
      { text: 'Destaque médio nas buscas', included: true },
      { text: 'Integração avançada com redes sociais', included: true },
      { text: 'Análise completa de desempenho', included: true },
      { text: 'Análise básica de tendências sociais', included: true },
      { text: 'Suporte via chat em horário comercial', included: true },
      { text: 'Insights básicos para conteúdo', included: true },
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: { monthly: 149.90, annual: 1499.00 },
    description: 'Solução completa para barbeiros de alto desempenho',
    features: [
      { text: 'Tudo do plano Profissional', included: true },
      { text: 'Máximo destaque nas buscas', included: true },
      { text: 'Integração premium com redes sociais', included: true },
      { text: 'Análise completa de tendências sociais', included: true },
      { text: 'Suporte VIP 24/7', included: true },
      { text: 'Sistema completo de IA para conteúdo viral', included: true },
      { text: 'Previsão de tendências com 2 semanas de antecedência', included: true },
      { text: 'Consultoria de marketing digital mensal', included: true },
    ]
  }
];

// Planos para clientes
const CLIENT_PLANS = [
  {
    name: 'Gratuito',
    price: { monthly: 0, annual: 0 },
    description: 'Acesso básico para agendamentos e busca',
    features: [
      { text: 'Perfil de cliente', included: true },
      { text: 'Agendamentos ilimitados', included: true },
      { text: 'Experimentação virtual de cortes', included: true },
      { text: 'Histórico de cortes', included: true },
      { text: 'Avaliações e reviews', included: true },
      { text: 'Lembretes de agendamento', included: true },
      { text: 'Promoções exclusivas', included: false },
      { text: 'Programa de fidelidade', included: false },
    ]
  },
  {
    name: 'Premium',
    price: { monthly: 19.90, annual: 199.00 },
    description: 'Experiência VIP para clientes frequentes',
    features: [
      { text: 'Tudo do plano Gratuito', included: true },
      { text: 'Agendamentos prioritários', included: true },
      { text: 'Acesso a promoções exclusivas', included: true },
      { text: 'Programa de fidelidade avançado', included: true },
      { text: 'Descontos exclusivos em produtos', included: true },
      { text: 'Notificações de tendências', included: true },
      { text: 'Suporte prioritário', included: true },
      { text: 'Acesso a barbeiros premium', included: true },
    ],
    popular: true
  }
];

interface PricingCardProps {
  plan: (typeof BARBERSHOP_PLANS)[0] | (typeof CLIENT_PLANS)[0];
  billingCycle: BillingCycle;
}

const PricingCard = ({ plan, billingCycle }: PricingCardProps) => {
  return (
    <div className={`p-6 rounded-xl bg-card border transition-all hover:shadow-md ${plan.popular ? 'border-primary shadow-lg relative overflow-hidden' : 'border-muted hover:border-primary/30'}`}>
      {plan.popular && (
        <>
          <div className="absolute -right-12 top-6 bg-primary text-primary-foreground text-xs font-medium py-1 px-10 transform rotate-45">
            Popular
          </div>
          <div className="absolute -left-1 -top-1 h-3 w-3 bg-primary rounded-full animate-ping opacity-75"></div>
          <div className="absolute -left-1 -top-1 h-3 w-3 bg-primary rounded-full"></div>
        </>
      )}
      
      <div>
        <h3 className="text-lg font-bold">{plan.name}</h3>
        <div className="mt-2 mb-1">
          <div className="flex items-baseline">
            {plan.price[billingCycle] === 0 ? (
              <span className="text-2xl font-bold">Gratuito</span>
            ) : (
              <>
                <span className="text-sm font-normal mr-1">R$</span>
                <span className="text-3xl font-bold">{Math.floor(plan.price[billingCycle])}</span>
                <span className="text-xl font-bold">,{(plan.price[billingCycle] % 1).toFixed(2).substring(2)}</span>
                <span className="text-xs font-medium text-muted-foreground ml-1">
                  /{billingCycle === 'monthly' ? 'mês' : 'ano'}
                </span>
              </>
            )}
          </div>
          {billingCycle === 'annual' && plan.price[billingCycle] > 0 && (
            <div className="text-xs text-green-600 font-medium mt-1">
              Economia de R$ {(plan.price.monthly * 12 - plan.price.annual).toFixed(2).replace('.', ',')}
            </div>
          )}
        </div>
        <p className="text-xs text-muted-foreground h-8 mt-1">{plan.description}</p>
      </div>
      
      <div className="h-px w-full bg-border/60 my-4"></div>
      
      <div className="space-y-2.5">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2">
            {feature.included ? (
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            ) : (
              <X className="h-4 w-4 text-muted-foreground/60 flex-shrink-0 mt-0.5" />
            )}
            <span className={`text-xs ${!feature.included ? 'text-muted-foreground/60' : ''}`}>
              {feature.text}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <Link
          to={plan.price[billingCycle] === 0 ? "/register" : "/register?intent=subscription"}
          className={`block w-full py-2 px-4 rounded-lg text-center text-sm font-medium ${
            plan.popular
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
          } transition-colors`}
        >
          {plan.price[billingCycle] === 0 ? 'Começar Grátis' : 'Escolher Plano'}
        </Link>
      </div>
    </div>
  );
};

export default function Pricing() {
  const [planType, setPlanType] = useState<PlanType>('barbershops');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  
  const plansToShow = planType === 'barbershops' ? BARBERSHOP_PLANS : CLIENT_PLANS;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-16">
        <div className="container max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold mb-3">
                Planos e Preços
              </h1>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Escolha o plano perfeito para seu negócio ou experiência como cliente.
                Cancele ou mude a qualquer momento.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="max-w-4xl mx-auto mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 p-3 rounded-lg bg-muted/30 border">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setPlanType('barbershops')}
                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    planType === 'barbershops'
                      ? 'bg-background border shadow-sm'
                      : 'hover:bg-background/50 border-transparent'
                  }`}
                >
                  <Store className="h-4 w-4" />
                  <span>Barbearias</span>
                </button>
                
                <button
                  onClick={() => setPlanType('clients')}
                  className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    planType === 'clients'
                      ? 'bg-background border shadow-sm'
                      : 'hover:bg-background/50 border-transparent'
                  }`}
                >
                  <Users className="h-4 w-4" />
                  <span>Clientes</span>
                </button>
              </div>
              
              <div className="h-8 w-px bg-border/60 hidden sm:block" />
              
              <div className="inline-flex items-center bg-background/50 p-1 rounded-md">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-3 py-1 text-xs font-medium rounded ${
                    billingCycle === 'monthly' 
                      ? 'bg-background shadow-sm border' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Mensal
                </button>
                <button
                  onClick={() => setBillingCycle('annual')}
                  className={`px-3 py-1 text-xs font-medium rounded flex items-center ${
                    billingCycle === 'annual' 
                      ? 'bg-background shadow-sm border' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Anual
                  <span className="ml-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-[10px] px-1.5 py-0.5 rounded-full">
                    -17%
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4">
            {plansToShow.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <PricingCard plan={plan} billingCycle={billingCycle} />
              </motion.div>
            ))}
          </div>
          
          {planType === 'barbershops' && (
            <motion.div 
              className="mt-16 max-w-4xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="text-center mb-10">
                <h2 className="text-xl font-bold mb-2">
                  <span className="inline-flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                    Recursos Exclusivos para Redes Sociais
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Amplie sua presença digital e atraia mais clientes com nossos recursos
                  avançados de análise e otimização para redes sociais.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-card border rounded-xl p-5 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium mb-2">Análise de Tendências</h3>
                  <p className="text-xs text-muted-foreground">
                    Descubra o que está bombando nas redes sociais para criar conteúdo relevante.
                  </p>
                </div>
                
                <div className="bg-card border rounded-xl p-5 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium mb-2">IA para Conteúdo</h3>
                  <p className="text-xs text-muted-foreground">
                    Gere ideias de conteúdo viral e otimize suas postagens para maior engajamento.
                  </p>
                </div>
                
                <div className="bg-card border rounded-xl p-5 hover:shadow-sm transition-shadow">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <BarChart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium mb-2">Insights Detalhados</h3>
                  <p className="text-xs text-muted-foreground">
                    Análises completas de performance e previsões de tendências futuras.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 border-t pt-8">
                <h3 className="text-base font-bold text-center mb-6">Perguntas Frequentes</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h4 className="text-sm font-medium mb-2">O que é a análise de tendências sociais?</h4>
                    <p className="text-xs text-muted-foreground">
                      Nossa ferramenta analisa milhões de posts nas principais redes sociais para identificar quais cortes, 
                      estilos e técnicas estão ganhando popularidade. Com isso, você pode oferecer serviços atualizados e 
                      criar conteúdo relevante para aumentar seu engajamento.
                    </p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <h4 className="text-sm font-medium mb-2">Como a IA para conteúdo viral funciona?</h4>
                    <p className="text-xs text-muted-foreground">
                      Nossa IA analisa o que está bombando nas redes sociais e sugere ideias de conteúdo personalizadas para 
                      seu perfil. Além disso, ela fornece orientações sobre horários ideais para postar, hashtags relevantes 
                      e tipo de conteúdo que está gerando mais engajamento no seu nicho.
                    </p>
                  </div>
                  
                  <div className="bg-card border rounded-lg p-4 hover:shadow-sm transition-shadow md:col-span-2">
                    <h4 className="text-sm font-medium mb-2">Como esses recursos aumentam minha clientela?</h4>
                    <p className="text-xs text-muted-foreground">
                      Ao criar conteúdo relevante e alinhado com as tendências atuais, você aumenta sua visibilidade nas redes sociais, 
                      atrai mais seguidores e, consequentemente, mais clientes. Além disso, ao oferecer estilos que estão em alta, 
                      você se posiciona como uma barbearia atualizada e conectada com as tendências, o que atrai clientes que buscam 
                      serviços modernos.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="text-center mt-16 max-w-lg mx-auto px-4">
            <p className="text-xs text-muted-foreground mb-4">
              Precisa de um plano personalizado para sua rede de barbearias?
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Entre em contato para um plano empresarial
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
} 