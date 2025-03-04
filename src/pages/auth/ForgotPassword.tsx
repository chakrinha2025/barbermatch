import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';
import ThemeToggle from '@/components/ThemeToggle';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      // Simulação de envio de email - será substituído pela integração real com backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Marcar como enviado com sucesso
      setIsSubmitted(true);
    } catch (err) {
      setError('Ocorreu um erro ao enviar o e-mail de recuperação. Tente novamente mais tarde.');
      console.error('Erro na recuperação de senha:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="py-4 px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <AnimatedLogo size="small" />
        </Link>
        <ThemeToggle />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8 p-8 bg-card rounded-xl shadow-lg border">
          {!isSubmitted ? (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-bold">Recuperar Senha</h1>
                <p className="text-muted-foreground mt-2">
                  Informe seu e-mail para receber instruções de recuperação de senha
                </p>
              </div>
              
              {error && (
                <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Mail size={18} />
                      <span>Enviar Instruções</span>
                    </>
                  )}
                </button>
              </form>
              
              <div className="text-center text-sm">
                <Link 
                  to="/login" 
                  className="text-primary hover:underline font-medium flex items-center justify-center gap-1"
                >
                  <ArrowLeft size={16} />
                  <span>Voltar para o login</span>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Mail size={32} className="text-primary" />
              </div>
              
              <div>
                <h1 className="text-2xl font-bold">E-mail Enviado!</h1>
                <p className="text-muted-foreground mt-3">
                  Enviamos instruções de recuperação de senha para:
                </p>
                <p className="font-medium mt-1">{email}</p>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>
                  Verifique sua caixa de entrada e pasta de spam. O e-mail contém um link para recuperar sua senha.
                </p>
                <p className="mt-2">
                  O link expira em 30 minutos.
                </p>
              </div>
              
              <div className="pt-4">
                <Link 
                  to="/login" 
                  className="text-primary hover:underline font-medium flex items-center justify-center gap-1"
                >
                  <ArrowLeft size={16} />
                  <span>Voltar para o login</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} BarberMatch. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default ForgotPassword; 