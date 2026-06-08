import { useState, useEffect } from 'react';
import type { Event, OrganizerStats, OrganizerProfile } from '../../domain/entities/Event';
import { EventRepositoryImpl } from '../../data/impRepository/EventRepositoryImpls';

const repo = new EventRepositoryImpl();

export const useOrganizerEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<OrganizerStats | null>(null);
  const [profile, setProfile] = useState<OrganizerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        const [fetchedEvents, fetchedStats, fetchedProfile] = await Promise.all([
          repo.getEvents().catch(() => []),
          repo.getStats().catch(() => null),
          repo.getProfile().catch(() => null)
        ]);

        if (isMounted) {
          setEvents(fetchedEvents || []);
          setStats(fetchedStats);
          setProfile(fetchedProfile);
        }
      } catch (error) {
        console.error("Erreur lors du chargement initial de l'espace Organisateur :", error);
        if (isMounted) {
          setError("Erreur de connexion au serveur");
        }
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
        repo.getEvents().catch(() => []),
        repo.getStats().catch(() => null),
        repo.getProfile().catch(() => null)
      ]);
      setEvents(fetchedEvents || []);
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
    try {
      await repo.createEvent(eventData);
      await refreshData();
    } catch (error) {
      console.error("Erreur lors de la création de l'événement :", error);
      setLoading(false);
      throw error;
    }
  };

  const updateEvent = async (id: string, eventData: Partial<Event>) => {
    setLoading(true);
    try {
      await repo.updateEvent(id, eventData);
      await refreshData();
    } catch (error) {
      console.error("Erreur lors de la modification de l'événement :", error);
      setLoading(false);
      throw error;
    }
  };

  return { events, stats, profile, loading, error, createEvent, updateEvent };
};