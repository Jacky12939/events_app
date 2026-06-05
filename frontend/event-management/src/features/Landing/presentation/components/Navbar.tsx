import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0b0c10]/80 border-b border-gray-100 dark:border-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="bg-[#7c3aed] text-white p-2 rounded-xl">
            <FaCalendarAlt className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">Eventory</span>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          </button>
          
          <button 
            onClick={() => navigate('/login')}
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Connexion
          </button>
          
          <button 
            onClick={() => navigate('/register')}
            className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-purple-500/20"
          >
            Commencer
          </button>
        </div>
      </div>
    </nav>
  );
};