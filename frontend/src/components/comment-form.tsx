"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Comment, CommentSchema } from "@/lib/types/validation"
import { createComment } from "@/lib/strapi/comment"

export function CommentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Comment>({
    resolver: zodResolver(CommentSchema),
  })

  async function onSubmit(data: Comment) {
    setIsSubmitting(true)
    setMessage(null)

    const result = await createComment(data)

    if (!result.success) {
      setMessage({
        type: "error",
        text: result.error || "Failed to submit comment.",
      })
    } else {
      setMessage({
        type: "success",
        text: "Comment submitted! It will appear after moderation.",
      })
      reset()

      setTimeout(() => setMessage(null), 5000)
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-lg font-semibold">Leave a Comment</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input {...register("author")} placeholder="Your name" disabled={isSubmitting} className={errors.author ? "border-red-500" : ""} />
          {errors.author && <p className="text-xs text-red-600 mt-1">{errors.author.message}</p>}
        </div>

        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Your email"
            disabled={isSubmitting}
            className={errors.email ? "border-red-500" : ""}

          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <Textarea
          {...register("content")}
          placeholder="Your comment..."
          rows={4}
          disabled={isSubmitting}
          className={errors.content ? "border-red-500" : ""}
        />
        {errors.content && <p className="text-xs text-red-600 mt-1">{errors.content.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Comment"}
      </Button>

      {message && (
        <div
          className={`p-1 text-xs text-center ${message.type === "success"
            ? "text-green-800"
            : "text-red-600"
            }`}
        >
          {message.text}
        </div>
      )}
    </form>
  )
}

