// import { z } from "zod";

// export const createEventSchema = z.object({
//   title: z.string().min(3),

//   description: z.string().min(10),

//   location: z.string().min(3),

//   category: z.string().min(2),

//   imageUrl: z.string().url(),

//   date: z.string(),

//   capacity: z.coerce.number().min(1),

//   status: z.enum([
//     "draft",
//     "published",
//     "cancelled",
//   ]),
// });

// export type CreateEventFormData =
//   z.infer<typeof createEventSchema>;