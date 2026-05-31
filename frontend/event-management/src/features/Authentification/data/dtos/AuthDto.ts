export interface LoginDto  { email: string; password: string; }
export interface RegisterDto { email: string; firstName: string; lastName: string; password: string; }
export interface AuthResponseDto {
  message: string;
  access_token: string;
  user: {
    id: string; email: string; firstName: string;
    lastName: string; role: string; createdAt?: string;
  };
}