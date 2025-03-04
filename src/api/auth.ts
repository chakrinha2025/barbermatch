// Serviço de autenticação

import api from './index';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  accountType: 'client' | 'barber';
}

interface ForgotPasswordData {
  email: string;
}

interface ResetPasswordData {
  token: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export const authService = {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'cliente@exemplo.com' && credentials.password === 'senha123') {
        const response = {
          token: 'cliente_token_simulado',
          user: {
            id: 1,
            name: 'João Silva',
            email: credentials.email,
            role: 'client'
          }
        };
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.user.role);
        return response;
      }
      
      if (credentials.email === 'barbeiro@exemplo.com' && credentials.password === 'senha123') {
        const response = {
          token: 'barbeiro_token_simulado',
          user: {
            id: 2,
            name: 'Marco Oliveira',
            email: credentials.email,
            role: 'barber'
          }
        };
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.user.role);
        return response;
      }
      
      if (credentials.email === 'admin@exemplo.com' && credentials.password === 'senha123') {
        const response = {
          token: 'admin_token_simulado',
          user: {
            id: 3,
            name: 'Admin',
            email: credentials.email,
            role: 'admin'
          }
        };
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.user.role);
        return response;
      }
      
      throw new Error('Credenciais inválidas');
    }
    
    // Implementação real
    const response = await api.post('/auth/login', credentials);
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user_role', response.data.user.role);
    return response.data;
  },
  
  // Registro
  async register(data: RegisterData): Promise<AuthResponse> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = {
        token: `${data.accountType}_token_simulado`,
        user: {
          id: Math.floor(Math.random() * 1000),
          name: data.name,
          email: data.email,
          role: data.accountType
        }
      };
      
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_role', response.user.role);
      return response;
    }
    
    // Implementação real
    const response = await api.post('/auth/register', data);
    localStorage.setItem('auth_token', response.data.token);
    localStorage.setItem('user_role', response.data.user.role);
    return response.data;
  },
  
  // Recuperação de senha
  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }
    
    // Implementação real
    await api.post('/auth/forgot-password', data);
  },
  
  // Redefinição de senha
  async resetPassword(data: ResetPasswordData): Promise<void> {
    // Simulação (remover quando conectar ao backend real)
    if (import.meta.env.DEV && !import.meta.env.VITE_USE_REAL_API) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return;
    }
    
    // Implementação real
    await api.post('/auth/reset-password', data);
  },
  
  // Verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('auth_token') !== null;
  },
  
  // Obter o papel/função do usuário (client, barber, admin)
  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  },
  
  // Logout
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    
    // Redirecionar para a página de login
    window.location.href = '/login';
  }
};

export default authService; 