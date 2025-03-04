import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Github, Mail, Lock, AlertCircle, Info, Scissors, User, Store, Phone, Shield, Check, CheckCircle, AtSign } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';
import ThemeToggle from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureType, PlanType, FEATURE_ACCESS } from '@/utils/planAccess';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationDigits, setVerificationDigits] = useState(['', '', '', '', '', '']);
  const [activeDigitIndex, setActiveDigitIndex] = useState(0);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const userType = searchParams.get('type') || 'client';
  
  // Extrair informações dos parâmetros de URL
  const feature = searchParams.get('feature') as FeatureType | null;
  const requestedPlan = searchParams.get('plan') as PlanType | null;
  const isDemo = searchParams.get('demo') === 'true';
  
  // Referências para os inputs de código de verificação
  const digitRefs = Array(6).fill(0).map(() => React.createRef<HTMLInputElement>());
  
  // Definir títulos e mensagens com base no tipo de usuário
  const getTitleByType = () => {
    switch(userType) {
      case 'barbershop_owner':
        return 'Login para Donos de Barbearia';
      case 'barber':
        return 'Login para Barbeiros';
      case 'client':
      default:
        return 'Login para Clientes';
    }
  };
  
  const getIconByType = () => {
    switch(userType) {
      case 'barbershop_owner':
        return <Store className="mr-2" size={20} />;
      case 'barber':
        return <Scissors className="mr-2" size={20} />;
      case 'client':
      default:
        return <User className="mr-2" size={20} />;
    }
  };
  
  // Verificar se há um redirect após o login
  const getRedirectPathByType = () => {
    switch(userType) {
      case 'barbershop_owner':
        return '/barbershop';
      case 'barber':
        return '/barber';
      case 'client':
      default:
        return '/app';
    }
  };
  
  const from = location.state?.from?.pathname || getRedirectPathByType();
  
  // Calcular mensagem de contexto baseada nos parâmetros
  const getFeatureContext = () => {
    if (!feature) return null;
    
    const featureInfo = FEATURE_ACCESS[feature];
    if (!featureInfo) return null;
    
    if (isDemo) {
      return {
        title: `Demo: ${featureInfo.name}`,
        description: `Você está prestes a acessar uma demonstração de ${featureInfo.name}. Faça login para continuar.`,
        redirectPath: `/recursos/${feature}?demo=true`
      };
    }
    
    return {
      title: `Acesso: ${featureInfo.name}`,
      description: `Faça login para acessar ${featureInfo.name}.`,
      redirectPath: `/recursos/${feature}`
    };
  };
  
  const featureContext = getFeatureContext();
  
  useEffect(() => {
    // Definir valores de demonstração com base no tipo
    switch(userType) {
      case 'barber':
        setEmail('barbeiro@exemplo.com');
        break;
      case 'client':
      default:
        setEmail('cliente@exemplo.com');
        break;
    }
  }, [userType]);
  
  // Formatar telefone com animação
  useEffect(() => {
    if (phone) {
      const digits = phone.replace(/\D/g, '');
      let formatted = '';
      
      if (digits.length > 0) formatted += '(';
      if (digits.length > 0) formatted += digits.substring(0, 2);
      if (digits.length > 2) formatted += ') ';
      if (digits.length > 2) formatted += digits.substring(2, 7);
      if (digits.length > 7) formatted += '-';
      if (digits.length > 7) formatted += digits.substring(7, 11);
      
      setFormattedPhone(formatted);
    } else {
      setFormattedPhone('');
    }
  }, [phone]);
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    setPhone(input.substring(0, 11));
  };
  
  // Lidar com a entrada do código de verificação
  const handleVerificationCodeChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newVerificationDigits = [...verificationDigits];
      newVerificationDigits[index] = value;
      setVerificationDigits(newVerificationDigits);
      
      const newCode = newVerificationDigits.join('');
      setVerificationCode(newCode);
      
      // Mover para o próximo input se um dígito foi inserido
      if (value && index < 5) {
        setActiveDigitIndex(index + 1);
        digitRefs[index + 1].current?.focus();
      }
    }
  };
  
  // Lidar com backspace no código de verificação
  const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationDigits[index] && index > 0) {
      setActiveDigitIndex(index - 1);
      digitRefs[index - 1].current?.focus();
    }
  };
  
  // Preencher automaticamente o código de verificação se colado
  const handleVerificationPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, 6).split('');
      const newVerificationDigits = [...verificationDigits];
      
      digits.forEach((digit, index) => {
        if (index < 6) {
          newVerificationDigits[index] = digit;
        }
      });
      
      setVerificationDigits(newVerificationDigits);
      setVerificationCode(newVerificationDigits.join(''));
      
      // Mover o foco para o último dígito preenchido ou o final
      const focusIndex = Math.min(digits.length, 5);
      setActiveDigitIndex(focusIndex);
      if (focusIndex < 5) {
        digitRefs[focusIndex + 1].current?.focus();
      }
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    // Validação básica de email
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Por favor, insira um email válido');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar se o email foi verificado (simulação)
      const isEmailVerified = localStorage.getItem('user_email_verified') === 'true';
      
      if (!isEmailVerified) {
        // Redirecionar para verificação de email
        navigate(`/email-verification?email=${encodeURIComponent(email)}&type=${userType}`);
        return;
      }
      
      // Avançar para a etapa de verificação
      setStep('verification');
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setError('Falha na autenticação. Verifique suas credenciais e tente novamente.');
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!verificationCode || verificationCode.length !== 6) {
      setError('Por favor, insira o código de verificação de 6 dígitos');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de verificação de código
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Verificando código:', verificationCode);
      
      // Simulação de autenticação bem-sucedida
      localStorage.setItem('auth_token', 'fake_token');
      localStorage.setItem('user_role', userType);
      localStorage.setItem('user_email', email);
      
      // Redirecionar para a página apropriada
      const redirectPath = location.state?.from?.pathname || getRedirectPathByType();
      navigate(redirectPath);
    } catch (error) {
      console.error('Erro ao verificar código:', error);
      setError('Código de verificação inválido. Tente novamente.');
      setIsLoading(false);
    }
  };
  
  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulação de login social - será substituído pela integração real
    setTimeout(() => {
      console.log(`Login com ${provider}`);
      
      if (provider === 'google') {
        localStorage.setItem('auth_token', 'google_token_simulado');
        localStorage.setItem('user_role', userType === 'barber' ? 'barber' : 'client');
        navigate(getRedirectPathByType());
      } else if (provider === 'facebook') {
        localStorage.setItem('auth_token', 'facebook_token_simulado');
        localStorage.setItem('user_role', userType === 'barber' ? 'barber' : 'client');
        navigate(getRedirectPathByType());
      } else {
        setError(`Erro ao fazer login com ${provider}`);
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simulação de login - substitua por sua própria lógica
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verificar credenciais (simulado)
      if (email === 'teste@exemplo.com' && password === 'senha123') {
        // Login bem-sucedido
        // Armazenar informações de autenticação (substitua pela sua lógica)
        localStorage.setItem('user', JSON.stringify({ 
          email, 
          plan: requestedPlan || 'free',
          isLoggedIn: true 
        }));
        
        // Redirecionar com base no contexto da feature ou para o dashboard
        if (featureContext) {
          navigate(featureContext.redirectPath);
        } else {
          navigate('/app');
        }
      } else {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError('Ocorreu um erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full bg-card p-8 rounded-xl shadow-sm border">
          <div className="text-center mb-6">
        <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <LogIn size={32} />
              </div>
            </motion.div>
            <h1 className="text-2xl font-bold mt-4">{featureContext?.title || getTitleByType()}</h1>
            <p className="text-muted-foreground mt-1">
              {featureContext?.description || (step === 'credentials' 
                ? 'Digite suas credenciais para acessar' 
                : 'Digite o código de verificação enviado para seu email')}
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          {step === 'credentials' ? (
            <>
              <div className="flex justify-center space-x-2 mb-6">
                <Link
                  to="/login?type=client"
                  className={`flex items-center justify-center px-4 py-2 rounded-md text-sm ${
                    userType === 'client'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <User className="mr-2 h-4 w-4" />
                  Cliente
                </Link>
                <Link
                  to="/login?type=barber"
                  className={`flex items-center justify-center px-4 py-2 rounded-md text-sm ${
                    userType === 'barber'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Scissors className="mr-2 h-4 w-4" />
                  Barbeiro
                </Link>
                <Link
                  to="/login?type=barbershop_owner"
                  className={`flex items-center justify-center px-4 py-2 rounded-md text-sm ${
                    userType === 'barbershop_owner'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  <Store className="mr-2 h-4 w-4" />
                  Barbearia
                </Link>
          </div>
          
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
          <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                      autoComplete="email"
                      required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@exemplo.com"
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background"
                />
                  </div>
              </div>
              
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Senha
                  </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                      placeholder="Digite sua senha"
                      className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background"
                  />
                  <button
                    type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                      Lembrar-me
                    </label>
                  </div>
                  
                  <div className="text-sm">
                    <Link to="/forgot-password" className="text-primary hover:text-primary/90">
                      Esqueceu a senha?
                    </Link>
                  </div>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processando...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        {getIconByType()}
                        Entrar
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <form onSubmit={handleVerification} className="space-y-6">
              <div className="bg-primary/5 p-4 rounded-lg text-center mb-2">
                <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">
                  Enviamos um código de verificação para
                </p>
                <p className="text-sm font-semibold">{email}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Por favor, verifique sua caixa de entrada ou pasta de spam
                </p>
              </div>
              
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium mb-1">
                  Código de verificação
                </label>
                <div className="flex justify-center mb-2">
                  {verificationDigits.map((digit, index) => (
                    <motion.div
                      key={`verification-input-${index}`}
                      initial={{ scale: 0.9, y: 10, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        y: 0, 
                        opacity: 1,
                        borderColor: activeDigitIndex === index ? 'var(--primary)' : undefined
                      }}
                      transition={{ 
                        delay: index * 0.06,
                        duration: 0.2
                      }}
                      className="relative mx-1"
                    >
                      <input
                        ref={digitRefs[index]}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleVerificationCodeChange(index, e.target.value.replace(/\D/g, ''))}
                        onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                        onFocus={() => setActiveDigitIndex(index)}
                        onPaste={index === 0 ? handleVerificationPaste : undefined}
                        className={`w-12 h-14 text-center text-xl font-semibold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background ${
                          activeDigitIndex === index ? 'border-primary' : 'border-gray-300 dark:border-gray-700'
                        }`}
                        aria-label={`Dígito ${index + 1} do código de verificação`}
                        title={`Dígito ${index + 1} do código de verificação`}
                      />
                      {digit && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rounded-full"
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center text-sm text-muted-foreground mt-2"
                >
                  Não recebeu o código? <button type="button" className="text-primary hover:underline" onClick={() => {
                    console.log('Reenviar código');
                    // Efeito visual de reenvio
                    setVerificationDigits(['', '', '', '', '', '']);
                    setActiveDigitIndex(0);
                    digitRefs[0].current?.focus();
                  }}>
                    Reenviar
                  </button>
                </motion.div>
            </div>
            
              <div>
            <button
              type="submit"
              disabled={isLoading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verificando...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <CheckCircle className="mr-2" size={20} />
                      Verificar e entrar
                    </span>
              )}
            </button>
                
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="w-full mt-3 flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Voltar
                </button>
              </div>
          </form>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              {userType === 'barbershop_owner' ? (
                <Link to="/barbershop-login?tab=register" className="font-medium text-primary hover:underline">
                  Cadastre sua barbearia
                </Link>
              ) : (
                <Link to={`/register?type=${userType}`} className="font-medium text-primary hover:underline">
                Cadastre-se
              </Link>
              )}
            </p>
          </div>
        </div>
          </div>
    </div>
  );
};

export default Login; 