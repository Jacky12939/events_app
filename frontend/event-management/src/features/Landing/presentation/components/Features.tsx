import React from 'react';
import { FaRegCalendarAlt, FaSlidersH } from 'react-icons/fa';
import { IoQrCodeOutline, IoSpeedometerOutline } from 'react-icons/io5';
import { MdOutlineShield, MdOutlineFlashOn } from 'react-icons/md';

export const Features: React.FC = () => {
  const features = [
    {
      icon: <FaRegCalendarAlt className="w-5 h-5 text-purple-500" />,
      title: 'Gestion complète',
      desc: 'Créez, publiez et gérez vos événements avec des statuts en temps réel et un suivi des inscriptions.',
    },
    {
      icon: <IoQrCodeOutline className="w-5 h-5 text-orange-500" />,
      title: 'Billets & QR Codes',
      desc: 'Génération automatique de billets numériques avec QR code unique pour chaque inscription.',
    },
    {
      icon: <MdOutlineShield className="w-5 h-5 text-cyan-500" />,
      title: "Contrôle d'accès",
      desc: 'Système de rôles granulaire : admin, organisateur, participant avec permissions dédiées.',
    },
    {
      icon: <MdOutlineFlashOn className="w-5 h-5 text-emerald-500" />,
      title: 'Instantané',
      desc: 'Inscription en un clic, confirmation immédiate et notifications automatiques pour tous.',
    },
    {
      icon: <FaSlidersH className="w-5 h-5 text-pink-500" />,
      title: 'Filtres avancés',
      desc: 'Recherchez par catégorie, date, lieu ou titre pour trouver l’événement parfait.',
    },
    {
      icon: <IoSpeedometerOutline className="w-5 h-5 text-yellow-500" />,
      title: 'Tableau de bord',
      desc: 'Dashboards personnalisés pour chaque rôle avec métriques, historique et statistiques.',
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-[#7c3aed]">Fonctionnalités</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">
          Tout ce dont vous avez besoin
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto">
          Des outils puissants pour chaque acteur de l'événementiel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-white dark:bg-[#12131a] border border-gray-100 dark:border-gray-900/60 hover:border-purple-500/30 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-900 flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};