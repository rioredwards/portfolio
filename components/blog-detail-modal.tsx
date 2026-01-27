"use client";

import { ContentDetailModal } from "@/components/content-detail/content-detail-modal";
import { BlogFrontmatter } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { DialogTitle } from "./ui/dialog";

interface BlogDetailModalProps {
  frontmatter: BlogFrontmatter | null;
  serializedContent: MDXRemoteSerializeResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function BlogDetailHeader({ frontmatter }: { frontmatter: BlogFrontmatter }) {
  return (
    <div className={cn("flex flex-col gap-2")}>
      <DialogTitle
        className={cn("text-3xl font-bold", "text-foreground")}
        style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
      >
        {frontmatter.title}
      </DialogTitle>

      {frontmatter.date && (
        <span className={cn("text-muted-foreground text-sm")}>
          {new Date(frontmatter.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      )}
    </div>
  );
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
      renderHeader={() => <BlogDetailHeader frontmatter={frontmatter} />}
      includeTableStyles={true}
    />
  );
}
