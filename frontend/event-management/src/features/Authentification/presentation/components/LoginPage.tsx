import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useState } from 'react';
import { loginSchema, type LoginForm } from '../validator/authSchemas';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../../../../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginForm) => login(data);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 cursor-pointer" onClick={toggleTheme}>
        {darkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
      </div>

      {/* Logo / Title */}
      <h1 className="text-3xl font-bold mb-4">E</h1>
      <h2 className="text-xl mb-4">Bon retour !</h2>
      <p className="mb-4">Connectez-vous à votre compte</p>

      {/* Card */}
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow">
        {error && (
          <div className="mb-4 text-red-500">{error}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="block mb-1">Adresse email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full pl-10 pr-4 py-2 border rounded"
                {...register('email')}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1">Mot de passe</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Votre mot de passe"
                className="w-full pl-10 pr-10 py-2 border rounded"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Links */}
        <div className="mt-4 flex flex-col items-center space-y-2">
          <p>
            Pas encore de compte ? <Link to="/register" className="text-blue-500">S'inscrire</Link>
          </p>
          <Link to="/" className="text-gray-500 hover:underline">← Retour à l'accueil</Link>
        </div>
      </div>
    </div>
  );
}