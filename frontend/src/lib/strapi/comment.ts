import { Comment } from "../types/validation"
import api from "./api"

export async function createComment(data: Comment) {
  try {
    const url = "/api/comments"

    const payload = {
      data: {
        author: data.author,
        email: data.email,
        content: data.content,
      },
    }

    const response = await api.post(url, payload)

    return {
      success: true,
      data: response.data,
    }
  } catch (error: any) {
    console.error("Error creating comment:", error)

    return {
      success: false,
      error:
        error?.response?.data?.error?.message ||
        "Failed to submit comment",
    }
  }
}
