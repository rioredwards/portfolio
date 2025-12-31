"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ParsedProjectContent } from "@/lib/parse-project-markdown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Project } from "./project";
import {
  ProjectDetailContent,
  ProjectDetailHeader,
} from "./project-detail-content";
import { Button } from "./ui/button";

interface ProjectDetailModalProps {
  project: Project | null;
  content: ParsedProjectContent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailModal({
  project,
  content,
  open,
  onOpenChange,
}: ProjectDetailModalProps) {
  if (!project) return null;

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
        {content && (
          <div
            className={cn(
              "bg-background sticky top-0 z-10",
              "px-6 py-6 pb-4 shadow-lg",
            )}
          >
            <ProjectDetailHeader project={project} content={content} />
          </div>
        )}

        {/* Scrollable Content */}
        <div
          className={cn(
            "flex-1 overflow-y-auto px-6 lg:px-8",
            content && content.links.length > 0 && "pb-24",
          )}
        >
          {content ? (
            <>
              <ProjectDetailContent
                project={project}
                content={content}
                renderContext="modal"
              />
              <div className={cn("border-border mt-6 border-t pt-6")}>
                <Link
                  href={`/work/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
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

        {/* Floating Links at Bottom */}
        {content && content.links.length > 0 && (
          <div
            className={cn(
              "bg-background sticky right-0 bottom-0 left-0 z-50",
              "flex items-center justify-center gap-4",
              "px-6 py-2",
            )}
          >
            {content.links.map((link, idx) => (
              <Button key={idx} asChild variant="outline" size="sm">
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
