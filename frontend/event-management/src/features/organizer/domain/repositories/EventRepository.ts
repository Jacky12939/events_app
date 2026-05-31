import type { Event, CreateEventPayload, EventFilter } from '../entities/Event';

export interface EventRepository {
  getPublished(filter?: EventFilter): Promise;
  getById(id: string): Promise;
  getMyEvents(filter?: EventFilter): Promise;
  create(payload: CreateEventPayload): Promise;
  update(id: string, payload: Partial): Promise;
  remove(id: string): Promise;
  getDashboard(): Promise;
}