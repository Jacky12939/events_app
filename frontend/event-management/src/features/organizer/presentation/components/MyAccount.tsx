import React from 'react';
import { FiUser, FiMail, FiShield, FiCalendar, FiEdit2 } from 'react-icons/fi';
import type { OrganizerProfile } from '../../domain/entities/Event';

interface MyAccountProps {
  profile: OrganizerProfile;
}

export const MyAccount: React.FC<MyAccountProps> = ({ profile }) => {
  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-50 min-h-screen space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Mon compte</h1>

      {/* Profil principal */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 relative">
        <button className="absolute top-6 right-6 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-indigo-700 transition">
          <FiEdit2 size={12} /> Modifier
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="bg-indigo-50 p-4 rounded-full text-indigo-600">
            <FiUser size={32} />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">{profile.name}</h2>
            <span className="bg-indigo-50 text-indigo-600 text-[10px] font-semibold px-2.5 py-0.5 rounded-full mt-1 inline-block">
              {profile.role}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Nom complet</label>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2.5 rounded-lg text-slate-700 text-xs font-medium">
              <FiUser className="text-slate-400" /> {profile.name}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Adresse email</label>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2.5 rounded-lg text-slate-700 text-xs font-medium">
              <FiMail className="text-slate-400" /> {profile.email}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Rôle</label>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2.5 rounded-lg text-slate-700 text-xs font-medium">
              <FiShield className="text-slate-400" /> {profile.role}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Membre depuis</label>
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-2.5 rounded-lg text-slate-700 text-xs font-medium">
              <FiCalendar className="text-slate-400" /> {profile.memberSince}
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques complémentaires du compte */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Statistiques du compte</h3>
        <div className="space-y-3">
          <div className="bg-indigo-50/50 p-4 rounded-xl text-center">
            <h4 className="text-indigo-600 text-base font-bold">Créés</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Événements</p>
          </div>
          <div className="bg-emerald-50/50 p-4 rounded-xl text-center">
            <h4 className="text-emerald-600 text-base font-bold">Actif</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">Statut du compte</p>
          </div>
          <div className="bg-indigo-50/50 p-4 rounded-xl text-center">
            <h4 className="text-indigo-600 text-base font-bold">2024</h4>
          </div>
        </div>
      </div>
    </div>
  );
};