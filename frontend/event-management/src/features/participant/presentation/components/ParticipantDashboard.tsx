import React, { useEffect, useState } from 'react';
import { 
  FiCalendar, FiMapPin, FiSearch, FiSliders, FiLoader, FiAlertTriangle, FiUser, FiLogOut, FiArrowLeft, FiCheckCircle, FiUserCheck, FiDownload, FiLayers
} from 'react-icons/fi';
import { useParticipant } from '../hooks/useParticipantData';
import { Navigate } from 'react-router-dom';
// import { FiQrCode } from 'react-qr-code'

export const ParticipantDashboard: React.FC = () => {
  const {
    events, myTickets, profile, selectedEvent, loading, error, filters, successRegistration,
    setFilters, setSuccessRegistration, setSelectedEvent, loadDashboardData, viewEventDetails, registerToEvent
  } = useParticipant();

  const [activeTab, setActiveTab] = useState<'discover' | 'tickets' | 'profile'>('discover');
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans antialiased">
      
      <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm h-22 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setSelectedEvent(null); setSuccessRegistration(false); setActiveTab('discover'); }}>
            <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
              <FiCalendar className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent dark:from-indigo-400">
              Eventory
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="
                p-3
                bg-slate-100 dark:bg-slate-800
                rounded-xl
                text-base font-bold
                cursor-pointer
                transition-all duration-300
                hover:bg-slate-200
                dark:hover:bg-slate-700
                hover:scale-105
                hover:shadow-md
              "
            >
              {darkMode ? '☀️' : '🌙'}
            </button>

           <button
              onClick={() => Navigate('/profile')}
              className="
                flex items-center gap-3
                px-4 py-2
                bg-indigo-50 dark:bg-indigo-950/40
                border border-indigo-100 dark:border-indigo-900
                rounded-xl
                cursor-pointer
                transition-all duration-300
                hover:bg-indigo-100
                dark:hover:bg-indigo-900/60
                hover:shadow-md
                hover:scale-105
              "
            >
              <FiUserCheck className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />

              <span className="text-base font-extrabold text-indigo-700 dark:text-indigo-300 hidden sm:inline">
                Mon Compte
              </span>
            </button>

            <button className="p-3 text-slate-400 hover:text-red-500 rounded-xl transition" title="Déconnexion">
              <FiLogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {loading && !selectedEvent && (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <FiLoader className="w-12 h-12 text-indigo-600 dark:text-indigo-400 animate-spin" />
            <p className="text-xl font-bold text-slate-500">Appel des services Axios en cours...</p>
          </div>
        )}

        {error && (
          <div className="p-5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-2xl flex items-start gap-4 text-red-700 dark:text-red-400 mb-8">
            <FiAlertTriangle className="shrink-0 w-6 h-6 mt-0.5" />
            <div>
              <h3 className="font-extrabold text-xl">Erreur Réseau API</h3>
              <p className="text-lg font-medium mt-1">{error}</p>
            </div>
          </div>
        )}

       
        {/* MODAL / ÉCRAN : CONFIRMATION D'INSCRIPTION (Réf: 36_3.png)                 */}
      
        {!loading && successRegistration && (
          <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-10 text-center shadow-xl animate-scaleUp">
            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-4xl mb-6 border border-emerald-100 dark:border-emerald-900">
              <FiCheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Inscription confirmée !</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium mt-3">
              Vous êtes maintenant inscrit à l'événement. Votre billet est disponible.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <button 
                onClick={() => { setSuccessRegistration(false); setSelectedEvent(null); setActiveTab('tickets'); }}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-xl shadow-lg transition cursor-pointer"
              >
                Voir mon billet
              </button>
              <button 
                onClick={() => { setSuccessRegistration(false); setSelectedEvent(null); setActiveTab('discover'); }}
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-lg rounded-xl transition cursor-pointer"
              >
                Retour aux événements
              </button>
            </div>
          </div>
        )}

       
        {!loading && !successRegistration && selectedEvent && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center">
              <button 
                onClick={() => setSelectedEvent(null)}
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-xl hover:underline cursor-pointer"
              >
                <FiArrowLeft className="w-5 h-5" /> Retour
              </button>
            </div>
            
            <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center relative">
              <FiCalendar className="w-24 h-24 text-white/30" />
            </div>

            <div className="p-8 sm:p-10 space-y-8">
              <div className="space-y-3">
                <span className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full font-black text-sm uppercase tracking-wide">
                  {selectedEvent.category}
                </span>
                <h2 className="text-4xl font-black tracking-tight">{selectedEvent.title}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-400"><FiCalendar className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Date et heure</h4>
                    <p className="text-xl font-extrabold mt-0.5">{selectedEvent.date}</p>
                    <p className="text-base font-medium text-slate-500 mt-0.5">{selectedEvent.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-400"><FiMapPin className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Lieu</h4>
                    <p className="text-xl font-extrabold mt-0.5">{selectedEvent.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-400"><FiUser className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Capacité</h4>
                    <p className="text-xl font-extrabold mt-0.5">{selectedEvent.registeredCount} / {selectedEvent.capacity} inscrits</p>
                    <p className="text-base font-black text-emerald-500 mt-0.5">{selectedEvent.availablePlaces} places disponibles</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-400"><FiUserCheck className="w-6 h-6" /></div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Organisateur</h4>
                    <p className="text-xl font-extrabold mt-0.5">{selectedEvent.organizerName}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3">
                <h3 className="text-2xl font-black">Description</h3>
                <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => registerToEvent(selectedEvent.id)}
                  disabled={selectedEvent.availablePlaces === 0}
                  className="w-full sm:w-auto px-10 py-4.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl rounded-xl shadow-lg transition disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer"
                >
                  S'inscrire ({selectedEvent.availablePlaces} places disponibles)
                </button>
              </div>
            </div>
          </div>
        )}

       
        {!selectedEvent && !successRegistration && (
          <div className="space-y-10">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8 overflow-x-auto scrollbar-none">
              <button 
                onClick={() => setActiveTab('discover')}
                className={`pb-4 text-xl font-black border-b-4 transition whitespace-nowrap cursor-pointer ${activeTab === 'discover' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Événements disponibles
              </button>
              <button 
                onClick={() => setActiveTab('tickets')}
                className={`pb-4 text-xl font-black border-b-4 transition whitespace-nowrap cursor-pointer ${activeTab === 'tickets' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
              >
                Mes billets ({myTickets.length})
              </button>
             
            </div>

           
            {/* ONGLET : ENTRÉE CATALOGUE (Réf: 31_3.png)                                  */}
            
            {activeTab === 'discover' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 md:col-span-2">
                    <FiSearch className="text-slate-400 shrink-0 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Rechercher un événement par titre ou description..." 
                      value={filters.searchQuery}
                      onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                      className="bg-transparent text-lg w-full focus:outline-none font-medium" 
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <FiSliders className="text-slate-400 shrink-0 w-5 h-5" />
                    <select 
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                      className="bg-transparent text-lg w-full focus:outline-none font-extrabold text-slate-700 dark:text-slate-300 cursor-pointer"
                    >
                      <option value="">Catégorie</option>
                      <option value="Atelier">Atelier</option>
                      <option value="Conférence">Conférence</option>
                      <option value="Formation">Formation</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 px-4 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <FiMapPin className="text-slate-400 shrink-0 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Localisation..." 
                      value={filters.location}
                      onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                      className="bg-transparent text-lg w-full focus:outline-none font-medium" 
                    />
                  </div>
                </div>

                <p className="text-lg font-bold text-slate-400 uppercase tracking-wider">{events.length} événements trouvés</p>

                {/* Grid Responsive de cartes d'événements */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {events.map((event) => (
                    <div key={event.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between group">
                      <div className="h-44 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 p-6 flex flex-col justify-between relative">
                        <FiLayers className="w-10 h-10 text-white/20 absolute right-4 top-4" />
                        <span className="self-start px-3 py-1 bg-white/90 dark:bg-slate-900/90 text-indigo-600 dark:text-indigo-400 font-black text-xs uppercase rounded-md backdrop-blur-sm">
                          {event.category}
                        </span>
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white text-xl">
                          <FiCalendar />
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
                        <div className="space-y-3">
                          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white line-clamp-1">
                            {event.title}
                          </h3>
                          <p className="text-lg text-slate-500 dark:text-slate-400 line-clamp-2 font-medium">
                            {event.description}
                          </p>

                          <div className="space-y-2 pt-2 text-base text-slate-500 dark:text-slate-400 font-bold">
                            <div className="flex items-center gap-3"><FiCalendar className="text-slate-400 w-5 h-5" /> <span>{event.date}</span></div>
                            <div className="flex items-center gap-3"><FiMapPin className="text-slate-400 w-5 h-5" /> <span>{event.location}</span></div>
                            <div className="flex items-center gap-3"><FiUser className="text-slate-400 w-5 h-5" /> <span>{event.registeredCount} / {event.capacity} inscrits</span></div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                          <button 
                            onClick={() => viewEventDetails(event.id)}
                            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-xl transition text-center shadow-md cursor-pointer"
                          >
                            S'inscrire ({event.availablePlaces} places)
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          
            {/* ONGLET : GESTION DES BILLETS ACTIFS (Réf: 32_3.png, 33_3.png, 35_3.png)      */}
           
            {activeTab === 'tickets' && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black tracking-tight">Mes billets</h2>
                
                {myTickets.length === 0 ? (
                  <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 max-w-2xl mx-auto space-y-5">
                    <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl flex items-center justify-center mx-auto text-4xl">
                      {/* <FiQrCode /> */}
                    </div>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-extrabold">Vous n'avez aucun billet enregistré.</p>
                    <button 
                      onClick={() => setActiveTab('discover')}
                      className="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-xl transition shadow-lg cursor-pointer"
                    >
                      Découvrir les événements
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {myTickets.map((ticket) => (
                      <div key={ticket.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg flex flex-col justify-between">
                        
                        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white space-y-1">
                          <div className="flex justify-between items-center"><span className="text-xs font-black tracking-widest uppercase opacity-75">Billet Officiel</span></div>
                          <h3 className="text-2xl font-black tracking-tight line-clamp-1">{ticket.title}</h3>
                          <p className="text-base font-medium opacity-90">Billet N° {ticket.ticketNumber || 'TKT-001-2024'}</p>
                        </div>

                        <div className="p-6 sm:p-8 space-y-6">
                          <div className="grid grid-cols-1 gap-4 text-base font-semibold text-slate-600 dark:text-slate-400">
                            <div><span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Date et heure</span><p className="text-slate-900 dark:text-white font-black text-lg">{ticket.date} à {ticket.time}</p></div>
                            <div><span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Lieu</span><p className="text-slate-900 dark:text-white font-black text-lg">{ticket.location}</p></div>
                            <div><span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Participant</span><p className="text-slate-900 dark:text-white font-black text-lg">{profile?.fullName || 'Participant Demo'}</p><p className="text-base font-medium opacity-80">{profile?.email}</p></div>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 text-center space-y-4">
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider block">Code QR d'accès</span>
                            <div className="w-44 h-44 bg-white p-3 rounded-xl mx-auto shadow-sm border border-slate-100 flex items-center justify-center">
                              <div className="w-full h-full border-4 border-dashed border-slate-900 flex items-center justify-center p-2">
                                <div className="grid grid-cols-4 gap-1.5 w-full h-full">
                                  {Array.from({ length: 16 }).map((_, i) => (
                                    <div key={i} className={`rounded-sm ${(i % 2 === 0 || i % 3 === 0) ? 'bg-slate-900' : 'bg-transparent'}`} />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-slate-400 font-medium">Présentez ce code QR à l'entrée de l'événement.</p>
                          </div>

                          <button 
                            onClick={() => alert('Génération et téléchargement PDF du billet...')}
                            className="w-full py-3.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-indigo-400 font-black text-lg rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <FiDownload className="w-5 h-5" /> Télécharger le billet
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

           
            {/* ONGLET : PARAMÈTRES ET COMPTE PARTICIPANT ()                  */}
          
            {activeTab === 'profile' && profile && (
              <div className="max-w-3xl mx-auto space-y-8">
                <h2 className="text-3xl font-black tracking-tight">Mon compte</h2>
                
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center text-3xl font-black">
                        {profile.fullName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tight">{profile.fullName}</h3>
                        <span className="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-xs font-black rounded-md mt-1 uppercase">
                          {profile.role}
                        </span>
                      </div>
                    </div>
                    <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-xl transition shadow-md cursor-pointer">
                      Modifier
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-base font-semibold">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Nom complet</label>
                      <div className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-xl text-lg text-slate-800 dark:text-slate-200">
                        {profile.fullName}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Adresse email</label>
                      <div className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-xl text-lg text-slate-800 dark:text-slate-200">
                        {profile.email}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Rôle</label>
                      <div className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-xl text-lg text-slate-800 dark:text-slate-200 capitalize">
                        {profile.role.toLowerCase()}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Membre depuis</label>
                      <div className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-xl text-lg text-slate-800 dark:text-slate-200">
                        {profile.joinedDate}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section statistiques de la maquette */}
                <div className="space-y-4">
                  <h3 className="text-xl font-black tracking-tight">Statistiques du compte</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
                    <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 rounded-2xl p-6 text-center">
                      <span className="text-4xl font-black text-indigo-600 dark:text-indigo-400 block">{profile.stats.totalRegistered}</span>
                      <span className="text-base font-bold text-slate-500 dark:text-slate-400 mt-1 block">Inscrits</span>
                    </div>

                    <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900 rounded-2xl p-6 text-center">
                      <span className="text-4xl font-black text-emerald-500 block">{profile.stats.accountStatus}</span>
                      <span className="text-base font-bold text-slate-500 dark:text-slate-400 mt-1 block">Statut du compte</span>
                    </div>

                    <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-2xl p-6 text-center">
                      <span className="text-4xl font-black text-blue-500 block">{profile.stats.currentYear}</span>
                      <span className="text-base font-bold text-slate-500 dark:text-slate-400 mt-1 block">2024</span>
                    </div>

                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

export default ParticipantDashboard;