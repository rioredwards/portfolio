"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ProjectFrontmatter } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Link from "next/link";
import { ProjectDetailHeader } from "./project-detail-content";
import { Button } from "./ui/button";


interface ProjectDetailModalProps {
  frontmatter: ProjectFrontmatter | null;
  serializedContent: MDXRemoteSerializeResult | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailModal({
  frontmatter,
  serializedContent,
  open,
  onOpenChange,
}: ProjectDetailModalProps) {
  if (!frontmatter) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[94dvh] w-full max-w-[calc(100vw-var(--spacing-content-px))] md:max-w-[calc(100vw-var(--spacing-content-px-md)*2)] lg:max-w-4xl",
          "overflow-hidden",
          "flex flex-col",
          "gap-0 p-0",
        )}
        showCloseButton={true}
      >
        {/* Sticky Header */}
        <div
          className={cn(
            "bg-background/50 backdrop-blur-sm sticky top-0 z-10",
            "px-6 py-6 pb-4 ",
          )}
        >
          <ProjectDetailHeader {...frontmatter} />
        </div>

        {/* Scrollable Content */}
        <div
          className={cn(
            "flex-1 overflow-y-auto px-6 lg:px-8 w-full py-12 bg-card",
          )}
        >
          <div className="mx-auto w-fit">
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
                  )}
                >
                  <MDXRemote {...serializedContent} />
                </div>
                <div className={cn("border-border mt-6 border-t pt-6")}>
                  <Link
                    href={`/work/${frontmatter.slug}`}
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
        </div>

        {/* Floating Links at Bottom */}
        {frontmatter.links && frontmatter.links.length > 0 && (
          <div
            className={cn(
              "bg-background sticky right-0 bottom-0 left-0 z-50",
              "flex items-center justify-center gap-4",
              "px-6 py-6",
            )}
          >
            {frontmatter.links.map((link, idx) => (
              <Button key={idx} asChild variant={idx === 0 ? "default" : "outline"} size="default">
                <Link href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
