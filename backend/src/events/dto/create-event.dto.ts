
import {
  IsString,
  IsDateString,
  IsInt,
  Min,
  IsOptional,
  IsEnum,
  IsUrl,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from '@prisma/client';

export class CreateEventDto {
  @ApiProperty({ example: 'Festival de Jazz de Douala' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Un festival incontournable au cœur de Douala' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'Douala, Cameroun' })
  @IsString()
  location!: string;

  @ApiProperty({ example: '2025-08-15T09:00:00Z' })
  @IsDateString()
  startDate!: string;

  @ApiProperty({ example: '2025-08-17T23:00:00Z' })
  @IsDateString()
  endDate!: string;

  @ApiProperty({ example: 500 })
  @IsInt()
  @Min(1)
  capacity!: number;

  @ApiPropertyOptional({ enum: EventStatus, default: EventStatus.DRAFT })
  @IsOptional()
  @IsEnum(EventStatus)
  status?: EventStatus;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'uuid-de-la-categorie' })
  @IsOptional()
  @IsString()
  categoryId?: string;
}