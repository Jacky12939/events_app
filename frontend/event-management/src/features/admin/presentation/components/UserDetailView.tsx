import React from 'react';
import { FiArrowLeft, FiTrash2, FiMail, FiCalendar, FiActivity } from 'react-icons/fi';
import  type { BaseUser, AdminEventSummary, UserRegistration } from '../../domain/entities/AdminEntities';

interface UserDetailViewProps {
  user: BaseUser;
  createdEvents: AdminEventSummary[];
  registrations: UserRegistration[];
  onBack: () => void;
  onDelete: (id: string) => void;
}

export const UserDetailView: React.FC<UserDetailViewProps> = ({
  user, createdEvents, registrations, onBack, onDelete
}) => {
  const isOrganizer = user.role === 'organisateur';

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 text-slate-800 dark:text-slate-100">
      <button onClick={onBack} className="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
        <FiArrowLeft /> Retour au dashboard
      </button>

      {/* Fiche d'identité */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl ${
            isOrganizer ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-400'
          }`}>
            {user.name[0]}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl font-black">{user.name}</h2>
              <span className={`text-xs font-bold px-3 py-0.5 rounded-full uppercase ${
                isOrganizer ? 'bg-blue-50 text-blue-600 dark:bg-blue-950' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950'
              }`}>{user.role}</span>
            </div>
            <div className="mt-2 space-y-1 text-sm text-slate-400 font-medium">
              <p className="flex items-center gap-1.5"><FiMail size={14} /> {user.email}</p>
              <p className="flex items-center gap-1.5"><FiCalendar size={14} /> Inscrit le {user.registrationDate}</p>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onDelete(user.id)}
          className="w-full sm:w-auto bg-red-600 text-white font-bold text-sm px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 shadow-md transition"
        >
          <FiTrash2 /> Supprimer l'utilisateur
        </button>
      </div>

      {/* Activités de l'utilisateur */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 space-y-4">
        <h3 className="text-xl font-black flex items-center gap-2"><FiActivity className="text-blue-500" /> Activités</h3>
        
        {isOrganizer ? (
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Événements créés ({createdEvents.length})</h4>
            <div className="space-y-2">
              {createdEvents.map(e => (
                <div key={e.id} className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/40 rounded-xl flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <h5 className="font-bold text-base text-slate-900 dark:text-white">{e.title}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">{e.date} • {e.registeredCount}/{e.capacity} inscrits</p>
                  </div>
                  <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-md">{e.category}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400">Inscriptions ({registrations.length})</h4>
            <div className="space-y-2">
              {registrations.map((r, idx) => (
                <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/40 rounded-xl flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <h5 className="font-bold text-base text-slate-900 dark:text-white">{r.eventTitle}</h5>
                    <p className="text-xs text-slate-400 mt-0.5">{r.date} • Inscrit le {r.registrationDate} • Billet: <code className="font-mono bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded text-slate-700 dark:text-slate-300">{r.ticketNumber}</code></p>
                  </div>
                  <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-md">{r.category}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};