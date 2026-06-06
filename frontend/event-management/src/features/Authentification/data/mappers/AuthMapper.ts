import type { UserSessionEntity } from '../../domain/entities/auth.entity';
import type { AuthResponseDto } from '../dtos/AuthDto';

export class AuthMapper {
  static toSessionEntity(dto: AuthResponseDto): UserSessionEntity {
    const allowedRoles = ['ADMIN', 'ORGANIZER', 'PARTICIPANT'];
    const role = allowedRoles.includes(dto.user.role)
      ? (dto.user.role as 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT')
      : 'PARTICIPANT';

    const token = dto.access_token || dto.user?.token || '';

    return {
      token,
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
