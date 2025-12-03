import { Post, PostSchema, PostsResponse } from "../types/post";
import api from "./api";

type GetPostsParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
  filters?: Record<string, any>;
  populate?: string[];
};

function flattenFilters(obj: Record<string, any>, prefix = "filters"): Record<string, string> {
  const result: Record<string, string> = {}

  const flatten = (current: any, key: string) => {
    if (current === null || current === undefined) return

    if (typeof current === "object" && !Array.isArray(current)) {
      Object.keys(current).forEach((k) => {
        const newKey = key ? `${key}[${k}]` : k
        flatten(current[k], newKey)
      })
    } else if (Array.isArray(current)) {
      current.forEach((item, index) => {
        flatten(item, `${key}[${index}]`)
      })
    } else {
      result[key] = String(current)
    }
  }

  Object.keys(obj).forEach((key) => {
    flatten(obj[key], `${prefix}[${key}]`)
  })

  return result
}

export async function getPosts(params?: GetPostsParams): Promise<PostsResponse> {
  try {
    const queryParams: Record<string, any> = {}
    // Pagination
    if (params?.pageSize) queryParams["pagination[pageSize]"] = params.pageSize
    if (params?.page) queryParams["pagination[page]"] = params.page
    // Sort
    queryParams.sort = params?.sort || "createdAt:desc"
    // Populate
    queryParams.populate = params?.populate?.length ? params.populate : "*"
    // Filters
    if (params?.filters) {
      const flattenedFilters = flattenFilters(params.filters)
      Object.assign(queryParams, flattenedFilters)
    }

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    const url = `${strapiUrl}/api/posts`
    const response = await api.get(url, { params: queryParams })

    const rawData = response.data?.data || []
    const transformedData = rawData.map((rawPost: any) => ({
      id: rawPost.id,
      title: rawPost.title || "",
      slug: rawPost.slug || "",
      description: rawPost.description || "",
      publishDate: rawPost.publishDate || rawPost.publishedAt || "",
      updateDate: rawPost.updatedAt || rawPost.updatedAt || "",
      category: rawPost.categories
        ? {
          id: rawPost.categories.id,
          name: rawPost.categories.name || "",
          slug: rawPost.categories.slug || "",
        }
        : null,
      author: rawPost.author
        ? {
          id: rawPost.author.id,
          name: rawPost.author.name || "",
          slug: rawPost.author.slug || "",
        }
        : null,
      tags: rawPost.tags?.map((t: any) => ({
        id: t.id,
        name: t.name || "",
        slug: t.slug || "",
      })) || [],
    }))

    const data: PostsResponse = {
      data: transformedData,
      meta: response.data?.meta || { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } },
    }
    return data
  } catch (error) {
    console.error("Error fetching posts from Strapi:", error)
    return { data: [], meta: { pagination: { page: 1, pageSize: 10, pageCount: 0, total: 0 } } }
  }
}


// Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    const url = `${strapiUrl}/api/posts`

    const queryParams = {
      populate: "*",
      filters: {
        slug: {
          $eq: slug
        }
      }
    }

    const flattenedParams = {
      "populate": "*",
      ...flattenFilters(queryParams.filters)
    }

    const response = await api.get(url, { params: flattenedParams })

    const rawPost = response.data?.data?.[0]
    if (!rawPost) return null
    const post: Post = {
      id: rawPost.id,
      title: rawPost.title || "",
      slug: rawPost.slug || "",
      description: rawPost.description || "",
      publishDate: rawPost.publishDate || rawPost.publishedAt || "",
      updateDate: rawPost.updatedAt || rawPost.updatedAt || "",
      category: rawPost.categories
        ? {
          id: rawPost.categories.id,
          name: rawPost.categories.name || "",
          slug: rawPost.categories.slug || "",
        }
        : null,
      author: rawPost.author
        ? {
          id: rawPost.author.id,
          name: rawPost.author.name || "",
          slug: rawPost.author.slug || "",
        }
        : null,
      tags: rawPost.tags?.map((t: any) => ({
        id: t.id,
        name: t.name || "",
        slug: t.slug || "",
      })) || [],
    }

    return PostSchema.parse(post)
  } catch (error: any) {
    console.error(`Failed to fetch post by slug: ${slug}`, error)
    return null
  }
}
