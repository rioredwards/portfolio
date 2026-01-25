"use client";

import { BlogFrontmatter } from "@/lib/blogs";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogDetailModal } from "./blog-detail-modal";

export interface SerializedBlog {
  frontmatter: BlogFrontmatter;
  serializedContent: MDXRemoteSerializeResult;
}

interface BlogModalHandlerProps {
  blogsMap: Map<string, SerializedBlog>;
}

export function BlogModalHandler({ blogsMap }: BlogModalHandlerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const blogSlug = searchParams.get("blog");
  const selectedBlog = blogSlug ? blogsMap.get(blogSlug) : null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push("/", { scroll: false });
    }
  };

  return (
    <BlogDetailModal
      frontmatter={selectedBlog?.frontmatter ?? null}
      serializedContent={selectedBlog?.serializedContent ?? null}
      open={!!selectedBlog}
      onOpenChange={handleOpenChange}
    />
  );
}
