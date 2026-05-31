// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { FiUsers, FiUserPlus, FiSun, FiMoon, FiLogOut, FiX, FiCheck } from 'react-icons/fi';
// import { useTheme } from '../../../../context/ThemeContext';
// import { useAuth } from '../../../Authentification/presentation/hooks/useAuth';


// const schema = z.object({
//   firstName: z.string().min(2, 'Prénom requis'),
//   lastName: z.string().min(2, 'Nom requis'),
//   email: z.string().email('Email invalide'),
//   password: z.string().min(6, 'Min 6 caractères'),
// });
// type OrgForm = z.infer<typeof schema>;

// const repo = new AdminRepositoryImpl();

// const ROLE_BADGE: Record<string, string> = {
//   ADMIN: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
//   ORGANIZER: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
//   PARTICIPANT: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
// };

// export default function AdminDashboard() {
//   const { darkMode, toggleTheme } = useTheme();
//   const { logout, getUser } = useAuth();
//   const user = getUser();

//   const [users, setUsers] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [creating, setCreating] = useState(false);
//   const [feedback, setFeedback] = useState<{ msg: string; ok: boolean } | null>(null);

//   const { register, handleSubmit, reset, formState: { errors } } = useForm<OrgForm>({
//     resolver: zodResolver(schema),
//   });

//   const loadUsers = () => {
//     setLoading(true);
//     repo.getAllUsers()
//       .then(setUsers)
//       .catch(() => null)
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const onSubmit = async (data: OrgForm) => {
//     setCreating(true);
//     setFeedback(null);
//     try {
//       await repo.createOrganizer(data);
//       setFeedback({ msg: 'Organisateur créé avec succès !', ok: true });
//       reset();
//       loadUsers();
//       setTimeout(() => {
//         setShowModal(false);
//         setFeedback(null);
//       }, 1500);
//     } catch (e: any) {
//       setFeedback({ msg: e.response?.data?.message || 'Erreur', ok: false });
//     } finally {
//       setCreating(false);
//     }
//   };

//   const stats = {
//     total: users.length,
//     admins: users.filter(u => u.role === 'ADMIN').length,
//     organizers: users.filter(u => u.role === 'ORGANIZER').length,
//     participants: users.filter(u => u.role === 'PARTICIPANT').length,
//   };

//   const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

//   return (
//     <div className={`min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white`}>
      
//       {/* Modal créer organisateur */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full relative">
//             <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300">
//               <FiX size={20} />
//             </button>
//             <h2 className="text-xl font-semibold mb-4">Créer un organisateur</h2>

//             {feedback && (
//               <div className={`mb-4 p-3 rounded ${feedback.ok ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                 {feedback.msg}
//               </div>
//             )}

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div>
//                 <label className="block mb-1 font-medium">Prénom</label>
//                 <input {...register('firstName')} className={inputCls} />
//                 {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Nom</label>
//                 <input {...register('lastName')} className={inputCls} />
//                 {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Email</label>
//                 <input {...register('email')} className={inputCls} />
//                 {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
//               </div>
//               <div>
//                 <label className="block mb-1 font-medium">Mot de passe</label>
//                 <input {...register('password')} type="password" className={inputCls} />
//                 {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
//               </div>
//               <button
//                 type="submit"
//                 disabled={creating}
//                 className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex items-center justify-center disabled:opacity-60"
//               >
//                 <FiUserPlus size={16} className="mr-2" />
//                 {creating ? 'Création...' : 'Créer l\'organisateur'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Navbar */}
//       <nav className="flex justify-between items-center p-4 shadow-md sticky top-0 bg-inherit z-50">
//         <div className="flex items-center space-x-2">
//           <FiUsers size={24} />
//           <h1 className="text-xl font-semibold">Dashboard Admin</h1>
//         </div>
//         <div className="flex items-center space-x-4">
//           <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
//             {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
//           </button>
//           <button onClick={logout} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Déconnexion">
//             <FiLogOut size={20} />
//           </button>
//         </div>
//       </nav>

//       {/* En-tête */}
//       <div className="p-8 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white text-center">
//         <h2 className="text-3xl font-bold mb-2">Bonjour, {user?.firstName} 👑</h2>
//         <p className="mb-4">Gestion complète de la plateforme</p>
//         <button
//           onClick={() => setShowModal(true)}
//           className="px-6 py-3 bg-white text-purple-600 font-semibold rounded shadow hover:bg-gray-100 transition"
//         >
//           <FiUserPlus className="inline-block mr-2" /> Ajouter un organisateur
//         </button>
//       </div>

//       {/* Statistiques */}
//       <section className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 dark:bg-gray-800">
//         {[
//           { label: 'Utilisateurs', value: users.length, color: 'indigo' },
//           { label: 'Admins', value: stats.admins, color: 'red' },
//           { label: 'Organisateurs', value: stats.organizers, color: 'yellow' },
//           { label: 'Participants', value: stats.participants, color: 'green' },
//         ].map((s) => (
//           <div key={s.label} className="flex items-center p-4 rounded-lg shadow bg-white dark:bg-gray-700">
//             <div className={`p-3 rounded-full bg-${s.color}-100 text-${s.color}-700 mr-4`}>
//               <FiUsers size={24} />
//             </div>
//             <div>
//               <p className="text-xl font-bold">{s.value}</p>
//               <p className="text-gray-600 dark:text-gray-300">{s.label}</p>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* Liste des utilisateurs */}
//       <section className="flex-1 p-8 bg-gray-50 dark:bg-gray-800">
//         <h3 className="text-2xl font-semibold mb-4">Tous les utilisateurs</h3>
//         <button
//           onClick={() => setShowModal(true)}
//           className="mb-4 flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
//         >
//           <FiUserPlus /> Nouveau organisateur
//         </button>
//         {loading ? (
//           <div>Chargement...</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
//               <thead>
//                 <tr className="bg-gray-200 dark:bg-gray-700">
//                   {['Utilisateur', 'Email', 'Rôle', 'Membre depuis'].map((h) => (
//                     <th key={h} className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">{h}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.map((u) => (
//                   <tr key={u.id} className="border-b border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
//                     <td className="px-4 py-2 flex items-center space-x-2">
//                       <div className="w-8 h-8 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-full uppercase">
//                         {u.firstName?.[0]?.toUpperCase()}
//                       </div>
//                       <div>
//                         {u.firstName} {u.lastName}
//                       </div>
//                     </td>
//                     <td className="px-4 py-2">{u.email}</td>
//                     <td className="px-4 py-2">
//                       <span className={`px-2 py-1 rounded ${ROLE_BADGE[u.role]}`}>
//                         {u.role}
//                       </span>
//                     </td>
//                     <td className="px-4 py-2">{new Date(u.createdAt).toLocaleDateString('fr-FR')}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }