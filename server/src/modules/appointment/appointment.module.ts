import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { BarberModule } from '../barber/barber.module';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [SupabaseModule, BarberModule, ClientModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService]
})
export class AppointmentModule {} 