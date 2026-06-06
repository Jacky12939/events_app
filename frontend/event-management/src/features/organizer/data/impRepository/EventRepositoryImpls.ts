import axios, { type AxiosInstance } from 'axios';
import type { EventRepository } from '../../domain/repositories/EventRepository';
import type { Event, OrganizerStats, OrganizerProfile, OrganizerDashboardData } from '../../domain/entities/Event';

export class EventRepositoryImpl implements EventRepository {
  private api: AxiosInstance;

  constructor() {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '');

    this.api = axios.create({
      baseURL: baseUrl,
      headers: { 'Content-Type': 'application/json' },
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async getDashboardData(): Promise<OrganizerDashboardData> {
    const response = await this.api.get<any[]>('/events/organizer/my-events');
    return {
      recentEvents: response.data.map(this.toDomain)
    };
  }

  async getEvents(): Promise<Event[]> {
    const response = await this.api.get<any[]>('/events/organizer/my-events');
    return response.data.map(this.toDomain);
  }

  private toDomain(event: any): Event {
    return {
      id: event.id,
      title: event.title || '',
      description: event.description || '',
      category: event.category?.name || event.category || '',
      location: event.location || '',
      date: event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : '',
      time: event.startDate ? event.startDate.split('T')[1]?.substring(0, 5) : '',
      capacity: event.capacity || 0,
      registeredCount: event._count?.registrations || 0,
      status: event.status?.toLowerCase() || 'draft',
      organizerName: event.organizer ? `${event.organizer.firstName || ''} ${event.organizer.lastName || ''}`.trim() : '',
    };
  }

  async getStats(): Promise<OrganizerStats> {
    const response = await this.api.get<any>('/events/organizer/dashboard');
    const data = response.data;
    return {
      totalEvents: data.totalEvents || 0,
      publishedEvents: data.publishedEvents || 0,
      draftEvents: data.draftEvents || 0,
      completedEvents: data.completedEvents || data.cancelledEvents || 0,
      totalRegistered: data.totalRegistered || data.totalTicketsSold || 0,
    };
  }

  async getProfile(): Promise<OrganizerProfile> {
    const response = await this.api.get<any>('/users/me');
    const data = response.data;
    return {
      name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.email,
      email: data.email || '',
      role: data.role || '',
      memberSince: data.createdAt || '',
    };
  }

  async createEvent(event: Omit<Event, 'id' | 'registeredCount' | 'organizerName'>): Promise<Event> {
    const startDate = event.date && event.time ? `${event.date}T${event.time}:00` : event.date;
    const body = {
      title: event.title,
      description: event.description,
      location: event.location,
      startDate,
      endDate: event.date ? `${event.date}T23:59:59` : undefined,
      capacity: event.capacity,
      status: event.status?.toUpperCase() || 'DRAFT',
      categoryId: event.category || undefined,
    };
    const response = await this.api.post<any>('/events', body);
    return this.toDomain(response.data);
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    const startDate = event.date && event.time ? `${event.date}T${event.time}:00` : undefined;
    const body = {
      title: event.title,
      description: event.description,
      location: event.location,
      startDate,
      endDate: event.date ? `${event.date}T23:59:59` : undefined,
      capacity: event.capacity,
      status: event.status?.toUpperCase(),
      categoryId: event.category,
    };
    const response = await this.api.patch<any>(`/events/${id}`, body);
    return this.toDomain(response.data);
  }
}