import { Module } from '@nestjs/common';
import { BarberController } from './barber.controller';
import { BarberService } from './barber.service';
import { ServicesService } from './services/services.service'; 
import { ServicesController } from './services/services.controller';
import { AppointmentsService } from './appointments/appointments.service';
import { AppointmentsController } from './appointments/appointments.controller';
import { ClientsService } from './clients/clients.service';
import { ClientsController } from './clients/clients.controller';
import { StatisticsService } from './statistics/statistics.service';
import { StatisticsController } from './statistics/statistics.controller';

@Module({
  controllers: [
    BarberController,
    ServicesController,
    AppointmentsController,
    ClientsController,
    StatisticsController
  ],
  providers: [
    BarberService,
    ServicesService,
    AppointmentsService,
    ClientsService,
    StatisticsService
  ],
  exports: [
    BarberService
  ]
})
export class BarberModule {} 