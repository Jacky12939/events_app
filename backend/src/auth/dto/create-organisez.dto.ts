import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizerDto {
  @ApiProperty({ example: 'jean@example.com' })
  @IsEmail({}, { message: 'Email invalide' })
  email!: string;

  @ApiProperty({ example: 'Jacky' })
  @IsString()
  firstName!: string;

  @ApiProperty({ example: 'Dupont' })
  @IsString()
  lastName!: string;
}