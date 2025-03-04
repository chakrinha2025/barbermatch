import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BarbershopService } from './barbershop.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('barbershops')
@Controller('barbershops')
export class BarbershopController {
  constructor(private readonly barbershopService: BarbershopService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas as barbearias' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('name') name?: string,
    @Query('city') city?: string,
  ) {
    const filters = {};
    if (name) filters['name'] = name;
    if (city) filters['city'] = city;
    
    return this.barbershopService.findAll(page, limit, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma barbearia pelo ID' })
  async findOne(@Param('id') id: string) {
    return this.barbershopService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'barbershop_owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar uma nova barbearia' })
  async create(@Body() createBarbershopDto) {
    return this.barbershopService.create(createBarbershopDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'barbershop_owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar uma barbearia' })
  async update(@Param('id') id: string, @Body() updateBarbershopDto) {
    return this.barbershopService.update(id, updateBarbershopDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'barbershop_owner')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover uma barbearia' })
  async remove(@Param('id') id: string) {
    return this.barbershopService.remove(id);
  }
} 