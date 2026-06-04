export interface BaseUser {
  id: string;
  name: string;
  email: string;
  role: 'organisateur' | 'participant';
  registrationDate: string;
}

export interface AdminEventSummary {
  id: string;
  title: string;
  date: string;
  registeredCount: number;
  capacity: number;
  category: string;
  status: 'published' | 'draft' | 'completed';
}

export interface AdminStats {
  totalEvents: number;
  publishedEvents: number;
  totalRegistrations: number;
  organizerCount: number;
  participantCount: number;
}

export interface AdminProfile {
  name: string;
  email: string;
  role: string;
  memberSince: string;
}