import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { useOrganizerEvents } from './hooks/useOrganizerEvents';
import { Dashboard } from './components/Dashboard';
import { EventDetail } from './components/EventDetail';
import { MyAccount } from './components/MyAccount';
import { EventForm } from './components/EventFormPage';
import type { Event } from '../domain/entities/Event';
import logo1 from '../../../../assets/logo1.png';
import { useTheme } from '../../../context/ThemeContext';

export const OrganizerFeatureContainer: React.FC = () => {
  const { view = 'dashboard', id } = useParams<{ view: string; id: string }>();
  const navigate = useNavigate();

  // Intégration du contexte Theme personnalisé
  const { darkMode, toggleTheme } = useTheme();

  const { events, stats, profile, loading, error, createEvent, updateEvent } = useOrganizerEvents();

  useEffect(() => {
    const validViews = ['dashboard', 'create', 'edit', 'view', 'profile'];
    if (!validViews.includes(view)) {
      navigate('/organizer/dashboard', { replace: true });
    }
  }, [view, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-indigo-600 dark:text-indigo-400 font-bold text-sm tracking-wide transition-colors duration-200">
        Chargement de l'espace Eventory...
      </div>
    );
  }

  const handleNavigation = (targetView: string, targetEvent?: Event) => {
    if (targetEvent?.id) navigate(`/organizer/${targetView}/${targetEvent.id}`);
    else navigate(`/organizer/${targetView}`);
  };

  const handleFormSave = async (formData: Omit<Event, 'id' | 'registeredCount' | 'organizerName'>) => {
    if (view === 'edit' && id) await updateEvent(id, formData);
    else await createEvent(formData);
    navigate('/organizer/dashboard');
  };

  const selectedEvent = id ? events.find(e => e.id === id) : null;

  if (error && view === 'dashboard') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 transition-colors duration-200">
        <div className="text-center max-w-md w-full bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Erreur de connexion</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-5">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-600/10 transition-all cursor-pointer"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans antialiased transition-colors duration-200">
      
      {/* HEADER NAVBAR RESPONSIVE */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60 px-4 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center sticky top-0 z-50 transition-colors duration-200 shadow-sm">
        
        {/* LOGO ET NOM ALIGNÉS (Optimisation taille mobile) */}
        <div 
          onClick={() => navigate('/organizer/dashboard')} 
          className="flex items-center cursor-pointer group shrink-0"
        >
          <img src={logo1} alt="Logo" className="w-20 h-14 sm:w-24 sm:h-16 object-contain" />
          <span className="text-lg sm:text-xl font-black tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 -ml-6 sm:-ml-8 select-none">
            ventory
          </span>
        </div>

        {/* ACTIONS DE LA NAVBAR ACCESSIBLES AU POUCE */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* SWITCH THÈME */}
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-transparent text-slate-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-slate-700/80 transition-all cursor-pointer"
            title={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
          >
            {darkMode ? <FiSun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <FiMoon size={16} className="sm:w-[18px] sm:h-[18px]" />}
          </button>

          {/* COMPTE ORGANISATEUR (Texte caché sur mobile pour gagner de la place) */}
          <button
            onClick={() => navigate('/organizer/profile')}
            className={`flex items-center justify-center gap-1.5 text-xs font-bold p-2.5 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
              view === 'profile' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25' 
                : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/40'
            }`}
            title="Mon profil organisateur"
          >
            <FiUser size={16} className="sm:w-[14px] sm:h-[14px]" /> 
            <span className="hidden sm:inline">Organisateur</span>
          </button>

          {/* SÉCURITÉ DÉCONNEXION */}
          <button
            onClick={() => { 
              localStorage.removeItem('access_token'); 
              localStorage.removeItem('user'); 
              navigate('/'); 
            }}
            className="p-2.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-transparent transition-all cursor-pointer"
            title="Déconnexion"
          >
            <FiLogOut className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
      </header>

      {/* ZONE CONTENU PRINCIPAL */}
      <main className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {view === 'dashboard' && <Dashboard stats={stats} events={events} onNavigate={handleNavigation} />}
        {view === 'create' && <EventForm onSave={handleFormSave} onCancel={() => navigate('/organizer/dashboard')} />}
        {view === 'edit' && <EventForm eventToEdit={selectedEvent} onSave={handleFormSave} onCancel={() => navigate('/organizer/dashboard')} />}
        {view === 'view' && selectedEvent && <EventDetail event={selectedEvent} onBack={() => navigate('/organizer/dashboard')} />}
        
        {view === 'view' && !selectedEvent && (
          <div className="p-8 sm:p-12 text-center bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm max-w-xl mx-auto">
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Événement non trouvé ou accès refusé.</p>
            <button onClick={() => navigate('/organizer/dashboard')} className="mt-4 px-4 py-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold rounded-xl text-xs hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all cursor-pointer">
              Retour au tableau de bord
            </button>
          </div>
        )}
        
        {view === 'profile' && profile && <MyAccount profile={profile} />}
        {view === 'profile' && !profile && (
          <div className="p-8 sm:p-12 text-center text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm max-w-xl mx-auto text-sm font-medium">
            Impossible de charger votre profil.
          </div>
        )}
      </main>
    </div>
  );
};

export default OrganizerFeatureContainer;