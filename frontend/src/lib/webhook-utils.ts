export const validateWebhookSecret = (headerSecret: string | null, envSecret: string | undefined): boolean => {
  if (!envSecret) return true 
  return headerSecret === envSecret
}

export const getWebhookEventType = (model: string, event: string): "publish" | "unpublish" | "delete" | "unknown" => {
  if (event.includes("publish")) return "publish"
  if (event.includes("unpublish")) return "unpublish"
  if (event.includes("delete")) return "delete"
  return "unknown"
}

export const shouldRevalidateModel = (model: string): boolean => {
  return ["post", "category", "tag", "author"].includes(model)
}
