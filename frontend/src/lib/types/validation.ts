import { z } from "zod"

export const NewsletterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
})

export const CommentSchema = z.object({
  author: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  content: z.string().min(10, "Comment must be at least 10 characters").max(1000, "Comment is too long"),
})

export type Newsletter = z.infer<typeof NewsletterSchema>
export type Comment = z.infer<typeof CommentSchema>




