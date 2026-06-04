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
    <div className="max-w-xl mx-auto p-6 bg-slate-50 min-h-screen">
      <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-indigo-600 font-medium mb-4">
        <FiArrowLeft /> Retour
      </button>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* En-tête Violet avec Icône */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-48 flex items-center justify-center relative">
          <div className="border-4 border-white/20 p-4 rounded-2xl">
            <FiCalendar className="text-white/80 w-12 h-12" />
          </div>
        </div>

        {/* Contenu de la fiche */}
        <div className="p-6 space-y-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900 mb-1.5">{event.title}</h1>
            {event.category && (
              <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {event.category}
              </span>
            )}
          </div>

          <div className="space-y-3.5 text-xs text-slate-600">
            <div className="flex items-start gap-3">
              <FiCalendar className="text-slate-400 w-4 h-4 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Date et heure</p>
                <p className="mt-0.5 text-slate-500">{event.date || 'Non programmée'}</p>
                <p className="text-slate-500">{event.time || 'Heure non spécifiée'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiMapPin className="text-slate-400 w-4 h-4 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Lieu</p>
                <p className="mt-0.5 text-slate-500">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiUsers className="text-slate-400 w-4 h-4 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Capacité</p>
                <p className="mt-0.5 text-slate-500">{event.registeredCount} / {event.capacity} inscrits</p>
                <p className="text-emerald-600 font-medium mt-0.5">{spotsAvailable} places disponibles</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FiUser className="text-slate-400 w-4 h-4 mt-0.5" />
              <div>
                <p className="font-bold text-slate-800">Organisateur</p>
                <p className="mt-0.5 text-slate-500">{event.organizerName}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 mb-2">Description</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              {event.description || "Aucune description fournie pour le moment."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};