import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Lock, Mail, Scissors, Eye, EyeOff, Store, Shield, Calendar, Info, ArrowRight, Check, ArrowLeft, User, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const PLANS = [
  {
    id: "teste_gratuito",
    name: "Teste Gratuito",
    price: "0,00",
    duration: "14 dias",
    features: [
      "Perfil básico da barbearia",
      "Agendamentos online limitados",
      "Gerenciamento de até 2 barbeiros",
      "Visibilidade local básica"
    ]
  },
  {
    id: "basico",
    name: "Básico",
    price: "99,90",
    duration: "Mensal",
    features: [
      "Perfil completo da barbearia",
      "Agendamentos online",
      "Gerenciamento de até 3 barbeiros",
      "Suporte por email",
      "Visibilidade local aprimorada"
    ]
  },
  {
    id: "profissional",
    name: "Profissional",
    price: "199,90",
    duration: "Mensal",
    features: [
      "Tudo do Básico",
      "Destaque nas buscas",
      "Até 10 barbeiros",
      "Dashboard de análise",
      "Suporte prioritário"
    ]
  }
];

export default function BarberShopOwnerLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'login';
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register" | "plans">(initialTab as any);
  const [registrationStep, setRegistrationStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  // Estados para o registro
  const [registerData, setRegisterData] = useState({
    shopName: "",
    ownerName: "",
    email: "",
    password: ""
  });
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  
  useEffect(() => {
    setActiveTab(initialTab as any);
  }, [initialTab]);
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRegisterData({
      ...registerData,
      [id === 'barber-shop-name' ? 'shopName' : 
       id === 'owner-name' ? 'ownerName' :
       id === 'register-email' ? 'email' :
       id === 'register-password' ? 'password' : id]: value
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulação de login - seria substituído por uma chamada real à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Login com:", { email, password });
      
      // Verificar se é o usuário de demonstração
      if (email === 'barbearia@exemplo.com' && password === 'senha123') {
        // Armazenar informações de autenticação
        localStorage.setItem('auth_token', 'barbearia_token_simulado');
        localStorage.setItem('user_role', 'barbershop_owner');
        
        // Login bem-sucedido
        toast.success("Login realizado com sucesso");
        console.log("Redirecionando para /barbershop");
        
        // Usar timeout para garantir que o redirecionamento ocorra após a atualização do estado
        setTimeout(() => {
        navigate("/barbershop");
        }, 100);
      } else {
        // Credenciais inválidas
        toast.error("Credenciais inválidas. Use barbearia@exemplo.com / senha123 para demonstração.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const nextStep = () => {
    if (registrationStep === 1) {
      // Validar formulário básico
      if (!registerData.ownerName || !registerData.shopName || !registerData.email || !registerData.password) {
        toast.error("Por favor, preencha todos os campos.");
        return;
      }
      
      if (registerData.password.length < 6) {
        toast.error("Sua senha deve ter pelo menos 6 caracteres.");
        return;
      }
      
      setRegistrationStep(2);
    }
  };
  
  const backStep = () => {
    if (registrationStep === 2) {
      setRegistrationStep(1);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      toast.error("Por favor, selecione um plano para continuar.");
      return;
    }
    
    setIsRegisterLoading(true);
    
    try {
      // Simulação de registro - seria substituído por uma chamada real à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Registro com:", { ...registerData, plano: selectedPlan });
      
      // Simulação de criação de conta
      localStorage.setItem('auth_token', 'novo_proprietario_token');
      localStorage.setItem('user_role', 'barbershop_owner');
      localStorage.setItem('barbershop_data', JSON.stringify({
        name: registerData.shopName,
        owner: registerData.ownerName,
        email: registerData.email,
        plan: selectedPlan,
        setupComplete: false,
        trialEndsAt: selectedPlan === 'teste_gratuito' 
          ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 dias
          : null
      }));
      
      // Registro bem-sucedido
      toast.success("Registro realizado com sucesso! Vamos configurar sua barbearia.");
      navigate("/barbershop-onboarding");
    } catch (error) {
      toast.error("Erro ao registrar. Tente novamente mais tarde.");
      console.error(error);
    } finally {
      setIsRegisterLoading(false);
    }
  };

  return (
    <div className="container max-w-5xl py-16 md:py-20 flex flex-col items-center">
      <div className="text-center mb-8">
        <Link to="/" className="mb-6 inline-block">
          <Store className="h-12 w-12 text-primary mx-auto" />
        </Link>
        <h1 className="text-3xl font-bold">Área de Barbearias</h1>
        <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
          Gerencie sua barbearia, acompanhe agendamentos e expanda seu negócio com a plataforma BarberMatch
        </p>
          </div>

      <Tabs 
        value={activeTab} 
        onValueChange={(value) => setActiveTab(value as any)}
        className="w-full max-w-xl"
      >
        <TabsList className="grid grid-cols-2 w-full mb-8">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="register">Cadastrar</TabsTrigger>
              </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login para Donos de Barbearias</CardTitle>
                  <CardDescription>
                Acesse sua conta para gerenciar sua barbearia
                  </CardDescription>
                </CardHeader>
            
            <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email"
                          type="email" 
                      placeholder="seu@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      className="pl-9"
                          required
                        />
                      </div>
                    </div>
                
                    <div className="space-y-2">
                        <Label htmlFor="password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="password"
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      className="pl-9"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3"
                          tabIndex={-1}
                          aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                        </button>
                      </div>
                    </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <label htmlFor="remember" className="text-muted-foreground">
                      Lembrar de mim
                    </label>
                  </div>
                  <Link to="/forgot-password" className="text-primary hover:underline">
                    Esqueceu sua senha?
                  </Link>
                </div>
                
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </CardContent>
            
            <CardFooter className="flex-col space-y-4 border-t pt-4">
              <div className="text-sm text-center text-muted-foreground">
                Não tem uma conta? 
                <button onClick={() => setActiveTab("register")} className="ml-1 text-primary hover:underline">
                  Cadastre-se
                  </button>
              </div>
                </CardFooter>
          </Card>
              </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Cadastrar Barbearia</CardTitle>
                  <CardDescription>
                {registrationStep === 1 
                  ? "Preencha seus dados para começar" 
                  : "Escolha um plano para sua barbearia"}
                  </CardDescription>
                </CardHeader>
            
            <CardContent>
              {registrationStep === 1 ? (
                <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="barber-shop-name">Nome da Barbearia</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="barber-shop-name"
                          placeholder="Nome da sua barbearia" 
                          value={registerData.shopName}
                          onChange={handleRegisterChange}
                        className="pl-9"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                    <Label htmlFor="owner-name">Nome do Proprietário</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="owner-name"
                        placeholder="Seu nome completo"
                        value={registerData.ownerName}
                        onChange={handleRegisterChange}
                        className="pl-9"
                        required
                      />
                    </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="register-email"
                          type="email" 
                        placeholder="seu@email.com"
                          value={registerData.email}
                          onChange={handleRegisterChange}
                        className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="register-password"
                        type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          value={registerData.password}
                          onChange={handleRegisterChange}
                        className="pl-9"
                          required
                        />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 top-3"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mínimo de 6 caracteres
                    </p>
                  </div>
                  
                  <Button type="button" className="w-full" onClick={nextStep}>
                    Próximo - Escolher Plano
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <button 
                      type="button" 
                      onClick={backStep}
                      className="text-sm flex items-center text-muted-foreground hover:text-primary"
                    >
                      <ArrowLeft className="h-4 w-4 mr-1" /> Voltar
                    </button>
                    <p className="text-sm text-muted-foreground">Etapa 2 de 2</p>
                  </div>
                
                  <p className="text-sm text-muted-foreground mb-4">
                    Escolha um plano ou inicie com o período de teste gratuito de 14 dias
                  </p>
                  
                  <div className="space-y-3">
                    {PLANS.map((plan) => (
                      <div 
                        key={plan.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          selectedPlan === plan.id 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-muted-foreground/50'
                        }`}
                        onClick={() => setSelectedPlan(plan.id)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-medium flex items-center">
                              {plan.name}
                              {plan.id === 'teste_gratuito' && (
                                <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                  Recomendado para início
                                </span>
                              )}
                            </h3>
                            <div className="flex items-baseline mt-1">
                              {plan.id === 'teste_gratuito' ? (
                                <span className="text-2xl font-bold">Grátis</span>
                              ) : (
                                <>
                                  <span className="text-2xl font-bold">R$ {plan.price}</span>
                                  <span className="text-sm text-muted-foreground ml-1">/{plan.duration}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div 
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              selectedPlan === plan.id ? 'bg-primary border-primary' : 'border-muted-foreground/30'
                            }`}
                          >
                            {selectedPlan === plan.id && (
                              <Check className="h-3 w-3 text-white" />
                            )}
                          </div>
                        </div>
                        
                        <ul className="space-y-2 mt-3">
                          {plan.features.map((feature, idx) => (
                            <li key={idx} className="text-sm flex items-start">
                              <Check className="h-4 w-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {plan.id === 'teste_gratuito' && (
                          <p className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                            <Info className="h-3 w-3 inline mr-1" />
                            Acesso completo por 14 dias. Sem compromisso.
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleRegister}>
                    <Button type="submit" className="w-full mt-6" disabled={isRegisterLoading || !selectedPlan}>
                      {isRegisterLoading ? "Processando..." : selectedPlan === 'teste_gratuito' ? "Começar Período de Teste" : "Finalizar Cadastro"}
                      </Button>
                  </form>
                </div>
              )}
                </CardContent>
            
            <CardFooter className="flex-col space-y-4 border-t pt-4">
              <div className="text-sm text-center text-muted-foreground">
                Já tem uma conta? 
                <button onClick={() => setActiveTab("login")} className="ml-1 text-primary hover:underline">
                    Faça login
                  </button>
              </div>
              
              <p className="text-xs text-center text-muted-foreground">
                Ao se cadastrar, você concorda com nossos <Link to="/terms" className="text-primary hover:underline">Termos de Uso</Link> e <Link to="/privacy" className="text-primary hover:underline">Política de Privacidade</Link>.
              </p>
                </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-12 text-center max-w-2xl">
        <h2 className="text-xl font-medium mb-2">BarberMatch para Barbearias</h2>
        <p className="text-muted-foreground mb-6">
          Transforme sua barbearia com nossa plataforma completa. Gerencie agendamentos, atraia novos clientes e aumente seus lucros.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border rounded-lg p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium mb-1">Agendamentos Otimizados</h3>
            <p className="text-sm text-muted-foreground">Sistema completo para gerenciar sua agenda</p>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <User className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium mb-1">Atração de Clientes</h3>
            <p className="text-sm text-muted-foreground">Aumente sua visibilidade e base de clientes</p>
            </div>
          
          <div className="border rounded-lg p-4 text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
            <h3 className="font-medium mb-1">Suporte Completo</h3>
            <p className="text-sm text-muted-foreground">Ajuda especializada para seu sucesso</p>
          </div>
        </div>
        
        <Link to="/pricing" className="text-primary hover:underline inline-flex items-center">
          Ver todos os planos e recursos
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
} 