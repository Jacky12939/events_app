import { useState, useEffect } from 'react';
import type { Event, OrganizerStats, OrganizerProfile } from '../../domain/entities/Event';
import { EventRepositoryImpl } from '../../data/impRepository/EventRepositoryImpls';

const repo = new EventRepositoryImpl();

export const useOrganizerEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<OrganizerStats | null>(null);
  const [profile, setProfile] = useState<OrganizerProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        const [fetchedEvents, fetchedStats, fetchedProfile] = await Promise.all([
          repo.getEvents(),
          repo.getStats(),
          repo.getProfile()
        ]);

        if (isMounted) {
          setEvents(fetchedEvents);
          setStats(fetchedStats);
          setProfile(fetchedProfile);
        }
      } catch (error) {
        console.error("Erreur lors du chargement initial de l'espace Organisateur :", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshData = async () => {
    try {
      const [fetchedEvents, fetchedStats, fetchedProfile] = await Promise.all([
        repo.getEvents(),
        repo.getStats(),
        repo.getProfile()
      ]);
      setEvents(fetchedEvents);
      setStats(fetchedStats);
      setProfile(fetchedProfile);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des données :", error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<Event, 'id' | 'registeredCount' | 'organizerName'>) => {
    setLoading(true);
    await repo.createEvent(eventData);
    await refreshData();
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    setLoading(true);
    await repo.updateEvent(id, eventData);
    await refreshData();
  };

  return { events, stats, profile, loading, createEvent, updateEvent };
};