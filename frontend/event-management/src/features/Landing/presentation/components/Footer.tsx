import React from 'react';
import { FaCalendar } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/20">
      {/* CTA Box */}
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-12">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden text-center bg-gradient-to-br from-gray-900 to-black text-white shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.15),transparent_60%)]" />
          
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 relative z-10">Prêt à créer votre prochain événement ?</h3>
          <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto relative z-10">
            Rejoignez 12 000+ utilisateurs qui font confiance à EventHub.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <button className="w-full sm:w-auto bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-medium px-6 py-3.5 rounded-xl transition-all">
              Créer un compte gratuit →
            </button>
            <button className="w-full sm:w-auto bg-white/10 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium px-6 py-3.5 rounded-xl transition-colors">
              Se connecter
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-200/60 dark:border-gray-900 pt-8 sm:flex-row text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="bg-[#7c3aed] text-white p-1.5 rounded-lg">
              <FaCalendar className="w-4 h-4" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white">Eventory</span>
          </div>
          
          <div>© 2026 JRC. SheCode.</div>
          
          <div className="flex gap-6 font-medium">

            
            <a href="#contact" className="hover:text-gray-900 dark:hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};