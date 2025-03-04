import { Controller } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Clientes')
@Controller('barber/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}
  
  // TODO: Implementar os endpoints para gerenciamento de clientes
} 