"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Newsletter, NewsletterSchema } from "@/lib/types/validation"
import { createNewsletter } from "@/lib/strapi/newsletter"

export function NewsletterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Newsletter>({
    resolver: zodResolver(NewsletterSchema),
  })

  const onSubmit = async (data: Newsletter) => {
    setIsLoading(true)
    setMessage(null)

    const result = await createNewsletter(data)

    if (!result.success) {
      setMessage({
        type: "error",
        text: result.error || "Failed to submit comment.",
      })
    } else {
      setMessage({
        type: "success",
        text: "Successfully subscribed",
      })
      reset()

      setTimeout(() => setMessage(null), 5000)
    }


    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Input
        id="name"
        placeholder="Enter your name"
        {...register("name")}
        className={errors.name ? "border-red-500" : ""}
        disabled={isLoading}
      />
      {errors.name && (
        <p className="text-xs text-red-600">{errors.name.message}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          disabled={isLoading}
          className={errors.email ? "border-red-500 flex-1" : "flex-1"}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </Button>
      </div>
      {errors.email && (
        <p className="text-xs text-red-600">{errors.email.message}</p>
      )}

      {message && (
        <div
          className={`p-1 text-xs text-center ${message.type === "success" ? "text-green-700" : "text-red-700"
            }`}
        >
          {message.text}
        </div>
      )}
    </form>
  )
}
