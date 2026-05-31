
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'jean@example.com' })
  @IsEmail({}, { message: 'Email invalide' })
  email!: string;

  @ApiProperty({ example: 'Jean' })
  @IsString()
  firstName!: string;

  @ApiProperty({ example: 'Dupont' })
  @IsString()
  lastName!: string;

  @ApiProperty({ example: 'motdepasse123', minLength: 6 })
  @IsString()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password!: string;
}

