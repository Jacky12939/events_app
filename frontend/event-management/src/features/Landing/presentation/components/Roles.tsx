import React from 'react';
import { FaCheck } from 'react-icons/fa';

export const Roles: React.FC = () => {
  const rolesData = [
    {
      badge: 'Contrôle Total',
      title: 'Administrateur',
      desc: 'Gérez tous les utilisateurs, consultez leurs activités, supprimez des comptes et supervisez l’ensemble de la plateforme.',
      borderColor: 'border-l-4 border-l-cyan-500',
      features: ['Gestion de tous les utilisateurs', 'Accès aux activités détaillées', 'Création des organisateurs', 'Supervision globale'],
    },
    {
      badge: 'Créez vos Événements',
      title: 'Organisateur',
      desc: 'Publiez des événements, gérez les inscriptions et suivez les participants depuis votre dashboard dédié.',
      borderColor: 'border-l-4 border-l-orange-500',
      features: ['Création d’événements illimitée', 'Statuts draft / publié / terminé', 'Suivi des inscriptions', 'Dashboard avec statistiques fluides'],
    },
    {
      badge: 'Vivez l’Expérience',
      title: 'Participant',
      desc: 'Découvrez des événements uniques, réservez vos places en un clic et accédez instantanément à vos billets sécurisés.',
      borderColor: 'border-l-4 border-l-indigo-500',
      features: ['Recherche et filtres d’événements', 'Réservation instantanée de places', 'Génération de tickets QR Code', 'Historique des participations'],
    }
  ];

  return (
    <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#7c3aed]">Comment ça marche</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">Un rôle pour chacun</h2>
      </div>

      <div className="space-y-6">
        {rolesData.map((role, idx) => (
          <div key={idx} className={`p-8 rounded-2xl bg-white dark:bg-[#12131a] border border-gray-100 dark:border-gray-900/60 ${role.borderColor} shadow-sm transition-all hover:shadow-md`}>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider bg-gray-100 dark:bg-gray-900 px-2.5 py-1 rounded-md text-gray-600 dark:text-gray-400">
                {role.badge}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-3 mb-2">{role.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{role.desc}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {role.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                  <div className="p-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 shrink-0">
                    <FaCheck className="w-2.5 h-2.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div> 
        ))}
      </div>
    </section>
  );
};