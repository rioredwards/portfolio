"use client";

import { ContentDetailModal } from "@/components/content-detail/content-detail-modal";
import { BlogFrontmatterSection } from "@/components/ui/blog-frontmatter-section";
import { BlogModalHeader } from "@/components/ui/blog-modal-header";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { LinkIcon } from "@/components/ui/link-icon";
import { BlogFrontmatter } from "@/lib/blogs";
import Link from "next/link";
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
      renderFloatingFooter={
        frontmatter.links && frontmatter.links.length > 0
          ? () => (
              <>
                {frontmatter.links!.map((link, idx) => (
                  <Button
                    key={idx}
                    asChild
                    variant={idx === 0 ? "default" : "outline"}
                    size="sm"
                  >
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <LinkIcon name={link.icon} size={14} />
                      {link.text}
                    </Link>
                  </Button>
                ))}
              </>
            )
          : undefined
      }
      includeTableStyles={true}
    />
  );
}
