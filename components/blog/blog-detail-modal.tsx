"use client";

import { ContentDetailModal } from "@/components/content-detail/content-detail-modal";
import { BlogFrontmatterSection } from "@/components/ui/blog-frontmatter-section";
import { BlogModalHeader } from "@/components/ui/blog-modal-header";
import { DialogTitle } from "@/components/ui/dialog";
import { BlogFrontmatter } from "@/lib/blogs";
import { ReactNode } from "react";

interface BlogDetailModalProps {
  frontmatter: BlogFrontmatter | null;
  renderedContent: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlogDetailModal({
  frontmatter,
  renderedContent,
  open,
  onOpenChange,
}: BlogDetailModalProps) {
  if (!frontmatter) return null;

  return (
    <ContentDetailModal
      open={open}
      onOpenChange={onOpenChange}
      renderedContent={renderedContent}
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
