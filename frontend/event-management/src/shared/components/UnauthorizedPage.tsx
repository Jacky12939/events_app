import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft,  FiHome } from 'react-icons/fi';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-center items-center font-sans antialiased p-4 sm:p-6 lg:p-8">
      
      <div className="max-w-md w-full text-center space-y-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl">
        
        {/* Icône d'alerte stylisée */}
        <div className="w-20 h-20 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-2xl flex items-center justify-center mx-auto text-4xl border border-red-100 dark:border-red-900/50 shadow-sm">
          {/* <FiShieldAlert className="w-12 h-12" /> */}
        </div>

        {/* Textes et messages d'erreur à forte visibilité */}
        <div className="space-y-3">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Accès Refusé
          </h1>
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
            Désolé, vos privilèges actuels ne vous permettent pas d'accéder à cette ressource. Cette action est réservée à un autre rôle applicatif.
          </p>
        </div>

        {/* Zone d'information contextuelle */}
        <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-400">
          Code d'erreur : <span className="text-red-500 uppercase">403_FORBIDDEN</span>
        </div>

        {/* Boutons d'action responsives */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="w-full py-3.5 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-black text-base rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiArrowLeft className="w-5 h-5" />
            Retour
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <FiHome className="w-5 h-5" />
            Espace Accueil
          </button>
        </div>

      </div>
    </div>
  );
};

export default UnauthorizedPage;