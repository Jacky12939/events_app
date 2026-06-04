import api from '../../../../core/api/axiosInstance';
import type { AuthRepository } from '../../domain/repositories/AuthRepository';
import type { LoginInput, RegisterInput } from '../../presentation/validator/authSchemas';
import type { AuthResponseDto } from '../dtos/AuthDto';
import type { UserSessionEntity } from '../../domain/entities/auth.entity';
import { AuthMapper } from '../mappers/AuthMapper';

export class AuthRepositoryImpl implements AuthRepository {

  async login(credentials: LoginInput): Promise<UserSessionEntity> {
    const response = await api.post<AuthResponseDto>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    return AuthMapper.toSessionEntity(response.data);
  }

  async register(accountData: RegisterInput): Promise<UserSessionEntity> {
    // On n'envoie PAS confirmPassword ni role au backend
    const response = await api.post<AuthResponseDto>('/auth/register', {
      firstName: accountData.firstName,
      lastName: accountData.lastName,
      email: accountData.email,
      password: accountData.password,
    });
    return AuthMapper.toSessionEntity(response.data);
  }
}