import React, { useState } from 'react';
import { FiCalendar, FiEye, FiTrendingUp, FiShield, FiUsers, FiEye as FiView, FiTrash2, FiUserPlus, FiX, FiCopy } from 'react-icons/fi';
import type { AdminStats, BaseUser, AdminEventSummary } from '../../domain/entities/AdminEntities';

interface AdminDashboardProps {
  stats: AdminStats;
  users: BaseUser[];
  events: AdminEventSummary[];
  onSelectUser: (user: BaseUser) => void;
  onDeleteUser: (id: string) => void;
  onAddOrganizer: (name: string, email: string) => Promise<string | undefined>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats, users, events, onSelectUser, onDeleteUser, onAddOrganizer
}) => {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [createdCredentials, setCreatedCredentials] = useState<{email: string, password: string} | null>(null);

  const organizers = users.filter(u => u.role === 'organisateur');
  const participants = users.filter(u => u.role === 'participant');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    const tempPassword = await onAddOrganizer(name, email); console.log("tempsPassword recu:", tempPassword);
    if (tempPassword) {
      setCreatedCredentials({ email, password: tempPassword });
    }
    setName("); setEmail(");

    setShowForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-blue-600 dark:text-blue-400">
        Dashboard Administrateur
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Total événements', value: stats.totalEvents, icon: FiCalendar, color: 'text-blue-500' },
          { label: 'Événements publiés', value: stats.publishedEvents, icon: FiTrendingUp, color: 'text-emerald-500' },
          { label: 'Total inscriptions', value: stats.totalRegistrations, icon: FiEye, color: 'text-violet-500' },
          { label: 'Organisateurs', value: stats.organizerCount, icon: FiShield, color: 'text-cyan-500' },
          { label: 'Participants', value: stats.participantCount, icon: FiUsers, color: 'text-indigo-500' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-md flex justify-between items-center">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
              <h3 className="text-2xl sm:text-3xl font-black mt-2">{item.value}</h3>
            </div>
            <item.icon className={`${item.color} w-6 h-6 sm:w-7 sm:h-7`} />
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-bold">Gestion des organisateurs</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-sm sm:text-base px-5 py-3 rounded-xl hover:bg-blue-700 shadow-md transition"
          >
            <FiUserPlus /> Créer un organisateur
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-xl border border-slate-200/60 dark:border-slate-700">
            <div>
              <label className="block text-xs font-bold uppercase mb-1.5 text-slate-400">Nom complet</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Jean Dupont" className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1.5 text-slate-400">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="jean@example.com" className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex items-end gap-2">
              <button type="submit" className="flex-1 bg-blue-600 text-white font-bold text-xs py-3 rounded-lg hover:bg-blue-700">Créer</button>
              <button type="button" onClick={() => setShowForm(false)} className="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs py-3 rounded-lg hover:bg-slate-300">Annuler</button>
            </div>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700/60">
          <h3 className="text-lg font-bold border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">Organisateurs ({organizers.length})</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {organizers.map(u => (
              <div key={u.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">{u.name[0]}</div>
                  <div>
                    <h4 className="text-sm font-bold">{u.name}</h4>
                    <p className="text-xs text-slate-400">{u.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onSelectUser(u)} className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100"><FiView size={15} /></button>
                  <button onClick={() => onDeleteUser(u.id)} className="p-2 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100"><FiTrash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700/60">
          <h3 className="text-lg font-bold border-b border-slate-100 dark:border-slate-700 pb-3 mb-4">Participants ({participants.length})</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {participants.map(u => (
              <div key={u.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/40">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">{u.name[0]}</div>
                  <div>
                    <h4 className="text-sm font-bold">{u.name}</h4>
                    <p className="text-xs text-slate-400">{u.email}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onSelectUser(u)} className="p-2 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100"><FiView size={15} /></button>
                  <button onClick={() => onDeleteUser(u.id)} className="p-2 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100"><FiTrash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700/60">
        <h3 className="text-lg font-bold mb-4">Derniers événements</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-semibold uppercase text-xs tracking-wider">
                <th className="py-3 px-4">Titre</th>
                <th className="py-3 px-4">Catégorie</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Places</th>
                <th className="py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {events.map(e => (
                <tr key={e.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{e.title}</td>
                  <td className="py-3.5 px-4"><span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-md">{e.category}</span></td>
                  <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{e.date}</td>
                  <td className="py-3.5 px-4 font-medium">{e.registeredCount} / {e.capacity}</td>
                  <td className="py-3.5 px-4"><span className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full">{e.status}</span></td>
                </tr>
              ))}
</tbody>
           </table>
         </div>
       </div>

       {/* Modal des identifiants */}
       {createdCredentials && (
         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
           <div className="bg-white dark:bg-slate-800 p-6 rounded-xl max-w-sm w-full shadow-xl">
             <div className="flex justify-between items-center mb-4">
               <h3 className="font-bold text-lg text-slate-900 dark:text-white">Organisateur créé</h3>
               <button onClick={() => setCreatedCredentials(null)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                 <FiX className="w-5 h-5 text-slate-500" />
               </button>
             </div>
             <div className="space-y-3">
               <div>
                 <p className="text-xs font-bold uppercase text-slate-400 mb-1">Email</p>
                 <p className="text-slate-900 dark:text-white font-medium">{createdCredentials.email}</p>
               </div>
               <div>
                 <p className="text-xs font-bold uppercase text-slate-400 mb-1">Mot de passe temporaire</p>
                 <div className="flex items-center gap-2">
                   <code className="bg-slate-100 dark:bg-slate-900 px-3 py-2 rounded-lg font-mono text-indigo-600 dark:text-indigo-400 font-bold flex-1">
                     {createdCredentials.password}
                   </code>
                   <button
                     onClick={() => navigator.clipboard.writeText(createdCredentials.password)}
                     className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800"
                     title="Copier le mot de passe"
                   >
                     <FiCopy className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                   </button>
                 </div>
               </div>
             </div>
             <button
               onClick={() => setCreatedCredentials(null)}
               className="mt-6 w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition"
             >
               Fermer
             </button>
           </div>
         </div>
       )}
     </div>
   );
};
