import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os agendamentos' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'date', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'barbershopId', required: false, type: String })
  async findAll(
    @Request() req,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('date') date?: string,
    @Query('status') status?: string,
    @Query('barbershopId') barbershopId?: string,
  ) {
    const filters = {};
    if (date) filters['date'] = date;
    if (status) filters['status'] = status;
    if (barbershopId) filters['barbershopId'] = barbershopId;
    
    return this.appointmentService.findAll(
      page, 
      limit, 
      filters, 
      req.user.id,
      req.user.role
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter um agendamento pelo ID' })
  async findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }
  
  @Get('barber/:barberId/availability')
  @ApiOperation({ summary: 'Obter disponibilidade de horários de um barbeiro' })
  @ApiQuery({ name: 'date', required: true, type: String })
  async getBarberAvailability(
    @Param('barberId') barberId: string,
    @Query('date') date: string,
  ) {
    return this.appointmentService.getBarberAvailability(barberId, date);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo agendamento' })
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um agendamento' })
  async update(
    @Param('id') id: string, 
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'client', 'barber', 'barbershop_owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover um agendamento' })
  async remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
} 