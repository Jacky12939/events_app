import { useState } from 'react';
import { useForm, type UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiSun, FiMoon } from 'react-icons/fi';
import { registerSchema, type RegisterForm } from '../validator/authSchemas';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../../../../context/ThemeContext';


// Typage des propriétés de Field — Correction faite ici avec '& string'
interface FieldProps {
  label: string;
  name: keyof RegisterForm & string;
  type?: string;
  placeholder?: string;
  icon?: React.ComponentType<{ className?: string }>;
  show?: boolean;
  onToggle?: () => void;
  register: UseFormRegister<RegisterForm>;
  errors: any;
}

// COMPOSANT DÉCLARÉ À L'EXTÉRIEUR DU RENDU
const Field = ({ label, name, type = 'text', placeholder, icon: Icon, show, onToggle, register, errors }: FieldProps) => (
  <div className="mb-4">
    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Icon className="text-gray-400" />
        </div>
      )}
      <input
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pl-10 transition"
      />
      {onToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Afficher/Masquer le mot de passe"
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      )}
    </div>
    {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>}
  </div>
);

export default function RegisterPage() {
  const { register: registerUser, loading, error } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [showPwd, setShowPwd] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForm) => {
    // On retire proprement confirm pour ne pas l'envoyer à l'API, sans créer de variable fantôme
    const payload = { ...data };
    delete (payload as any).confirm;
    registerUser(payload);
  };

    // ... reste du code identique

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 relative">
      
      {/* Bouton thème */}
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        aria-label="Toggle theme"
      >
        {darkMode ? <FiSun size={24} className="text-yellow-400" /> : <FiMoon size={24} />}
      </button>
      
      {/* Formulaire */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-white">Créer un compte</h2>
        <p className="text-center mb-6 text-gray-600 dark:text-gray-300">Rejoignez la communauté d'événements</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="Prénom" name="firstName" placeholder="Prénom" icon={FiUser} register={register} errors={errors} />
          <Field label="Nom" name="lastName" placeholder="Nom" icon={FiUser} register={register} errors={errors} />
          <Field label="Email" name="email" type="email" placeholder="Ex: email@example.com" icon={FiMail} register={register} errors={errors} />
          
          <Field 
            label="Mot de passe" 
            name="password" 
            type={showPwd ? 'text' : 'password'} 
            placeholder="Mot de passe" 
            icon={FiLock}
            show={showPwd}
            onToggle={() => setShowPwd(!showPwd)}
            register={register}
            errors={errors}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold flex justify-center items-center transition disabled:opacity-60 text-sm shadow-sm"
          >
            {loading ? 'Inscription...' : 'Créer mon compte'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Déjà un compte ? <Link to="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">Se connecter</Link>
        </p>

        <Link to="/" className="block mt-4 text-center text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:underline">
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}