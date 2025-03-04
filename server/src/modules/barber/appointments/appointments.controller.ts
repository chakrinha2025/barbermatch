import { Controller } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Agendamentos')
@Controller('barber/appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}
  
  // TODO: Implementar os endpoints para gerenciamento de agendamentos
} 