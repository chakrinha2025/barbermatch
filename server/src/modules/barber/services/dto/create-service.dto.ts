import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional, Min, MaxLength, IsNotEmpty, IsEnum } from 'class-validator';

// Categorias disponíveis
export enum ServiceCategory {
  HAIRCUT = 'cortes',
  BEARD = 'barba',
  COMBO = 'combos',
  TREATMENT = 'tratamentos',
  OTHER = 'outros'
}

export class CreateServiceDto {
  @ApiProperty({
    description: 'Nome do serviço',
    example: 'Corte Masculino'
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome do serviço é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Descrição do serviço',
    example: 'Corte masculino com tesoura e máquina, inclui finalização'
  })
  @IsString()
  @IsOptional()
  @MaxLength(500, { message: 'A descrição deve ter no máximo 500 caracteres' })
  description?: string;

  @ApiProperty({
    description: 'Preço do serviço em reais',
    example: 35
  })
  @IsNumber()
  @Min(0, { message: 'O preço deve ser maior ou igual a zero' })
  price: number;

  @ApiProperty({
    description: 'Duração do serviço em minutos',
    example: 30
  })
  @IsNumber()
  @Min(5, { message: 'A duração deve ser de pelo menos 5 minutos' })
  duration: number;

  @ApiProperty({
    description: 'Categoria do serviço',
    enum: ServiceCategory,
    example: ServiceCategory.HAIRCUT
  })
  @IsEnum(ServiceCategory, { message: 'Categoria inválida' })
  category: ServiceCategory;

  @ApiProperty({
    description: 'Indicar se o serviço é popular/destacado',
    example: false,
    required: false
  })
  @IsBoolean()
  @IsOptional()
  popular?: boolean;

  @ApiProperty({
    description: 'ID do barbeiro (apenas para admins)',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  @IsString()
  @IsOptional()
  barberId?: string;
} 