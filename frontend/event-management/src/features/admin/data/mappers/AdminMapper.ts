import type { BaseUser, AdminEventSummary, AdminProfile } from '../../domain/entities/AdminEntities';
import type { AdminEventDTO, UserDTO, AdminProfileDTO } from '../dtos/AdminDTO';

export class AdminMapper {
  static toUserDomain(dto: UserDTO): BaseUser {
    const fullName = `${dto.firstName} ${dto.lastName}`.trim();
    const roleMap: Record<string, BaseUser['role']> = {
      'ADMIN': 'participant',
      'ORGANIZER': 'organisateur',
      'PARTICIPANT': 'participant',
    };
    return {
      id: dto.id,
      name: fullName,
      email: dto.email,
      role: roleMap[dto.role] || 'participant',
      registrationDate: dto.createdAt,
    };
  }

  static toEventDomain(dto: AdminEventDTO): AdminEventSummary {
    return {
      id: dto.id,
      title: dto.title,
      date: dto.date,
      registeredCount: dto.slotsTaken,
      capacity: dto.slotsMax,
      category: dto.category,
      status: dto.status,
    };
  }

  static toProfileDomain(dto: AdminProfileDTO): AdminProfile {
    const fullName = `${dto.firstName} ${dto.lastName}`.trim();
    return {
      name: fullName,
      email: dto.email,
      role: 'Administrateur',
      memberSince: dto.createdAt || 'Non spécifié',
    };
  }
}
