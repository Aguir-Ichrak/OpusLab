import { getAuthors } from "@/lib/strapi/authors"

export const revalidate = 3600

export const metadata = {
  title: "Authors",
  description: "Meet the authors behind our blog",
}

async function AuthorsList() {
  const response = await getAuthors()
  const authors = response.data

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {authors.map((author) => (
        <div
          key={author.id}
          className="group p-6 rounded-lg border border-border hover:border-primary transition-colors"
        >
          <div className="flex flex-col items-center text-center">
           
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition">{author.name}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function AuthorsPage() {
  return (

      <main className="flex-1">
        <section className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Authors</h1>
            <p className="text-lg text-muted-foreground">Meet the talented writers behind our blog</p>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <AuthorsList />
        </section>
      </main>

  )
}
