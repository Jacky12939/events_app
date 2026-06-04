import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiCalendar, FiUser, FiLogOut } from 'react-icons/fi';
import { useOrganizerEvents } from './hooks/useOrganizerEvents';
import { Dashboard } from './components/Dashboard';

import { EventDetail } from './components/EventDetail';
import { MyAccount } from './components/MyAccount';
import type { Event } from '../domain/entities/Event';
import { EventForm } from './components/EventFormPage';

export const OrganizerFeatureContainer: React.FC = () => {
  const { view = 'dashboard', id } = useParams<{ view: string; id: string }>();
  const navigate = useNavigate();
  
  const { events, stats, profile, loading, createEvent, updateEvent } = useOrganizerEvents();

  useEffect(() => {
    const validViews = ['dashboard', 'create', 'edit', 'view', 'profile'];
    if (!validViews.includes(view)) {
      navigate('/organizer/dashboard', { replace: true });
    }
  }, [view, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-medium text-sm">
        Chargement de l'espace EventHub...
      </div>
    );
  }

  const handleNavigation = (targetView: string, targetEvent?: { id: string }) => {
    if (targetEvent?.id) {
      navigate(`/organizer/${targetView}/${targetEvent.id}`);
    } else {
      navigate(`/organizer/${targetView}`);
    }
  };

  // Typage strict ici pour remplacer le 'any' problématique
  const handleFormSave = async (formData: Omit<Event, 'id' | 'registeredCount' | 'organizerName'>) => {
    if (view === 'edit' && id) {
      await updateEvent(id, formData);
    } else {
      await createEvent(formData);
    }
    navigate('/organizer/dashboard');
  };

  const selectedEvent = id ? events.find(e => e.id === id) : null;

  return (
    <div className="bg-slate-50 min-h-screen font-sans antialiased">
      <header className="bg-white border-b border-slate-100 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
        <div 
          onClick={() => navigate('/organizer/dashboard')} 
          className="flex items-center gap-2 cursor-pointer text-indigo-600 font-bold text-base"
        >
          <FiCalendar className="w-5 h-5" /> EventHub
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/organizer/profile')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md transition ${
              view === 'profile' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
            }`}
          >
            <FiUser size={14} /> Organisateur
          </button>
          <FiLogOut 
            className="text-slate-400 hover:text-slate-600 cursor-pointer w-4 h-4" 
            onClick={() => navigate('/')}
          />
        </div>
      </header>

      <main className="py-4">
        {view === 'dashboard' && stats && (
          <Dashboard stats={stats} events={events} onNavigate={handleNavigation} />
        )}

        {view === 'create' && (
          <EventForm onSave={handleFormSave} onCancel={() => navigate('/organizer/dashboard')} />
        )}

        {view === 'edit' && (
          <EventForm eventToEdit={selectedEvent} onSave={handleFormSave} onCancel={() => navigate('/organizer/dashboard')} />
        )}

        {view === 'view' && selectedEvent && (
          <EventDetail event={selectedEvent} onBack={() => navigate('/organizer/dashboard')} />
        )}

        {view === 'profile' && profile && (
          <MyAccount profile={profile} />
        )}
      </main>
    </div>
  );
};

export default OrganizerFeatureContainer;