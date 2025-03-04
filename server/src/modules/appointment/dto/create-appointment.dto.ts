import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsNumber, IsUUID, Min } from 'class-validator';

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
  NO_SHOW = 'no_show'
}

export class CreateAppointmentDto {
  @ApiProperty({ example: '2023-06-15' })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ example: '14:30' })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(15)
  duration: number;

  @ApiProperty({ example: 'abc123' })
  @IsUUID()
  @IsNotEmpty()
  client_id: string;

  @ApiProperty({ example: 'xyz789' })
  @IsUUID()
  @IsNotEmpty()
  barber_id: string;

  @ApiProperty({ example: 'def456' })
  @IsUUID()
  @IsNotEmpty()
  service_id: string;

  @ApiProperty({ example: 'jkl321' })
  @IsUUID()
  @IsOptional()
  barbershop_id?: string;

  @ApiProperty({ enum: AppointmentStatus, default: AppointmentStatus.PENDING })
  @IsEnum(AppointmentStatus)
  @IsOptional()
  status?: AppointmentStatus;

  @ApiProperty({ example: 45.90 })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 'Prefiro com navalha' })
  @IsString()
  @IsOptional()
  notes?: string;
} 