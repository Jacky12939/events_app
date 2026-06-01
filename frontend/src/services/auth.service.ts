import api from './api';

export const login = async (email: string, password: string) => {
  const res = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', res.data.access_token);
  localStorage.setItem('user', JSON.stringify(res.data.user));
  return res.data;
};

export const register = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
