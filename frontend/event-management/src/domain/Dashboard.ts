export interface DashboardStats {
  totalEvents: number;
  totalRegistrations: number;
  averageFillRate: number;
  topEvents: TopEvent[];
  dailyRegistrations: DailyRegistration[];
}

export interface TopEvent {
  id: string;
  title: string;
  capacity: number;
  registrations: number;
  fillRate: number;
  status: "DRAFT" | "PUBLISHED" | "CANCELLED";
}

export interface DailyRegistration {
  date: string;
  count: number;
}

export interface OrganizerEvent {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  capacity: number;
  status: "DRAFT" | "PUBLISHED" | "CANCELLED";
  _count?: { registrations: number };
}
