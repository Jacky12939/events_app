
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    return user;
  }

  async updateProfile(userId: string, data: { firstName?: string; lastName?: string; email?: string }) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async remove(userId: string, currentUserId: string, currentUserRole: Role) {
    // Vérifier que l'utilisateur à supprimer existe
    const userToDelete = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userToDelete) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    // Seulement un ADMIN peut supprimer des utilisateurs
    if (currentUserRole !== Role.ADMIN) {
      throw new ForbiddenException(
        'Seul un administrateur peut supprimer des utilisateurs',
      );
    }

    // Empêcher un admin de se supprimer lui-même
    if (userId === currentUserId) {
      throw new ForbiddenException(
        'Vous ne pouvez pas vous supprimer vous-même',
      );
    }

    // Supprimer d'abord les événements organisés par cet utilisateur
    const organizedEvents = await this.prisma.event.findMany({
      where: { organizerId: userId },
    });

    for (const event of organizedEvents) {
      // Supprimer les inscriptions liées à chaque événement
      await this.prisma.registration.deleteMany({
        where: { eventId: event.id },
      });
      
      // Supprimer l'événement
      await this.prisma.event.delete({
        where: { id: event.id },
      });
    }

    // Supprimer les inscriptions de l'utilisateur (en tant que participant)
    await this.prisma.registration.deleteMany({
      where: { participantId: userId },
    });

    // Enfin, supprimer l'utilisateur
    await this.prisma.user.delete({
      where: { id: userId },
    });

    return { message: 'Utilisateur supprimé avec succès' };
  }
}