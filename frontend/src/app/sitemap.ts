import { getAuthors } from "@/lib/strapi/authors";
import { getCategories } from "@/lib/strapi/categories";
import { getPosts } from "@/lib/strapi/posts";
import { getTags } from "@/lib/strapi/tags";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  try {
    const [postsResponse, categoriesResponse, tagsResponse, authorsResponse] = await Promise.all([
      getPosts({ pageSize: 100 }),
      getCategories(),
      getTags(),
      getAuthors(),
    ]);

    const posts = postsResponse.data.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: post.updateDate ? new Date(post.updateDate) : new Date(),
    }));

    const categories = categoriesResponse.data?.map((category: any) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: category.updateDate ? new Date(category.updateDate) : new Date(),
    })) || [];

    const tags = tagsResponse.data?.map((tag: any) => ({
      url: `${baseUrl}/tags/${tag.slug}`,
      lastModified: tag.updatedAt ? new Date(tag.updatedAt) : new Date(),
    })) || [];

    const authors = authorsResponse.data?.map((author: any) => ({
      url: `${baseUrl}/authors/${author.slug}`,
      lastModified: author.updatedAt ? new Date(author.updatedAt) : new Date(),
    })) || [];

    return [
      { url: baseUrl, lastModified: new Date() },
      { url: `${baseUrl}/categories`, lastModified: new Date() },
      { url: `${baseUrl}/tags`, lastModified: new Date() },
      { url: `${baseUrl}/authors`, lastModified: new Date() },
      ...posts,
      ...categories,
      ...tags,
      ...authors,
    ];
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return [{ url: baseUrl, lastModified: new Date() }];
  }
}
