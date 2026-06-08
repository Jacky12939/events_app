import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiUser, FiLogOut } from 'react-icons/fi';
import { useOrganizerEvents } from './hooks/useOrganizerEvents';
import { Dashboard } from './components/Dashboard';
import { EventDetail } from './components/EventDetail';
import { MyAccount } from './components/MyAccount';
import { EventForm } from './components/EventFormPage';
import type { Event } from '../domain/entities/Event';

export const OrganizerFeatureContainer: React.FC = () => {
  // ✅ BUG 7 CORRIGÉ : :view vient maintenant des params grâce aux routes unifiées
  const { view = 'dashboard', id } = useParams<{ view: string; id: string }>();
  const navigate = useNavigate();

  const { events, stats, profile, loading, error, createEvent, updateEvent } = useOrganizerEvents();

  useEffect(() => {
    const validViews = ['dashboard', 'create', 'edit', 'view', 'profile'];
    if (!validViews.includes(view)) {
      navigate('/organizer/dashboard', { replace: true });
    }
  }, [view, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-semibold text-xs tracking-wide">
        Chargement de l'espace EventHub...
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Erreur de connexion</h2>
          <p className="text-slate-500 text-sm mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition cursor-pointer">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased">
      <header className="bg-white border-b border-slate-100 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <div onClick={() => navigate('/organizer/dashboard')} className="flex items-center gap-2 cursor-pointer text-indigo-600 font-black text-base tracking-tight">
          <FiCalendar className="w-5 h-5" /> EventHub
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/organizer/profile')}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition ${view === 'profile' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
          >
            <FiUser size={14} /> Organisateur
          </button>
          <FiLogOut
            className="text-slate-400 hover:text-slate-600 transition cursor-pointer w-4 h-4"
            onClick={() => { localStorage.removeItem('access_token'); localStorage.removeItem('user'); navigate('/'); }}
          />
        </div>
      </header>

      <main className="py-4">
        {view === 'dashboard' && <Dashboard stats={stats} events={events} onNavigate={handleNavigation} />}
        {view === 'create' && <EventForm onSave={handleFormSave} onCancel={() => navigate('/organizer/dashboard')} />}
        {view === 'edit' && <EventForm eventToEdit={selectedEvent} onSave={handleFormSave} onCancel={() => navigate('/organizer/dashboard')} />}
        {view === 'view' && selectedEvent && <EventDetail event={selectedEvent} onBack={() => navigate('/organizer/dashboard')} />}
        {view === 'view' && !selectedEvent && (
          <div className="p-6 text-center">
            <p className="text-slate-500">Événement non trouvé ou vous n'avez pas accès à cet événement</p>
            <button onClick={() => navigate('/organizer/dashboard')} className="mt-4 px-4 py-2 text-indigo-600 underline cursor-pointer">Retour au dashboard</button>
          </div>
        )}
        {/* ✅ BUG 7 CORRIGÉ : profile fonctionne maintenant */}
        {view === 'profile' && profile && <MyAccount profile={profile} />}
        {view === 'profile' && !profile && (
          <div className="p-6 text-center"><p className="text-slate-500">Impossible de charger le profil</p></div>
        )}
      </main>
    </div>
  );
};

export default OrganizerFeatureContainer;