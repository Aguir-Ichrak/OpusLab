import { getPosts } from "@/lib/strapi/posts"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  if (!siteUrl) return new Response("Site URL not configured", { status: 500 })

  try {
    const response = await getPosts({ pageSize: 50 })
    const posts = Array.isArray(response.data) ? response.data : []
    const channelContent = posts
      .map((post) => {
        const pubDate = post.publishDate ? new Date(post.publishDate) : new Date()
        const categoryName = post.category?.name || ""
        const tags = post.tags || []

        return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/posts/${post.slug}</link>
      <guid>${siteUrl}/posts/${post.slug}</guid>
      <description><![CDATA[${post.description || ""}]]></description>
      <content:encoded><![CDATA[${post.description || ""}]]></content:encoded>
      <author><![CDATA[${post.author?.name}]]></author>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      ${categoryName ? `<category><![CDATA[${categoryName}]]></category>` : ""}
      ${tags.map((tag) => `<tag><![CDATA[${tag.name}]]></tag>`).join("")}
    </item>`
      })
      .join("\n")

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Posts</title>
    <link>${siteUrl}</link>
    <description>Explore in-depth articles on web development, design, and technology trends.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
${channelContent}
  </channel>
</rss>`

    return new Response(rss, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("[v0] RSS generation error:", error)
    return new Response(`Error generating RSS feed: ${error instanceof Error ? error.message : "Unknown error"}`, {
      status: 500,
    })
  }
}

