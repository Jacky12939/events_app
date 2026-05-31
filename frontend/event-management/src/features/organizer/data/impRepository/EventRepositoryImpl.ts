import api from '@/core/api/axiosInstance';
import type { EventRepository } from '../../domain/repositories/EventRepository';
import type { Event, CreateEventPayload, EventFilter } from '../../domain/entities/Event';

export class EventRepositoryImpl implements EventRepository {
  async getPublished(filter?: EventFilter): Promise {
    const { data } = await api.get('/events', { params: filter });
    return data;
  }
  async getById(id: string): Promise {
    const { data } = await api.get(`/events/${id}`);
    return data;
  }
  async getMyEvents(filter?: EventFilter): Promise {
    const { data } = await api.get('/events/organizer/my-events', { params: filter });
    return data;
  }
  async create(payload: CreateEventPayload): Promise {
    const { data } = await api.post('/events', payload);
    return data;
  }
  async update(id: string, payload: Partial): Promise {
    const { data } = await api.patch(`/events/${id}`, payload);
    return data;
  }
  async remove(id: string): Promise {
    await api.delete(`/events/${id}`);
  }
  async getDashboard(): Promise {
    const { data } = await api.get('/events/organizer/dashboard');
    return data;
  }
}