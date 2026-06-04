import type { ParticipantEventEntity, ParticipantProfileEntity } from "../../domain/entities/ParticipantEntities";
import type { ParticipantEventDto, ParticipantProfileDto } from "../dto/participant";

export class ParticipantMapper {
  static toEventEntity(dto: ParticipantEventDto): ParticipantEventEntity {
    const available = dto.max_capacity - dto.current_registered;
    return {
      id: dto.event_id.toString(),
      title: dto.event_title,
      date: dto.event_date,
      time: dto.event_time,
      location: dto.event_location,
      category: dto.event_category,
      description: dto.event_description,
      registeredCount: dto.current_registered,
      capacity: dto.max_capacity,
      availablePlaces: available < 0 ? 0 : available,
      organizerName: dto.organizer_title,
      isRegistered: dto.user_is_joined,
      ticketNumber: dto.ticket_code,
      registrationDate: dto.joined_at_date,
    };
  }

  static toProfileEntity(dto: ParticipantProfileDto): ParticipantProfileEntity {
    return {
      id: dto.uuid,
      fullName: dto.full_name,
      email: dto.email_address,
      role: dto.user_role_title,
      joinedDate: dto.created_timestamp,
     
      stats: {
        totalRegistered: dto.summary_stats?.registered_count ?? 0,
        accountStatus: dto.summary_stats?.status_label === 'Active' ? 'Actif' : 'Inactif',
        currentYear: dto.summary_stats?.active_year ?? new Date().getFullYear(),
      },
    };
  }
}