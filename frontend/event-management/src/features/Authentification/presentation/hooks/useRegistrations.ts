import { useState, useEffect, useCallback } from 'react';
import { RegistrationRepositoryImpl } from '../../data/impRepositories/RegistrationRepositoryImpl';
import type { Registration } from '../../domain/entities/Registration';

const repo = new RegistrationRepositoryImpl();

export function useMyRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Définition de la fonction de récupération pure sans effets de bord synchrones
  const fetchRegistrations = useCallback(async () => {
    try { 
      return await repo.getMyRegistrations();
    } catch { 
      throw new Error('Erreur lors du chargement de vos inscriptions'); 
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // Évite d'appeler setLoading(true) si l'état initial est déjà à true
    fetchRegistrations()
      .then((data) => {
        if (isMounted) {
          setRegistrations(data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    // Nettoyage de l'effet en cas de double rendu ou démontage du composant
    return () => {
      isMounted = false;
    };
  }, [fetchRegistrations]);

  // Fonction de rafraîchissement manuel exposée en toute sécurité
  const handleRefresh = useCallback(() => {
    setLoading(true);
    fetchRegistrations()
      .then((data) => {
        setRegistrations(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fetchRegistrations]);

  return { registrations, loading, error, refresh: handleRefresh };
}

export function useRegisterToEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [ticket, setTicket] = useState<Registration | null>(null);

  const register = async (eventId: string) => {
    setLoading(true); 
    setError(null); 
    setSuccess(null);
    try {
      const res = await repo.registerToEvent(eventId);
      setTicket(res.ticket);
      setSuccess(res.message);
      return res;
    } catch (e: any) {
      const msg = e.response?.data?.message || 'Erreur lors de l\'inscription';
      setError(msg);
      throw e;
    } finally { 
      setLoading(false); 
    }
  };

  const unregister = async (eventId: string) => {
    setLoading(true); 
    setError(null);
    try { 
      await repo.unregister(eventId); 
      setSuccess('Désinscription effectuée'); 
    } catch (e: any) { 
      setError(e.response?.data?.message || 'Erreur'); 
      throw e; 
    } finally { 
      setLoading(false); 
    }
  };

  return { register, unregister, loading, error, success, ticket };
}