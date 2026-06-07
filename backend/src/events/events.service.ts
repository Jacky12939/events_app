import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FilterEventDto } from './dto/filter-event.dto';
import { EventStatus } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  private async resolveCategoryId(categoryNameOrId?: string): Promise<string | undefined> {
    if (!categoryNameOrId) return undefined;
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(categoryNameOrId)) {
      return categoryNameOrId;
    }
    const category = await this.prisma.category.findUnique({
      where: { name: categoryNameOrId.trim() },
      select: { id: true },
    });
    return category?.id;
  }

  async create(dto: CreateEventDto, organizerId: string) {
    const categoryId = await this.resolveCategoryId(dto.categoryId);
    return this.prisma.event.create({
      data: {
        title: dto.title,
        description: dto.description,
        location: dto.location,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        capacity: dto.capacity,
        status: dto.status ?? EventStatus.DRAFT,
        imageUrl: dto.imageUrl,
        organizerId,
        categoryId,
      },
      include: {
        organizer: { select: { id: true, firstName: true, lastName: true } },
        category: true,
      },
    });
  }

  async findAllPublished(filter: FilterEventDto) {
    const where: any = {
      status: EventStatus.PUBLISHED,
    };

    if (filter.title) {
      where.title = { contains: filter.title, mode: 'insensitive' };
    }
    if (filter.location) {
      where.location = { contains: filter.location, mode: 'insensitive' };
    }
    if (filter.categoryId) {
      where.categoryId = filter.categoryId;
    }
    if (filter.dateFrom || filter.dateTo) {
      where.startDate = {};
      if (filter.dateFrom) where.startDate.gte = new Date(filter.dateFrom);
      if (filter.dateTo) where.startDate.lte = new Date(filter.dateTo);
    }

    return this.prisma.event.findMany({
      where,
      include: {
        organizer: { select: { id: true, firstName: true, lastName: true } },
        category: true,
        _count: { select: { registrations: true } },
      },
      orderBy: { startDate: 'asc' },
    });
  }

  async findByOrganizer(organizerId: string, filter: FilterEventDto) {
    const where: any = { organizerId };

    if (filter.title) {
      where.title = { contains: filter.title, mode: 'insensitive' };
    }
    if (filter.status) {
      where.status = filter.status;
    }

    return this.prisma.event.findMany({
      where,
      include: {
        category: true,
        organizer: { select: { id: true, firstName: true, lastName: true } },
        _count: { select: { registrations: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        organizer: { select: { id: true, firstName: true, lastName: true } },
        category: true,
        _count: { select: { registrations: true } },
      },
    });

    if (!event) {
      throw new NotFoundException(`Événement #${id} introuvable`);
    }

    return event;
  }

  async update(id: string, dto: UpdateEventDto, organizerId: string) {
    const event = await this.findOne(id);

    if (event.organizerId !== organizerId) {
      throw new ForbiddenException(
        'Vous ne pouvez modifier que vos propres événements',
      );
    }

    const categoryId = await this.resolveCategoryId(dto.categoryId as string | undefined);

    return this.prisma.event.update({
      where: { id },
      data: {
        ...dto,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        endDate: dto.endDate ? new Date(dto.endDate) : undefined,
        categoryId,
      },
      include: {
        organizer: { select: { id: true, firstName: true, lastName: true } },
        category: true,
        _count: { select: { registrations: true } },
      },
    });
  }

  async remove(id: string, organizerId: string, role: string) {
    const event = await this.findOne(id);

    if (role !== 'ADMIN' && event.organizerId !== organizerId) {
      throw new ForbiddenException(
        'Vous ne pouvez supprimer que vos propres événements',
      );
    }

    await this.prisma.event.delete({ where: { id } });
    return { message: 'Événement supprimé avec succès' };
  }

  async getOrganizerDashboard(organizerId: string) {
    // ✅ BUG CORRIGÉ : Promise.all avait 6 valeurs mais n'en déstructurait que 5
    // "cancelled" était un doublon inutile de "completed", et totalRegistrations
    // était ignoré (décalage d'index). Suppression du doublon.
    const [total, published, draft, completed, totalRegistrations] =
      await Promise.all([
        this.prisma.event.count({ where: { organizerId } }),
        this.prisma.event.count({
          where: { organizerId, status: EventStatus.PUBLISHED },
        }),
        this.prisma.event.count({
          where: { organizerId, status: EventStatus.DRAFT },
        }),
        this.prisma.event.count({
          where: { organizerId, status: EventStatus.COMPLETED },
        }),
        // ✅ totalRegistrations est maintenant bien le 5ème élément (index 4)
        this.prisma.registration.count({
          where: { event: { organizerId } },
        }),
      ]);

    return {
      totalEvents: total,
      publishedEvents: published,
      draftEvents: draft,
      completedEvents: completed,
      totalRegistered: totalRegistrations,
    };
  }
}