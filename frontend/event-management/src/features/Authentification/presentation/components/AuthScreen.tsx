import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  FiMail, FiLock, FiUser, FiEye, FiEyeOff, 
  FiCalendar, FiLoader, FiAlertCircle, FiArrowLeft, FiSun, FiMoon 
} from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from '../validator/authSchemas';

interface AuthScreenProps {
  onAuthSuccess?: () => void;
  initialView?: 'login' | 'register';
  onBack?: () => void; // ✅ Ajout d'une prop optionnelle pour gérer le clic sur Retour
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ initialView = 'login', onBack }) => {
  const [isLoginView, setIsLoginView] = useState<boolean>(initialView === 'login');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => localStorage.getItem('theme') === 'dark');

  const { login, register: registerUser, loading, error } = useAuth();

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const onLoginSubmit = (data: LoginInput) => {
    login(data);
  };

  const onRegisterSubmit = (data: RegisterInput) => {
    registerUser(data);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col font-sans antialiased">
      
      {/* 🌐 NAVBAR COMPLETE */}
      <nav className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 fixed top-0 left-0 z-50 h-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">


          <div className="div">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-md">
                    <FiCalendar className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-black tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent dark:from-indigo-400">
                    Eventory
                  </span>

      
          </div>

          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-bold shadow-sm transition hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FiSun className="w-5 h-5 text-amber-500" /> : <FiMoon className="w-5 h-5 text-indigo-600" />}
          </button>

        </div>
      </nav>

      <div className="flex-1 flex flex-col justify-center p-4 sm:p-6 lg:p-8 pt-24 pb-12 mx-auto w-full max-w-lg">
        
        <div className="flex flex-col items-center text-center mb-8 space-y-2">
          <p className="text-lg font-medium text-slate-500 dark:text-slate-400">
            {isLoginView ? 'Ravi de vous revoir ! Connectez-vous.' : 'Créez votre compte et rejoignez les événements.'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 sm:p-10 shadow-xl transition-all">

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-base font-bold mb-6">
              <FiAlertCircle className="w-6 h-6 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isLoginView ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-wider block">Adresse Email</label>
                <div className="relative flex items-center">
                  <FiMail className="absolute left-4 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    {...loginForm.register('email')}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="exemple@domaine.com"
                  />
                </div>
                {loginForm.formState.errors.email && (
                  <p className="text-sm font-bold text-red-500 mt-1">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-wider block">Mot de passe</label>
                <div className="relative flex items-center">
                  <FiLock className="absolute left-4 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...loginForm.register('password')}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-sm font-bold text-red-500 mt-1">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-400"
              >
                {loading ? <FiLoader className="w-5 h-5 animate-spin" /> : 'Se connecter'}
              </button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-wider block">Prénom</label>
                  <div className="relative flex items-center">
                    <FiUser className="absolute left-4 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      {...registerForm.register('firstName')}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      placeholder="Jean"
                    />
                  </div>
                  {registerForm.formState.errors.firstName && (
                    <p className="text-sm font-bold text-red-500 mt-1">{registerForm.formState.errors.firstName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-400 uppercase tracking-wider block">Nom</label>
                  <div className="relative flex items-center">
                    <FiUser className="absolute left-4 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      {...registerForm.register('lastName')}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      placeholder="Dupont"
                    />
                  </div>
                  {registerForm.formState.errors.lastName && (
                    <p className="text-sm font-bold text-red-500 mt-1">{registerForm.formState.errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-wider block">Adresse Email</label>
                <div className="relative flex items-center">
                  <FiMail className="absolute left-4 text-slate-400 w-5 h-5" />
                  <input
                    type="email"
                    {...registerForm.register('email')}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="exemple@domaine.com"
                  />
                </div>
                {registerForm.formState.errors.email && (
                  <p className="text-sm font-bold text-red-500 mt-1">{registerForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-wider block">Mot de passe</label>
                <div className="relative flex items-center">
                  <FiLock className="absolute left-4 text-slate-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...registerForm.register('password')}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-sm font-bold text-red-500 mt-1">{registerForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-400 uppercase tracking-wider block">Confirmer le mot de passe</label>
                <div className="relative flex items-center">
                  <FiLock className="absolute left-4 text-slate-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...registerForm.register('confirmPassword')}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                      placeholder="••••••"
                    />
                </div>
                {registerForm.formState.errors.confirmPassword && (
                  <p className="text-sm font-bold text-red-500 mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-black rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-400"
              >
                {loading ? <FiLoader className="w-5 h-5 animate-spin" /> : 'Créer mon compte'}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
   <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
    {isLoginView ? "Nouveau sur Eventory ?" : "Vous avez déjà un compte ?"}
    <button
      type="button"
      onClick={() => {
        setIsLoginView(!isLoginView);
        loginForm.reset();
        registerForm.reset();
      }}
      className="ml-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline underline-offset-4 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-md px-1 py-0.5"
    >
      {isLoginView ? "Créez un compte" : "Connectez-vous"}
    </button>
  </p>
</div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;