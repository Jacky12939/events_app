export interface ParticipantEventDto {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate?: string;
  status: string;
  category?: { id: string; name: string } | null;
  capacity: number;
  _count?: { registrations: number };
  organizer?: { firstName: string; lastName: string };
  qrCode?: string;
}

export interface ParticipantProfileDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  createdAt: string;
}
