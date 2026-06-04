import api from './api';

export const getMyRegistrations = async () => {
  const res = await api.get('/registrations/my');
  return res.data;
};

export const getTicket = async (registrationId: string) => {
  const res = await api.get(`/registrations/${registrationId}/ticket`);
  return res.data;
};

export const registerToEvent = async (eventId: string) => {
  const res = await api.post(`/registrations/events/${eventId}`);
  return res.data;
};

export const unregisterFromEvent = async (eventId: string) => {
  await api.delete(`/registrations/events/${eventId}`);
 
};

export class RegistrationsService {
  // ... autres méthodes ...

  async verifyTicket(ticketCode: string) {
    // ... code ...
  }
} // ← fermeture de la classe
