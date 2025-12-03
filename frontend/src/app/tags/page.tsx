import { Badge } from "@/components/ui/badge"
import { getTags } from "@/lib/strapi/tags"

export const revalidate = 3600

export const metadata = {
  title: "Tags",
  description: "Browse blog posts by tags",
}

async function TagsList() {
  const tagsResponse = await getTags()
  const tags = tagsResponse.data

  const tagsWithCount = tags.map((tag) => ({
    ...tag,
    postCount: Array.isArray(tag.posts) ? tag.posts.length : 0,
  }))

  return (
    <div className="flex flex-wrap gap-2">
      {tagsWithCount.map((tag) => (
        <div key={tag.id} className="inline-flex items-center gap-2">
          <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition">
            {tag.name}
            <span className="text-xs opacity-70">({tag.postCount})</span>
          </Badge>
        </div>
      ))}
    </div>
  )
}

export default async function TagsPage() {
  return (


      <main className="flex-1">
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Tags</h1>
            <p className="text-lg text-muted-foreground">Explore all tags used across our blog</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <TagsList />
        </section>
      </main>

  )
}
