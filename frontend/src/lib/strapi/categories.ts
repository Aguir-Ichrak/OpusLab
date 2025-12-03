import type { CategoriesResponse, Category } from "../types/category"
import api from "./api"

export async function getCategories(): Promise<CategoriesResponse> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    const url = `${strapiUrl}/api/categories`

    const queryParams = {
      populate: "*",
    }

    const response = await api.get(url, { params: queryParams })

    const rawData = response.data?.data || []
    const transformedData = rawData.map((rawCategory: any) => ({
      id: rawCategory.id,
      name: rawCategory.name || "",
      slug: rawCategory.slug || "",
      posts: rawCategory.posts || [],
      updateDate: rawCategory.updatedAt || null,
    }))

    const data: CategoriesResponse = {
      data: transformedData,
      meta: response.data?.meta || {
        pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 },
      },
    }

    return data
  } catch (error) {
    console.error("Error fetching categories from Strapi:", error)
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } },
    }
  }
}
