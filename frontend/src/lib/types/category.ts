import { z } from "zod";

export const CategorySchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  posts: z.array(z.any()).optional(),
  updateDate: z.string().nullable().optional(),
});

export type Category = z.infer<typeof CategorySchema>;

export type CategoriesResponse = {
  data: Category[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}