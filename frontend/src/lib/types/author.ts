import { z } from "zod";

export const AuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  posts: z.array(z.any()).optional(),
});

export type Author = z.infer<typeof AuthorSchema>;

export type AuthorsResponse = {
  data: Author[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}