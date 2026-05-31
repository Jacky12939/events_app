import type { User } from '../../domain/entities/User';
import type { AuthResponseDto } from '../dtos/AuthDto';
import type { AuthResponse } from '../../domain/repositories/AuthRepository';

export const AuthMapper = {
  toEntity(dto: AuthResponseDto): AuthResponse {
    return {
      message: dto.message,
      access_token: dto.access_token,
      user: {
        id: dto.user.id,
        email: dto.user.email,
        firstName: dto.user.firstName,
        lastName: dto.user.lastName,
        role: dto.user.role as User['role'],
        createdAt: dto.user.createdAt,
      },
    };
  },
};