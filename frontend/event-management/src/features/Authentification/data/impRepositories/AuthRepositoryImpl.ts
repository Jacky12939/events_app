import { AuthMapper } from '../mappers/AuthMapper';
import type { AuthRepository, LoginPayload, RegisterPayload, AuthResponse } from '../../domain/repositories/AuthRepository';
import type { User } from '../../domain/entities/User';
import api from '../../../../core/api/axiosInstance';

export class AuthRepositoryImpl implements AuthRepository {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post('/auth/login', payload);
    return AuthMapper.toEntity(data);
  }

  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post('/auth/register', payload);
    return AuthMapper.toEntity(data);
  }

  async getProfile(): Promise<User> {
    const { data } = await api.get('/users/me');
    return data;
  }
}