import React from 'react';
import { FiArrowLeft, FiCalendar, FiMapPin, FiUsers, FiUser } from 'react-icons/fi';
import type { Event } from '../../domain/entities/Event';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
}

export const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => {
  const spotsAvailable = event.capacity - event.registeredCount;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-200">
      
      {/* BOUTON RETOUR RESPONSIVE */}
      <button 
        onClick={onBack} 
        className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold mb-5 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
      >
        <FiArrowLeft className="w-4 h-4" /> <span>Retour</span>
      </button>

      {/* FICHE ÉVÉNEMENT COMPLÈTE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm overflow-hidden transition-colors">
        
        {/* EN-TÊTE AVEC DÉGRADÉ AUX COULEURS DU LOGO (Ajusté pour le responsive) */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 h-36 sm:h-48 flex items-center justify-center relative">
          <div className="border-4 border-white/20 dark:border-white/10 p-3 sm:p-4 rounded-2xl bg-white/5 backdrop-blur-sm shadow-inner">
            <FiCalendar className="text-white w-10 h-10 sm:w-12 sm:h-12" />
          </div>
        </div>

        {/* CONTENU DE LA FICHE */}
        <div className="p-5 sm:p-6 space-y-6">
          
          {/* TITRE & CATÉGORIE */}
          <div>
            <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
              {event.title}
            </h1>
            {event.category && (
              <span className="inline-block bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full border border-indigo-100/40 dark:border-indigo-900/30">
                {event.category}
              </span>
            )}
          </div>

          {/* GRILLE D'INFORMATIONS RESPONSIVE (1 colonne sur mobile, 2 colonnes sur tablette/PC) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs">
            
            {/* DATE */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-transparent dark:border-slate-800/40">
              <FiCalendar className="text-slate-400 dark:text-slate-500 w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Date et heure</p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400 font-medium">{event.date || 'Non programmée'}</p>
                <p className="text-slate-400 dark:text-slate-500">{event.time || 'Heure non spécifiée'}</p>
              </div>
            </div>

            {/* LIEU */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-transparent dark:border-slate-800/40">
              <FiMapPin className="text-slate-400 dark:text-slate-500 w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Lieu</p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400 font-medium">{event.location}</p>
              </div>
            </div>

            {/* CAPACITÉ / INSCRITS */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-transparent dark:border-slate-800/40">
              <FiUsers className="text-slate-400 dark:text-slate-500 w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Capacité</p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400 font-medium">{event.registeredCount} / {event.capacity} inscrits</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">{spotsAvailable} places disponibles</p>
              </div>
            </div>

            {/* ORGANISATEUR */}
            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50/50 dark:bg-slate-800/30 border border-transparent dark:border-slate-800/40">
              <FiUser className="text-slate-400 dark:text-slate-500 w-4 h-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-bold text-slate-800 dark:text-slate-200">Organisateur</p>
                <p className="mt-0.5 text-slate-500 dark:text-slate-400 font-medium">{event.organizerName}</p>
              </div>
            </div>

          </div>

          {/* CORPS DESCRIPTION */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60">
            <h2 className="text-sm font-black text-slate-900 dark:text-white mb-2">Description</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium whitespace-pre-line">
              {event.description || "Aucune description fournie pour le moment."}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};