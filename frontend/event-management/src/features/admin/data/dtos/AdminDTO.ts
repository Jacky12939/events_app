export interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT';
  createdAt: string;
}

export interface AdminEventDTO {
  id: string;
  title: string;
  description?: string;
  location: string;
  startDate: string;
  endDate?: string;
  status: 'DRAFT' | 'PUBLISHED' | 'COMPLETED';
  category?: { id: string; name: string } | null;
  capacity: number;
  _count?: { registrations: number };
  organizer?: { firstName: string; lastName: string };
}

export interface AdminProfileDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT';
  createdAt: string;
}
