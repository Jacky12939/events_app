import api from '../../../../core/api/axiosInstance';
import type { Registration } from '../../domain/entities/Registration';

export class RegistrationRepositoryImpl {
  
  async registerToEvent(eventId: string): Promise<{ ticket: Registration; message: string }> {
    const { data } = await api.post(`/registrations/events/${eventId}`);
    return data;
  }

  async getMyRegistrations(): Promise<Registration[]> {
    const { data } = await api.get('/registrations/my');
    return data;
  }

  async getTicket(registrationId: string): Promise<Registration> {
    const { data } = await api.get(`/registrations/${registrationId}/ticket`);
    return data;
  }

  async unregister(eventId: string): Promise<void> {
    await api.delete(`/registrations/events/${eventId}`);
  }
}