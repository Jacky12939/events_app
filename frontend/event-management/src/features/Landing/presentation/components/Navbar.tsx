import React from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import logo1 from '../../../../../assets/logo1.png';

export const Navbar: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0b0c10]/80 border-b border-gray-100 dark:border-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* LOGO ET NOM MARQUE AJUSTÉS */}
        <div 
          className="flex items-center cursor-pointer group shrink-0"
          onClick={() => navigate('/')}
        >
          <img 
            src={logo1} 
            alt="Logo" 
            className="w-20 h-14 sm:w-24 sm:h-16 object-contain" 
          />
          <span className="text-lg sm:text-xl font-black text-gray-900 dark:text-white -ml-6 sm:-ml-10 tracking-tight transition-colors group-hover:text-[#7c3aed] dark:group-hover:text-purple-400 select-none">
            ventory
          </span>
        </div>

        {/* LIENS ET ACTIONS ACTIONS (Fluides de Mobile à PC) */}
        <div className="flex items-center gap-2 sm:gap-6">
          
          {/* BOUTON THÈME */}
          <button 
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {darkMode ? <FiSun className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiMoon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
          
          {/* CONNEXION */}
          <button 
            onClick={() => navigate('/login')}
            className="text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-2 py-2 cursor-pointer"
          >
            Connexion
          </button>
          
          {/* BOUTON D'ACTION PRINCIPAL */}
          <button 
            onClick={() => navigate('/register')}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs sm:text-sm font-bold px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-xl transition-all shadow-md shadow-purple-500/10 active:scale-95 cursor-pointer"
          >
            Commencer
          </button>
          
        </div>
      </div>
    </nav>
  );
};