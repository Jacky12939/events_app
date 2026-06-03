import api from './api';

export const getMyEvents = async () => {
  const res = await api.get('/events/organizer/my-events');
  return res.data;
};

export const getOrganizerDashboard = async () => {
  const res = await api.get('/events/organizer/dashboard');
  return res.data;
};

export const createEvent = async (data: {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  capacity: number;
}) => {
  const res = await api.post('/events', data);
  return res.data;
};

export const updateEvent = async (id: string, data: any) => {
  const res = await api.patch(`/events/${id}`, data);
  return res.data;
};

export const deleteEvent = async (id: string) => {
  await api.delete(`/events/${id}`);
};

export const getEventParticipants = async (eventId: string) => {
  const res = await api.get(`/registrations/events/${eventId}/participants`);
  return res.data;
};
