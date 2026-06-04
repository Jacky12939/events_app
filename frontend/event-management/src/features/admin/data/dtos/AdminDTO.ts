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
  date: string;
  slotsTaken: number;
  slotsMax: number;
  category: string;
  status: 'published' | 'draft' | 'completed';
}

export interface AdminProfileDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT';
  createdAt: string;
}
