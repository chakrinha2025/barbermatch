
import { apiService } from './api.service';

export interface AppointmentForm {
  date: string;
  time: string;
  duration: number;
  barber_id: string;
  service_id: string;
  barbershop_id?: string;
  notes?: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  duration: number;
  client_id: string;
  barber_id: string;
  service_id: string;
  barbershop_id?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  price?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
  barber?: {
    id: string;
    name: string;
    photo?: string;
    phone?: string;
    barbershop?: {
      id: string;
      name: string;
      address: string;
    }
  };
  client?: any;
  service?: {
    id: string;
    name: string;
    price: number;
    duration: number;
  };
  // Client UI properties
  barberName?: string;
  barberShopName?: string;
  barberPhone?: string;
  address?: string;
  barberImage?: string;
}

export interface BarberAvailability {
  date: string;
  availableSlots: string[];
  occupiedSlots: string[];
}

class AppointmentService {
  // Obter todos os agendamentos (com filtros opcionais)
  async getAppointments(params?: {
    page?: number;
    limit?: number;
    date?: string;
    status?: string;
    barbershopId?: string;
  }) {
    return apiService.get<{ data: Appointment[], meta: any }>('/appointments', params);
  }

  // Obter um agendamento específico pelo ID
  async getAppointment(id: string) {
    return apiService.get<Appointment>(`/appointments/${id}`);
  }

  // Obter disponibilidade de um barbeiro
  async getBarberAvailability(barberId: string, date: string) {
    return apiService.get<BarberAvailability>(`/appointments/barber/${barberId}/availability`, { date });
  }

  // Criar um novo agendamento
  async createAppointment(appointmentData: AppointmentForm) {
    return apiService.post<Appointment>('/appointments', appointmentData);
  }

  // Atualizar um agendamento existente
  async updateAppointment(id: string, appointmentData: Partial<AppointmentForm>) {
    return apiService.patch<Appointment>(`/appointments/${id}`, appointmentData);
  }

  // Cancelar um agendamento
  async cancelAppointment(id: string) {
    return apiService.patch<Appointment>(`/appointments/${id}`, { status: 'cancelled' });
  }

  // Confirmar um agendamento
  async confirmAppointment(id: string) {
    return apiService.patch<Appointment>(`/appointments/${id}`, { status: 'confirmed' });
  }

  // Marcar um agendamento como concluído
  async completeAppointment(id: string) {
    return apiService.patch<Appointment>(`/appointments/${id}`, { status: 'completed' });
  }

  // Marcar um agendamento como falta (no-show)
  async markAsNoShow(id: string) {
    return apiService.patch<Appointment>(`/appointments/${id}`, { status: 'no_show' });
  }

  // Excluir um agendamento
  async deleteAppointment(id: string) {
    return apiService.delete(`/appointments/${id}`);
  }
}

export const appointmentService = new AppointmentService();
