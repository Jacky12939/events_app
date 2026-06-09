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
    <div className="max-w-7xl mx-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-200">
      
      {/* HEADER SECTION (Responsive stack on mobile) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Dashboard Organisateur</h1>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            Visualisez et gérez vos flux de réservations et statuts d'événements.
          </p>
        </div>

        <button 
          onClick={() => onNavigate('create')}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-md shadow-indigo-600/10 dark:shadow-indigo-600/5 transition-all cursor-pointer"
        >
          <FiPlus className="w-4 h-4" /> <span>Créer un événement</span>
        </button>
      </div>

      {/* STATS GRID (Ajustée pour 1 col sur mobile, 2 ou 3 sur tablette, 5 sur PC) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        
        {/* Total Événements */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex justify-between items-center transition-all">
          <div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total événements</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{safeStats.totalEvents}</h3>
          </div>
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <FiCalendar className="w-4 h-4" />
          </div>
        </div>
        
        {/* Publiés */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex justify-between items-center transition-all">
          <div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Publiés</p>
            <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{safeStats.publishedEvents}</h3>
          </div>
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <FiEye className="w-4 h-4" />
          </div>
        </div>
        
        {/* Brouillons */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex justify-between items-center transition-all">
          <div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Brouillons</p>
            <h3 className="text-2xl font-black text-slate-700 dark:text-slate-300 mt-1">{safeStats.draftEvents}</h3>
          </div>
          <div className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl">
            <FiFileText className="w-4 h-4" />
          </div>
        </div>

        {/* Terminés */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex justify-between items-center transition-all">
          <div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Terminés</p>
            <h3 className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{safeStats.completedEvents}</h3>
          </div>
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-xl">
            <FiCheckCircle className="w-4 h-4" />
          </div>
        </div>

        {/* Total Inscrits */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm flex justify-between items-center transition-all">
          <div>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Total inscrits</p>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{safeStats.totalRegistered}</h3>
          </div>
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <FiUsers className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* RECENT EVENTS LIST */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm p-4 sm:p-6 transition-all">
        <h2 className="text-base font-black text-slate-900 dark:text-white mb-5">Mes événements récents</h2>
        
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {events.map((event) => (
            <div key={event.id} className="py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 first:pt-0 last:pb-0 group">
              
              <div className="space-y-1.5 w-full md:w-auto">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {event.title || "Sans titre"}
                  </h3>
                  
                  {/* Status Badges */}
                  {event.status === 'published' && (
                    <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-800/30">
                      Publié
                    </span>
                  )}
                  {event.status === 'draft' && (
                    <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      Brouillon
                    </span>
                  )}
                  {event.status === 'completed' && (
                    <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/40 dark:border-blue-800/30">
                      Terminé
                    </span>
                  )}
                </div>
                
                {/* Event Meta info */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>Date : {event.date || 'Non définie'}</span>
                  <span className="flex items-center gap-1">
                    Inscrits : <strong className="text-slate-700 dark:text-slate-300 font-semibold">{event.registeredCount}</strong>/{event.capacity || 0}
                  </span>
                  {event.category && (
                    <span className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {event.category}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Action Buttons (Full width on mobile/tablets, row content on desktop) */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <button 
                  onClick={() => onNavigate('edit', event)}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white px-4 py-2.5 md:py-2 rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <FiEdit size={12} /> Modifier
                </button>
                <button 
                  onClick={() => onNavigate('view', event)}
                  className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2.5 md:py-2 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <FiEye size={12} /> Voir
                </button>
              </div>

            </div>
          ))}
          
          {/* Empty State */}
          {events.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm font-bold text-slate-400 dark:text-slate-500">Aucun événement dans votre tableau de bord.</p>
              <p className="text-xs text-slate-400/70 dark:text-slate-500/70 mt-1">Commencez par ajouter ou planifier un nouveau projet.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};