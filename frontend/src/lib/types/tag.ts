import { z } from "zod";

export const TagSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  posts: z.array(z.any()).optional(),
    updateDate: z.string().nullable().optional(),

});

export type Tag = z.infer<typeof TagSchema>;

export type TagsResponse = {
  data: Tag[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}