import React from 'react';
import { FiCalendar, FiEye, FiFileText, FiUsers, FiPlus, FiEdit, FiCheckCircle } from 'react-icons/fi';
import type { Event, OrganizerStats } from '../../domain/entities/Event';

interface DashboardProps {
  stats: OrganizerStats;
  events: Event[];
  onNavigate: (view: string, targetEvent?: Event) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, events, onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Organisateur</h1>

      {/* Cartes statistiques adaptées pour inclure les 3 statuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-slate-500">Total événements</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.totalEvents}</h3>
          </div>
          <FiCalendar className="text-indigo-500 w-4 h-4" />
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-slate-500">Publiés</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.publishedEvents}</h3>
          </div>
          <FiEye className="text-emerald-500 w-4 h-4" />
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-slate-500">Brouillons</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.draftEvents}</h3>
          </div>
          <FiFileText className="text-slate-500 w-4 h-4" />
        </div>

        {/* Nouvelle statistique pour le statut exact 'completed' */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-slate-500">Terminés</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.completedEvents || 0}</h3>
          </div>
          <FiCheckCircle className="text-blue-500 w-4 h-4" />
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-start">
          <div>
            <p className="text-xs font-medium text-slate-500">Total inscrits</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{stats.totalRegistered}</h3>
          </div>
          <FiUsers className="text-indigo-500 w-4 h-4" />
        </div>
      </div>

      <button 
        onClick={() => onNavigate('create')}
        className="mb-8 flex items-center gap-2 bg-indigo-600 text-white font-medium text-sm px-4 py-2.5 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
      >
        <FiPlus /> Créer un événement
      </button>

      {/* Liste des événements */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-base font-bold text-slate-900 mb-4">Mes événements</h2>
        <div className="divide-y divide-slate-100">
          {events.map((event) => (
            <div key={event.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900 text-sm">{event.title || "Sans titre"}</h3>
                  
                  {/* Badges corrigés avec l'overlap de type strict */}
                  {event.status === 'published' && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                      Publié
                    </span>
                  )}
                  {event.status === 'draft' && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      Brouillon
                    </span>
                  )}
                  {event.status === 'completed' && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                      Terminé
                    </span>
                  )}
                </div>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>📅 {event.date || 'Non définie'}</span>
                  <span>👥 {event.registeredCount}/{event.capacity || 0} inscrits</span>
                  {event.category && (
                    <span className="bg-indigo-50 text-indigo-600 text-[10px] font-medium px-2 py-0.5 rounded-md">
                      {event.category}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => onNavigate('edit', event)}
                  className="flex items-center gap-1.5 border border-indigo-200 bg-indigo-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-indigo-700 cursor-pointer"
                >
                  <FiEdit size={12} /> Modifier
                </button>
                <button 
                  onClick={() => onNavigate('view', event)}
                  className="flex items-center gap-1.5 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  <FiEye size={12} /> Voir
                </button>
              </div>
            </div>
          ))}
          
          {events.length === 0 && (
            <p className="text-sm text-slate-400 py-6 text-center font-medium">
              Aucun événement créé pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};