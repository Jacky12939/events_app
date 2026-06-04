import { useState, useMemo, useCallback } from 'react';
import type { ParticipantEventEntity, ParticipantProfileEntity } from '../../domain/entities/ParticipantEntities';
import type { EventFilterInput } from '../validations/participant.validation';
import { ParticipantRepositoryImpl } from '../../data/repositories/participantImpl';



export const useParticipant = () => {
  const [events, setEvents] = useState<ParticipantEventEntity[]>([]);
  const [myTickets, setMyTickets] = useState<ParticipantEventEntity[]>([]);
  const [profile, setProfile] = useState<ParticipantProfileEntity | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<ParticipantEventEntity | null>(null);
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successRegistration, setSuccessRegistration] = useState<boolean>(false);

  const [filters, setFilters] = useState<EventFilterInput>({
    searchQuery: '',
    category: '',
    location: '',
    date: '',
  });

  const repo = useMemo(() => new ParticipantRepositoryImpl(), []);

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [eventsData, ticketsData, profileData] = await Promise.all([
        repo.getAvailableEvents(),
        repo.getMyTickets(),
        repo.getProfile(),
      ]);
      setEvents(eventsData);
      setMyTickets(ticketsData);
      setProfile(profileData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données API.');
    } finally {
      setLoading(false);
    }
  }, [repo]);

  const viewEventDetails = async (eventId: string) => {
    setLoading(true);
    setError(null);
    try {
      const eventDetails = await repo.getEventDetails(eventId);
      setSelectedEvent(eventDetails);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de charger le détail.');
    } finally {
      setLoading(false);
    }
  };

  const registerToEvent = async (eventId: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await repo.registerToEvent(eventId);
      if (result.success) {
        setSuccessRegistration(true);
        await loadDashboardData();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch = e.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) || 
                            e.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      const matchesCategory = !filters.category || e.category === filters.category;
      const matchesLocation = !filters.location || e.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesDate = !filters.date || e.date.includes(filters.date);
      return matchesSearch && matchesCategory && matchesLocation && matchesDate;
    });
  }, [events, filters]);

  return {
    events: filteredEvents,
    myTickets,
    profile,
    selectedEvent,
    loading,
    error,
    filters,
    successRegistration,
    setFilters,
    setSuccessRegistration,
    setSelectedEvent,
    loadDashboardData,
    viewEventDetails,
    registerToEvent,
  };
};