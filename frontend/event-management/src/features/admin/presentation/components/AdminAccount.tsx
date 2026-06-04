import React from 'react';
import { FiUser, FiMail, FiShield, FiCalendar, FiEdit2 } from 'react-icons/fi';
import  type { AdminProfile } from '../../domain/entities/AdminEntities';

interface AdminAccountProps {
  profile: AdminProfile;
}

export const AdminAccount: React.FC<AdminAccountProps> = ({ profile }) => {
  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 space-y-6 text-slate-800 dark:text-slate-100">
      <h1 className="text-3xl font-black text-blue-600 dark:text-blue-400">Mon compte</h1>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 relative">
        <button className="absolute top-6 right-6 bg-blue-600 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-blue-700 transition shadow-md">
          <FiEdit2 size={13} /> Modifier
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-950/80 p-4 rounded-full text-blue-600 dark:text-blue-400">
            <FiUser size={36} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold">{profile.name}</h2>
            <span className="bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 text-xs font-bold px-3 py-0.5 rounded-full mt-1.5 inline-block uppercase">
              {profile.role}
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {[
            { label: 'Nom complet', value: profile.name, icon: FiUser },
            { label: 'Adresse email', value: profile.email, icon: FiMail },
            { label: 'Rôle', value: profile.role, icon: FiShield },
            { label: 'Membre depuis', value: profile.memberSince, icon: FiCalendar },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{field.label}</label>
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/40 px-4 py-3 rounded-xl text-sm font-semibold border border-slate-100 dark:border-slate-700/30">
                <field.icon className="text-slate-400 w-4 h-4" /> {field.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cartes Complémentaires */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700/60 space-y-3">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-2">Statistiques du compte</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl text-center border border-blue-100/20">
            <h4 className="text-blue-600 dark:text-blue-400 text-xl font-black">Tous</h4>
            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tight">Accès complet</p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl text-center border border-emerald-100/20">
            <h4 className="text-emerald-600 dark:text-emerald-400 text-xl font-black">Actif</h4>
            <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-tight">Statut du compte</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-xl flex items-center justify-center border border-blue-100/20">
            <h4 className="text-blue-600 dark:text-blue-400 text-xl font-black">2024</h4>
          </div>
        </div>
      </div>
    </div>
  );
};