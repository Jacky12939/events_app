export interface AuthResponseDto {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT';
  };
  message?: string;
}