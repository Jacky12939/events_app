import { useState, useEffect } from 'react';

import type { AdminEventSummary, AdminProfile, AdminStats, BaseUser } from '../../domain/entities/AdminEntities';
import { AdminRepositoryImpl } from '../../data/repositories/AdminRepositoryImpl';

const repo = new AdminRepositoryImpl();

export const useAdminData = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<BaseUser[]>([]);
  const [events, setEvents] = useState<AdminEventSummary[]>([]);
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const darkModeStored = localStorage.getItem('admin-theme') === 'dark';
  const [darkMode, setDarkMode] = useState(darkModeStored);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('admin-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('admin-theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialAdminData = async () => {
      try {
        const [s, u, e, p] = await Promise.all([
          repo.getStats(),
          repo.getUsers(),
          repo.getLatestEvents(),
          repo.getProfile(),
        ]);

        if (isMounted) {
          setStats(s);
          setUsers(u);
          setEvents(e);
          setProfile(p);
        }
      } catch (err) {
        console.error("Erreur lors du chargement de l'espace admin :", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchInitialAdminData();

    return () => {
      isMounted = false;
    };
  }, []);

  const refreshAdminData = async () => {
    try {
      const [s, u, e, p] = await Promise.all([
        repo.getStats(),
        repo.getUsers(),
        repo.getLatestEvents(),
        repo.getProfile(),
      ]);
      setStats(s);
      setUsers(u);
      setEvents(e);
      setProfile(p);
    } catch (err) {
      console.error("Erreur lors du rafraîchissement des données admin :", err);
    } finally {
      setLoading(false);
    }
  };
const addOrganizer = async (name: string, email: string) => {
    setLoading(true);
    let passwordToReturn = undefined;

    try {
        const result = await repo.createOrganizer(name, email);
       
        // Ce log va grandement t'aider dans la console du navigateur (F12)
        console.log("=== RÉPONSE DU SERVEUR ===", result);
       
        await refreshAdminData();

        // Cette ligne tente de récupérer le mot de passe peu importe son nom (tempPassword ou password)
        passwordToReturn = result?.tempPassword || result?.password || result?.data?.tempPassword || result?.data?.password;

    } catch (err) {
        alert("Échec de création : " + (err instanceof Error ? err.message : err));
    } finally {
        setLoading(false);
    }

    return passwordToReturn;
};

  const removeUser = async (id: string) => {
    setLoading(true);
    await repo.deleteUser(id);
    await refreshAdminData();
  };

  const fetchUserContext = async (user: BaseUser) => {
    if (user.role === 'organisateur') {
      const created = await repo.getUserCreatedEvents(user.id);
      return { created, registrations: [] };
    } else {
      const regs = await repo.getUserRegistrations(user.id);
      return { created: [], registrations: regs };
    }
  };

  return {
    stats,
    users,
    events,
    profile,
    loading,
    darkMode,
    toggleDarkMode,
    addOrganizer,
    removeUser,
    fetchUserContext
  };
};
