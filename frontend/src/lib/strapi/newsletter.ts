import api from "./api"
import { Newsletter } from "../types/validation"

export async function createNewsletter(data: Newsletter) {
  try {
    const strapiUrl =
      process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"

    const url = `${strapiUrl}/api/newsletters`

    const payload = {
      data: {
        name: data.name,
        email: data.email,
      },
    }

    const response = await api.post(url, payload)

    return {
      success: true,
      data: response.data,
    }
  } catch (error: any) {
    console.error("Error creating newsletter:", error)

    return {
      success: false,
      error:
        error?.response?.data?.error?.message ||
        "Failed to subscribe to newsletter",
    }
  }
}

