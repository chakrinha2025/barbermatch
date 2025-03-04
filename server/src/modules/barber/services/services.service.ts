import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private supabaseService: SupabaseService) {}

  /**
   * Obter todos os serviços do barbeiro ou todos os serviços se barberId for null
   */
  async getAllServices(
    barberId: string | null,
    filters: { category?: string; popular?: boolean } = {}
  ) {
    try {
      // Iniciar query
      let query = this.supabaseService.client
        .from('services')
        .select('*');

      // Aplicar filtros
      if (barberId) {
        query = query.eq('barber_id', barberId);
      }

      if (filters.category) {
        query = query.eq('category', filters.category);
      }

      if (filters.popular) {
        query = query.eq('popular', true);
      }

      // Executar query
      const { data, error } = await query.order('name', { ascending: true });

      if (error) {
        throw new BadRequestException('Falha ao buscar serviços');
      }

      return data || [];
    } catch (error) {
      throw new BadRequestException('Falha ao buscar serviços');
    }
  }

  /**
   * Obter detalhes de um serviço por ID
   */
  async getServiceById(id: number) {
    try {
      const { data, error } = await this.supabaseService.client
        .from('services')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        throw new NotFoundException('Serviço não encontrado');
      }

      return data;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Falha ao buscar serviço');
    }
  }

  /**
   * Criar um novo serviço
   */
  async createService(createDto: CreateServiceDto & { barberId: string }) {
    try {
      // Verificar se o barbeiro existe
      const { data: barber, error: barberError } = await this.supabaseService.client
        .from('barbers')
        .select('id')
        .eq('id', createDto.barberId)
        .single();

      if (barberError || !barber) {
        throw new BadRequestException('Barbeiro não encontrado');
      }

      // Criar serviço
      const { data, error } = await this.supabaseService.client
        .from('services')
        .insert({
          name: createDto.name,
          description: createDto.description,
          price: createDto.price,
          duration: createDto.duration,
          category: createDto.category,
          popular: createDto.popular || false,
          barber_id: createDto.barberId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error || !data) {
        throw new BadRequestException('Falha ao criar serviço');
      }

      return data;
    } catch (error) {
      throw new BadRequestException('Falha ao criar serviço');
    }
  }

  /**
   * Atualizar um serviço existente
   */
  async updateService(id: number, updateDto: UpdateServiceDto) {
    try {
      // Verificar se o serviço existe
      const { data: existingService, error: checkError } = await this.supabaseService.client
        .from('services')
        .select('id')
        .eq('id', id)
        .single();

      if (checkError || !existingService) {
        throw new NotFoundException('Serviço não encontrado');
      }

      // Atualizar serviço
      const { data, error } = await this.supabaseService.client
        .from('services')
        .update({
          name: updateDto.name,
          description: updateDto.description,
          price: updateDto.price,
          duration: updateDto.duration,
          category: updateDto.category,
          popular: updateDto.popular,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error || !data) {
        throw new BadRequestException('Falha ao atualizar serviço');
      }

      return data;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Falha ao atualizar serviço');
    }
  }

  /**
   * Excluir um serviço
   */
  async deleteService(id: number) {
    try {
      // Verificar se o serviço existe
      const { data: existingService, error: checkError } = await this.supabaseService.client
        .from('services')
        .select('id')
        .eq('id', id)
        .single();

      if (checkError || !existingService) {
        throw new NotFoundException('Serviço não encontrado');
      }

      // Excluir serviço
      const { error } = await this.supabaseService.client
        .from('services')
        .delete()
        .eq('id', id);

      if (error) {
        throw new BadRequestException('Falha ao excluir serviço');
      }

      return { success: true, message: 'Serviço excluído com sucesso' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Falha ao excluir serviço');
    }
  }

  /**
   * Alternar status de popular de um serviço
   */
  async togglePopular(id: number, popular: boolean) {
    try {
      // Verificar se o serviço existe
      const { data: existingService, error: checkError } = await this.supabaseService.client
        .from('services')
        .select('id, popular')
        .eq('id', id)
        .single();

      if (checkError || !existingService) {
        throw new NotFoundException('Serviço não encontrado');
      }

      // Atualizar status de popular
      const { data, error } = await this.supabaseService.client
        .from('services')
        .update({
          popular,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error || !data) {
        throw new BadRequestException('Falha ao atualizar status de popular');
      }

      return data;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Falha ao atualizar status de popular');
    }
  }
} 