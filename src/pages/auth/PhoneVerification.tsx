import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Check, AlertCircle, CheckCircle, RefreshCw, ArrowLeft, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

const PhoneVerification = () => {
  const [verificationCode, setVerificationCode] = useState<string[]>(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [phone, setPhone] = useState('');
  const [formattedPhone, setFormattedPhone] = useState('');
  const [accountType, setAccountType] = useState<string>('');
  const [verificationMethod, setVerificationMethod] = useState<'sms' | 'whatsapp'>('sms');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Receber os parâmetros da navegação
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const phoneParam = params.get('phone');
    const typeParam = params.get('type');
    const methodParam = params.get('method') as 'sms' | 'whatsapp';
    
    if (phoneParam) {
      setPhone(phoneParam);
      formatPhoneNumber(phoneParam);
    }
    
    if (typeParam) {
      setAccountType(typeParam);
    }
    
    if (methodParam && (methodParam === 'sms' || methodParam === 'whatsapp')) {
      setVerificationMethod(methodParam);
    }
    
    // Focar no primeiro input automaticamente
    setTimeout(() => {
      if (inputRefs.current[0]) {
        inputRefs.current[0].focus();
      }
    }, 500);
  }, [location]);
  
  // Formatar número de telefone para exibição
  const formatPhoneNumber = (number: string) => {
    if (!number) return;
    
    // Remover caracteres não numéricos
    const digits = number.replace(/\D/g, '');
    
    // Formatar no padrão brasileiro
    if (digits.length === 11) {
      setFormattedPhone(`(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`);
    } else if (digits.length === 10) {
      setFormattedPhone(`(${digits.substring(0, 2)}) ${digits.substring(2, 6)}-${digits.substring(6)}`);
    } else {
      setFormattedPhone(number);
    }
  };
  
  // Disparar confetti quando verificado
  useEffect(() => {
    if (isVerified) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Confetti em posições aleatórias
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#3498db', '#9b59b6', '#f39c12'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#2ecc71', '#e74c3c', '#1abc9c'],
        });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [isVerified]);
  
  // Atualizações do contador para reenvio
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && resendDisabled) {
      setResendDisabled(false);
    }
  }, [countdown, resendDisabled]);
  
  const handleCodeChange = (index: number, value: string) => {
    // Permitir apenas números
    if (!/^\d*$/.test(value)) return;
    
    // Atualizar o código
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Mover para o próximo campo se valor foi inserido
    if (value && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Mover para o campo anterior ao pressionar backspace em campo vazio
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
    
    // Mover para campo anterior com seta esquerda
    if (e.key === 'ArrowLeft' && index > 0) {
      setActiveIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
    
    // Mover para próximo campo com seta direita
    if (e.key === 'ArrowRight' && index < 5) {
      setActiveIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Verificar se são 6 dígitos
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setVerificationCode(digits);
      setActiveIndex(5);
      inputRefs.current[5]?.focus();
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join('');
    
    // Validar código
    if (code.length !== 6) {
      setError('Por favor, insira o código de 6 dígitos');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulação de verificação (substituir por chamada real à API)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Exemplo para testes: código 123456 é sempre válido
      if (code === '123456') {
        setIsVerified(true);
        
        // Armazenar informações do usuário
        localStorage.setItem('user_phone_verified', 'true');
        
        // Aguardar animação de sucesso antes de redirecionar
        setTimeout(() => {
          // Redirecionar de volta para o perfil ou dashboard do usuário
          navigate(getRedirectUrl());
        }, 3000);
      } else {
        setError('Código de verificação inválido. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao verificar telefone:', error);
      setError('Ocorreu um erro ao verificar seu telefone. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleResendCode = async () => {
    if (resendDisabled) return;
    
    setResendDisabled(true);
    setCountdown(60); // 60 segundos para reenvio
    
    try {
      // Simulação de reenvio (substituir por chamada real à API)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Limpar campos
      setVerificationCode(['', '', '', '', '', '']);
      setActiveIndex(0);
      inputRefs.current[0]?.focus();
      
      // Mostrar mensagem de sucesso temporária
      setError(null);
    } catch (error) {
      console.error('Erro ao reenviar código:', error);
      setError('Não foi possível reenviar o código. Tente novamente mais tarde.');
    }
  };
  
  const handleChangeMethod = (method: 'sms' | 'whatsapp') => {
    setVerificationMethod(method);
    
    // Simulação de envio de novo código
    setResendDisabled(true);
    setCountdown(60);
    setVerificationCode(['', '', '', '', '', '']);
    setActiveIndex(0);
    inputRefs.current[0]?.focus();
  };
  
  // Determinar para onde redirecionar após a verificação
  const getRedirectUrl = () => {
    switch (accountType) {
      case 'barbershop_owner':
        return '/barbershop/profile';
      case 'barber':
        return '/barber/profile';
      case 'client':
      default:
        return '/app/profile';
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-4 py-8">
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-card p-8 rounded-xl shadow-md border overflow-hidden relative">
            {/* Efeito de brilho no canto superior direito */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            {/* Efeito de brilho no canto inferior esquerdo */}
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
            
            <AnimatePresence mode="wait">
              {!isVerified ? (
                <motion.div
                  key="verification-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10"
                >
                  <div className="text-center mb-8">
                    <div className="flex justify-center mb-6">
                      <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        {verificationMethod === 'sms' ? (
                          <Phone size={40} />
                        ) : (
                          <MessageSquare size={40} />
                        )}
                      </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Verifique seu Telefone</h1>
                    <p className="text-muted-foreground">
                      Enviamos um código de verificação via {verificationMethod === 'sms' ? 'SMS' : 'WhatsApp'} para:
                    </p>
                    <p className="font-medium text-lg mt-1">{formattedPhone || phone}</p>
                    <div className="flex justify-center space-x-3 mt-4">
                      <button
                        type="button"
                        onClick={() => handleChangeMethod('sms')}
                        className={`flex items-center px-3 py-1 rounded-full text-sm ${
                          verificationMethod === 'sms' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <Phone size={14} className="mr-1.5" />
                        SMS
                      </button>
                      <button
                        type="button"
                        onClick={() => handleChangeMethod('whatsapp')}
                        className={`flex items-center px-3 py-1 rounded-full text-sm ${
                          verificationMethod === 'whatsapp' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <MessageSquare size={14} className="mr-1.5" />
                        WhatsApp
                      </button>
                    </div>
                  </div>
                  
                  {error && (
                    <motion.div 
                      className="mb-6 p-3 bg-destructive/10 text-destructive rounded-lg flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-2 sm:gap-3 mb-8">
                      {verificationCode.map((digit, index) => (
                        <motion.div
                          key={`code-input-${index}`}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05, duration: 0.4 }}
                          className="relative"
                        >
                          <input
                            ref={el => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleCodeChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onFocus={() => setActiveIndex(index)}
                            onPaste={index === 0 ? handlePaste : undefined}
                            className={`w-12 h-16 text-center text-2xl font-semibold border-2 rounded-lg focus:outline-none bg-background transition-all duration-200 ${
                              activeIndex === index 
                                ? 'border-primary shadow-[0_0_0_4px_rgba(99,102,241,0.1)]' 
                                : 'border-border'
                            }`}
                            aria-label={`Dígito ${index + 1} do código de verificação`}
                          />
                          
                          {/* Indicador visual sob o input ativo */}
                          <motion.div
                            className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: activeIndex === index ? 1 : 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="text-center mb-8">
                      <p className="text-sm text-muted-foreground mb-2">
                        Não recebeu o código?
                      </p>
                      <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={resendDisabled}
                        className="text-primary font-medium hover:underline inline-flex items-center"
                      >
                        <RefreshCw size={16} className={`mr-1.5 ${resendDisabled ? 'animate-spin' : ''}`} />
                        {resendDisabled ? `Reenviar em ${countdown}s` : 'Reenviar código'}
                      </button>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Verificando...
                          </span>
                        ) : (
                          'Verificar Telefone'
                        )}
                      </button>
                      
                      <Link 
                        to={getRedirectUrl()}
                        className="flex items-center justify-center text-sm text-muted-foreground hover:text-foreground"
                      >
                        <ArrowLeft size={16} className="mr-1.5" />
                        Voltar para o perfil
                      </Link>
                    </div>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success-view"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-6 relative z-10"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="h-12 w-12 text-primary" />
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-2xl font-bold mb-4"
                  >
                    Telefone Verificado!
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-muted-foreground mb-8"
                  >
                    Seu número de telefone foi verificado com sucesso. Você será redirecionado em instantes.
                  </motion.p>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="relative h-2 w-full max-w-xs mx-auto bg-muted rounded-full overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-primary rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1, duration: 2 }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PhoneVerification; 