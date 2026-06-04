import api from '../../../../core/api/axiosInstance';
import type { BaseUser, AdminEventSummary, AdminStats, AdminProfile } from '../../domain/entities/AdminEntities';
import type { AdminRepository } from '../../domain/repositories/AdminRepository';
import type { AdminEventDTO, UserDTO, AdminProfileDTO } from '../dtos/AdminDTO';
import { AdminMapper } from '../mappers/AdminMapper';

interface CreateOrganizerResponse {
  message: string;
  organizer: UserDTO;
  tempPassword?: string;
}

export class AdminRepositoryImpl implements AdminRepository {

  async getStats(): Promise<AdminStats> {
    const [usersResponse, eventsResponse] = await Promise.all([
      api.get<UserDTO[]>('/users'),
      api.get<AdminEventDTO[]>('/events'),
    ]);

    const users = usersResponse.data;
    const events = eventsResponse.data;

    return {
      totalEvents: events.length,
      publishedEvents: events.filter(e => e.status === 'published').length,
      totalRegistrations: events.reduce((sum, e) => sum + e.slotsTaken, 0),
      organizerCount: users.filter(u => u.role === 'ORGANIZER').length,
      participantCount: users.filter(u => u.role === 'PARTICIPANT').length,
    };
  }

  async getUsers(): Promise<BaseUser[]> {
    const response = await api.get<UserDTO[]>('/users');
    return response.data.map(AdminMapper.toUserDomain);
  }

  async getLatestEvents(): Promise<AdminEventSummary[]> {
    const response = await api.get<AdminEventDTO[]>('/events');
    return response.data.map(AdminMapper.toEventDomain);
  }

  async getProfile(): Promise<AdminProfile> {
    const response = await api.get<AdminProfileDTO>('/users/me');
    return AdminMapper.toProfileDomain(response.data);
  }

  async createOrganizer(name: string, email: string): Promise<{ user: BaseUser; tempPassword: string }> {
    const response = await api.post<CreateOrganizerResponse>(
      '/auth/admin/create-organizer',
      {
        firstName: name.split(' ')[0] || name,
        lastName: name.split(' ').slice(1).join(' ') || 'Organisateur',
        email: email,
      }
    );
    return {
      user: {
        id: response.data.organizer.id,
        name: `${response.data.organizer.firstName} ${response.data.organizer.lastName}`,
        email: response.data.organizer.email,
        role: 'organisateur',
        registrationDate: new Date().toISOString(),
      },
      tempPassword: response.data.tempPassword
    };
  }

  async deleteUser(userId: string): Promise<void> {
    await api.delete(`/users/${userId}`);
  }

  async getUserCreatedEvents(userId: string): Promise<AdminEventSummary[]> {
    const response = await api.get<AdminEventDTO[]>(`/events?organizerId=${userId}`);
    return response.data.map(AdminMapper.toEventDomain);
  }

  async getUserRegistrations(userId: string): Promise<any[]> {
    const response = await api.get<any[]>(`/registrations/me?userId=${userId}`);
    return response.data;
  }
}
