import { TagsResponse } from "../types/tag"
import api from "./api"

export async function getTags(): Promise<TagsResponse> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    const url = `${strapiUrl}/api/tags`

    const queryParams = {
      populate: "*",
    }

    const response = await api.get(url, { params: queryParams })

    const rawData = response.data?.data || []
    const transformedData = rawData.map((rawTag: any) => ({
      id: rawTag.id,
      name: rawTag.name || "",
      slug: rawTag.slug || "",
      posts: rawTag.posts || [],
      updateDate: rawTag.updatedAt || null,
    }))

    const data: TagsResponse = {
      data: transformedData,
      meta: response.data?.meta || {
        pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
      },
    }

    return data
  } catch (error) {
    console.error("Error fetching tags from Strapi:", error)
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } },
    }
  }
}
