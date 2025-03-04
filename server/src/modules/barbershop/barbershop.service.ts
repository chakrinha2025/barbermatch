import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class BarbershopService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async findAll(page = 1, limit = 10, filters = {}) {
    const { from, to } = this.getPagination(page, limit);
    
    let query = this.supabaseService.client
      .from('barbershops')
      .select('*', { count: 'exact' });
    
    // Aplicar filtros se houver
    if (filters['name']) {
      query = query.ilike('name', `%${filters['name']}%`);
    }
    
    if (filters['city']) {
      query = query.eq('city', filters['city']);
    }
    
    const { data, error, count } = await query
      .range(from, to)
      .order('created_at', { ascending: false });
    
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
      .from('barbershops')
      .select(`
        *,
        barbers(*)
      `)
      .eq('id', id)
      .single();
    
    if (error || !data) throw new NotFoundException(`Barbearia com id ${id} não encontrada`);
    
    return data;
  }

  async create(data) {
    const { data: barbershop, error } = await this.supabaseService.client
      .from('barbershops')
      .insert([data])
      .select()
      .single();
    
    if (error) throw new BadRequestException(error.message);
    
    return barbershop;
  }

  async update(id: string, data) {
    const { data: barbershop, error } = await this.supabaseService.client
      .from('barbershops')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new BadRequestException(error.message);
    if (!barbershop) throw new NotFoundException(`Barbearia com id ${id} não encontrada`);
    
    return barbershop;
  }

  async remove(id: string) {
    const { error } = await this.supabaseService.client
      .from('barbershops')
      .delete()
      .eq('id', id);
    
    if (error) throw new BadRequestException(error.message);
    
    return { message: 'Barbearia removida com sucesso' };
  }

  // Funções utilitárias
  private getPagination(page: number, limit: number) {
    const from = (page - 1) * limit;
    const to = page * limit - 1;
    return { from, to };
  }
} 