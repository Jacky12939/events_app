import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiUser, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { useAdminData } from './hooks/useAdminData';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDetailView } from './components/UserDetailView';
import { AdminAccount } from './components/AdminAccount';
import type { AdminEventSummary, BaseUser, UserRegistration } from '../domain/entities/AdminEntities';
import logo1 from '../../../../assets/logo1.png';

export const AdminFeatureContainer: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const { pathname } = useLocation();
   const navigate = useNavigate();

   let view: string = 'dashboard';
   if (pathname.startsWith('/admin/view')) {
     view = 'view';
   } else if (pathname.startsWith('/admin/profile')) {
     view = 'profile';
   } else {
     view = 'dashboard';
   }

    const {
      stats, users, events, profile, loading, darkMode, toggleDarkMode, addOrganizer, removeUser, fetchUserContext, updateProfile
    } = useAdminData();

   const [selectedUser, setSelectedUser] = useState<BaseUser | null>(null);
   const [userCreatedEvents, setUserCreatedEvents] = useState<AdminEventSummary[]>([]);
   
   const [userRegistrations, setUserRegistrations] = useState<UserRegistration[]>([]);

   if (loading) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 font-bold text-base transition-colors duration-200">
         Chargement de la page d'administration...
       </div>
     );
   }

    const handleSelectUser = async (user: BaseUser) => {
      setSelectedUser(user);
      try {
        const context = await fetchUserContext(user);
        setUserCreatedEvents(context.created);
        setUserRegistrations(context.registrations);
      } catch (error) {
        console.error('Failed to fetch user context:', error);
        setUserCreatedEvents([]);
        setUserRegistrations([]);
      }
      navigate(`/admin/view/${user.id}`);
    };

   const handleDeleteUser = async (userId: string) => {
     if (confirm("Confirmez-vous la suppression de cet utilisateur ? Cette action est irréversible.")) {
       await removeUser(userId);
       if (view === 'view' && id === userId) {
         navigate('/admin/dashboard');
       }
     }
   };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans antialiased transition-colors duration-200">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 sm:px-6 py-3 flex justify-between items-center sticky top-0 z-50 transition-colors duration-200 shadow-sm">
        
        {/* LOGO ET NOM AJUSTÉS (FLEX ET COLLÉS) */}
        <div 
          onClick={() => navigate('/admin/dashboard')} 
          className="flex items-center cursor-pointer group z"
        >
          <img src={logo1} alt="Logo" className="w-24 h-16 object-contain" />
          <span className="-ml-8 text-xl font-black tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            ventory
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-all"
            title="Basculer le thème"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* BOUTON ADMIN AVEC LES NOUVELLES COULEURS ACCENTUÉES */}
          <button
            onClick={() => navigate('/admin/profile')}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-4 py-2 rounded-xl cursor-pointer transition-all duration-350 ${
              view === 'profile'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-105'
                : 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:scale-105 hover:shadow-sm'
            }`}
          >
            <FiUser size={14} />
            Admin
          </button>
          
          <FiLogOut 
            className="text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 cursor-pointer w-5 h-5 ml-1 transition-colors" 
            onClick={() => navigate('/')}
            title="Déconnexion"
          />
        </div>
      </header>

      <main className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {view === 'dashboard' && stats && (
          <AdminDashboard 
            stats={stats} 
            users={users} 
            events={events} 
            onSelectUser={handleSelectUser} 
            onDeleteUser={handleDeleteUser}
            onAddOrganizer={addOrganizer}
          />
        )}

        {view === 'view' && (selectedUser || id) && (
          <UserDetailView 
            user={selectedUser || users.find(u => u.id === id) || users[0]} 
            createdEvents={userCreatedEvents} 
            registrations={userRegistrations}
            onBack={() => navigate('/admin/dashboard')}
            onDelete={handleDeleteUser}
          />
        )}

        {view === 'profile' && profile && (
          <AdminAccount profile={profile} onUpdate={updateProfile} />
        )}
      </main>
    </div>
  );
};

export default AdminFeatureContainer;