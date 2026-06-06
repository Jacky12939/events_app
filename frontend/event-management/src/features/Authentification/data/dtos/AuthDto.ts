export interface AuthResponseDto {
    access_token?: string;
    message?: string;
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT';
        token?: string;
    };
}
