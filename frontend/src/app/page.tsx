import { Suspense } from "react"
import { PostCard } from "@/components/post-card"
import { NewsletterForm } from "@/components/newsletter-form"
import { getPosts } from "@/lib/strapi/posts";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CommentForm } from "@/components/comment-form";

export const revalidate = 3600

interface HomePageProps {
  searchParams: Promise<{ page?: string }>
}

async function PostsList({ page }: { page: number }) {
  const pageSize = 6
  const posts = await getPosts({ page, pageSize })
  return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {posts.data.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
  )
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams
  const page = Number.parseInt(params.page || "1")

  return (
    

      <main className="flex-1">
        <section className="border-b border-border bg-linear-to-b from-card to-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Welcome to Opus Lab</h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
                Explore in-depth posts on web development, design patterns, and technology trends. Written by
                developers, for developers.
              </p>
              <div className="flex gap-3">
                <Link href="#latest">
                  <Button>Explore Latest Posts</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8" id="latest">
            <h2 className="text-3xl font-bold">Latest Posts</h2>
            <Link href="/posts">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <Suspense fallback={<div className="text-center py-12">Loading posts...</div>}>
            <PostsList page={page} />
          </Suspense>
        </section>

        <section className="border-t border-border bg-card flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold mb-2">Subscribe to Newsletter</h2>
              <p className="text-muted-foreground mb-6">Get the latest posts delivered to your inbox every week.</p>
              <NewsletterForm />
            </div>
          </div>


          <div className="container mx-auto px-4 py-8 md:py-16">
            <div className="max-w-md">
              <CommentForm />
            </div>
          </div>
        </section>
      </main>

  )
}

        