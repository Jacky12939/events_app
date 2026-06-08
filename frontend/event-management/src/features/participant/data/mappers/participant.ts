import type { ParticipantEventEntity, ParticipantProfileEntity } from "../../domain/entities/ParticipantEntities";
import type { ParticipantEventDto, ParticipantProfileDto } from "../dto/participant";

export class ParticipantMapper {
  static toEventEntity(dto: ParticipantEventDto): ParticipantEventEntity {
    const registeredCount = dto._count?.registrations ?? 0;
    const available = dto.capacity - registeredCount;
    const organizerName = dto.organizer
      ? `${dto.organizer.firstName} ${dto.organizer.lastName}`.trim()
      : 'Eventory';
    const startDate = new Date(dto.startDate);
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description ?? '',
      location: dto.location,
      date: startDate.toISOString().split('T')[0],
      time: startDate.toISOString().split('T')[1]?.substring(0, 5) ?? '',
      category: dto.category?.name ?? 'Général',
      capacity: dto.capacity,
      registeredCount,
      availablePlaces: available < 0 ? 0 : available,
      organizerName,
      isRegistered: false,
      qrCode: dto.qrCode,
    };
  }

  static toTicketEntity(dto: { event: ParticipantEventDto; ticketCode?: string; joinedAtDate?: string; qrCode?: string }): ParticipantEventEntity & { ticketNumber?: string; registrationDate?: string } {
    const base = ParticipantMapper.toEventEntity(dto.event);
    return {
      ...base,
      ticketNumber: dto.ticketCode,
      registrationDate: dto.joinedAtDate,
      qrCode: dto.qrCode ?? base.qrCode,
    };
  }

  static toProfileEntity(dto: ParticipantProfileDto): ParticipantProfileEntity {
    return {
      id: dto.id,
      fullName: `${dto.firstName ?? ''} ${dto.lastName ?? ''}`.trim() || dto.email,
      email: dto.email,
      role: dto.role ?? 'PARTICIPANT',
      joinedDate: dto.createdAt ?? '',
      stats: {
        totalRegistered: dto.summaryStats?.registeredCount ?? 0,
        accountStatus: dto.summaryStats?.statusLabel === 'Active' ? 'Actif' : 'Inactif',
        currentYear: dto.summaryStats?.activeYear ?? new Date().getFullYear(),
      },
    };
  }
}