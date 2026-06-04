import type { UserSessionEntity } from '../../domain/entities/auth.entity';
import type { AuthResponseDto } from '../dtos/AuthDto';

export class AuthMapper {
  static toSessionEntity(dto: AuthResponseDto): UserSessionEntity {
    const allowedRoles = ['ADMIN', 'ORGANIZER', 'PARTICIPANT'] as const;
    const role = allowedRoles.includes(dto.user.role )
      ? (dto.user.role as 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT')
      : 'PARTICIPANT';

    return {
      token: dto.access_token,
      user: {
        id: dto.user.id,
        firstName: dto.user.firstName,
        lastName: dto.user.lastName,
        email: dto.user.email,
        role,
      },
    };
  }
}