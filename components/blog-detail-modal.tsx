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
    </div>
  );
}

function BlogFrontmatterSection({
  frontmatter,
}: {
  frontmatter: BlogFrontmatter;
}) {
  const hasTags = frontmatter.tags && frontmatter.tags.length > 0;
  const hasDate = !!frontmatter.date;

  if (!hasTags && !hasDate) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {hasDate && (
        <span className={cn("text-muted-foreground text-sm")}>
          {new Date(frontmatter.date!).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      )}
      {hasTags && (
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags!.map((tag, idx) => (
            <span
              key={tag}
              className={cn(
                "bg-secondary text-secondary-foreground",
                "rounded-full py-1 text-sm"
              )}
            >
              {/* seprated by a circle */}
              {tag} {idx < frontmatter.tags!.length - 1 && <span className="text-muted-foreground">•</span>}
            </span>
          ))}
        </div>
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
      renderFrontmatter={() => (
        <BlogFrontmatterSection frontmatter={frontmatter} />
      )}
      includeTableStyles={true}
    />
  );
}
