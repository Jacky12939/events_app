import React from 'react';
import { FiUser, FiMail, FiShield, FiCalendar, FiEdit2 } from 'react-icons/fi';
import type { OrganizerProfile } from '../../domain/entities/Event';

interface MyAccountProps {
  profile: OrganizerProfile;
}

export const MyAccount: React.FC<MyAccountProps> = ({ profile }) => {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-950 min-h-screen space-y-6 transition-colors duration-200">
      
      {/* TITRE PRINCIPAL */}
      <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
        Mon compte
      </h1>

      {/* BLOC PROFIL PRINCIPAL */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm p-5 sm:p-6 relative transition-colors">
        
        {/* Bouton modifier adapté (Absolu sur PC, empilé sur Mobile) */}
        <div className="flex justify-between items-start gap-4 mb-6 sm:mb-0">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-50 dark:bg-indigo-950/50 p-4 rounded-full text-indigo-600 dark:text-indigo-400 shrink-0">
              <FiUser size={32} />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-slate-100">{profile.name}</h2>
              <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1 inline-block border border-indigo-100/30">
                {profile.role}
              </span>
            </div>
          </div>

          <button className="sm:absolute sm:top-6 sm:right-6 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-sm active:scale-98">
            <FiEdit2 size={12} /> <span className="hidden sm:inline">Modifier</span>
          </button>
        </div>

        {/* Champs d'informations */}
        <div className="space-y-4 sm:mt-6">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Nom complet</label>
            <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/40 border border-transparent dark:border-slate-800/60 px-3.5 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 text-xs font-medium">
              <FiUser className="text-slate-400 dark:text-slate-500 w-4 h-4" /> <span>{profile.name}</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Adresse email</label>
            <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/40 border border-transparent dark:border-slate-800/60 px-3.5 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 text-xs font-medium break-all">
              <FiMail className="text-slate-400 dark:text-slate-500 w-4 h-4" /> <span>{profile.email}</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Rôle</label>
            <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/40 border border-transparent dark:border-slate-800/60 px-3.5 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 text-xs font-medium">
              <FiShield className="text-slate-400 dark:text-slate-500 w-4 h-4" /> <span>{profile.role}</span>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Membre depuis</label>
            <div className="flex items-center gap-2.5 bg-slate-50 dark:bg-slate-800/40 border border-transparent dark:border-slate-800/60 px-3.5 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 text-xs font-medium">
              <FiCalendar className="text-slate-400 dark:text-slate-500 w-4 h-4" /> <span>{profile.memberSince}</span>
            </div>
          </div>
        </div>
      </div>

      {/* STATISTIQUES (Ajustées en Grille 3 colonnes sur PC/Tablette) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-sm p-5 sm:p-6 transition-colors">
        <h3 className="text-sm font-black text-slate-900 dark:text-white mb-4">Statistiques du compte</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-xl text-center border border-transparent dark:border-indigo-900/10">
            <h4 className="text-indigo-600 dark:text-indigo-400 text-base font-black">Créés</h4>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mt-0.5">Événements</p>
          </div>
          
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl text-center border border-transparent dark:border-emerald-900/10">
            <h4 className="text-emerald-600 dark:text-emerald-400 text-base font-black">Actif</h4>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mt-0.5">Statut du compte</p>
          </div>
          
          <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-4 rounded-xl flex flex-col justify-center items-center text-center border border-transparent dark:border-indigo-900/10">
            <h4 className="text-indigo-600 dark:text-indigo-400 text-base font-black">2026</h4>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mt-0.5">Année en cours</p>
          </div>
        </div>
      </div>

    </div>
  );
};