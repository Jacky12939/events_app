import { useState, useEffect, useCallback } from 'react';
import { EventRepositoryImpl } from '../../data/impRepository/EventRepositoryImpl';
import type { Event, CreateEventPayload, EventFilter } from '../../domain/entities/Event';

const repo = new EventRepositoryImpl();

export function usePublicEvents(filter?: EventFilter) {
  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try   { setEvents(await repo.getPublished(filter)); }
    catch { setError('Erreur lors du chargement des événements'); }
    finally { setLoading(false); }
  }, [JSON.stringify(filter)]);

  useEffect(() => { fetch(); }, [fetch]);
  return { events, loading, error, refresh: fetch };
}

export function useMyEvents() {
  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    try   { setEvents(await repo.getMyEvents()); }
    catch { setError('Erreur'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);
  return { events, loading, error, refresh: fetch };
}

export function useEventActions() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const create = async (payload: CreateEventPayload) => {
    setLoading(true); setError(null);
    try   { return await repo.create(payload); }
    catch (e: any) { setError(e.response?.data?.message || 'Erreur'); throw e; }
    finally { setLoading(false); }
  };

  const update = async (id: string, payload: Partial) => {
    setLoading(true); setError(null);
    try   { return await repo.update(id, payload); }
    catch (e: any) { setError(e.response?.data?.message || 'Erreur'); throw e; }
    finally { setLoading(false); }
  };

  const remove = async (id: string) => {
    setLoading(true); setError(null);
    try   { await repo.remove(id); }
    catch (e: any) { setError(e.response?.data?.message || 'Erreur'); throw e; }
    finally { setLoading(false); }
  };

  return { create, update, remove, loading, error };
}