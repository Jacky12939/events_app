import axios, { type AxiosInstance } from 'axios';
import type { ParticipantEventEntity, ParticipantProfileEntity } from '../../domain/entities/ParticipantEntities';
import type { ParticipantEventDto, ParticipantProfileDto } from '../dto/participant';
import { ParticipantMapper } from '../mappers/participant';
import type { ParticipantRepository } from '../../domain/repositories/participant';

export class ParticipantRepositoryImpl implements ParticipantRepository {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      
      baseURL: import.meta.env.VITE_API_BASE_URL ,
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
    const response = await this.api.get<ParticipantEventDto[]>('/events');
    return response.data.map(ParticipantMapper.toEventEntity);
  }

  async getEventDetails(id: string): Promise<ParticipantEventEntity> {
    const response = await this.api.get<ParticipantEventDto>(`/events/${id}`);
    return ParticipantMapper.toEventEntity(response.data);
  }

  async registerToEvent(eventId: string): Promise<{ success: boolean; ticketNumber?: string }> {
    const response = await this.api.post<{ success: boolean; ticket_code?: string }>(`/registrations/events/${eventId}`);
    return {
      success: response.data.success,
      ticketNumber: response.data.ticket_code,
    };
  }

  async getMyTickets(): Promise<ParticipantEventEntity[]> {
    const response = await this.api.get<ParticipantEventDto[]>('/registrations/my');
    return response.data.map(ParticipantMapper.toEventEntity);
  }

  async getProfile(): Promise<ParticipantProfileEntity> {
    const response = await this.api.get<ParticipantProfileDto>('/users/me');
    return ParticipantMapper.toProfileEntity(response.data);
  }
}