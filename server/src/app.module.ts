import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { BarberModule } from './modules/barber/barber.module';
import { ClientModule } from './modules/client/client.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { BarbershopModule } from './modules/barbershop/barbershop.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    // Configuração global
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    
    // Módulos da aplicação
    SupabaseModule,
    AuthModule,
    BarberModule,
    ClientModule,
    BarbershopModule,
    AppointmentModule,
  ],
})
export class AppModule {} 