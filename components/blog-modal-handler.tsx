"use client";

import {
  ContentModalHandler,
  SerializedContent,
} from "@/components/content-detail/content-modal-handler";
import { BlogFrontmatter } from "@/lib/blogs";
import { BlogDetailModal } from "./blog-detail-modal";

export type SerializedBlog = SerializedContent<BlogFrontmatter>;

interface BlogModalHandlerProps {
  blogsMap: Map<string, SerializedBlog>;
}

export function BlogModalHandler({ blogsMap }: BlogModalHandlerProps) {
  return (
    <ContentModalHandler
      contentMap={blogsMap}
      queryParam="blog"
      renderModal={(props) => <BlogDetailModal {...props} />}
    />
  );
}
