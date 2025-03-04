import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class ClientsService {
  constructor(private supabaseService: SupabaseService) {}
  
  // TODO: Implementar os métodos para gerenciamento de clientes
} 