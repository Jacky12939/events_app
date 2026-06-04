import type { ParticipantEventEntity, ParticipantProfileEntity } from "../entities/ParticipantEntities";


export interface ParticipantRepository {
  getAvailableEvents(): Promise<ParticipantEventEntity[]>;
  getEventDetails(eventId: string): Promise<ParticipantEventEntity>;
  registerToEvent(eventId: string): Promise<{ success: boolean; ticketNumber?: string }>;
  getMyTickets(): Promise<ParticipantEventEntity[]>;
  getProfile(): Promise<ParticipantProfileEntity>;
}