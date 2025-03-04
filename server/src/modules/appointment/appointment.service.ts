import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(
    page: number = 1, 
    limit: number = 10, 
    filters: any = {},
    userId?: string,
    userRole?: string
  ) {
    const { from, to } = this.getPagination(page, limit);
    
    let query = this.supabaseService.client
      .from('appointments')
      .select(`
        *,
        barber:barber_id(*),
        client:client_id(*),
        service:service_id(*)
      `, { count: 'exact' });
    
    // Filtrar por usuário se necessário
    if (userId && userRole) {
      if (userRole === 'barber') {
        query = query.eq('barber_id', userId);
      } else if (userRole === 'client') {
        query = query.eq('client_id', userId);
      }
    }
    
    // Aplicar filtros adicionais
    if (filters.date) {
      query = query.eq('date', filters.date);
    }
    
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.barbershopId) {
      query = query.eq('barbershop_id', filters.barbershopId);
    }
    
    const { data, error, count } = await query
      .range(from, to)
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    
    if (error) throw new BadRequestException(error.message);
    
    return {
      data,
      meta: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit)
      }
    };
  }

  async findOne(id: string) {
    const { data, error } = await this.supabaseService.client
      .from('appointments')
      .select(`
        *,
        barber:barber_id(*),
        client:client_id(*),
        service:service_id(*)
      `)
      .eq('id', id)
      .single();
    
    if (error || !data) throw new NotFoundException(`Agendamento com id ${id} não encontrado`);
    
    return data;
  }

  async create(createAppointmentDto: CreateAppointmentDto) {
    // Verificar disponibilidade do horário
    const isAvailable = await this.checkAvailability(
      createAppointmentDto.barber_id,
      createAppointmentDto.date,
      createAppointmentDto.time
    );
    
    if (!isAvailable) {
      throw new ConflictException('Horário não disponível');
    }
    
    const { data, error } = await this.supabaseService.client
      .from('appointments')
      .insert([createAppointmentDto])
      .select()
      .single();
    
    if (error) throw new BadRequestException(error.message);
    
    return data;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    // Se estiver alterando data/hora, verificar disponibilidade
    if (updateAppointmentDto.date || updateAppointmentDto.time) {
      const appointment = await this.findOne(id);
      
      const isAvailable = await this.checkAvailability(
        updateAppointmentDto.barber_id || appointment.barber_id,
        updateAppointmentDto.date || appointment.date,
        updateAppointmentDto.time || appointment.time,
        id // Excluir o próprio agendamento da verificação
      );
      
      if (!isAvailable) {
        throw new ConflictException('Horário não disponível');
      }
    }
    
    const { data, error } = await this.supabaseService.client
      .from('appointments')
      .update(updateAppointmentDto)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new BadRequestException(error.message);
    if (!data) throw new NotFoundException(`Agendamento com id ${id} não encontrado`);
    
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabaseService.client
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) throw new BadRequestException(error.message);
    
    return { message: 'Agendamento removido com sucesso' };
  }
  
  async getBarberAvailability(barberId: string, date: string) {
    // Obter todos os agendamentos do barbeiro na data especificada
    const { data: appointments, error } = await this.supabaseService.client
      .from('appointments')
      .select('time, duration')
      .eq('barber_id', barberId)
      .eq('date', date)
      .in('status', ['confirmed', 'pending']);
    
    if (error) throw new BadRequestException(error.message);
    
    // Obter horários de trabalho do barbeiro
    const { data: workingHours, error: workingHoursError } = await this.supabaseService.client
      .from('barber_working_hours')
      .select('*')
      .eq('barber_id', barberId)
      .single();
    
    if (workingHoursError && workingHoursError.code !== 'PGRST116') {
      throw new BadRequestException(workingHoursError.message);
    }
    
    // Definir horários padrão se não houver configuração específica
    const startTime = workingHours?.start_time || '09:00';
    const endTime = workingHours?.end_time || '18:00';
    const lunchStart = workingHours?.lunch_start || '12:00';
    const lunchEnd = workingHours?.lunch_end || '13:00';
    const interval = workingHours?.interval_minutes || 30; // intervalo em minutos
    
    // Gerar todos os slots disponíveis
    const availableSlots = this.generateTimeSlots(startTime, endTime, lunchStart, lunchEnd, interval);
    
    // Marcar slots ocupados
    const occupiedSlots = appointments.map(appointment => appointment.time);
    
    // Retornar slots disponíveis e ocupados
    return {
      date,
      availableSlots: availableSlots.filter(slot => !occupiedSlots.includes(slot)),
      occupiedSlots
    };
  }
  
  // Funções auxiliares
  private async checkAvailability(barberId: string, date: string, time: string, excludeId?: string) {
    let query = this.supabaseService.client
      .from('appointments')
      .select('id')
      .eq('barber_id', barberId)
      .eq('date', date)
      .eq('time', time)
      .in('status', ['confirmed', 'pending']);
    
    // Excluir o próprio agendamento se estiver editando
    if (excludeId) {
      query = query.neq('id', excludeId);
    }
    
    const { data, error } = await query;
    
    if (error) throw new BadRequestException(error.message);
    
    // Se não encontrou nenhum agendamento, o horário está disponível
    return data.length === 0;
  }
  
  private generateTimeSlots(
    startTime: string, 
    endTime: string, 
    lunchStart: string, 
    lunchEnd: string, 
    intervalMinutes: number
  ) {
    const slots = [];
    
    let current = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    const lunch1 = new Date(`2000-01-01T${lunchStart}`);
    const lunch2 = new Date(`2000-01-01T${lunchEnd}`);
    
    while (current < end) {
      // Pular horário de almoço
      if (current >= lunch1 && current < lunch2) {
        current = new Date(lunch2);
        continue;
      }
      
      // Adicionar slot no formato HH:MM
      const hours = current.getHours().toString().padStart(2, '0');
      const minutes = current.getMinutes().toString().padStart(2, '0');
      slots.push(`${hours}:${minutes}`);
      
      // Avançar para o próximo slot
      current = new Date(current.getTime() + intervalMinutes * 60000);
    }
    
    return slots;
  }
  
  private getPagination(page: number, limit: number) {
    const from = (page - 1) * limit;
    const to = page * limit - 1;
    return { from, to };
  }
} 