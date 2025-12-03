import { getPosts } from "@/lib/strapi/posts";

export async function GET() {
  const posts = await getPosts({ pageSize: 100 });
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL ;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${posts.data.map(post => `
    <url>
      <loc>${baseUrl}/posts/${post.slug}</loc>
      <lastmod>${post.updateDate}</lastmod>
    </url>`).join('')}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" }
  });
}
