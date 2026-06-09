import React from 'react';
import { FaCalendar } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/20 transition-colors duration-200">
      
      {/* Container principal adapté aux paddings mobiles */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-12">
        
        {/* Card CTA : Passe de p-6 sur mobile à p-12 sur PC */}
        <div className="relative rounded-3xl p-6 sm:p-12 overflow-hidden text-center bg-gradient-to-br from-gray-950 via-gray-900 to-black dark:from-slate-950 dark:to-black text-white shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.18),transparent_60%)]" />
          
          {/* Titre ultra-adaptatif pour éviter les coupures de mots sur mobile */}
          <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 relative z-10 tracking-tight max-w-lg mx-auto leading-tight">
            Prêt à créer votre prochain événement ?
          </h3>
          
          <p className="text-gray-400 dark:text-slate-400 text-xs sm:text-sm mb-8 max-w-xs sm:max-w-md mx-auto relative z-10 font-medium">
            Rejoignez plus de 20 utilisateurs qui font déjà confiance à Eventory.
          </p>
          
          {/* Boutons : S'empilent verticalement sur mobile (flex-col), se mettent côte à côte sur PC (sm:flex-row) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10 w-full max-w-xs sm:max-w-none mx-auto">
            <button className="w-full sm:w-auto bg-[#7c3aed] hover:bg-[#6d28d9] active:scale-[0.99] text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-md shadow-purple-600/10 transition-all cursor-pointer">
              Créer un compte &nbsp;→
            </button>
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/15 dark:bg-slate-900/60 dark:hover:bg-slate-800 border border-white/10 hover:border-white/20 text-white text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl transition-all cursor-pointer">
              Se connecter
            </button>
          </div>
        </div>
        

        {/* Liens de bas de page : flex-col (centré) sur mobile, sm:flex-row (aligné) sur PC */}
        <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-200/60 dark:border-gray-800/80 pt-8 text-xs text-gray-500 dark:text-slate-400">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-2 select-none">
            <div className="bg-[#7c3aed] text-white p-1.5 rounded-lg shadow-sm">
              <FaCalendar className="w-3.5 h-3.5" />
            </div>
            <span className="font-black text-gray-950 dark:text-white tracking-tight text-sm">Eventory</span>
          </div>
          
          {/* Liens annexes (Placés au milieu sur mobile pour une meilleure harmonie) */}
          <div className="flex gap-6 font-bold order-2 sm:order-3">
            <a 
              href="#contact" 
              className="hover:text-[#7c3aed] dark:hover:text-purple-400 transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright text (Passe tout en bas sur mobile grâce à order-3) */}
          <div className="font-medium order-3 sm:order-2 text-center sm:text-left">
            © 2026 JRC. SheCode.
          </div>

        </div>

      </div>
    </footer>
  );
};