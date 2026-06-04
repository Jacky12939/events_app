import { z } from 'zod';

export const eventFilterSchema = z.object({
  searchQuery: z.string().max(100, 'Recherche trop longue').trim(),
  category: z.string().trim(),
  location: z.string().trim(),
  date: z.string().trim(),
});

export type EventFilterInput = z.infer<typeof eventFilterSchema>;