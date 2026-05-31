import { Link } from 'react-router-dom';
import { FiCalendar, FiUsers, FiMapPin, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../../../context/ThemeContext';

const features = [
  { icon: FiCalendar, title: 'Gérez vos événements', desc: 'Créez et publiez vos événements en quelques clics avec statuts personnalisables.' },
  { icon: FiUsers, title: 'Inscriptions faciles', desc: 'Les participants s\'inscrivent en un clic et reçoivent un billet avec QR code.' },
  { icon: FiMapPin, title: 'Trouvez près de vous', desc: 'Filtrez par catégorie, localisation, date et trouvez l\'événement parfait.' },
];

const stats = [
  { value: '500+', label: 'Événements' },
  { value: '10k+', label: 'Participants' },
  { value: '50+', label: 'Organisateurs' },
  { value: '20+', label: 'Catégories' },
];

export default function LandingPage() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 shadow-md">
        {/* Logo / Title */}
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold">E</div>
          <h1 className="text-xl font-semibold">EventHub</h1>
        </div>
        
        {/* Boutons de thème et liens */}
        <div className="flex items-center space-x-4">
          {/* Bouton de changement de mode */}
          <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
          </button>
          
          {/* Liens */}
          <Link to="/login" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition">
            Se connecter
          </Link>
          <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            S'inscrire
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white">
        <div className="max-w-2xl mb-8 md:mb-0 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">🎉 Plateforme de gestion d'événements</h2>
          <p className="text-lg mb-6">Découvrez & participez aux meilleurs événements</p>
          <p className="mb-6">Concerts, conférences, festivals, ateliers... Trouvez l'événement qui vous correspond et recevez votre billet instantanément.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
            <Link to="/register" className="px-6 py-3 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100 transition">
              Commencer gratuitement
            </Link>
            <Link to="/events" className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded hover:bg-white hover:text-blue-600 transition">
              Explorer les événements
            </Link>
          </div>
        </div>
        {/* Image ou illustration (optionnel) */}
        {/* <div className="w-full md:w-1/2">
          <img src="your-image-url" alt="Evénement" className="w-full h-auto" />
        </div> */}
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-gray-50 dark:bg-gray-800">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center p-4 rounded bg-white dark:bg-gray-700 shadow">
            <span className="text-2xl font-bold">{s.value}</span>
            <span className="mt-2 text-gray-600 dark:text-gray-300">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="p-8 md:p-16 bg-white dark:bg-gray-900">
        <h3 className="text-3xl font-bold mb-8 text-center">Pourquoi choisir EventHub ?</h3>
        <p className="text-center mb-12">Tout ce dont vous avez besoin en un seul endroit</p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="p-6 border rounded shadow hover:shadow-lg transition bg-gray-50 dark:bg-gray-800">
              <div className="text-blue-600 mb-4">{<f.icon className="w-8 h-8" />}</div>
              <h4 className="text-xl font-semibold mb-2">{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex flex-col md:flex-row items-center justify-between p-8 md:p-16 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
        <div className="max-w-xl mb-8 md:mb-0 text-center md:text-left">
          <h3 className="text-3xl font-bold mb-4">Prêt à vous lancer ?</h3>
          <p className="mb-6">Rejoignez des milliers de participants et organisateurs dès aujourd'hui.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/register" className="px-6 py-3 bg-white text-purple-600 font-semibold rounded shadow hover:bg-gray-100 transition">
            Créer un compte
          </Link>
          <Link to="/login" className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded hover:bg-white hover:text-purple-600 transition">
            Se connecter
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto p-4 text-center bg-gray-200 dark:bg-gray-900">
        © {new Date().getFullYear()} EventHub — Tous droits réservés
      </footer>
    </div>
  );
}