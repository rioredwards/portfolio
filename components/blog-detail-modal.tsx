"use client";

import { ContentDetailModal } from "@/components/content-detail/content-detail-modal";
import { BlogFrontmatter } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Fragment } from "react/jsx-runtime";
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
  const hasReadingTime = !!frontmatter.readingTime;

  if (!hasTags && !hasDate && !hasReadingTime) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {(hasDate || hasReadingTime) && (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          {hasDate && (
            <span>
              {new Date(frontmatter.date!).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          {hasDate && hasReadingTime && <span>•</span>}
          {hasReadingTime && (
            <span>{frontmatter.readingTime} min read</span>
          )}
        </div>
      )}
      {hasTags && (
        <div className="flex flex-wrap gap-2 items-center">
          {frontmatter.tags!.map((tag, idx) => (
            <Fragment key={idx}>
              <span
                className={cn(
                  "bg-secondary text-secondary-foreground",
                  "rounded-full py-1 text-sm"
                )}
              >
                {/* seprated by a circle */}
                {tag}
              </span>
              {idx < frontmatter.tags!.length - 1 && <span className="text-muted-foreground">•</span>}
            </Fragment>
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
