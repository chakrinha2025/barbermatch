import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsObject, Matches, IsUrl } from 'class-validator';

export class UpdateBarberProfileDto {
  @ApiProperty({
    description: 'Nome do barbeiro',
    example: 'João Barbeiro'
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Telefone de contato',
    example: '11912345678'
  })
  @IsString()
  @IsOptional()
  @Matches(/^\d{10,11}$/, { message: 'Formato de telefone inválido' })
  phone?: string;

  @ApiProperty({
    description: 'Email de contato',
    example: 'contato@barbershop.com'
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Endereço da barbearia',
    example: 'Rua das Flores, 123, São Paulo - SP'
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Descrição da barbearia',
    example: 'Barbearia moderna com ambiente agradável e profissionais experientes.'
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'URL do logo',
    example: 'https://exemplo.com/logo.png'
  })
  @IsUrl()
  @IsOptional()
  logo?: string;

  @ApiProperty({
    description: 'Website da barbearia',
    example: 'https://barbershop.com'
  })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty({
    description: 'Redes sociais',
    example: {
      instagram: '@barber_example',
      facebook: 'barber.example',
      twitter: '@barber_example'
    }
  })
  @IsObject()
  @IsOptional()
  socialMedia?: Record<string, string>;

  @ApiProperty({
    description: 'Horário de funcionamento',
    example: {
      monday: { open: '09:00', close: '19:00' },
      tuesday: { open: '09:00', close: '19:00' },
      wednesday: { open: '09:00', close: '19:00' },
      thursday: { open: '09:00', close: '19:00' },
      friday: { open: '09:00', close: '19:00' },
      saturday: { open: '09:00', close: '16:00' },
      sunday: { open: null, close: null }
    }
  })
  @IsObject()
  @IsOptional()
  openingHours?: Record<string, { open: string; close: string }>;
} 