import { Controller } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Estatísticas')
@Controller('barber/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}
  
  // TODO: Implementar os endpoints para estatísticas
} 