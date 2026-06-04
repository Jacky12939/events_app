import React, { useEffect, useState } from 'react';
import { FaRegCalendar, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
// import { axiosInstance } from '../api/axios'; // Ton instance Axios

interface Event {
  id: string;
  title: string;
  category: string;
  price: string;
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
            title: 'Nuit Électronique — Berlin Sessions',
            category: 'Musique',
            price: '35€',
            date: '14 Juin 2026',
            location: 'Paris, France',
            availableSeats: 12,
            imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=60'
          },
          {
            id: '2',
            title: 'Summit Tech & Innovation 2026',
            category: 'Conférence',
            price: 'Gratuit',
            date: '22 Juin 2026',
            location: 'Lyon, France',
            availableSeats: 48,
            imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=60'
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
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Événements à venir</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2">Ne manquez rien</h2>
        </div>
        <button className="border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium px-5 py-3 rounded-xl flex items-center gap-2 transition-colors">
          Voir tous les événements <FaArrowRight className="w-3 h-3" />
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="group rounded-2xl bg-white dark:bg-[#12131a] border border-gray-100 dark:border-gray-900/60 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 flex justify-between right-4 items-center">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">{event.category}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${event.price === 'Gratuit' ? 'bg-emerald-500 text-white' : 'bg-[#7c3aed] text-white'}`}>{event.price}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 mb-4 group-hover:text-[#7c3aed] transition-colors">{event.title}</h3>
                <div className="space-y-2.5 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center gap-2"><FaRegCalendar className="w-3.5 h-3.5 text-gray-400" /> {event.date}</div>
                  <div className="flex items-center gap-2"><FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-400" /> {event.location}</div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-900">
                  <span className="text-xs font-medium text-orange-500">{event.availableSeats} places restantes</span>
                  <button className="bg-[#7c3aed]/10 dark:bg-[#7c3aed]/20 hover:bg-[#7c3aed] text-[#7c3aed] dark:text-purple-300 hover:text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all">S'inscrire →</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};