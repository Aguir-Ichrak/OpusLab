"use client";

import { useEffect, useState } from "react";
import { getPostBySlug } from "@/lib/strapi/posts";
import { useParams } from "next/navigation";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function loadPost() {
      const result = await getPostBySlug(String(slug));
      setPost(result);
      setLoading(false);
    }

    loadPost();
  }, [slug]);

  if (loading)
    return (
      <p className="text-center py-8 text-gray-700 dark:text-gray-300">
        Loading...
      </p>
    );

  if (!post)
    return (
      <p className="text-center py-8 text-gray-700 dark:text-gray-300">
        Post not found
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {post.publishDate && (
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          Published at: {new Date(post.publishDate).toLocaleDateString()}
        </p>
      )}

      {post.author && (
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Author: <span className="font-semibold">{post.author.name}</span>
        </p>
      )}

      {post.category && (
        <p className="text-gray-700 dark:text-gray-300 mb-2">
          Category: <span className="font-semibold">{post.category.name}</span>
        </p>
      )}

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag: any) => (
            <span
              key={tag.id}
              className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.description || "" }}
      />
    </div>
  );
}
