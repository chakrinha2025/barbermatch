import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Definição do tipo de usuário
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'client' | 'barber' | 'barbershop_owner';
  avatar_url?: string | null;
}

// Mapeamento de permissões por role
export const ROLE_PERMISSIONS = {
  admin: [
    'manage_all_users',
    'manage_platform',
    'view_all_reports',
    'manage_all_content',
    'manage_payments',
    'view_analytics',
    'manage_settings'
  ],
  client: [
    'view_own_profile',
    'edit_own_profile',
    'book_appointments',
    'view_own_appointments',
    'cancel_own_appointments',
    'try_virtual_hairstyles',
    'rate_services',
    'chat_with_barbers',
    'view_barbers',
    'view_barbershops'
  ],
  barber: [
    'view_own_profile',
    'edit_own_profile',
    'view_assigned_appointments',
    'manage_own_schedule',
    'view_own_clients',
    'chat_with_clients',
    'view_own_stats',
    'manage_own_portfolio',
    'view_own_earnings'
  ],
  barbershop_owner: [
    'view_own_profile',
    'edit_own_profile',
    'manage_barbershop_profile',
    'manage_services',
    'manage_barbers',
    'view_all_shop_appointments',
    'manage_shop_schedule',
    'view_shop_analytics',
    'manage_shop_promotions',
    'manage_shop_payments',
    'chat_with_clients'
  ]
};

// Mapeamento de rotas permitidas por role
export const ROLE_ROUTES = {
  admin: ['/admin', '/admin/*'],
  client: ['/app', '/app/*', '/try-on', '/appointment/*', '/barber/*', '/barbershop/*', '/profile'],
  barber: ['/barber-dashboard', '/barber-dashboard/*', '/appointment/*', '/profile'],
  barbershop_owner: ['/barbershop', '/barbershop/*', '/profile']
};

// Interface do contexto de autenticação
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (permission: string) => boolean;
  canAccessRoute: (route: string) => boolean;
  updateUserProfile: (data: Partial<AuthUser>) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

// Criação do contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider do contexto
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Checar autenticação inicial
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Verificar localStorage por sessão salva
        const savedUser = localStorage.getItem('user');
        
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          
          // Usuário autenticado
          setUser({
            id: parsedUser.id,
            email: parsedUser.email,
            name: parsedUser.name,
            role: parsedUser.role,
            avatar_url: parsedUser.avatar_url
          });
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login simulado
  const signIn = async (email: string, password: string) => {
    try {
      // Simulando verificação de usuário
      // Na implementação real, aqui seria feita uma chamada ao backend
      
      if (email === 'admin@barbermatch.com' && password === 'Adm1nP@ssw0rd') {
        const userData = {
          id: '1',
          email: 'admin@barbermatch.com',
          name: 'Administrador',
          role: 'admin' as const,
          avatar_url: null
        };
        
        // Salvar no localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      
      if (email === 'barbeiro@barbermatch.com' && password === 'Barb31r0') {
        const userData = {
          id: '2',
          email: 'barbeiro@barbermatch.com',
          name: 'João Barbeiro',
          role: 'barber' as const,
          avatar_url: null
        };
        
        // Salvar no localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      
      if (email === 'proprietario@barbermatch.com' && password === 'B@rb3rMatch123') {
        const userData = {
          id: '3',
          email: 'proprietario@barbermatch.com',
          name: 'Taohan Batista',
          role: 'barbershop_owner' as const,
          avatar_url: null
        };
        
        // Salvar no localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      
      if (email === 'cliente@barbermatch.com' && password === 'C1i3nt3') {
        const userData = {
          id: '4',
          email: 'cliente@barbermatch.com',
          name: 'Cliente Exemplo',
          role: 'client' as const,
          avatar_url: null
        };
        
        // Salvar no localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return { success: true };
      }
      
      return { success: false, error: 'Credenciais inválidas' };
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      return { success: false, error: error.message || 'Falha ao autenticar' };
    }
  };
  
  // Logout
  const signOut = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  
  // Cadastro
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      // Simulando criação de usuário
      // Na implementação real, aqui seria feita uma chamada ao backend
      
      const newUser = {
        id: Date.now().toString(),
        email,
        name: userData.name,
        role: userData.role || 'client',
        avatar_url: null
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      
      return { success: true };
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      return { success: false, error: error.message || 'Falha ao criar conta' };
    }
  };
  
  // Verificar permissão
  const hasPermission = (permission: string) => {
    if (!user) return false;
    
    // Admins têm todas as permissões
    if (user.role === 'admin') return true;
    
    // Verificar se a role do usuário tem a permissão
    return ROLE_PERMISSIONS[user.role]?.includes(permission) || false;
  };
  
  // Verificar acesso à rota
  const canAccessRoute = (route: string) => {
    if (!user) return false;
    
    // Rotas públicas podem ser acessadas por qualquer usuário autenticado
    const publicRoutes = ['/settings', '/profile', '/notifications'];
    if (publicRoutes.includes(route)) return true;
    
    // Admins têm acesso a todas as rotas
    if (user.role === 'admin') return true;
    
    // Verificar se a rota está na lista de rotas permitidas para a role do usuário
    return ROLE_ROUTES[user.role]?.some(pattern => {
      if (pattern.endsWith('/*')) {
        const basePath = pattern.replace('/*', '');
        return route.startsWith(basePath);
      }
      return route === pattern;
    }) || false;
  };
  
  // Atualizar perfil do usuário
  const updateUserProfile = async (data: Partial<AuthUser>) => {
    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      
      // Atualizar no localStorage
      const updatedUser = { ...user, ...data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Atualizar estado local
      setUser(updatedUser);
      
      return { success: true };
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      return { success: false, error: error.message || 'Falha ao atualizar perfil' };
    }
  };
  
  // Recarregar dados do usuário
  const refreshUser = async () => {
    try {
      if (!user) return;
      
      // Recarregar do localStorage
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Erro ao recarregar usuário:", error);
    }
  };
  
  // Componente de loading
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="flex flex-col items-center p-8 rounded-lg"
        >
          <Loader2 size={48} className="animate-spin text-primary mb-4" />
          <p className="text-lg font-medium text-foreground">Carregando...</p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signOut,
        signUp,
        hasPermission,
        canAccessRoute,
        updateUserProfile,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
}; 