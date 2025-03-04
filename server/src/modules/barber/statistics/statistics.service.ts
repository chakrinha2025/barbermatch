import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class StatisticsService {
  constructor(private supabaseService: SupabaseService) {}
  
  // TODO: Implementar os métodos para estatísticas
} 