// import { z } from "zod";

// export const createOrganizerSchema = z.object({
//   firstName: z
//     .string()
//     .min(2, "Minimum 2 caractères"),

//   lastName: z
//     .string()
//     .min(2, "Minimum 2 caractères"),

//   email: z
//     .string()
//     .email("Email invalide"),

//   password: z
//     .string()
//     .min(6, "Minimum 6 caractères"),
// });

// export type CreateOrganizerFormData =
//   z.infer<typeof createOrganizerSchema>;