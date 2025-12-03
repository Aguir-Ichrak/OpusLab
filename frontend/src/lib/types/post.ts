import { z } from "zod";

export const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  publishDate: z.string().nullable().optional(),
  updateDate: z.string().nullable().optional(),
  category: z.object({ id: z.number(), name: z.string(), slug: z.string() }).nullable(),
  author: z.object({ id: z.number(), name: z.string(), slug: z.string() }).nullable(),
  tags: z.array(z.object({ id: z.number(), name: z.string(), slug: z.string() })),
});

export type Post = z.infer<typeof PostSchema>;

export type PostsResponse = {
  data: Post[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};