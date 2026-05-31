export interface Registration {
  id: string;
  ticketCode: string;
  qrCode: string; // base64 PNG
  registeredAt: string;
  event: {
    id: string; title: string; description: string;
    location: string; startDate: string; endDate: string;
    status: string; imageUrl?: string;
    organizer?: { firstName: string; lastName: string };
    category?: { name: string };
  };
}