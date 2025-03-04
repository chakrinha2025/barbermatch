import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import AnimatedLogo from '@/components/AnimatedLogo';
import ThemeToggle from '@/components/ThemeToggle';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccessful, setIsSuccessful] = useState(false);
  
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validação básica
    if (password !== confirmPassword) {
      setError('As senhas não correspondem. Por favor, tente novamente.');
      return;
    }
    
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulação de redefinição de senha - será substituído pela integração real
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSuccessful(true);
    } catch (err) {
      setError('Ocorreu um erro ao redefinir sua senha. Tente novamente mais tarde.');
      console.error('Erro na redefinição de senha:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!token) {
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
            <div className="text-center">
              <h1 className="text-2xl font-bold">Link Inválido</h1>
              <p className="text-muted-foreground mt-2">
                O link de redefinição de senha é inválido ou expirou. Por favor, solicite um novo link.
              </p>
            </div>
            
            <div className="text-center mt-6">
              <Link 
                to="/forgot-password" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
              >
                <ArrowLeft size={16} />
                <span>Voltar para Recuperação de Senha</span>
              </Link>
            </div>
          </div>
        </main>
        
        <footer className="py-4 px-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BarberMatch. Todos os direitos reservados.</p>
        </footer>
      </div>
    );
  }
  
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
          {!isSuccessful ? (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-bold">Criar Nova Senha</h1>
                <p className="text-muted-foreground mt-2">
                  Digite sua nova senha abaixo para concluir a redefinição.
                </p>
              </div>
              
              {error && (
                <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Nova Senha
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua nova senha"
                        required
                        className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirmar Nova Senha
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme sua nova senha"
                        required
                        className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-primary text-primary-foreground rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      <span>Redefinir Senha</span>
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
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-green-600 dark:text-green-500" />
              </div>
              
              <div>
                <h1 className="text-2xl font-bold">Senha Redefinida!</h1>
                <p className="text-muted-foreground mt-3">
                  Sua senha foi redefinida com sucesso.
                </p>
                <p className="text-muted-foreground">
                  Agora você pode fazer login utilizando sua nova senha.
                </p>
              </div>
              
              <div className="pt-4">
                <Link 
                  to="/login" 
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  <span>Ir para Login</span>
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

export default ResetPassword; 