
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FilterEventDto } from './dto/filter-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';


import { Role } from '@prisma/client';
import { CurrentUser, Roles } from '../auth/guards/roles.decorator';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les événements publiés (public, avec filtres)' })
  findAllPublished(@Query() filter: FilterEventDto) {
    return this.eventsService.findAllPublished(filter);
  }

  @Get('organizer/dashboard')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ORGANIZER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dashboard de l\'organisateur connecté' })
  getDashboard(@CurrentUser() user: any) {
    return this.eventsService.getOrganizerDashboard(user.id);
  }

  @Get('organizer/my-events')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ORGANIZER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Événements de l\'organisateur connecté' })
  findMyEvents(@CurrentUser() user: any, @Query() filter: FilterEventDto) {
    return this.eventsService.findByOrganizer(user.id, filter);
  }

  @Get('admin/organizer/:organizerId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Événements d\'un organisateur donné (Admin uniquement)' })
  findAllByOrganizer(@Param('organizerId') organizerId: string) {
    return this.eventsService.findByOrganizer(organizerId, {});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Détail d\'un événement' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ORGANIZER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Créer un événement (Organisateur)' })
  create(@Body() dto: CreateEventDto, @CurrentUser() user: any) {
    return this.eventsService.create(dto, user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ORGANIZER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Modifier un événement (Organisateur propriétaire)' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
    @CurrentUser() user: any,
  ) {
    return this.eventsService.update(id, dto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ORGANIZER, Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Supprimer un événement' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.eventsService.remove(id, user.id, user.role);
  }
}