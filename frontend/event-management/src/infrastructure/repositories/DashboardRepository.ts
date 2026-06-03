import api from "../api/axiosInstance";
import type { DashboardStats, OrganizerEvent } from "../../domain/Dashboard";

export const DashboardRepository = {
  async getStats(orgId: string): Promise<DashboardStats> {
    const { data } = await api.get(`/events/organizer/dashboard/${orgId}`);
    return data;
  },

  async getMyEvents(orgId: string): Promise<OrganizerEvent[]> {
    const { data } = await api.get(`/events/organizer/my-events/${orgId}`);
    return data;
  },

  async deleteEvent(eventId: string): Promise<void> {
    await api.delete(`/events/${eventId}`);
  },

  async updateEventStatus(eventId: string, status: string): Promise<void> {
    await api.patch(`/events/${eventId}`, { status });
  },
};
