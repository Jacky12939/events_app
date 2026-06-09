import React, { useEffect, useState } from 'react';
import { FaRegCalendar, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
// import { axiosInstance } from '../api/axios'; // Ton instance Axios

interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  availableSeats: number;
  imageUrl: string;
}

export const UpcomingEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // 🔌 REQUÊTE AXIOS EN ATTENTE :
        // const response = await axiosInstance.get('/events/upcoming');
        // setEvents(response.data);
        
        const mockEvents: Event[] = [
          {
            id: '1',
            title: 'Nuit Électronique',
            category: 'Musique',
            date: '14 Juin 2026',
            location: 'Cameroun, Douala',
            availableSeats: 12,
            imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=60'
          },
          {
            id: '2',
            title: 'Tech & Innovation 2026',
            category: 'Conférence',
            date: '22 Juin 2026',
            location: 'Cameroun, Yaoundé',
            availableSeats: 48,
            imageUrl: 'https://images.unsplash.com/photo-1504805108767-34cb5c04b873?w=600&auto=format&fit=crop&q=60'
          }
        ];
        setEvents(mockEvents);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      
      {/* EN-TÊTE : Aligné de gauche à droite sur PC, empilé et centré sur mobile */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div className="text-left">
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-orange-500">
            Événements à venir
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 dark:text-white mt-1 sm:mt-2 tracking-tight">
            Ne manquez rien
          </h2>
        </div>
        <button className="w-full sm:w-auto border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 text-xs sm:text-sm font-bold px-5 py-3.5 sm:py-3 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.98]">
          <span>Voir tous les événements</span> 
          <FaArrowRight className="w-3 h-3 text-gray-400" />
        </button>
      </div>

      {loading ? (
        <div className="text-center font-bold text-sm text-gray-500 dark:text-gray-400 py-16 tracking-wide animate-pulse">
          Chargement des événements...
        </div>
      ) : (
        /* GRILLE : 1 colonne sur mobile, 2 sur tablette (md), 3 sur desktop (lg) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event) => (
            <div 
              key={event.id} 
              className="group rounded-2xl bg-white dark:bg-[#12131a] border border-gray-100 dark:border-gray-900/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
            >
              {/* IMAGE WRAPPER (Ratio d'aspect fixe pour éviter les déformations) */}
              <div className="relative aspect-[16/10] sm:h-48 overflow-hidden bg-gray-100 dark:bg-gray-900 shrink-0">
                <img 
                  src={event.imageUrl} 
                  alt={event.title} 
                  className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-lg bg-black/75 text-white backdrop-blur-md tracking-wide">
                    {event.category}
                  </span>
                </div>
              </div>

              {/* CONTENU DE LA CARTE */}
              <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-gray-900 dark:text-white line-clamp-1 mb-3 sm:mb-4 sm:group-hover:text-[#7c3aed] dark:sm:group-hover:text-purple-400 transition-colors tracking-tight">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 text-xs sm:text-sm text-gray-500 dark:text-slate-400 mb-6">
                    <div className="flex items-center gap-2 font-medium">
                      <FaRegCalendar className="w-3.5 h-3.5 text-gray-400 shrink-0" /> 
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                      <FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-400 shrink-0" /> 
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* PIED DE LA CARTE */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-900/60 mt-auto">
                  <span className="text-[11px] sm:text-xs font-bold text-orange-500 tracking-wide">
                    {event.availableSeats} places restantes
                  </span>
                  <button className="bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 hover:bg-[#7c3aed] text-[#7c3aed] dark:text-purple-300 hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer active:scale-95 shadow-sm">
                    S'inscrire &nbsp;→
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
};