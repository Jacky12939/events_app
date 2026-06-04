import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: "Format de l'adresse email invalide." }).trim(),
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});

export const registerSchema = z.object({
  firstName: z.string()
    .min(2, { message: "Le prénom doit contenir au moins 2 caractères." })
    .max(50, { message: "Le prénom est trop long." })
    .trim(),
  lastName: z.string()
    .min(2, { message: "Le nom doit contenir au moins 2 caractères." })
    .max(50, { message: "Le nom est trop long." })
    .trim(),
  email: z.string()
    .min(1, { message: "L'adresse email est requise." })
    .email({ message: "Format de l'adresse email invalide." })
    .trim(),
  password: z.string()
    .min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
  confirmPassword: z.string()
    .min(1, { message: "La confirmation du mot de passe est requise." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
});

// Extraction automatique des types TypeScript pour les utiliser ailleurs
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;