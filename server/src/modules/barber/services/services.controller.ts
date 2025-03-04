import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@ApiTags('Serviços')
@Controller('barber/services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter todos os serviços do barbeiro' })
  @ApiResponse({ status: 200, description: 'Lista de serviços obtida com sucesso' })
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por categoria' })
  @ApiQuery({ name: 'popular', required: false, description: 'Filtrar serviços populares' })
  async getAllServices(
    @Request() req: any,
    @Query('category') category?: string,
    @Query('popular') popular?: string
  ) {
    // Se o usuário for barbeiro, só pode ver seus próprios serviços
    const barberId = req.user.role === 'barber' ? req.user.barberId : null;
    
    return this.servicesService.getAllServices(
      barberId, 
      { category, popular: popular === 'true' }
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter detalhes de um serviço' })
  @ApiResponse({ status: 200, description: 'Serviço obtido com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async getServiceById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any
  ) {
    const service = await this.servicesService.getServiceById(id);
    
    // Se o usuário for barbeiro, só pode ver seus próprios serviços
    if (req.user.role === 'barber' && service.barberId !== req.user.barberId) {
      throw new BadRequestException('Você só pode ver seus próprios serviços');
    }
    
    return service;
  }

  @Post()
  @Roles('barber', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar um novo serviço' })
  @ApiResponse({ status: 201, description: 'Serviço criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async createService(
    @Body() createDto: CreateServiceDto,
    @Request() req: any
  ) {
    // Se o usuário for barbeiro, só pode criar serviços para si mesmo
    const barberId = req.user.role === 'barber' ? req.user.barberId : createDto.barberId;
    
    if (req.user.role === 'barber' && createDto.barberId && createDto.barberId !== req.user.barberId) {
      throw new BadRequestException('Você só pode criar serviços para si mesmo');
    }
    
    return this.servicesService.createService({ ...createDto, barberId });
  }

  @Put(':id')
  @Roles('barber', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar um serviço' })
  @ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateServiceDto,
    @Request() req: any
  ) {
    // Verificar se o serviço pertence ao barbeiro
    if (req.user.role === 'barber') {
      const service = await this.servicesService.getServiceById(id);
      if (service.barberId !== req.user.barberId) {
        throw new BadRequestException('Você só pode atualizar seus próprios serviços');
      }
    }
    
    return this.servicesService.updateService(id, updateDto);
  }

  @Delete(':id')
  @Roles('barber', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Excluir um serviço' })
  @ApiResponse({ status: 200, description: 'Serviço excluído com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async deleteService(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any
  ) {
    // Verificar se o serviço pertence ao barbeiro
    if (req.user.role === 'barber') {
      const service = await this.servicesService.getServiceById(id);
      if (service.barberId !== req.user.barberId) {
        throw new BadRequestException('Você só pode excluir seus próprios serviços');
      }
    }
    
    return this.servicesService.deleteService(id);
  }

  @Put(':id/toggle-popular')
  @Roles('barber', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Alternar status de popular de um serviço' })
  @ApiResponse({ status: 200, description: 'Status alterado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  async togglePopular(
    @Param('id', ParseIntPipe) id: number,
    @Body('popular') popular: boolean,
    @Request() req: any
  ) {
    // Verificar se o serviço pertence ao barbeiro
    if (req.user.role === 'barber') {
      const service = await this.servicesService.getServiceById(id);
      if (service.barberId !== req.user.barberId) {
        throw new BadRequestException('Você só pode modificar seus próprios serviços');
      }
    }
    
    return this.servicesService.togglePopular(id, popular);
  }
} 