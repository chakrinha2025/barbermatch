import { IsEmail, IsString, MinLength, IsOptional, Matches, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum UserRole {
  CLIENT = 'client',
  BARBER = 'barber',
  ADMIN = 'admin'
}

export class RegisterDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva'
  })
  @IsString()
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'usuario@exemplo.com'
  })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'Senha123!'
  })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma minúscula e um número ou caractere especial'
  })
  password: string;

  @ApiProperty({
    description: 'Número de telefone do usuário',
    example: '11912345678'
  })
  @IsString()
  @Matches(/^\d{10,11}$/, { message: 'Número de telefone inválido. Formato: DDD + número sem espaços ou caracteres especiais' })
  phone: string;

  @ApiProperty({
    description: 'Função do usuário no sistema',
    enum: UserRole,
    default: UserRole.CLIENT,
    required: false
  })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Função inválida. Valores permitidos: client, barber, admin' })
  role?: UserRole;
} 