import type { LoginInput, RegisterInput } from '../../presentation/validator/authSchemas';
import type { UserSessionEntity } from '../entities/auth.entity';

export interface AuthRepository {
  login(credentials: LoginInput): Promise<UserSessionEntity>;
  register(accountData: RegisterInput): Promise<UserSessionEntity>;
}