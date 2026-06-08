import axios, { type AxiosInstance } from 'axios';
import type { ParticipantEventEntity, ParticipantProfileEntity } from '../../domain/entities/ParticipantEntities';
import type { ParticipantEventDto, ParticipantProfileDto } from '../dto/participant';
import { ParticipantMapper } from '../mappers/participant';
import type { ParticipantRepository } from '../../domain/repositories/participant';

export class ParticipantRepositoryImpl implements ParticipantRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });

    // Injection automatique du token API dans Axios
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async getAvailableEvents(): Promise<ParticipantEventEntity[]> {
    return [];
  }

  async getFilteredEvents(filters: { title?: string; category?: string; location?: string; date?: string }): Promise<ParticipantEventEntity[]> {
    const params: Record<string, string> = {};
    if (filters.title) params.title = filters.title;
    if (filters.category) params.categoryId = filters.category;
    if (filters.location) params.location = filters.location;
    if (filters.date) {
      params.dateFrom = filters.date;
      params.dateTo = filters.date;
    }
    const response = await this.api.get<ParticipantEventDto[]>('/events', { params });
    return response.data.map(ParticipantMapper.toEventEntity);
  }

  async getEventDetails(id: string): Promise<ParticipantEventEntity> {
    const response = await this.api.get<ParticipantEventDto>(`/events/${id}`);
    return ParticipantMapper.toEventEntity(response.data);
  }

  async registerToEvent(eventId: string): Promise<{ success: boolean; ticketNumber?: string }> {
    const response = await this.api.post<{ message: string; ticket: { ticketCode: string } }>(`/registrations/events/${eventId}`);
    return {
      success: true,
      ticketNumber: response.data.ticket?.ticketCode,
    };
  }

  async getMyTickets(): Promise<(ParticipantEventEntity & { ticketNumber?: string; registrationDate?: string; qrCode?: string })[]> {
    const response = await this.api.get<{ event: ParticipantEventDto; ticketCode?: string; joinedAtDate?: string; qrCode?: string }[]>('/registrations/my');
    return response.data.map((item) => ParticipantMapper.toTicketEntity(item));
  }

  async getProfile(): Promise<ParticipantProfileEntity> {
    const response = await this.api.get<ParticipantProfileDto>('/users/me');
    return ParticipantMapper.toProfileEntity(response.data);
  }

  async updateProfile(data: { firstName?: string; lastName?: string; email?: string }): Promise<ParticipantProfileEntity> {
    const response = await this.api.patch<ParticipantProfileDto>('/users/me', data);
    return ParticipantMapper.toProfileEntity(response.data);
  }
}