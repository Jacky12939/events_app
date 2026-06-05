import React from 'react';
import { FaArrowRight, FaRegCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden pt-32 pb-24 text-center px-4 min-h-[85vh] flex items-center justify-center">
      
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80" 
          alt="Concert Event Background" 
          className="w-full h-full object-cover opacity-40 dark:opacity-25 filter brightness-50 dark:brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white to-white dark:from-[#0b0c10]/40 dark:via-[#0b0c10]/80 dark:to-[#0b0c10]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,white_80%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,#0b0c10_80%)]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-8">
        
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Trouvez et organisez des <span className="text-[#7c3aed]">événements</span> uniques
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto font-medium backdrop-blur-[2px] py-1 rounded-xl">
            Obtenez vos billets avec QR code en quelques secondes. Des outils puissants pour chaque acteur de l'événementiel.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button 
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/30 group whitespace-nowrap"
          >
            Commencer gratuitement 
            <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto border border-gray-300 dark:border-gray-800 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white font-medium px-8 py-4 rounded-xl transition-colors whitespace-nowrap"
          >
            Se connecter
          </button>
        </div>

        {/* Liste des avantages en bas du Hero */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-gray-700 dark:text-gray-400 pt-4">
          <div className="flex items-center gap-2 bg-white/40 dark:bg-transparent px-3 py-1.5 rounded-full backdrop-blur-sm sm:backdrop-blur-none">
            <FaRegCheckCircle className="w-4 h-4 text-emerald-500" /> Gratuit
          </div>
          <div className="flex items-center gap-2 bg-white/40 dark:bg-transparent px-3 py-1.5 rounded-full backdrop-blur-sm sm:backdrop-blur-none">
            <FaRegCheckCircle className="w-4 h-4 text-emerald-500" /> Sans carte bancaire
          </div>
          <div className="flex items-center gap-2 bg-white/40 dark:bg-transparent px-3 py-1.5 rounded-full backdrop-blur-sm sm:backdrop-blur-none">
            <FaRegCheckCircle className="w-4 h-4 text-emerald-500" /> Disponible 24/7
          </div>
        </div>
        
      </div>
    </section>
  );
};