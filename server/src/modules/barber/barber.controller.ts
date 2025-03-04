import { Controller, Get, Put, Post, Delete, Body, Param, UseGuards, Request, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { BarberService } from './barber.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateBarberProfileDto } from './dto/update-barber-profile.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Barbeiros')
@Controller('barbers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BarberController {
  constructor(private readonly barberService: BarberService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Obter perfil do barbeiro' })
  @ApiResponse({ status: 200, description: 'Perfil obtido com sucesso' })
  @ApiResponse({ status: 404, description: 'Barbeiro não encontrado' })
  async getBarberProfile(@Param('id') barberId: string) {
    return this.barberService.getBarberProfile(barberId);
  }

  @Put(':id')
  @Roles('barber', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar perfil do barbeiro' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Barbeiro não encontrado' })
  async updateBarberProfile(
    @Param('id') barberId: string,
    @Body() updateDto: UpdateBarberProfileDto,
    @Request() req: any
  ) {
    // Verificar se o barbeiro está tentando atualizar seu próprio perfil
    if (req.user.role === 'barber' && req.user.barberId !== barberId && req.user.role !== 'admin') {
      throw new BadRequestException('Você só pode atualizar seu próprio perfil');
    }

    return this.barberService.updateBarberProfile(barberId, updateDto);
  }

  @Post(':id/gallery')
  @Roles('barber', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Adicionar imagem à galeria' })
  @ApiResponse({ status: 201, description: 'Imagem adicionada com sucesso' })
  @ApiResponse({ status: 400, description: 'Falha ao adicionar imagem' })
  @ApiResponse({ status: 404, description: 'Barbeiro não encontrado' })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async addGalleryImage(
    @Param('id') barberId: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: any
  ) {
    // Verificar se o barbeiro está atualizando seu próprio perfil
    if (req.user.role === 'barber' && req.user.barberId !== barberId && req.user.role !== 'admin') {
      throw new BadRequestException('Você só pode adicionar imagens à sua própria galeria');
    }

    // Lógica para upload de imagem seria implementada aqui
    // Por enquanto, simular URL de imagem
    const imageUrl = `https://example.com/images/${file.originalname}`;
    
    return this.barberService.addGalleryImage(barberId, imageUrl);
  }

  @Delete(':id/gallery/:imageIndex')
  @Roles('barber', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Remover imagem da galeria' })
  @ApiResponse({ status: 200, description: 'Imagem removida com sucesso' })
  @ApiResponse({ status: 400, description: 'Falha ao remover imagem' })
  @ApiResponse({ status: 404, description: 'Barbeiro não encontrado' })
  async removeGalleryImage(
    @Param('id') barberId: string,
    @Param('imageIndex') imageIndex: string,
    @Request() req: any
  ) {
    // Verificar se o barbeiro está atualizando seu próprio perfil
    if (req.user.role === 'barber' && req.user.barberId !== barberId && req.user.role !== 'admin') {
      throw new BadRequestException('Você só pode remover imagens da sua própria galeria');
    }

    return this.barberService.removeGalleryImage(barberId, parseInt(imageIndex, 10));
  }

  @Put(':id/opening-hours')
  @Roles('barber', 'admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar horário de funcionamento' })
  @ApiResponse({ status: 200, description: 'Horário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Falha ao atualizar horário' })
  @ApiResponse({ status: 404, description: 'Barbeiro não encontrado' })
  async updateOpeningHours(
    @Param('id') barberId: string,
    @Body() openingHours: Record<string, { open: string; close: string }>,
    @Request() req: any
  ) {
    // Verificar se o barbeiro está atualizando seu próprio perfil
    if (req.user.role === 'barber' && req.user.barberId !== barberId && req.user.role !== 'admin') {
      throw new BadRequestException('Você só pode atualizar seu próprio horário de funcionamento');
    }

    return this.barberService.updateOpeningHours(barberId, openingHours);
  }
} 