import { z } from "zod";

export const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  author: z.string(),
  isbn: z.string(),
  publishedAt: z.number(),
  createdAt: z.number(),
  updatedAt: z.number(),
});

export type Book = z.infer<typeof bookSchema>;
