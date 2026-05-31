import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUsers, FiFileText, FiXCircle, FiPlus, FiTrash2, FiSun, FiMoon, FiLogOut } from 'react-icons/fi';
import { useMyEvents, useEventActions } from '../hooks/useEvents';

import { EventRepositoryImpl } from '../../data/impRepository/EventRepositoryImpl';
import type { Event } from '../../domain/entities/Event';
import { useTheme } from '../../../../context/ThemeContext';
import { useAuth } from '../../../Authentification/presentation/hooks/useAuth';

const STATUS_BADGE: Record<string, string> = {
  PUBLISHED: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  DRAFT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

const repo = new EventRepositoryImpl();

export default function OrganizerDashboard() {
  const { darkMode, toggleTheme } = useTheme();
  const { logout, getUser } = useAuth();
  const user = getUser();

  const { events, loading: evLoading, refresh } = useMyEvents();
  const { remove } = useEventActions();
  const [stats, setStats] = useState<any>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    repo.getDashboard().then(setStats).catch(() => null);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet événement ?')) return;
    setDeleting(id);
    try {
      await remove(id);
      refresh();
    } finally {
      setDeleting(null);
    }
  };

  const statCards = [
    { label: 'Total', value: stats?.stats?.total ?? 0, icon: FiCalendar, color: 'indigo' },
    { label: 'Publiés', value: stats?.stats?.published ?? 0, icon: FiUsers, color: 'green' },
    { label: 'Brouillons', value: stats?.stats?.draft ?? 0, icon: FiFileText, color: 'yellow' },
    { label: 'Annulés', value: stats?.stats?.cancelled ?? 0, icon: FiXCircle, color: 'red' },
    { label: 'Inscriptions', value: stats?.stats?.totalRegistrations ?? 0, icon: FiUsers, color: 'purple' },
  ];

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md sticky top-0 z-50 bg-inherit">
        {/* Logo / Titre */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">E</div>
          <h1 className="text-xl font-semibold">Dashboard Organisateur</h1>
        </div>
        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>
          <button onClick={logout} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Déconnexion">
            <FiLogOut size={20} />
          </button>
        </div>
      </nav>

      {/* Accueil / Bienvenue */}
      <section className="p-8 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Bonjour, {user?.firstName} 👋</h2>
        <p className="mb-4">Gérez vos événements et suivez vos inscriptions</p>
        <Link to="/create-event" className="px-6 py-3 bg-white text-purple-600 font-semibold rounded shadow hover:bg-gray-100 transition">
          Nouveau événement
        </Link>
      </section>

      {/* Statistiques */}
      <section className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-800">
        {statCards.map((s) => (
          <div key={s.label} className="flex items-center p-4 rounded-lg shadow bg-white dark:bg-gray-700">
            <div className={`p-3 rounded-full bg-${s.color}-100 text-${s.color}-700 mr-4`}>
              <s.icon size={24} />
            </div>
            <div>
              <p className="text-xl font-bold">{s.value}</p>
              <p className="text-gray-600 dark:text-gray-300">{s.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Tableau des événements */}
      <section className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-800">
        <h3 className="text-2xl font-semibold mb-4">Mes événements</h3>
        <div className="flex justify-between items-center mb-4">
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition" onClick={() => {/* Ajoutez la logique pour créer un événement */}}>
            <FiPlus className="inline-block mr-2" /> Nouveau
          </button>
        </div>

        {evLoading ? (
          <div>Chargement...</div>
        ) : events.length === 0 ? (
          <div className="p-4 bg-white dark:bg-gray-700 rounded shadow text-center">
            <p>Aucun événement créé</p>
            <Link to="/create-event" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Créer votre premier événement →
            </Link>
          </div>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                {['Événement', 'Lieu', 'Date', 'Statut', 'Participants', 'Actions'].map((h) => (
                  <th key={h} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {events.map((ev: Event) => (
                <tr key={ev.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="px-4 py-2">{ev.title}</td>
                  <td className="px-4 py-2">{ev.location}</td>
                  <td className="px-4 py-2">{new Date(ev.startDate).toLocaleDateString('fr-FR')}</td>
                  <td className={`px-4 py-2 ${STATUS_BADGE[ev.status]}`}>{ev.status}</td>
                  <td className="px-4 py-2">{ev._count?.registrations ?? 0} / {ev.capacity}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition"
                      onClick={() => handleDelete(ev.id)}
                      disabled={deleting === ev.id}
                      aria-label="Supprimer"
                    >
                      <FiTrash2 size={20} />
                    </button>
                    {/* Ajoutez d'autres actions si besoin, par ex. Modifier */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Footer */}
      <footer className="p-4 text-center bg-gray-200 dark:bg-gray-900">
        © {new Date().getFullYear()} EventHub — Tous droits réservés
      </footer>
    </div>
  );
}