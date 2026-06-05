import type { BaseUser, AdminEventSummary, AdminStats, AdminProfile, UserRegistration } from '../entities/AdminEntities';

export interface AdminRepository {
  getStats(): Promise<AdminStats>;
  getUsers(): Promise<BaseUser[]>;
  getLatestEvents(): Promise<AdminEventSummary[]>;
  getProfile(): Promise<AdminProfile>;
  getUserCreatedEvents(userId: string): Promise<AdminEventSummary[]>;
  getUserRegistrations(userId: string): Promise<UserRegistration[]>;
  createOrganizer(name: string, email: string): Promise<{ user: BaseUser; tempPassword?: string }>;
  deleteUser(userId: string): Promise<void>;
  updateProfile(data: { name?: string; email?: string; currentPassword?: string; newPassword?: string }): Promise<AdminProfile>;
}