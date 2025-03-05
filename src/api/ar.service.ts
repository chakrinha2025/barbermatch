import { supabase, 
  getAllHairstyles as fetchAllHairstyles,
  getHairstylesByCategory as fetchHairstylesByCategory,
  getHairstylesByFaceShape as fetchHairstylesByFaceShape,
  getTrendingHairstyles as fetchTrendingHairstyles, 
  incrementHairstylePopularity as updateHairstylePopularity,
  saveVirtualTryOn as createVirtualTryOn,
  getClientVirtualTryOns as fetchClientVirtualTryOns,
  updateTryOnFeedback as updateVirtualTryOnFeedback,
  updateClientFaceShape as updateClientFaceData,
  uploadTryOnImage as uploadImage
} from './supabase-client';

import { Tables } from '@/types/supabase';

export type Hairstyle = Tables<'hairstyles'>;
export type VirtualTryOn = Omit<Tables<'virtual_try_ons'>, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;
  created_at?: string;
};

class ARService {
  /**
   * Busca todos os estilos de corte/barba disponíveis
   */
  async getAllHairstyles(): Promise<Hairstyle[]> {
    try {
      const { data, error } = await fetchAllHairstyles();
      
      if (error) {
        console.error('Erro ao buscar estilos:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Erro no serviço de AR ao buscar estilos:', error);
      return [];
    }
  }

  /**
   * Busca estilos compatíveis com o formato de rosto específico
   */
  async getHairstylesByFaceShape(faceShape: string): Promise<Hairstyle[]> {
    try {
      const { data, error } = await fetchHairstylesByFaceShape(faceShape);
      
      if (error) {
        console.error('Erro ao buscar estilos por formato de rosto:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Erro no serviço de AR ao buscar estilos por formato de rosto:', error);
      return [];
    }
  }

  /**
   * Busca estilos por categoria (corte ou barba)
   */
  async getHairstylesByCategory(category: string): Promise<Hairstyle[]> {
    try {
      const { data, error } = await fetchHairstylesByCategory(category);
      
      if (error) {
        console.error('Erro ao buscar estilos por categoria:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Erro no serviço de AR ao buscar estilos por categoria:', error);
      return [];
    }
  }

  /**
   * Busca estilos em tendência
   */
  async getTrendingHairstyles(limit = 5): Promise<Hairstyle[]> {
    try {
      const { data, error } = await fetchTrendingHairstyles(limit);
      
      if (error) {
        console.error('Erro ao buscar estilos em tendência:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Erro no serviço de AR ao buscar tendências:', error);
      return [];
    }
  }

  /**
   * Busca um estilo específico pelo ID
   */
  async getHairstyleById(id: string): Promise<Hairstyle | null> {
    try {
      const { data, error } = await supabase
        .from('hairstyles')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Erro ao buscar estilo por ID:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Erro no serviço de AR ao buscar estilo por ID:', error);
      return null;
    }
  }

  /**
   * Salva uma experimentação virtual
   */
  async saveVirtualTryOn(tryOn: VirtualTryOn): Promise<string> {
    try {
      const { data, error } = await createVirtualTryOn(tryOn);
      
      if (error) {
        console.error('Erro ao salvar experimentação virtual:', error);
        throw new Error('Não foi possível salvar a experimentação');
      }
      
      return data.id;
    } catch (error) {
      console.error('Erro no serviço de AR ao salvar experimentação:', error);
      throw error;
    }
  }

  /**
   * Busca as experimentações virtuais salvas de um cliente
   */
  async getClientVirtualTryOns(clientId: string): Promise<any[]> {
    try {
      const { data, error } = await fetchClientVirtualTryOns(clientId);
      
      if (error) {
        console.error('Erro ao buscar experimentações do cliente:', error);
        return [];
      }
      
      return data || [];
    } catch (error) {
      console.error('Erro no serviço de AR ao buscar experimentações:', error);
      return [];
    }
  }

  /**
   * Atualiza o feedback de uma experimentação (gostou/não gostou)
   */
  async updateTryOnFeedback(tryOnId: string, feedback: 'liked' | 'disliked' | 'neutral'): Promise<void> {
    try {
      const { error } = await updateVirtualTryOnFeedback(tryOnId, feedback);
      
      if (error) {
        console.error('Erro ao atualizar feedback:', error);
        throw new Error('Não foi possível atualizar o feedback');
      }
    } catch (error) {
      console.error('Erro no serviço de AR ao atualizar feedback:', error);
      throw error;
    }
  }

  /**
   * Alterna o estado de salvamento de uma experimentação
   */
  async toggleSaveTryOn(tryOnId: string, isSaved: boolean): Promise<void> {
    try {
      const { error } = await supabase
        .from('virtual_try_ons')
        .update({ is_saved: isSaved })
        .eq('id', tryOnId);
      
      if (error) {
        console.error('Erro ao alternar salvamento:', error);
        throw new Error('Não foi possível atualizar o status de salvamento');
      }
    } catch (error) {
      console.error('Erro no serviço de AR ao alternar salvamento:', error);
      throw error;
    }
  }

  /**
   * Faz upload de uma imagem de experimentação
   */
  async uploadTryOnImage(clientId: string, imageFile: File): Promise<string> {
    try {
      return await uploadImage(clientId, imageFile);
    } catch (error) {
      console.error('Erro no serviço de AR ao fazer upload de imagem:', error);
      throw error;
    }
  }

  /**
   * Busca análise de tendências
   */
  async getTrendAnalysis(region?: string): Promise<any> {
    try {
      let query = supabase
        .from('ai_trend_analysis')
        .select('*')
        .order('analysis_date', { ascending: false })
        .limit(1);
      
      if (region) {
        query = query.eq('region', region);
      }
      
      const { data, error } = await query.single();
      
      if (error) {
        console.error('Erro ao buscar análise de tendências:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Erro no serviço de AR ao buscar análise de tendências:', error);
      return null;
    }
  }

  /**
   * Incrementa a popularidade de um estilo
   */
  async incrementHairstylePopularity(hairstyleId: string): Promise<void> {
    try {
      const { error } = await updateHairstylePopularity(hairstyleId);
      
      if (error) {
        console.error('Erro ao incrementar popularidade:', error);
      }
    } catch (error) {
      console.error('Erro no serviço de AR ao incrementar popularidade:', error);
    }
  }
}

export const arService = new ARService(); 