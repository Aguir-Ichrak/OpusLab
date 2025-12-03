import { Badge } from "@/components/ui/badge"
import { getCategories } from "@/lib/strapi/categories"

export const revalidate = 3600

export const metadata = {
  title: "Categories",
  description: "Browse blog posts by category",
}

async function CategoriesList() {
  const categoriesResponse = await getCategories()
  const categories = categoriesResponse.data

  const categoriesWithCount = categories.map((category) => ({
    ...category,
    postCount: Array.isArray(category.posts) ? category.posts.length : 0,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categoriesWithCount.map((category) => (
        <div key={category.id}
          className="p-6 rounded-lg border border-border hover:border-primary transition-colors group"
        >
          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">{category.name}</h3>
          <Badge variant="outline">{category.postCount} posts</Badge>
        </div>
      ))}
    </div>
  )
}

export default async function CategoriesPage() {
  return (
    <main className="flex-1">
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Categories</h1>
          <p className="text-lg text-muted-foreground">Browse posts organized by topic</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <CategoriesList />
      </section>
    </main>
  )
}
