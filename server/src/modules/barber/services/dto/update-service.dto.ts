import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional, Min, MaxLength, IsEnum } from 'class-validator';
import { ServiceCategory } from './create-service.dto';

export class UpdateServiceDto {
  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Corte Masculino',
    required: false
  })
  @IsString()
  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;

  @ApiProperty({
    description: 'Descrição do serviço',
    example: 'Corte masculino com tesoura e máquina, inclui finalização',
    required: false
  })
  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  description?: string;

  @ApiProperty({
    description: 'Preço do serviço em reais',
    example: 35,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'O preço deve ser maior ou igual a zero' })
  price?: number;

  @ApiProperty({
    description: 'Duração do serviço em minutos',
    example: 30,
    required: false
  })
  @IsNumber()
  @IsOptional()
  @Min(5, { message: 'A duração deve ser de pelo menos 5 minutos' })
  duration?: number;

  @ApiProperty({
    description: 'Categoria do serviço',
    enum: ServiceCategory,
    example: ServiceCategory.HAIRCUT,
    required: false
  })
  @IsEnum(ServiceCategory, { message: 'Categoria inválida' })
  @IsOptional()
  category?: ServiceCategory;

  @ApiProperty({
    description: 'Indicar se o serviço é popular/destacado',
    example: true,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  popular?: boolean;
} 