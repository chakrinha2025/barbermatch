// Configuração básica da API

import axios from 'axios';

// Obter a URL base da API do ambiente ou usar um valor padrão
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Criar instância do axios com configurações padrão
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador para adicionar token de autenticação
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptador para tratamento de erros
api.interceptors.response.use(
  response => response,
  error => {
    // Se o erro for 401 (não autorizado), redirecionar para login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 