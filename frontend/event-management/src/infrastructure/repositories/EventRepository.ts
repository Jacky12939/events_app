import api from "../api/axiosInstance";
import type { Event, EventFilters } from "../../domain/entities/Events";

export const EventRepository = {
  async findAll(filters?: EventFilters): Promise<Event[]> {
    const { data } = await api.get("/events", { params: filters });
    return data;
  },

  async findById(id: string): Promise<Event> {
    const { data } = await api.get(`/events/${id}`);
    return data;
  },
};
