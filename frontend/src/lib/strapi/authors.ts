import { AuthorsResponse } from "../types/author"
import api from "./api"

export async function getAuthors(): Promise<AuthorsResponse> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    const url = `${strapiUrl}/api/authors`

    const queryParams = {
      populate: "*",
    }

    const response = await api.get(url, { params: queryParams })

    const rawData = response.data?.data || []
    const transformedData = rawData.map((rawAuthor: any) => ({
      id: rawAuthor.id,
      name: rawAuthor.name || "",
      slug: rawAuthor.slug || "",
      posts: rawAuthor.posts || [],
      updateDate: rawAuthor.updatedAt || null,
    }))

    const data: AuthorsResponse = {
      data: transformedData,
      meta: response.data?.meta || {
        pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
      },
    }

    return data
  } catch (error) {
    console.error("Error fetching authors from Strapi:", error)
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } },
    }
  }
}
