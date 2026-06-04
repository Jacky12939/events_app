import axios, { type AxiosInstance } from 'axios';
import type { EventRepository } from '../../domain/repositories/EventRepository';
import type { Event, OrganizerStats, OrganizerProfile } from '../../domain/entities/Event';
import { type EventDTO } from '../dtos/EventDTO';
import { EventMapper } from '../mappers/EventMapper';

export class EventRepositoryImpl implements EventRepository {
  private api: AxiosInstance;

  constructor() {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '');

    this.api = axios.create({
      baseURL: baseUrl,
      headers: { 'Content-Type': 'application/json' },
    });

    // Injection automatique du JWT Token de l'organisateur connecté
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async getEvents(): Promise<Event[]> {
    const response = await this.api.get<EventDTO[]>('organizer/events');
    return response.data.map(EventMapper.toDomain);
  }

  async getStats(): Promise<OrganizerStats> {
    const response = await this.api.get<OrganizerStats>('organizer/stats');
    return response.data;
  }

  async getProfile(): Promise<OrganizerProfile> {
    const response = await this.api.get<OrganizerProfile>('organizer/profile');
    return response.data;
  }

  async createEvent(event: Omit<Event, 'id' | 'registeredCount' | 'organizerName'>): Promise<Event> {
    // Utilisation du mapper toDTO pour formater correctement le corps de la requête
    const body = EventMapper.toDTO(event);

    const response = await this.api.post<EventDTO>('organizer/events', body);
    return EventMapper.toDomain(response.data);
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    // Utilisation dynamique de toDTO pour générer uniquement les champs modifiés
    const body = EventMapper.toDTO(event);

    const response = await this.api.patch<EventDTO>(`organizer/events/${id}`, body);
    return EventMapper.toDomain(response.data);
  }
}