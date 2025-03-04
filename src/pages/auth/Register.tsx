import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Scissors, User, Check, X, AlertCircle, Store, Phone, Mail, Shield, AtSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeatureType, PlanType, FEATURE_ACCESS } from '@/utils/planAccess';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [phoneCharIndex, setPhoneCharIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState<'client' | 'barber' | 'barbershop'>('client');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'info' | 'verification'>('info');
  const [verificationCode, setVerificationCode] = useState('');
  const [emailsMatch, setEmailsMatch] = useState(true);
  
  // Estados para validação de senha
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    specialChar: false,
    number: false
  });
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Extrair informações dos parâmetros de URL para features
  const feature = searchParams.get('feature') as FeatureType | null;
  const requestedPlan = searchParams.get('plan') as PlanType | null;
  
  // Calcular mensagem de contexto baseada nos parâmetros
  const getFeatureContext = () => {
    if (!feature) return null;
    
    const featureInfo = FEATURE_ACCESS[feature];
    if (!featureInfo) return null;
    
    return {
      title: `Cadastro para ${featureInfo.name}`,
      description: `Crie uma conta para acessar ${featureInfo.name} com o plano ${requestedPlan || 'free'}.`,
      redirectPath: `/recursos/${feature}`
    };
  };
  
  const featureContext = getFeatureContext();
  
  const initialAccountType = searchParams.get('type') as 'client' | 'barber' | 'barbershop' | null;
  
  // Definir o tipo de conta com base no parâmetro da URL
  useEffect(() => {
    if (initialAccountType === 'client' || initialAccountType === 'barber' || initialAccountType === 'barbershop') {
      setAccountType(initialAccountType);
    }
  }, [initialAccountType]);
  
  // Validar requisitos da senha sempre que ela mudar
  useEffect(() => {
    setPasswordRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      number: /[0-9]/.test(password)
    });
  }, [password]);
  
  // Verificar se os emails coincidem
  useEffect(() => {
    if (confirmEmail) {
      setEmailsMatch(email === confirmEmail);
    } else {
      setEmailsMatch(true);
    }
  }, [email, confirmEmail]);

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
      setPhoneCharIndex(formatted.length);
    } else {
      setFormattedPhone('');
      setPhoneCharIndex(0);
    }
  }, [phone]);

  // Animação para a digitação do telefone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    setPhone(input.substring(0, 11));
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  const handleSocialRegister = (provider: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulação de cadastro social - será substituído pela integração real
    setTimeout(() => {
      try {
        console.log(`Registro com ${provider}`, { accountType });
        
        localStorage.setItem('auth_token', `${provider}_token_simulado`);
        localStorage.setItem('user_role', accountType);
        
        if (accountType === 'client') {
          navigate('/app');
        } else if (accountType === 'barber') {
          navigate('/barber');
        } else if (accountType === 'barbershop') {
          navigate('/barbershop');
        }
      } catch (error) {
        console.error(`Erro ao registrar com ${provider}:`, error);
        setError(`Ocorreu um erro ao tentar registrar com ${provider}.`);
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };
  
  const handleAccountTypeChange = (type: 'client' | 'barber' | 'barbershop') => {
    if (type === 'barbershop') {
      // Redirecionar diretamente para a página de login/cadastro de barbearia
      navigate('/barbershop-login');
    } else {
      setAccountType(type);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validação básica do formulário
    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }
    
    if (email !== confirmEmail) {
      setError("Os emails não coincidem");
      return;
    }
    
    if (password.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres");
      return;
    }
    
    if (!passwordRequirements.uppercase || !passwordRequirements.specialChar || !passwordRequirements.number) {
      setError("A senha não atende a todos os requisitos");
      return;
    }

    if (!phone || phone.length < 10) {
      setError("Insira um número de telefone válido");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de envio de código de verificação
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Enviando código de verificação para:', email);
      
      // Simular armazenamento temporário das informações do usuário
      sessionStorage.setItem('register_name', name);
      sessionStorage.setItem('register_email', email);
      sessionStorage.setItem('register_phone', phone);
      sessionStorage.setItem('register_account_type', accountType);
      sessionStorage.setItem('register_password', password); // Em produção, NUNCA armazenar senhas em plain text
      
      // Redirecionar para a página de verificação
      navigate(`/email-verification?email=${encodeURIComponent(email)}&type=${accountType}`);
      
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError("Ocorreu um erro ao tentar criar sua conta. Tente novamente.");
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Insira o código de verificação de 6 dígitos");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de verificação de código
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Verificando código:', verificationCode);
      
      // Armazenamento simulado de token e papel do usuário
      localStorage.setItem('auth_token', 'token_simulado');
      localStorage.setItem('user_role', accountType);
      localStorage.setItem('user_email_verified', 'true');
      localStorage.setItem('user_phone', phone);
      
      // Redirecionar para a área apropriada com base no tipo de conta
      if (accountType === 'client') {
        navigate('/app');
      } else if (accountType === 'barber') {
        navigate('/barber');
      }
      
    } catch (error) {
      console.error('Erro na verificação:', error);
      setError("Código de verificação inválido. Tente novamente.");
      setIsLoading(false);
    }
  };
  
  const getAccountTypeIcon = () => {
    switch (accountType) {
      case 'barber':
        return <Scissors className="mr-2 h-4 w-4" />;
      case 'barbershop':
        return <Store className="mr-2 h-4 w-4" />;
      case 'client':
      default:
        return <User className="mr-2 h-4 w-4" />;
    }
  };
  
  const getTitleByType = () => {
    switch (accountType) {
      case 'barber':
        return 'Cadastro de Barbeiro';
      case 'barbershop':
        return 'Cadastro de Barbearia';
      case 'client':
      default:
        return 'Cadastro de Cliente';
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
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <UserPlus size={32} />
              </div>
            </motion.div>
            <h1 className="text-2xl font-bold mt-4">{featureContext?.title || getTitleByType()}</h1>
            <p className="text-muted-foreground mt-1">
              {featureContext?.description || "Crie sua conta para acessar todos os recursos"}
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          {step === 'info' ? (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex space-x-2 mb-4">
                <button
                  type="button"
                  onClick={() => handleAccountTypeChange('client')}
                  className={`flex items-center justify-center px-4 py-2 rounded-md text-sm ${
                    accountType === 'client'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <User className="h-4 w-4 mr-2" />
                  Cliente
                </button>
                <button
                  type="button"
                  onClick={() => handleAccountTypeChange('barber')}
                  className={`flex items-center justify-center px-4 py-2 rounded-md text-sm ${
                    accountType === 'barber'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Scissors className="h-4 w-4 mr-2" />
                  Barbeiro
                </button>
                <button
                  type="button"
                  onClick={() => handleAccountTypeChange('barbershop')}
                  className={`flex items-center justify-center px-4 py-2 rounded-md text-sm ${
                    accountType === 'barbershop'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  <Store className="h-4 w-4 mr-2" />
                  Barbearia
                </button>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nome completo
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background"
                />
              </div>
              
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
                    placeholder="seu@email.com"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmEmail" className="block text-sm font-medium mb-1">
                  Confirmar email
                </label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <motion.input
                    id="confirmEmail"
                    type="email"
                    autoComplete="email"
                    required
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="Confirme seu email"
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary bg-background ${
                      confirmEmail && !emailsMatch
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-700 focus:border-primary"
                    }`}
                    animate={{
                      x: confirmEmail && !emailsMatch ? [0, -5, 5, -5, 5, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <AnimatePresence>
                    {confirmEmail && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {emailsMatch ? (
                          <Check className="h-5 w-5 text-green-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {confirmEmail && !emailsMatch && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 text-sm text-red-500"
                  >
                    Os emails não coincidem
                  </motion.p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Telefone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formattedPhone}
                    onChange={handlePhoneChange}
                    placeholder="(XX) XXXXX-XXXX"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <AnimatePresence mode="wait">
                      {phone.length > 0 && (
                        <motion.div 
                          key="phone-animation"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex"
                        >
                          {Array(phone.length <= 10 ? phone.length : 10).fill(0).map((_, i) => (
                            <motion.div
                              key={`phone-digit-${i}`}
                              initial={{ scale: 0, y: 10 }}
                              animate={{ scale: 1, y: 0 }}
                              transition={{ 
                                delay: i * 0.05,
                                type: "spring",
                                stiffness: 200
                              }}
                              className="h-1.5 w-1.5 rounded-full bg-primary mx-0.5"
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: phone.length > 0 ? 1 : 0 }}
                  className="text-xs text-muted-foreground mt-1"
                >
                  {phone.length}/11 dígitos
                </motion.p>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirmar senha
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua senha"
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-muted-foreground" /> : <Eye className="h-5 w-5 text-muted-foreground" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Requisitos de senha:</p>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center">
                    {passwordRequirements.length ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className="text-sm">Mínimo de 8 caracteres</span>
                  </div>
                  <div className="flex items-center">
                    {passwordRequirements.uppercase ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className="text-sm">Pelo menos uma letra maiúscula</span>
                  </div>
                  <div className="flex items-center">
                    {passwordRequirements.specialChar ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className="text-sm">Pelo menos um caractere especial</span>
                  </div>
                  <div className="flex items-center">
                    {passwordRequirements.number ? (
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span className="text-sm">Pelo menos um número</span>
                  </div>
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
                    'Continuar'
                  )}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerification} className="space-y-6">
              <div className="bg-primary/5 p-4 rounded-lg text-center mb-2">
                <Mail className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">
                  Enviamos um código de verificação para
                </p>
                <p className="text-sm font-semibold">{email}</p>
              </div>
              
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium mb-1">
                  Código de verificação
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <input
                    id="verificationCode"
                    type="text"
                    required
                    maxLength={6}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="Digite o código de 6 dígitos"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary bg-background text-center tracking-widest"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Não recebeu o código? <button type="button" className="text-primary hover:underline" onClick={() => console.log('Reenviar código')}>Reenviar</button>
                </p>
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
                    'Verificar e criar conta'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="w-full mt-3 flex justify-center py-2.5 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium bg-background hover:bg-muted focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Voltar
                </button>
              </div>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 