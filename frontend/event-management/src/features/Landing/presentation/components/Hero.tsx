import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaRegCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import event1 from '../../../../../assets/event1.jpg';
import event2 from '../../../../../assets/event2.jpg';
import event3 from '../../../../../assets/event3.jpg';
import event4 from '../../../../../assets/event4.jpg';

export const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const backgroundImages = [event1, event2, event3, event4];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(timer);
  }, [backgroundImages.length]);

  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24 text-center px-4 min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center transition-colors duration-200">

      {/* Background Carousel Slide */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="flex h-full transition-transform duration-[2000ms] ease-in-out"
          style={{
            width: `${backgroundImages.length * 100}%`,
            transform: `translateX(-${currentImageIndex * (100 / backgroundImages.length)}%)`,
          }}
        >
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              className="h-full flex-shrink-0"
              style={{ width: `${100 / backgroundImages.length}%` }}
            >
              <img
                src={image}
                alt={`Event ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Overlay plus prononcé sur mobile pour contrer les écritures blanches sur fond clair */}
        <div className="absolute inset-0 bg-white/50 dark:bg-slate-950/65 sm:bg-white/40 sm:dark:bg-slate-950/50 transition-colors" />

        {/* Dégradé directionnel */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white/80 dark:from-transparent dark:via-slate-950/40 dark:to-slate-950/90" />
      </div>

      {/* Glow décoratif (masqué sur mobile pour économiser la batterie et les performances) */}
      <div className="hidden sm:block absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-500/10 blur-[150px] rounded-full pointer-events-none" />

      {/* Contenu Principal */}
      <div className="max-w-3xl mx-auto relative z-10 space-y-6 sm:space-y-8 w-full">

        {/* Badge supérieur - Devient plus petit et compact sur mobile */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/40 dark:border-slate-800 shadow-sm max-w-[95%] sm:max-w-none">
          <FaRegCheckCircle className="text-emerald-500 shrink-0 w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-[11px] sm:text-sm font-bold text-gray-700 dark:text-gray-300 tracking-wide truncate">
            Plateforme moderne de gestion d'événements
          </span>
        </div>

        {/* Bloc Titre et Description */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-[1.15] sm:leading-tight">
            Trouvez et organisez des{' '}
            <span className="text-[#7c3aed] dark:text-[#a78bfa]">événements</span> uniques
          </h1>

          <p className="text-sm sm:text-lg text-gray-800 dark:text-slate-300 max-w-xl sm:max-w-2xl mx-auto font-medium leading-relaxed px-2">
            Obtenez vos billets avec QR code en quelques secondes. Des outils puissants pour chaque acteur de l'événementiel.
          </p>
        </div>

        {/* Boutons d'action (Pleine largeur sur mobile, côte à côte sur tablette/PC) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm sm:max-w-md mx-auto px-2">
          <button
            onClick={() => navigate('/register')}
            className="w-full sm:w-auto bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm font-bold px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-purple-600/20 group cursor-pointer sm:hover:scale-105"
          >
            Commencer gratuitement
            <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/login')}
            className="w-full sm:w-auto border border-gray-300/80 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-900 dark:text-white text-sm font-bold px-5 py-3.5 rounded-xl transition-all duration-300 sm:hover:scale-105 cursor-pointer"
          >
            Se connecter
          </button>
        </div>

        {/* Indicateurs de carrousel tactiles */}
        <div className="flex justify-center gap-2.5 pt-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentImageIndex
                  ? 'w-7 bg-[#7c3aed] dark:bg-purple-400'
                  : 'w-2 bg-gray-300 dark:bg-slate-700'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Avantages : Grille fluide s'adaptant parfaitement de 1 à 3 colonnes selon l'écran */}
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center gap-2.5 pt-4 text-xs sm:text-sm font-bold text-gray-700 dark:text-slate-300 max-w-xs sm:max-w-none mx-auto">
          <div className="flex items-center justify-center gap-2 bg-white/60 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
            <FaRegCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Gratuit</span>
          </div>

          <div className="flex items-center justify-center gap-2 bg-white/60 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
            <FaRegCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Sans carte bancaire</span>
          </div>

          <div className="flex items-center justify-center gap-2 bg-white/60 dark:bg-slate-900/50 border border-white/20 dark:border-slate-800 px-4 py-2 rounded-xl backdrop-blur-sm shadow-sm">
            <FaRegCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Disponible 24/7</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;