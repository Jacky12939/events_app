import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthRepositoryImpl } from '../../data/impRepositories/AuthRepositoryImpl';
import type { LoginPayload, RegisterPayload } from '../../domain/repositories/AuthRepository';

const authRepo = new AuthRepositoryImpl();

export function useAuth() {
  const navigate   = useNavigate();
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const login = async (payload: LoginPayload) => {
    setLoading(true); setError(null);
    try {
      const res = await authRepo.login(payload);
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('user', JSON.stringify(res.user));
      // Redirection selon le rôle
      const role = res.user.role;
      if (role === 'ADMIN')      navigate('/admin/dashboard');
      else if (role === 'ORGANIZER') navigate('/organizer/dashboard');
      else navigate('/events');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Email ou mot de passe incorrect');
    } finally { setLoading(false); }
  };

  const register = async (payload: RegisterPayload) => {
    setLoading(true); setError(null);
    try {
      const res = await authRepo.register(payload);
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('user', JSON.stringify(res.user));
      navigate('/events');
    } catch (e: any) {
      setError(e.response?.data?.message || 'Erreur lors de l\'inscription');
    } finally { setLoading(false); }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const getUser = () => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  };

  const isAuthenticated = () => !!localStorage.getItem('access_token');

  return { login, register, logout, getUser, isAuthenticated, loading, error };
}