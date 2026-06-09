import React from 'react';

export const Testimonial: React.FC = () => {
  return (
    <section className="py-12 sm:py-20 max-w-4xl mx-auto px-4 text-center transition-colors duration-200">
      
      {/* Container stylisé pour donner du relief sur mobile */}
      <div className="relative bg-white/40 dark:bg-slate-900/20 backdrop-blur-sm border border-gray-100/80 dark:border-slate-900 rounded-3xl p-6 sm:p-10 shadow-sm">
        
        {/* Étoiles de notation (Taille adaptée pour le pouce/écran) */}
        <div className="flex justify-center gap-1 text-amber-400 mb-4 text-lg sm:text-xl select-none">
          ★★★★★
        </div>
        
        {/* Citation adaptative pour éviter les blocs massifs sur mobile */}
        <blockquote className="text-base sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white leading-relaxed sm:leading-loose max-w-2xl mx-auto tracking-tight">
          "Eventory a transformé la façon dont nous organisons nos conférences. Gain de temps considérable et zéro friction."
        </blockquote>
        
        {/* Métadonnées de l'auteur de la citation */}
        <div className="mt-6 flex items-center justify-center gap-3">
          
          {/* Avatar (Taille fixe pour éviter les déformations fluid-layout) */}
          <div className="w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-black text-xs sm:text-sm shadow-sm shrink-0 select-none">
            GM
          </div>
          
          {/* Textes alignés à gauche */}
          <div className="text-left">
            <div className="text-sm font-black text-gray-900 dark:text-white tracking-tight">
              Gaelle Mamno
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-gray-500 dark:text-slate-400 mt-0.5">
              Directrice événementielle
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
};