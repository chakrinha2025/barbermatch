import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { supabase } from '@/api/supabase-client';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Função para fazer login diretamente no Supabase
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      console.log("Tentando login administrativo com:", email);
      
      // Login direto via Supabase Auth
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        console.error("Erro na autenticação:", authError);
        throw authError;
      }

      if (!data || !data.user) {
        throw new Error("Dados de usuário não encontrados");
      }

      console.log("Usuário autenticado:", data.user);

      // Verificar se o usuário é admin na tabela users
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError) {
        console.error("Erro ao buscar dados do usuário:", userError);
        throw new Error("Erro ao verificar permissões de usuário");
      }

      console.log("Dados do usuário:", userData);

      // Verificar se o usuário tem papel de administrador
      if (userData.role !== 'admin') {
        throw new Error("Acesso negado. Usuário não é administrador.");
      }

      // Salvar informações do usuário
      localStorage.setItem('admin_user', JSON.stringify({
        id: data.user.id,
        email: data.user.email,
        name: userData.name,
        role: userData.role,
        token: data.session?.access_token || ''
      }));

      // Redirecionar para o dashboard de admin
      toast.success("Login administrativo realizado com sucesso");
      navigate('/admin');
    } catch (err: any) {
      console.error("Erro no login administrativo:", err);
      setError(err.message || "Falha na autenticação administrativa");
      toast.error(err.message || "Falha na autenticação administrativa");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-950 to-black p-4">
      <div className="w-full max-w-md">
        <Card className="border-purple-600 bg-black/90 text-white">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
              <Shield size={24} />
            </div>
            <CardTitle className="text-2xl font-bold text-white">Acesso Administrativo</CardTitle>
            <CardDescription className="text-purple-300">
              Área restrita para administradores do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 rounded bg-red-900/50 p-3 text-red-200">
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-purple-300">
                  Email Administrativo
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@barbermatch.com"
                  className="border-purple-800 bg-purple-950/30 text-white placeholder:text-purple-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-purple-300">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-purple-800 bg-purple-950/30 pr-10 text-white placeholder:text-purple-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-100"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-600"
                disabled={isLoading}
              >
                {isLoading ? "Autenticando..." : "Acessar como Administrador"}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-purple-400">
              <p>Esta área é restrita para administradores autorizados do BarberMatch.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin; 