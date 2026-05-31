import type { User } from '../entities/User';

export interface LoginPayload  { email: string; password: string; }
export interface RegisterPayload { email: string; firstName: string; lastName: string; password: string; }
export interface AuthResponse  { user: User; access_token: string; message: string; }

export interface AuthRepository {
  login(payload: LoginPayload): Promise<AuthResponse>;

  register(payload: RegisterPayload): Promise<AuthResponse>;

  getProfile(): Promise<User>;
}