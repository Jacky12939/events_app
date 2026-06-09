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

  const handleSubmit = (status: 'draft' | 'published' | 'completed') => {
    onSave({ title, description, category, location, date, time, capacity, status });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-200">
      
      <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
        {isEdit ? "Modifier l'événement" : "Créer un événement"}
      </h1>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm p-5 sm:p-6 space-y-5 transition-colors">
        
        {/* Badges de Statut en Édition */}
        {isEdit && (
          <div className="flex gap-2">
            {eventToEdit.status === 'draft' && (
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold px-2.5 py-1 rounded-full">
                Brouillon
              </span>
            )}
            {eventToEdit.status === 'published' && (
              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-full border border-emerald-100/30">
                Publié
              </span>
            )}
            {eventToEdit.status === 'completed' && (
              <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100/30">
                Terminé
              </span>
            )}
          </div>
        )}

        {/* Grille de champs : Passe sur 2 colonnes sur tablette/PC pour un meilleur équilibre */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Titre de l'événement *</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Conférence Tech"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 transition-all"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Description *</label>
            <textarea 
              rows={4}
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre événement en détail..."
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/10 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Catégorie *</label>
            <input 
              type="text" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Ex: Technologie"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Lieu *</label>
            <input 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Yaoundé, Cameroun"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Date *</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all color-scheme-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Heure *</label>
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Capacité (nombre de places) *</label>
            <input 
              type="number" 
              value={capacity} 
              onChange={(e) => setCapacity(Number(e.target.value))}
              placeholder="Ex: 100"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
            />
          </div>

        </div>

        {/* Boutons d'actions responsive : 1 colonne sur Mobile, 2 sur PC */}
        <div className="pt-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              type="button"
              onClick={() => handleSubmit('draft')}
              className="w-full flex items-center justify-center gap-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs py-3.5 rounded-xl transition-all cursor-pointer"
            >
              <FiFileText size={14} /> Enregistrer comme brouillon
            </button>
            <button 
              type="button"
              onClick={() => handleSubmit('published')}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md shadow-indigo-600/10 transition-all cursor-pointer"
            >
              <FiSend size={14} /> Publier l'événement
            </button>
          </div>

          {/* Terminer l'événement (Plein écran) */}
          {isEdit && eventToEdit.status === 'published' && (
            <button 
              type="button"
              onClick={() => handleSubmit('completed')}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <FiCheckCircle size={14} /> Marquer comme terminé (Completed)
            </button>
          )}
        </div>

        {/* Annuler */}
        <button 
          type="button"
          onClick={onCancel}
          className="w-full text-center text-xs font-semibold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors underline pt-2 block cursor-pointer"
        >
          Annuler
        </button>

      </div>
    </div>
  );
};