import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Scissors, Users, BarChart, Star, Crown, ChevronRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [userType, setUserType] = useState<'barbershops' | 'clients'>('barbershops');
  const navigate = useNavigate();
  
  const handlePlanSelect = (planId: string) => {
    navigate(`/register?plan=${planId}&cycle=${billingCycle}`);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 pb-20">
      <div className="container px-4 mx-auto py-16 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Planos e Preços do BarberMatch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Escolha o plano ideal para o seu negócio de barbearia ou aproveite benefícios exclusivos como cliente.
          </p>
        </motion.div>
        
        <div className="flex justify-center mb-10">
          <Tabs
            defaultValue="barbershops"
            value={userType}
            onValueChange={(value) => setUserType(value as 'barbershops' | 'clients')}
            className="w-full max-w-md"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="barbershops">Para Barbearias</TabsTrigger>
              <TabsTrigger value="clients">Para Clientes</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="bg-muted p-1 rounded-lg inline-flex">
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'monthly' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Mensal
            </button>
            <button
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === 'yearly' 
                  ? 'bg-background text-foreground shadow-sm' 
                  : 'text-muted-foreground'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              Anual
              <Badge variant="secondary" className="ml-2 bg-primary/20 text-primary">-15%</Badge>
            </button>
          </div>
        </div>
        
        {userType === 'barbershops' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Plano Gratuito para Barbearias */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-muted h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Gratuito</Badge>
                    <Scissors className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Básico</CardTitle>
                  <CardDescription>Ideal para começar a usar a plataforma</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">R$ 0</span>
                    <span className="text-muted-foreground">/para sempre</span>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Perfil básico da barbearia</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Até 20 agendamentos por mês</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Acesso a clientes locais</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Lista de serviços básica</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-muted-foreground">Destaque nos resultados de busca</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-muted-foreground">Estatísticas avançadas</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-muted-foreground">Programa de fidelidade</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handlePlanSelect('free')}
                  >
                    Começar Grátis
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Plano Profissional para Barbearias */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-primary h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-1 -mr-1">
                  <Badge className="bg-primary text-primary-foreground">Popular</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Profissional</Badge>
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Profissional</CardTitle>
                  <CardDescription>A melhor escolha para barbearias em crescimento</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">
                      R$ {billingCycle === 'monthly' ? '149' : '127'}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingCycle === 'monthly' ? 'mês' : 'mês, cobrado anualmente'}
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Tudo do plano Básico</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Agendamentos ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Destaque nos resultados de busca</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Estatísticas e análises detalhadas</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Programa de fidelidade básico</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Upload ilimitado de fotos de portfólio</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-muted-foreground">Promoções destacadas</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handlePlanSelect('professional')}
                  >
                    Escolher Profissional
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Plano Premium para Barbearias */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="border-muted bg-gradient-to-br from-background to-background h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="destructive" className="bg-purple-600">Premium</Badge>
                    <Crown className="h-5 w-5 text-purple-500" />
                  </div>
                  <CardTitle className="text-2xl">Premium</CardTitle>
                  <CardDescription>Recursos avançados para barbearias estabelecidas</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">
                      R$ {billingCycle === 'monthly' ? '279' : '237'}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingCycle === 'monthly' ? 'mês' : 'mês, cobrado anualmente'}
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Tudo do plano Profissional</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Anúncios patrocinados (2x por mês)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Programa de fidelidade avançado</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Suporte prioritário</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Integração com ferramentas de marketing</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Promoções e ofertas destacadas</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>API para integração com outros sistemas</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={() => handlePlanSelect('premium')}
                  >
                    Escolher Premium
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Plano Gratuito para Clientes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="border-muted h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Gratuito</Badge>
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardTitle className="text-2xl">Básico</CardTitle>
                  <CardDescription>Para uso cotidiano</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">R$ 0</span>
                    <span className="text-muted-foreground">/para sempre</span>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Busca de barbeiros e barbearias</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Agendamentos ilimitados</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Experimentação virtual de cortes (3 por dia)</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-muted-foreground">Descontos exclusivos</span>
                    </li>
                    <li className="flex items-center">
                      <X className="h-4 w-4 text-red-500 mr-2" />
                      <span className="text-muted-foreground">Experimentação de cortes ilimitada</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handlePlanSelect('client-free')}
                  >
                    Começar Grátis
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
            
            {/* Plano VIP para Clientes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="border-primary h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-1 -mr-1">
                  <Badge className="bg-primary text-primary-foreground">Recomendado</Badge>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">Premium</Badge>
                    <Crown className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Cliente VIP</CardTitle>
                  <CardDescription>A melhor experiência BarberMatch</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="mb-4">
                    <span className="text-3xl font-bold">
                      R$ {billingCycle === 'monthly' ? '29,90' : '25,42'}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingCycle === 'monthly' ? 'mês' : 'mês, cobrado anualmente'}
                    </span>
                  </div>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Tudo do plano Básico</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Experimentação virtual ilimitada</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Descontos exclusivos (até 20%)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Acesso antecipado a promoções</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Acesso prioritário a horários</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Recomendações personalizadas avançadas</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => handlePlanSelect('client-vip')}
                  >
                    Tornar-se VIP
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 bg-muted/50 p-6 rounded-lg max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-medium mb-2">Planos Personalizados</h3>
              <p className="text-muted-foreground mb-4">
                Precisa de uma solução específica para sua rede de barbearias? Oferecemos planos personalizados para atender às necessidades exclusivas do seu negócio.
              </p>
              <Button variant="outline" onClick={() => navigate('/contato')}>
                Falar com um Consultor <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Dúvidas Frequentes</h2>
          <div className="max-w-3xl mx-auto text-left grid gap-4">
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-medium mb-2">Posso trocar de plano a qualquer momento?</h3>
              <p className="text-muted-foreground text-sm">
                Sim, você pode atualizar ou fazer downgrade do seu plano a qualquer momento. As alterações entrarão em vigor no próximo ciclo de faturamento.
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-medium mb-2">Como funciona o período de teste?</h3>
              <p className="text-muted-foreground text-sm">
                Oferecemos 14 dias de teste gratuito para os planos Profissional e Premium. Você não será cobrado até o final do período de teste.
              </p>
            </div>
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-medium mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-muted-foreground text-sm">
                Sim, você pode cancelar sua assinatura a qualquer momento. Se cancelar, você continuará tendo acesso até o final do período pago.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage; 