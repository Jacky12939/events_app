import type { Event, OrganizerStats, OrganizerProfile } from '../entities/Event';

export interface EventRepository {
  getEvents(): Promise<Event[]>;
  getStats(): Promise<OrganizerStats>;
  getProfile(): Promise<OrganizerProfile>;
  createEvent(event: Omit<Event, 'id' | 'registeredCount' | 'organizerName'>): Promise<Event>;
  updateEvent(id: string, event: Partial<Event>): Promise<Event>;
}