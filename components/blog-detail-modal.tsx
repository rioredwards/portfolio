"use client";

import { ContentDetailModal } from "@/components/content-detail/content-detail-modal";
import { BlogFrontmatterSection } from "@/components/ui/blog-frontmatter-section";
import { BlogModalHeader } from "@/components/ui/blog-modal-header";
import { DialogTitle } from "@/components/ui/dialog";
import { BlogFrontmatter } from "@/lib/blogs";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface BlogDetailModalProps {
  frontmatter: BlogFrontmatter | null;
  serializedContent: MDXRemoteSerializeResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlogDetailModal({
  frontmatter,
  serializedContent,
  open,
  onOpenChange,
}: BlogDetailModalProps) {
  if (!frontmatter) return null;

  return (
    <ContentDetailModal
      open={open}
      onOpenChange={onOpenChange}
      serializedContent={serializedContent}
      renderHeader={() => (
        <DialogTitle>
          <BlogModalHeader {...frontmatter} />
        </DialogTitle>
      )}
      renderFrontmatter={() => (
        <BlogFrontmatterSection frontmatter={frontmatter} />
      )}
      includeTableStyles={true}
    />
  );
}
