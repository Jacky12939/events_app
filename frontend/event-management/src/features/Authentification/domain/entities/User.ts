export type UserRole = 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt?: string;
}