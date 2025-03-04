import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'sonner';

// Classes de erros personalizados
export class ApiError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = 'Você precisa estar logado para acessar este recurso') {
    super(message, 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends ApiError {
  constructor(message = 'Você não tem permissão para acessar este recurso') {
    super(message, 403);
    this.name = 'AuthorizationError';
  }
}

// Classe principal do serviço de API
class ApiService {
  private api: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Interceptor para adicionar token de autenticação
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Interceptor para tratar erros de resposta
    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        // Verificar se é erro de autenticação (401)
        if (error.response?.status === 401) {
          if (error.config?.url === '/auth/refresh') {
            // Se o erro vier do próprio refresh, deslogar o usuário
            this.logout();
            return Promise.reject(new AuthenticationError('Sua sessão expirou. Por favor, faça login novamente.'));
          }
          
          // Tentar renovar o token
          try {
            const originalRequest = error.config!;
            
            // Se já estiver renovando, adiciona à fila de espera
            if (this.isRefreshing) {
              return new Promise((resolve) => {
                this.refreshSubscribers.push((token: string) => {
                  originalRequest.headers!['Authorization'] = `Bearer ${token}`;
                  resolve(this.api(originalRequest));
                });
              });
            }
            
            this.isRefreshing = true;
            
            // Chamar API para renovar token
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await this.api.post('/auth/refresh', { refreshToken });
            
            const { token, refreshToken: newRefreshToken } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', newRefreshToken);
            
            // Atualizar o token em todas as requisições pendentes
            this.refreshSubscribers.forEach((callback) => callback(token));
            this.refreshSubscribers = [];
            
            // Refazer a requisição original com o novo token
            originalRequest.headers!['Authorization'] = `Bearer ${token}`;
            
            this.isRefreshing = false;
            return this.api(originalRequest);
          } catch (refreshError) {
            this.isRefreshing = false;
            this.logout();
            return Promise.reject(new AuthenticationError('Sua sessão expirou. Por favor, faça login novamente.'));
          }
        }
        
        // Verificar se é erro de autorização (403)
        if (error.response?.status === 403) {
          return Promise.reject(new AuthorizationError());
        }
        
        // Outros erros da API
        if (error.response) {
          const message = error.response.data?.message || 'Ocorreu um erro na requisição';
          return Promise.reject(new ApiError(message, error.response.status));
        }
        
        // Erros de rede ou cancelamento
        return Promise.reject(error);
      }
    );
  }

  // Método para fazer login
  async login(email: string, password: string) {
    try {
      const response = await this.api.post('/auth/login', { email, password });
      const { token, refreshToken, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      
      return user;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Método para fazer registro
  async register(userData: any) {
    try {
      const response = await this.api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Método para fazer logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Redirecionar para a página de login
    window.location.href = '/login';
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Método para obter o usuário logado
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Métodos genéricos para requisições
  async get<T>(url: string, params?: any) {
    try {
      const response = await this.api.get<T>(url, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async post<T>(url: string, data?: any) {
    try {
      const response = await this.api.post<T>(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async put<T>(url: string, data?: any) {
    try {
      const response = await this.api.put<T>(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async patch<T>(url: string, data?: any) {
    try {
      const response = await this.api.patch<T>(url, data);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async delete<T>(url: string) {
    try {
      const response = await this.api.delete<T>(url);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Manipulador de erros
  private handleError(error: any) {
    if (error instanceof ApiError) {
      toast.error(error.message);
    } else if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Ocorreu um erro na requisição';
      toast.error(message);
    } else {
      toast.error('Ocorreu um erro inesperado');
      console.error(error);
    }
  }
}

// Exportar uma instância única
export const apiService = new ApiService(); 