import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateBarberProfileDto } from './dto/update-barber-profile.dto';

@Injectable()
export class BarberService {
  constructor(private supabaseService: SupabaseService) {}

  /**
   * Obtém o perfil de um barbeiro
   */
  async getBarberProfile(barberId: string) {
    try {
      const { data, error } = await this.supabaseService.client
        .from('barbers')
        .select(`
          id, name, phone, email, address, description,
          user_id, logo, website, social_media,
          opening_hours, gallery
        `)
        .eq('id', barberId)
        .single();

      if (error || !data) {
        throw new NotFoundException('Barbeiro não encontrado');
      }

      return data;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Falha ao buscar perfil do barbeiro');
    }
  }

  /**
   * Atualiza o perfil de um barbeiro
   */
  async updateBarberProfile(barberId: string, updateDto: UpdateBarberProfileDto) {
    try {
      // Verificar se o barbeiro existe
      const { data: existingBarber, error: checkError } = await this.supabaseService.client
        .from('barbers')
        .select('id')
        .eq('id', barberId)
        .single();

      if (checkError || !existingBarber) {
        throw new NotFoundException('Barbeiro não encontrado');
      }

      // Atualizar dados do barbeiro
      const { data, error } = await this.supabaseService.client
        .from('barbers')
        .update({
          name: updateDto.name,
          phone: updateDto.phone,
          email: updateDto.email,
          address: updateDto.address,
          description: updateDto.description,
          logo: updateDto.logo,
          website: updateDto.website,
          social_media: updateDto.socialMedia,
          opening_hours: updateDto.openingHours,
          updated_at: new Date().toISOString()
        })
        .eq('id', barberId)
        .select()
        .single();

      if (error || !data) {
        throw new BadRequestException('Falha ao atualizar perfil do barbeiro');
      }

      return data;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Falha ao atualizar perfil do barbeiro');
    }
  }

  /**
   * Adiciona imagem à galeria do barbeiro
   */
  async addGalleryImage(barberId: string, imageUrl: string) {
    try {
      // Buscar barbeiro e sua galeria atual
      const { data: barber, error: fetchError } = await this.supabaseService.client
        .from('barbers')
        .select('gallery')
        .eq('id', barberId)
        .single();

      if (fetchError || !barber) {
        throw new NotFoundException('Barbeiro não encontrado');
      }

      // Preparar galeria atualizada
      const gallery = barber.gallery || [];
      gallery.push({
        url: imageUrl,
        added_at: new Date().toISOString()
      });

      // Atualizar galeria
      const { error: updateError } = await this.supabaseService.client
        .from('barbers')
        .update({ gallery })
        .eq('id', barberId);

      if (updateError) {
        throw new BadRequestException('Falha ao adicionar imagem à galeria');
      }

      return { success: true, gallery };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Falha ao adicionar imagem à galeria');
    }
  }

  /**
   * Remove imagem da galeria do barbeiro
   */
  async removeGalleryImage(barberId: string, imageIndex: number) {
    try {
      // Buscar barbeiro e sua galeria atual
      const { data: barber, error: fetchError } = await this.supabaseService.client
        .from('barbers')
        .select('gallery')
        .eq('id', barberId)
        .single();

      if (fetchError || !barber) {
        throw new NotFoundException('Barbeiro não encontrado');
      }

      const gallery = barber.gallery || [];
      
      // Verificar se o índice é válido
      if (imageIndex < 0 || imageIndex >= gallery.length) {
        throw new BadRequestException('Índice de imagem inválido');
      }

      // Remover imagem da galeria
      gallery.splice(imageIndex, 1);

      // Atualizar galeria
      const { error: updateError } = await this.supabaseService.client
        .from('barbers')
        .update({ gallery })
        .eq('id', barberId);

      if (updateError) {
        throw new BadRequestException('Falha ao remover imagem da galeria');
      }

      return { success: true, gallery };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Falha ao remover imagem da galeria');
    }
  }

  /**
   * Atualiza o horário de funcionamento do barbeiro
   */
  async updateOpeningHours(barberId: string, openingHours: Record<string, { open: string; close: string }>) {
    try {
      const { data, error } = await this.supabaseService.client
        .from('barbers')
        .update({ 
          opening_hours: openingHours,
          updated_at: new Date().toISOString()
        })
        .eq('id', barberId)
        .select('opening_hours')
        .single();

      if (error || !data) {
        throw new BadRequestException('Falha ao atualizar horário de funcionamento');
      }

      return data;
    } catch (error) {
      throw new BadRequestException('Falha ao atualizar horário de funcionamento');
    }
  }
} 