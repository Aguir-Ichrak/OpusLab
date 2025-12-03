import Link from "next/link"
import { Post } from "@/lib/types/post"
import { Badge } from "./ui/badge"
import { calculateReadingTime, formatDate } from "@/lib/utils"

interface PostCardProps {
  post: Post
  variant?: "grid" | "list"
}

export function PostCard({ post, variant = "grid" }: PostCardProps) {
const readingTime = calculateReadingTime(post.description || "");

  if (variant === "list") {
    return (
      <article className="group flex flex-col md:flex-row gap-6 pb-6 border-b border-border last:border-b-0">
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {post.category && (
                <Badge variant="outline">{post.category.name}</Badge>
            )}
            <span className="text-xs text-muted-foreground">{readingTime} min read</span>
          </div>
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition">
            <Link href={`/posts/${post.slug}`}>{post.title}</Link>
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags?.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <Badge variant="secondary" className="text-xs">
                  {tag.name}
                </Badge>
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              {post.author && (
                <>
                  <span className="font-medium">{post.author.name}</span>
                  <span>•</span>
                </>
              )}
{post.publishDate && (
  <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
)}            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group rounded-lg border border-border overflow-hidden hover:border-primary transition-colors">
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          {post.category && (
              <Badge variant="outline">{post.category.name}</Badge>
          )}
          <span className="text-xs text-muted-foreground">{readingTime} min read</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition">
          <Link href={`/posts/${post.slug}`}>{post.title}</Link>
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags?.slice(0, 2).map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
              <Badge variant="secondary" className="text-xs">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center gap-1">
            {post.author && <span className="font-medium">{post.author.name}</span>}
            {post.author && <span>•</span>}
{post.publishDate && (
  <time dateTime={post.publishDate}>{formatDate(post.publishDate)}</time>
)}
          </div>
        </div>
      </div>
    </article>
  )
}
