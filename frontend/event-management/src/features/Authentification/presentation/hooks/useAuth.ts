import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepositoryImpl } from '../../data/impRepositories/AuthRepositoryImpl';
import type { LoginInput, RegisterInput } from '../validator/authSchemas';

const authRepo = new AuthRepositoryImpl();

export function useAuth() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authRepo.login(payload);
      localStorage.setItem('access_token', res.token || res.user?.token || '');
      // ✅ BUG 4 & 6 CORRIGÉ : ajout du champ "name" pour la Navbar
      const userToStore = { ...res.user, name: `${res.user.firstName} ${res.user.lastName}`.trim() };
      localStorage.setItem('user', JSON.stringify(userToStore));
      const role = res.user.role;
      if (role === 'ADMIN') navigate('/admin/dashboard');
      else if (role === 'ORGANIZER') navigate('/organizer/dashboard');
      else navigate('/events');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authRepo.register(payload);
      localStorage.setItem('access_token', res.token || res.user?.token || '');
      // ✅ BUG 4 & 6 CORRIGÉ : ajout du champ "name" pour la Navbar
      const userToStore = { ...res.user, name: `${res.user.firstName} ${res.user.lastName}`.trim() };
      localStorage.setItem('user', JSON.stringify(userToStore));
      // ✅ BUG 5 CORRIGÉ : redirection par rôle après inscription
      const role = res.user.role;
      if (role === 'ADMIN') navigate('/admin/dashboard');
      else if (role === 'ORGANIZER') navigate('/organizer/dashboard');
      else navigate('/events');
    } catch (e: any) {
      setError(e.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getUser = () => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  };

  const isAuthenticated = () => !!localStorage.getItem('access_token');

  return { login, register, logout, getUser, isAuthenticated, loading, error };
}