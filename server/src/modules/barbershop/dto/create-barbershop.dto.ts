import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsArray, IsUrl, IsNumber, Min, Max, IsEnum } from 'class-validator';

export enum BarbershopStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

export class CreateBarbershopDto {
  @ApiProperty({ example: 'Barbearia do João' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'A melhor barbearia da cidade!' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Rua das Flores, 123' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;

  @ApiProperty({ example: 'Curitiba' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'PR' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: '80000-000' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ example: '+55 41 99999-9999' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'contato@barbearia.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: 'https://barbearia.com' })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty({ example: 'https://instagram.com/barbearia' })
  @IsUrl()
  @IsOptional()
  instagram?: string;

  @ApiProperty({ example: ['Corte de cabelo', 'Barba', 'Sobrancelha'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  services?: string[];

  @ApiProperty({ example: ['barbeiro1_id', 'barbeiro2_id'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  barbers?: string[];

  @ApiProperty({ example: 'https://example.com/photo.jpg' })
  @IsUrl()
  @IsOptional()
  photo?: string;

  @ApiProperty({ example: ['https://example.com/gallery1.jpg'] })
  @IsArray()
  @IsUrl({}, { each: true })
  @IsOptional()
  gallery?: string[];

  @ApiProperty({ example: 4.5 })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({ enum: BarbershopStatus, default: BarbershopStatus.PENDING })
  @IsEnum(BarbershopStatus)
  @IsOptional()
  status?: BarbershopStatus;
} 