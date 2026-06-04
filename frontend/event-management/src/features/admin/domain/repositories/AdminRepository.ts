import type { BaseUser, AdminEventSummary, AdminStats, AdminProfile } from '../entities/AdminEntities';

export interface AdminRepository {
  getStats(): Promise<AdminStats>;
  getUsers(): Promise<BaseUser[]>;
  getLatestEvents(): Promise<AdminEventSummary[]>;
  getProfile(): Promise<AdminProfile>;
  getUserCreatedEvents(userId: string): Promise<AdminEventSummary[]>;
  getUserRegistrations(userId: string): Promise<{ eventTitle: string; date: string; registrationDate: string; ticketNumber: string; category: string }[]>;
  createOrganizer(name: string, email: string): Promise<BaseUser>;
  deleteUser(userId: string): Promise<void>;
}