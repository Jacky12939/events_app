import axios, { type AxiosInstance } from 'axios';
import type { EventRepository } from '../../domain/repositories/EventRepository';
import type { Event, OrganizerStats, OrganizerProfile, OrganizerDashboardData } from '../../domain/entities/Event';

export class EventRepositoryImpl implements EventRepository {
  private api: AxiosInstance;

  constructor() {
    const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '');
    this.api = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    });
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    // Intercepteur de réponse : log détaillé des erreurs pour déboguer
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('[API ERROR]', {
          status: error.response?.status,
          url: error.config?.url,
          body: JSON.parse(error.config?.data || '{}'),
          response: error.response?.data,
        });
        return Promise.reject(error);
      }
    );
  }

  private toDomain = (event: any): Event => ({
    id: event.id,
    title: event.title || '',
    description: event.description || '',
    category: event.category?.name || event.category || '',
    location: event.location || '',
    date: event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : '',
    time: event.startDate ? new Date(event.startDate).toISOString().split('T')[1]?.substring(0, 5) : '',
    capacity: event.capacity || 0,
    registeredCount: event._count?.registrations || 0,
    status: (event.status?.toLowerCase() || 'draft') as 'draft' | 'published' | 'completed',
    organizerName: event.organizer
      ? `${event.organizer.firstName || ''} ${event.organizer.lastName || ''}`.trim()
      : '',
  });

  async getDashboardData(): Promise<OrganizerDashboardData> {
    const response = await this.api.get<any[]>('/events/organizer/my-events');
    return { recentEvents: response.data.map(this.toDomain) };
  }

  async getEvents(): Promise<Event[]> {
    const response = await this.api.get<any[]>('/events/organizer/my-events');
    return response.data.map(this.toDomain);
  }

  async getStats(): Promise<OrganizerStats> {
    const response = await this.api.get<any>('/events/organizer/dashboard');
    const data = response.data;
    return {
      totalEvents: data.totalEvents ?? 0,
      publishedEvents: data.publishedEvents ?? 0,
      draftEvents: data.draftEvents ?? 0,
      completedEvents: data.completedEvents ?? 0,
      totalRegistered: data.totalRegistered ?? 0,
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
    // Construire les dates ISO valides
    const startDate = new Date(
      event.time ? `${event.date}T${event.time}:00` : `${event.date}T00:00:00`
    ).toISOString();
    const endDate = new Date(`${event.date}T23:59:59`).toISOString();

    // N'envoyer QUE les champs déclarés dans le DTO backend
    // forbidNonWhitelisted:true rejette tout champ inconnu
    const body: Record<string, any> = {
      title: String(event.title).trim(),
      description: String(event.description).trim(),
      location: String(event.location).trim(),
      startDate,
      endDate,
      capacity: Number(event.capacity),
      status: (event.status || 'draft').toUpperCase(),
    };

    // categoryId : seulement si c'est une vraie valeur non vide
    // (un string vide ferait planter @IsString() côté backend)
    if (event.category && event.category.trim().length > 0) {
      body.categoryId = event.category.trim();
    }

    // NE PAS envoyer imageUrl si absent (évite @IsUrl() sur undefined)

    const response = await this.api.post<any>('/events', body);
    return this.toDomain(response.data);
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    // UpdateEventDto = PartialType(CreateEventDto) → tous les champs optionnels
    // On n'envoie que ce qui est défini et non vide
    const body: Record<string, any> = {};

    if (event.title !== undefined && String(event.title).trim())
      body.title = String(event.title).trim();

    if (event.description !== undefined && String(event.description).trim())
      body.description = String(event.description).trim();

    if (event.location !== undefined && String(event.location).trim())
      body.location = String(event.location).trim();

    if (event.capacity !== undefined)
      body.capacity = Number(event.capacity);

    if (event.status)
      body.status = event.status.toUpperCase();

    if (event.category && event.category.trim().length > 0)
      body.categoryId = event.category.trim();

    if (event.date) {
      body.startDate = new Date(
        event.time ? `${event.date}T${event.time}:00` : `${event.date}T00:00:00`
      ).toISOString();
      body.endDate = new Date(`${event.date}T23:59:59`).toISOString();
    }

    const response = await this.api.patch<any>(`/events/${id}`, body);
    return this.toDomain(response.data);
  }
}