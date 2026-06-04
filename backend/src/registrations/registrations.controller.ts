
import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  UseGuards, Body
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RegistrationsService } from './registrations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '@prisma/client';
import { CurrentUser, Roles } from '../auth/guards/roles.decorator';

@ApiTags('Registrations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('registrations')
export class RegistrationsController {
  constructor(private registrationsService: RegistrationsService) {}

  @Post('events/:eventId')
  @UseGuards(RolesGuard)
  @Roles(Role.PARTICIPANT)
  @ApiOperation({ summary: 'S\'inscrire à un événement (génère billet + QR Code)' })
  register(@Param('eventId') eventId: string, @CurrentUser() user: any) {
    return this.registrationsService.register(eventId, user.id);
  }

  @Get('my')
  @UseGuards(RolesGuard)
  @Roles(Role.PARTICIPANT)
  @ApiOperation({ summary: 'Liste de mes inscriptions et billets' })
  getMyRegistrations(@CurrentUser() user: any) {
    return this.registrationsService.getMyRegistrations(user.id);
  }

  @Get(':registrationId/ticket')
  @UseGuards(RolesGuard)
  @Roles(Role.PARTICIPANT)
  @ApiOperation({ summary: 'Récupérer un billet spécifique avec QR Code' })
  getTicket(
    @Param('registrationId') registrationId: string,
    @CurrentUser() user: any,
  ) {
    return this.registrationsService.getTicket(registrationId, user.id);
  }

  @Delete('events/:eventId')
  @UseGuards(RolesGuard)
  @Roles(Role.PARTICIPANT)
  @ApiOperation({ summary: 'Se désinscrire d\'un événement' })
  unregister(@Param('eventId') eventId: string, @CurrentUser() user: any) {
    return this.registrationsService.unregister(eventId, user.id);
  }

  @Get('events/:eventId/participants')
  @UseGuards(RolesGuard)
  @Roles(Role.ORGANIZER, Role.ADMIN)
  @ApiOperation({ summary: 'Voir les participants d\'un événement (Organisateur)' })
  getEventParticipants(
    @Param('eventId') eventId: string,
    @CurrentUser() user: any,
  ) {
    return this.registrationsService.getEventParticipants(eventId, user.id);
  }
  @Post('verify')
  @ApiOperation({ summary: 'Vérifier un billet par ticketCode' })
  verifyTicket(@Body() body: { ticketCode: string }) {
    return this.registrationsService.verifyTicket(body.ticketCode);
  }
}

