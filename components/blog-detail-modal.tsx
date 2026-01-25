"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BlogFrontmatter } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";

interface BlogDetailModalProps {
  frontmatter: BlogFrontmatter | null;
  serializedContent: MDXRemoteSerializeResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BlogDetailHeader({
  frontmatter,
}: {
  frontmatter: BlogFrontmatter;
}) {
  return (
    <div className={cn("flex flex-col gap-3")}>
      <h1
        className={cn("text-3xl font-bold", "text-foreground")}
        style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
      >
        {frontmatter.title}
      </h1>

      {/* Tags and Date */}
      <div className={cn("flex flex-wrap items-center gap-2")}>
        {frontmatter.date && (
          <span
            className={cn(
              "text-muted-foreground text-sm",
            )}
          >
            {new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <>
            <span className="text-muted-foreground">·</span>
            {frontmatter.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  "bg-secondary text-foreground-secondary",
                )}
              >
                #{tag}
              </span>
            ))}
          </>
        )}
      </div>
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div >
        <DialogContent
          showCloseButton={true}
          className={cn(
            "max-h-[94dvh] w-full max-w-[calc(100vw-var(--spacing-content-px))] md:max-w-[calc(100vw-var(--spacing-content-px-md)*2)] lg:max-w-3xl",
            "overflow-hidden",
            "flex flex-col",
            "gap-0 p-0",
          )}
        >
          {/* Sticky Header */}
          <div
            className={cn(
              "bg-background sticky top-0 z-10",
              "px-6 py-6 pb-4 shadow-lg",
            )}
          >
            <BlogDetailHeader frontmatter={frontmatter} />
          </div>

          {/* Scrollable Content */}
          <div className={cn("flex-1 overflow-y-auto px-6 pb-8 lg:px-8")}>
            {serializedContent ? (
              <>
                <div
                  className={cn(
                    "prose prose-neutral dark:prose-invert max-w-none",
                    "prose-headings:font-[var(--font-mazaeni-demo),serif]",
                    "prose-p:text-foreground prose-strong:text-foreground",
                    "prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground",
                    "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
                    "prose-img:rounded-xl prose-img:my-6",
                    "prose-pre:bg-secondary prose-pre:text-foreground",
                    "prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
                    "prose-table:text-foreground",
                    "prose-th:bg-secondary prose-th:px-4 prose-th:py-2",
                    "prose-td:px-4 prose-td:py-2",
                  )}
                >
                  <MDXRemote {...serializedContent} />
                </div>
                <div className={cn("border-border mt-6 border-t pt-6")}>
                  <Link
                    href={`/blog/${frontmatter.slug}`}
                    className={cn("text-primary text-sm hover:underline")}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenChange(false);
                    }}
                  >
                    View full page →
                  </Link>
                </div>
              </>
            ) : (
              <p className={cn("text-muted-foreground")}>
                Content not available.
              </p>
            )}
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
}
