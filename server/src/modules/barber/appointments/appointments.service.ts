import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class AppointmentsService {
  constructor(private supabaseService: SupabaseService) {}
  
  // TODO: Implementar os métodos para gerenciamento de agendamentos
} 