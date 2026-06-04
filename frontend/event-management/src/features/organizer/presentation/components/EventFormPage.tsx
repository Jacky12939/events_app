import React, { useState } from 'react';
import { FiFileText, FiSend, FiCheckCircle } from 'react-icons/fi';
import type { Event } from '../../domain/entities/Event';

interface EventFormProps {
  eventToEdit?: Event | null;
  onSave: (event: Omit<Event, 'id' | 'registeredCount' | 'organizerName'>) => void;
  onCancel: () => void;
}

export const EventForm: React.FC<EventFormProps> = ({ eventToEdit, onSave, onCancel }) => {
  const isEdit = !!eventToEdit;
  
  const [title, setTitle] = useState(eventToEdit?.title || '');
  const [description, setDescription] = useState(eventToEdit?.description || '');
  const [category, setCategory] = useState(eventToEdit?.category || '');
  const [location, setLocation] = useState(eventToEdit?.location || '');
  const [date, setDate] = useState(eventToEdit?.date || '');
  const [time, setTime] = useState(eventToEdit?.time || '');
  const [capacity, setCapacity] = useState(eventToEdit?.capacity || 100);

  // ✅ Correction du typage strict avec les statuts exacts
  const handleSubmit = (status: 'draft' | 'published' | 'completed') => {
    onSave({ title, description, category, location, date, time, capacity, status });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">
        {isEdit ? "Modifier l'événement" : "Créer un événement"}
      </h1>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
        
        {/* Affichage visuel du badge selon le statut exact */}
        {isEdit && (
          <div className="flex gap-2">
            {eventToEdit.status === 'draft' && (
              <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                Brouillon
              </span>
            )}
            {eventToEdit.status === 'published' && (
              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                Publié
              </span>
            )}
            {eventToEdit.status === 'completed' && (
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                Terminé
              </span>
            )}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Titre de l'événement *</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Conférence Tech"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description *</label>
          <textarea 
            rows={4}
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez votre événement en détail..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Catégorie *</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Lieu *</label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ex: Yaoundé, Cameroun"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Date *</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Heure *</label>
          <input 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Capacité (nombre de places) *</label>
          <input 
            type="number" 
            value={capacity} 
            onChange={(e) => setCapacity(Number(e.target.value))}
            placeholder="Ex: 100"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Boutons d'actions adaptées aux 3 statuts */}
        <div className="pt-4 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => handleSubmit('draft')}
              className="flex items-center justify-center gap-2 bg-slate-400 text-white font-semibold text-xs py-3 rounded-lg hover:bg-slate-500 transition cursor-pointer"
            >
              <FiFileText size={14} /> Enregistrer comme brouillon
            </button>
            <button 
              type="button"
              onClick={() => handleSubmit('published')}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold text-xs py-3 rounded-lg hover:bg-indigo-700 transition shadow-sm cursor-pointer"
            >
              <FiSend size={14} /> Publier l'événement
            </button>
          </div>

          {/* Bouton additionnel disponible uniquement en mode édition pour clore l'événement */}
          {isEdit && eventToEdit.status === 'published' && (
            <button 
              type="button"
              onClick={() => handleSubmit('completed')}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white font-semibold text-xs py-3 rounded-lg hover:bg-emerald-700 transition shadow-sm cursor-pointer"
            >
              <FiCheckCircle size={14} /> Marquer comme terminé (Completed)
            </button>
          )}
        </div>

        <button 
          type="button"
          onClick={onCancel}
          className="w-full text-center text-xs text-slate-500 underline pt-2 block cursor-pointer"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};