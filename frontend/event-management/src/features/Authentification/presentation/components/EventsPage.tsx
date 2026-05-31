import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMapPin, FiCalendar, FiUsers, FiFilter, FiLogOut,  FiSun, FiMoon } from 'react-icons/fi';
import { useRegisterToEvent } from '../hooks/useRegistrations';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../../../../context/ThemeContext';
import { usePublicEvents } from '../../../organizer/presentation/hooks/useEvents';

// Définition locale de l'interface Event pour s'aligner avec le hook et supprimer l'erreur 'never'
interface EventModel {
  id: string;
  title: string;
  description: string;
  startDate: string;
  location: string;
  capacity: number;
  status: 'PUBLISHED' | 'DRAFT' | 'CANCELLED';
  category?: {
    name: string;
  };
  _count?: {
    registrations: number;
  };
}

const STATUS_COLORS = {
  PUBLISHED: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  DRAFT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
};

export default function EventsPage() {
  const { darkMode, toggleTheme } = useTheme();
  const { logout, getUser } = useAuth();
  const user = getUser();

  const [filters, setFilters] = useState({ title: '', location: '', dateFrom: '', dateTo: '' });
  const [applied, setApplied] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [registering, setRegistering] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ id: string; msg: string; ok: boolean } | null>(null);

  // Forçage sécurisé du type de retour pour s'assurer que TypeScript lise 'EventModel[]' à la place de 'never[]'
  const { events, loading, error } = usePublicEvents(applied) as {
    events: EventModel[];
    loading: boolean;
    error: string | null;
  };
  
  const { register } = useRegisterToEvent();

  const applyFilters = () => setApplied({ ...filters });
  const clearFilters = () => {
    setFilters({ title: '', location: '', dateFrom: '', dateTo: '' });
    setApplied({});
  };

  const handleRegister = async (eventId: string) => {
    setRegistering(eventId);
    setFeedback(null);
    try {
      const res = await register(eventId);
      setFeedback({ id: eventId, msg: res.message || 'Inscrit ! Billet généré.', ok: true });
    } catch (e: any) {
      setFeedback({ id: eventId, msg: e.response?.data?.message || 'Erreur', ok: false });
    } finally {
      setRegistering(null);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-sm sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-black bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">EventHub</div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            {darkMode ? <FiSun size={20} className="text-yellow-400" /> : <FiMoon size={20} className="text-gray-600" />}
          </button>
          {user ? (
            <div className="flex items-center space-x-3">
              <Link to="/my-tickets" className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-sm transition text-sm font-medium">Mes billets</Link>
              <span className="font-medium text-sm hidden sm:inline">{user.firstName} {user.lastName}</span>
              <button onClick={logout} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-red-500 transition" aria-label="Déconnexion">
                <FiLogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-sm font-medium">Se connecter</Link>
          )}
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Découvrez les événements</h2>
          <p className="mb-8 text-indigo-100 text-base md:text-lg max-w-xl mx-auto">
            Concerts, conférences, festivals, ateliers... Trouvez l'événement qui vous correspond et recevez votre billet instantanément.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/register" className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl shadow hover:bg-gray-50 transition text-sm">
              Créer un compte
            </Link>
            <a href="#explore" className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition text-sm">
              Explorer les événements
            </a>
          </div>
        </div>
      </section>

      {/* Search + Filter Bar */}
      <section id="explore" className="p-4 md:p-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={filters.title}
              onChange={(e) => setFilters((p) => ({ ...p, title: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <div className="relative w-full md:w-72">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Lieu..."
              value={filters.location}
              onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-medium transition ${showFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-900/20 dark:border-indigo-800 dark:text-indigo-400' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
          >
            <FiFilter /> Filtres
          </button>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="max-w-7xl mx-auto mt-4 bg-gray-50 dark:bg-gray-700/50 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1.5 text-xs font-semibold uppercase text-gray-500">Date début</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters((p) => ({ ...p, dateFrom: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block mb-1.5 text-xs font-semibold uppercase text-gray-500">Date fin</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters((p) => ({ ...p, dateTo: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button onClick={clearFilters} className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition">
                Effacer les filtres
              </button>
              <button onClick={applyFilters} className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow transition">
                Rechercher
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Events Grid */}
      <section className="p-4 md:p-8 flex-1 max-w-7xl w-full mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/50 animate-pulse space-y-4">
                <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 font-medium py-12">{error}</div>
        ) : (
          <>
            <div className="mb-6 text-sm font-medium text-gray-500 dark:text-gray-400">
              {events.length} événement{events.length !== 1 ? 's' : ''} trouvé{events.length !== 1 ? 's' : ''}
            </div>
            {events.length === 0 ? (
              <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 text-gray-500">
                Aucun événement disponible
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div key={event.id} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700/60 hover:shadow-md transition flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        {event.category && (
                          <span className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                            {event.category.name}
                          </span>
                        )}
                        <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold uppercase tracking-wider ${STATUS_COLORS[event.status] || 'bg-gray-100 text-gray-700'}`}>
                          {event.status}
                        </span>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight line-clamp-1">{event.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1.5 line-clamp-2">{event.description}</p>
                      </div>
                      
                      <div className="pt-2 border-t border-gray-50 dark:border-gray-700/50 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="text-indigo-500 shrink-0" size={14} />
                          <span>{new Date(event.startDate).toLocaleDateString('fr-FR', { day:'numeric', month:'long', year:'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="text-indigo-500 shrink-0" size={14} />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiUsers className="text-indigo-500 shrink-0" size={14} />
                          <span>{event._count?.registrations ?? 0} / <strong className="text-gray-900 dark:text-white">{event.capacity} places</strong></span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-gray-50 dark:border-gray-700/50">
                      {feedback?.id === event.id && (
                        <div className={`mb-3 p-2.5 rounded-xl text-xs font-medium text-center ${feedback.ok ? 'bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400'}`}>
                          {feedback.msg}
                        </div>
                      )}

                      {user?.role === 'PARTICIPANT' ? (
                        <button
                          onClick={() => handleRegister(event.id)}
                          disabled={registering === event.id || (event._count?.registrations ?? 0) >= event.capacity}
                          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-sm font-semibold rounded-xl transition shadow-sm"
                        >
                          {registering === event.id ? 'Inscription...' : (event._count?.registrations ?? 0) >= event.capacity ? 'Complet' : "S'inscrire"}
                        </button>
                      ) : !user ? (
                        <Link to="/login" className="w-full block py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-xl text-sm text-center transition">
                          Se connecter pour s'inscrire
                        </Link>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Footer */}
      <footer className="p-5 text-center text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-auto">
        © {new Date().getFullYear()} EventHub — Tous droits réservés
      </footer>
    </div>
  );
}