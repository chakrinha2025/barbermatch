import { apiService } from './api.service';

// Interfaces
export interface Barber {
  id: string;
  name: string;
  email: string;
  photo?: string;
  phone?: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  barbershop?: {
    id: string;
    name: string;
    address: string;
    city: string;
    state: string;
  };
  services?: Service[];
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export interface BarberFilters {
  search?: string;
  service?: string;
  city?: string;
  maxDistance?: number;
  minRating?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

export interface BarberAvailability {
  date: string;
  availableSlots: string[];
}

// Serviço para gerenciar barbeiros
class BarberService {
  /**
   * Busca barbeiros com base em filtros
   * @param filters Filtros de busca
   * @returns Lista de barbeiros
   */
  async getBarbers(filters: BarberFilters = {}): Promise<Barber[]> {
    try {
      const response = await apiService.get('/barbers', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar barbeiros:', error);
      throw error;
    }
  }

  /**
   * Busca um barbeiro pelo ID
   * @param id ID do barbeiro
   * @returns Dados do barbeiro
   */
  async getBarberById(id: string): Promise<Barber> {
    try {
      const response = await apiService.get(`/barbers/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar barbeiro ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Busca os serviços oferecidos por um barbeiro
   * @param barberId ID do barbeiro
   * @returns Lista de serviços
   */
  async getBarberServices(barberId: string): Promise<Service[]> {
    try {
      const response = await apiService.get(`/barbers/${barberId}/services`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar serviços do barbeiro ID ${barberId}:`, error);
      throw error;
    }
  }

  /**
   * Verifica a disponibilidade de horários de um barbeiro
   * @param barberId ID do barbeiro
   * @param date Data no formato YYYY-MM-DD
   * @returns Horários disponíveis
   */
  async getBarberAvailability(barberId: string, date: string): Promise<BarberAvailability> {
    try {
      const response = await apiService.get(`/barbers/${barberId}/availability`, {
        params: { date }
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar disponibilidade do barbeiro ID ${barberId}:`, error);
      throw error;
    }
  }

  /**
   * Busca avaliações de um barbeiro
   * @param barberId ID do barbeiro
   * @param page Página atual
   * @param limit Limite de avaliações por página
   * @returns Lista de avaliações
   */
  async getBarberReviews(barberId: string, page = 1, limit = 10) {
    try {
      const response = await apiService.get(`/barbers/${barberId}/reviews`, {
        params: { page, limit }
      });
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar avaliações do barbeiro ID ${barberId}:`, error);
      throw error;
    }
  }

  /**
   * Adiciona uma avaliação para um barbeiro
   * @param barberId ID do barbeiro
   * @param data Dados da avaliação
   * @returns Avaliação criada
   */
  async addBarberReview(barberId: string, data: { rating: number; comment: string }) {
    try {
      const response = await apiService.post(`/barbers/${barberId}/reviews`, data);
      return response.data;
    } catch (error) {
      console.error(`Erro ao adicionar avaliação para o barbeiro ID ${barberId}:`, error);
      throw error;
    }
  }

  /**
   * Busca barbeiros próximos com base na localização do usuário
   * @param lat Latitude
   * @param lng Longitude
   * @param radius Raio de busca em km
   * @returns Lista de barbeiros próximos
   */
  async getNearbyBarbers(lat: number, lng: number, radius = 10): Promise<Barber[]> {
    try {
      const response = await apiService.get('/barbers/nearby', {
        params: { lat, lng, radius }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar barbeiros próximos:', error);
      throw error;
    }
  }

  /**
   * Busca categorias de serviços disponíveis
   * @returns Lista de categorias
   */
  async getServiceCategories() {
    try {
      const response = await apiService.get('/services/categories');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar categorias de serviços:', error);
      throw error;
    }
  }
}

export const barberService = new BarberService(); 