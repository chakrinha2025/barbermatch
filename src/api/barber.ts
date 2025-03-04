// Serviço de barbeiro

import api from './index';

// Interfaces
export interface Appointment {
  id: number;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  service: string;
  serviceId: number;
  date: string;
  time: string;
  duration: number;
  status: 'confirmed' | 'pending' | 'completed' | 'canceled';
  price: number;
  notes?: string;
  clientImage?: string;
}

export interface Client {
  id: number;
  name: string;
  phone: string;
  email?: string;
  lastVisit: string;
  totalVisits: number;
  favoriteService?: string;
  totalSpent: number;
  notes?: string;
  image?: string;
}

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  description: string;
  category: string;
  popular: boolean;
}

export interface BarberStatistics {
  earnings: {
    daily: Array<{ label: string; value: number }>;
    monthly: Array<{ label: string; value: number }>;
    revenueGrowth: Array<{ label: string; value: number }>;
  };
  clients: {
    monthly: Array<{ label: string; value: number }>;
    clientGrowth: Array<{ label: string; value: number }>;
  };
  services: {
    breakdown: Array<{ label: string; value: number }>;
  };
  overview: {
    weekly: {
      earnings: number;
      clients: number;
      services: number;
      avgRating: number;
      growth: number;
      clientGrowth: number;
      serviceGrowth: number;
      avgTicket: number;
      ticketGrowth: number;
      returnRate: number;
      returnRateGrowth: number;
      newClients: number;
      newClientsGrowth: number;
    };
    monthly: {
      earnings: number;
      clients: number;
      services: number;
      avgRating: number;
      growth: number;
      clientGrowth: number;
      serviceGrowth: number;
      avgTicket: number;
      ticketGrowth: number;
      returnRate: number;
      returnRateGrowth: number;
      newClients: number;
      newClientsGrowth: number;
    };
    yearly: {
      earnings: number;
      clients: number;
      services: number;
      avgRating: number;
      growth: number;
      clientGrowth: number;
      serviceGrowth: number;
      avgTicket: number;
      ticketGrowth: number;
      returnRate: number;
      returnRateGrowth: number;
      newClients: number;
      newClientsGrowth: number;
    };
  };
  times: {
    popular: Array<{ label: string; value: number }>;
  };
  ratings: {
    distribution: Array<{ label: string; value: number }>;
  };
}

// Serviço do barbeiro
export const barberService = {
  // Obter agendamentos
  async getAppointments(params: {
    startDate?: string;
    endDate?: string;
    status?: 'confirmed' | 'pending' | 'completed' | 'canceled' | 'all';
  } = {}): Promise<Appointment[]> {
    // Implementação real
    try {
      const response = await api.get('/barber/appointments', { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      throw error;
    }
  },
  
  // Obter detalhes de um agendamento
  async getAppointmentDetails(id: number): Promise<Appointment> {
    try {
      const response = await api.get(`/barber/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do agendamento:', error);
      throw error;
    }
  },
  
  // Confirmar agendamento
  async confirmAppointment(id: number): Promise<void> {
    try {
      await api.post(`/barber/appointments/${id}/confirm`);
    } catch (error) {
      console.error('Erro ao confirmar agendamento:', error);
      throw error;
    }
  },
  
  // Cancelar agendamento
  async cancelAppointment(id: number, reason?: string): Promise<void> {
    try {
      await api.post(`/barber/appointments/${id}/cancel`, { reason });
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error);
      throw error;
    }
  },
  
  // Marcar agendamento como concluído
  async completeAppointment(id: number, notes?: string): Promise<void> {
    try {
      await api.post(`/barber/appointments/${id}/complete`, { notes });
    } catch (error) {
      console.error('Erro ao completar agendamento:', error);
      throw error;
    }
  },
  
  // Obter clientes
  async getClients(params: {
    search?: string;
    sort?: 'name' | 'lastVisit' | 'totalVisits' | 'totalSpent';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  } = {}): Promise<{
    clients: Client[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const response = await api.get('/barber/clients', { params });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  },
  
  // Obter detalhes de um cliente
  async getClientDetails(id: number): Promise<Client> {
    try {
      const response = await api.get(`/barber/clients/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do cliente:', error);
      throw error;
    }
  },
  
  // Atualizar notas de um cliente
  async updateClientNotes(id: number, notes: string): Promise<void> {
    try {
      await api.patch(`/barber/clients/${id}/notes`, { notes });
    } catch (error) {
      console.error('Erro ao atualizar notas do cliente:', error);
      throw error;
    }
  },
  
  // Obter histórico de agendamentos de um cliente
  async getClientAppointmentHistory(id: number): Promise<Appointment[]> {
    try {
      const response = await api.get(`/barber/clients/${id}/appointments`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar histórico de agendamentos do cliente:', error);
      throw error;
    }
  },
  
  // Obter serviços
  async getServices(): Promise<Service[]> {
    try {
      const response = await api.get('/barber/services');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
      throw error;
    }
  },
  
  // Criar novo serviço
  async createService(service: Omit<Service, 'id'>): Promise<Service> {
    try {
      const response = await api.post('/barber/services', service);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      throw error;
    }
  },
  
  // Atualizar serviço
  async updateService(id: number, service: Partial<Omit<Service, 'id'>>): Promise<Service> {
    try {
      const response = await api.patch(`/barber/services/${id}`, service);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar serviço:', error);
      throw error;
    }
  },
  
  // Excluir serviço
  async deleteService(id: number): Promise<void> {
    try {
      await api.delete(`/barber/services/${id}`);
    } catch (error) {
      console.error('Erro ao excluir serviço:', error);
      throw error;
    }
  },
  
  // Atualizar serviço como popular
  async toggleServicePopular(id: number, popular: boolean): Promise<Service> {
    try {
      const response = await api.patch(`/barber/services/${id}/popular`, { popular });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar status popular do serviço:', error);
      throw error;
    }
  },
  
  // Obter estatísticas
  async getStatistics(period: 'week' | 'month' | 'year' = 'month'): Promise<BarberStatistics> {
    try {
      const response = await api.get('/barber/statistics', { params: { period } });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  },
  
  // Atualizar disponibilidade
  async updateAvailability(dates: {
    date: string;
    slots: Array<{
      start: string;
      end: string;
      available: boolean;
    }>;
  }[]): Promise<void> {
    try {
      await api.post('/barber/availability', { dates });
    } catch (error) {
      console.error('Erro ao atualizar disponibilidade:', error);
      throw error;
    }
  },
  
  // Obter disponibilidade para um período
  async getAvailability(startDate: string, endDate: string): Promise<Array<{
    date: string;
    slots: Array<{
      start: string;
      end: string;
      available: boolean;
      booked: boolean;
    }>;
  }>> {
    try {
      const response = await api.get('/barber/availability', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar disponibilidade:', error);
      throw error;
    }
  },
  
  // Obter configurações da barbearia
  async getSettings(): Promise<{
    name: string;
    address: string;
    phone: string;
    email: string;
    openingHours: Record<string, { open: string; close: string }>;
    logo?: string;
    description?: string;
    socialMedia?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
      website?: string;
    };
  }> {
    try {
      const response = await api.get('/barber/settings');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
      throw error;
    }
  },
  
  // Atualizar configurações da barbearia
  async updateSettings(settings: {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    openingHours?: Record<string, { open: string; close: string }>;
    logo?: string;
    description?: string;
    socialMedia?: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
      website?: string;
    };
  }): Promise<void> {
    try {
      await api.patch('/barber/settings', settings);
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      throw error;
    }
  },
  
  // Upload de arquivo/imagem
  async uploadFile(file: File, type: 'logo' | 'profile' | 'gallery'): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);
      
      const response = await api.post('/barber/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer upload de arquivo:', error);
      throw error;
    }
  }
};

export default barberService; 