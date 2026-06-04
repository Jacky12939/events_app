import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EventStatus } from '@prisma/client';
import * as QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RegistrationsService {  
  constructor(private prisma: PrismaService) {}

  async register(eventId: string, participantId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      include: { _count: { select: { registrations: true } } },
    });

    if (!event) {
      throw new NotFoundException(`Événement #${eventId} introuvable`);
    }

    if (event.status !== EventStatus.PUBLISHED) {
      throw new BadRequestException(
        'Impossible de s\'inscrire à un événement non publié',
      );
    }

    if (event._count.registrations >= event.capacity) {
      throw new BadRequestException(
        'Cet événement est complet, plus de places disponibles',
      );
    }

    const existing = await this.prisma.registration.findUnique({
      where: {
        participantId_eventId: { participantId, eventId },
      },
    });

    if (existing) {
      throw new BadRequestException('Vous êtes déjà inscrit à cet événement');
    }

    const ticketCode = uuidv4();

    const qrData = JSON.stringify({
      ticket: ticketCode,
      event: event.title,
      eventId: event.id,
      participant: participantId,
    });
    const qrCode = await QRCode.toDataURL(qrData);

    const registration = await this.prisma.registration.create({
      data: {
        ticketCode,
        qrCode,
        participantId,
        eventId,
      },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            location: true,
            startDate: true,
            endDate: true,
          },
        },
        participant: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    return {
      message: 'Inscription réussie ! Voici votre billet.',
      ticket: {
        id: registration.id,
        ticketCode: registration.ticketCode,
        qrCode: registration.qrCode, // base64 PNG
        event: registration.event,
        participant: registration.participant,
        registeredAt: registration.createdAt,
      },
    };
  }

  async getMyRegistrations(participantId: string) {
    const registrations = await this.prisma.registration.findMany({
      where: { participantId },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            startDate: true,
            endDate: true,
            status: true,
            imageUrl: true,
            category: true,
            organizer: {
              select: { firstName: true, lastName: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return registrations.map((r) => ({
      id: r.id,
      ticketCode: r.ticketCode,
      qrCode: r.qrCode,
      registeredAt: r.createdAt,
      event: r.event,
    }));
  }

  async getTicket(registrationId: string, participantId: string) {
    const registration = await this.prisma.registration.findUnique({
      where: { id: registrationId },
      include: {
        event: true,
        participant: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });

    if (!registration) {
      throw new NotFoundException('Billet introuvable');
    }

    if (registration.participantId !== participantId) {
      throw new ForbiddenException('Ce billet ne vous appartient pas');
    }

    return registration;
  }

  async unregister(eventId: string, participantId: string) {
    const registration = await this.prisma.registration.findUnique({
      where: {
        participantId_eventId: { participantId, eventId },
      },
    });

    if (!registration) {
      throw new NotFoundException('Inscription introuvable');
    }

    await this.prisma.registration.delete({
      where: { id: registration.id },
    });

    return { message: 'Désinscription effectuée avec succès' };
  }

  async getEventParticipants(eventId: string, organizerId: string) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException(`Événement #${eventId} introuvable`);
    }

    if (event.organizerId !== organizerId) {
      throw new ForbiddenException(
        'Vous ne pouvez voir que les participants de vos propres événements',
      );
    }

    return this.prisma.registration.findMany({
      where: { eventId },
      include: {
        participant: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async verifyTicket(ticketCode: string) {
    const registration = await this.prisma.registration.findUnique({
      where: { ticketCode },
      include: {
        event: true,
        participant: {
          select: { id: true, firstName: true, lastName: true, email: true }
        }
      }
    });

    if (!registration) {
      throw new NotFoundException('Billet introuvable');
    }

    return registration;
   }

}