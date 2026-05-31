import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, 'Prénom requis (min 2 caractères)'),
  lastName:  z.string().min(2, 'Nom requis (min 2 caractères)'),
  email:     z.string().email('Email invalide'),
  password:  z.string().min(6, 'Mot de passe : minimum 6 caractères'),
  confirm:   z.string(),
}).refine((d) => d.password === d.confirm, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirm'],
});

export type LoginForm    = z.infer;
export type RegisterForm = z.infer;