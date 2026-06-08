import type { ParticipantEventEntity, ParticipantProfileEntity } from "../entities/ParticipantEntities";


export interface ParticipantRepository {
  getAvailableEvents(): Promise<ParticipantEventEntity[]>;
  getFilteredEvents(filters: { title?: string; category?: string; location?: string; date?: string }): Promise<ParticipantEventEntity[]>;
  getEventDetails(eventId: string): Promise<ParticipantEventEntity>;
  registerToEvent(eventId: string): Promise<{ success: boolean; ticketNumber?: string }>;
  getMyTickets(): Promise<ParticipantEventEntity[]>;
  getProfile(): Promise<ParticipantProfileEntity>;
  updateProfile(data: { firstName?: string; lastName?: string; email?: string }): Promise<ParticipantProfileEntity>;
}