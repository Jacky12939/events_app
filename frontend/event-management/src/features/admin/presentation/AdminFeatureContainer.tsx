import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiCalendar, FiUser, FiLogOut, FiMoon, FiSun } from 'react-icons/fi';
import { useAdminData } from './hooks/useAdminData';
import { AdminDashboard } from './components/AdminDashboard';
import { UserDetailView } from './components/UserDetailView';
import { AdminAccount } from './components/AdminAccount';
import type { AdminEventSummary, BaseUser, UserRegistration } from '../domain/entities/AdminEntities';


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
       <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-500 font-bold text-base transition-colors duration-200">
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
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen font-sans antialiased transition-colors duration-200">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700/80 px-4 sm:px-6 py-3.5 flex justify-between items-center sticky top-0 z-50 transition-colors duration-200 shadow-sm">
        <div 
          onClick={() => navigate('/admin/dashboard')} 
          className="flex items-center gap-2 cursor-pointer text-blue-600 dark:text-blue-400 font-black text-lg"
        >
          <FiCalendar className="w-5 h-5 sm:w-6 sm:h-6" /> Eventory
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-600 transition"
            title="Basculer le thème"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            onClick={() => navigate('/admin/profile')}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold px-3 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
              view === 'profile'
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                : 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-600 hover:scale-105 hover:shadow-md'
            }`}
          >
            <FiUser size={14} />
            Admin
          </button>
          
          <FiLogOut 
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer w-5 h-5 ml-1" 
            onClick={() => navigate('/')}
          />
        </div>
      </header>

      <main className="py-6 px-2 sm:px-0">
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