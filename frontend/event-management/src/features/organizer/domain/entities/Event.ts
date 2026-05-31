export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELLED';

export interface EventCategory { id: string; name: string; }

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  status: EventStatus;
  capacity: number;
  imageUrl?: string;
  organizerId: string;
  categoryId?: string;
  category?: EventCategory;
  organizer?: { id: string; firstName: string; lastName: string };
  _count?: { registrations: number };
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventPayload {
  title: string; description: string; location: string;
  startDate: string; endDate: string; capacity: number;
  status?: EventStatus; imageUrl?: string; categoryId?: string;
}

export interface EventFilter {
  title?: string; location?: string; categoryId?: string;
  dateFrom?: string; dateTo?: string;
}