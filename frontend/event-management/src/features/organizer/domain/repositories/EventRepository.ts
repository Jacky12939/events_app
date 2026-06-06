import type { Event, OrganizerStats, OrganizerProfile, OrganizerDashboardData } from '../entities/Event';

export interface EventRepository {
  getDashboardData(): Promise<OrganizerDashboardData>;
  getEvents(): Promise<Event[]>;
  getStats(): Promise<OrganizerStats>;
  getProfile(): Promise<OrganizerProfile>;
  createEvent(event: Omit<Event, 'id' | 'registeredCount' | 'organizerName'>): Promise<Event>;
  updateEvent(id: string, event: Partial<Event>): Promise<Event>;
}