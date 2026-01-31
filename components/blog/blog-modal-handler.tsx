"use client";

import {
  ContentModalHandler,
  RenderedContent,
} from "@/components/content-detail/content-modal-handler";
import { BlogFrontmatter } from "@/lib/blogs";
import { BlogDetailModal } from "./blog-detail-modal";

export type RenderedBlog = RenderedContent<BlogFrontmatter>;

interface BlogModalHandlerProps {
  blogsMap: Map<string, RenderedBlog>;
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
