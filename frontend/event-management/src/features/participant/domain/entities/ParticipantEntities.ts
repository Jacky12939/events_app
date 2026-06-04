export interface ParticipantEventEntity {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  registeredCount: number;
  capacity: number;
  availablePlaces: number;
  organizerName: string;
  isRegistered: boolean;
  ticketNumber?: string;
  registrationDate?: string;
}

export interface ParticipantProfileEntity {
  id: string;
  fullName: string;
  email: string;
  role: string;
  joinedDate: string;
  stats: {
    totalRegistered: number;
    accountStatus: 'Actif' | 'Inactif';
    currentYear: number;
  };
}