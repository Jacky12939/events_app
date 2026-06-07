import React from 'react';
import { FiCalendar, FiEye, FiFileText, FiUsers, FiPlus, FiEdit, FiCheckCircle } from 'react-icons/fi';
import type { OrganizerStats , Event} from '../../domain/entities/Event';

interface DashboardProps {
  stats: OrganizerStats | null;
  events: Event[];
  onNavigate: (view: string, targetEvent?: Event) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, events, onNavigate }) => {
  const safeStats = stats || {
    totalEvents: 0,
    publishedEvents: 0,
    draftEvents: 0,
    completedEvents: 0,
    totalRegistered: 0,
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-slate-50 min-h-screen">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard Organisateur</h1>
          <p className="text-xs font-medium text-slate-500 mt-1">
            Visualisez et gérez vos flux de réservations et statuts d'événements.
          </p>
        </div>

        <button 
          onClick={() => onNavigate('create')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold text-sm px-4 py-3 rounded-xl shadow-md shadow-indigo-600/10 transition-all cursor-pointer"
        >
          <FiPlus className="w-4 h-4" /> <span>Créer un événement</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total événements</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{safeStats.totalEvents}</h3>
          </div>
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <FiCalendar className="w-4 h-4" />
          </div>
        </div>
        
<div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Publiés</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{safeStats.publishedEvents}</h3>
          </div>
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <FiEye className="w-4 h-4" />
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Brouillons</p>
            <h3 className="text-2xl font-black text-slate-700 mt-1">{safeStats.draftEvents}</h3>
          </div>
          <div className="p-2.5 bg-slate-100 text-slate-600 rounded-xl">
            <FiFileText className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Terminés</p>
            <h3 className="text-2xl font-black text-blue-600 mt-1">{safeStats.completedEvents}</h3>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <FiCheckCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total inscrits</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{safeStats.totalRegistered}</h3>
          </div>
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <FiUsers className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-base font-black text-slate-900 mb-5">Mes événements récents</h2>
        <div className="divide-y divide-slate-100">
          {events.map((event) => (
            <div key={event.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 first:pt-0 last:pb-0 group">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5 flex-wrap">
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                    {event.title || "Sans titre"}
                  </h3>
                  
                  {event.status === 'published' && (
                    <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/40">
                      Publié
                    </span>
                  )}
                  {event.status === 'draft' && (
                    <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Brouillon
                    </span>
                  )}
                  {event.status === 'completed' && (
                    <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200/40">
                      Terminé
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-medium">
                  <span>📅 {event.date || 'Non définie'}</span>
                  <span>👥 {event.registeredCount}/{event.capacity || 0} inscrits</span>
                  {event.category && (
                    <span className="bg-indigo-50/60 text-indigo-600 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                      {event.category}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button 
                  onClick={() => onNavigate('edit', event)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
                >
                  <FiEdit size={12} /> Modifier
                </button>
                <button 
                  onClick={() => onNavigate('view', event)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 border border-slate-200 text-slate-600 px-3 py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 transition cursor-pointer"
                >
                  <FiEye size={12} /> Voir
                </button>
              </div>
            </div>
          ))}
          
          {events.length === 0 && (
            <div className="text-center py-10">
              <p className="text-sm font-bold text-slate-400">Aucun événement dans votre tableau de bord.</p>
              <p className="text-xs text-slate-400/80 mt-1">Commencez par ajouter ou planifier un nouveau projet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};