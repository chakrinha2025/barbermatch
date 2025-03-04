import { Module } from '@nestjs/common';
import { BarbershopController } from './barbershop.controller';
import { BarbershopService } from './barbershop.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [BarbershopController],
  providers: [BarbershopService],
  exports: [BarbershopService]
})
export class BarbershopModule {} 