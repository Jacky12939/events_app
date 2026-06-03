export type EventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED";

export interface Event {
  id: string;
  title: string;
  description?: string;
  location: string;
  startDate: string;
  endDate: string;
  capacity: number;
  status: EventStatus;
  imageUrl?: string;
  organizerId: string;
  categoryId?: string;
  createdAt: string;
  _count?: {
    registrations: number;
  };
}

export interface EventFilters {
  title?: string;
  location?: string;
  categoryId?: string;
  dateFrom?: string;
  dateTo?: string;
}
