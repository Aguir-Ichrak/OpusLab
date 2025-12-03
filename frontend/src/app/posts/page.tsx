"use client";

import { useState, useEffect } from "react";
import { ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/strapi/posts";
import { useRouter } from "next/navigation";
import Pagination from "@/components/pagination";

export default function ShowDetailsDemo() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const { data, meta } = await getPosts({ page, pageSize: 5 });
        setItems(data);
        setTotalPages(meta?.pagination?.pageCount || 1);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [page]);

  if (loading) {
    return (
      <main className="min-h-screen p-6">
        <p className="text-center text-lg">Loading posts...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background dark:bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">All Posts</h1>

        <div className="space-y-0">
          {items.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-6 border-b hover:bg-muted/50 transition-colors"
            >
              <div>
                <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
              </div>

              <div>
                <p className="text-sm text-foreground/70">{item.description}</p>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                  onClick={() => router.push(`/posts/${item.slug}`)}
                >
                  Show details
                  <ChevronRightIcon className="size-4 transition-transform duration-200" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
        )}
      </div>
    </main>
  );
}
