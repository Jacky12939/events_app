export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  time: string;
  capacity: number;
  registeredCount: number;
  status: 'draft' | 'published' | 'completed'; // Les trois statuts exacts demandés
  organizerName: string;
}

export interface OrganizerStats {
  totalEvents: number;
  publishedEvents: number;
  draftEvents: number;
  completedEvents: number; 
  totalRegistered: number;
}

export interface OrganizerProfile {
  name: string;
  email: string;
  role: string;
  memberSince: string;
}

export interface OrganizerDashboardData {
  recentEvents: Event[];
}