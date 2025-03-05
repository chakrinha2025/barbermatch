
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// Configuração base para o Axios
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

// Serviço de API base
class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Configure interceptors for request and response
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('authToken');
        
        // Add authorization header if token exists
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        // Handle specific error status codes
        if (error.response) {
          const { status } = error.response;
          
          if (status === 401) {
            // Handle unauthorized access (e.g., token expired)
            localStorage.removeItem('authToken');
            // Redirect to login page or show notification
          } else if (status === 403) {
            // Handle forbidden access
            // Show appropriate notification
          } else if (status === 404) {
            // Handle not found
            // Show appropriate notification
          } else if (status === 500) {
            // Handle server error
            // Show appropriate notification
          }
        }
        
        // Add more descriptive error message
        const errorMessage = error.response?.data?.message || 'Ocorreu um erro na requisição';
        console.error('API Error:', errorMessage);
        
        return Promise.reject(error);
      }
    );
  }

  // Generic GET method
  async get<T>(url: string, params?: any): Promise<T> {
    try {
      const config: AxiosRequestConfig = {};
      if (params) {
        config.params = params;
      }
      
      const response: AxiosResponse<T> = await this.api.get(url, config);
      return response.data;
    } catch (error: any) {
      console.error(`GET request to ${url} failed:`, error?.message || error);
      throw error;
    }
  }

  // Generic POST method
  async post<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(url, data);
      return response.data;
    } catch (error: any) {
      console.error(`POST request to ${url} failed:`, error?.message || error);
      throw error;
    }
  }

  // Generic PUT method
  async put<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(url, data);
      return response.data;
    } catch (error: any) {
      console.error(`PUT request to ${url} failed:`, error?.message || error);
      throw error;
    }
  }

  // Generic PATCH method
  async patch<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.patch(url, data);
      return response.data;
    } catch (error: any) {
      console.error(`PATCH request to ${url} failed:`, error?.message || error);
      throw error;
    }
  }

  // Generic DELETE method
  async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(url);
      return response.data;
    } catch (error: any) {
      console.error(`DELETE request to ${url} failed:`, error?.message || error);
      throw error;
    }
  }
}

// Export a singleton instance of ApiService
export const apiService = new ApiService();
