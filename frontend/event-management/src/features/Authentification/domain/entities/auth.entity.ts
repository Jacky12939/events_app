export interface UserSessionEntity {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'ADMIN' | 'ORGANIZER' | 'PARTICIPANT';
  };
}

export interface Registration {
  id: string;
  ticketCode: string;
  qrCode: string;
  createdAt: string;
  event: {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    location: string;
  };
}