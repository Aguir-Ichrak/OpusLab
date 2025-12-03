"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { PostCard } from "@/components/post-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SearchIcon } from "lucide-react"
import { getPosts } from "@/lib/strapi/posts"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const q = searchParams.get("q")
    if (q) {
      setQuery(q)
      performSearch(q)
    }
  }, [])

  async function performSearch(searchQuery: string) {
    if (!searchQuery.trim()) {
      setResults([])
      setHasSearched(false)
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    try {
      const response = await getPosts({
        pageSize: 10,
        filters: {
          $or: [
            { title: { $containsi: searchQuery } },
            { description: { $containsi: searchQuery } },
            { author: { name: { $containsi: searchQuery } } },
            { categories: { name: { $containsi: searchQuery } } },
            { tags: { name: { $containsi: searchQuery } } },
          ],
        },
        populate: ["author", "categories", "tags"],
      })

      setResults(response.data || [])
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    await performSearch(query)
    const url = new URL(window.location.href)
    url.searchParams.set("q", query)
    window.history.pushState({}, "", url)
  }

  return (
    <main className="flex-1">
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Search Posts</h1>
          <form onSubmit={handleSearch} className="max-w-2xl flex gap-2">
            <Input
              type="search"
              placeholder="Search by title, description, author, category, or tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="text-base"
            />
            <Button type="submit" disabled={isLoading} className="gap-2">
              <SearchIcon className="h-4 w-4" />
              Search
            </Button>
          </form>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        {hasSearched && (
          <div className="mb-6">
            <p className="text-muted-foreground">
              {isLoading
                ? "Searching..."
                : `Found ${results.length} post${results.length !== 1 ? "s" : ""} ${query ? `for "${query}"` : ""}`}
            </p>
          </div>
        )}
        {!hasSearched ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">Enter a search term to find posts</p>
          </div>
        ) : isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Searching...</p>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No posts found matching your search.</p>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
