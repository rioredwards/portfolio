"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactNode } from "react";
import { ContentProse } from "./content-prose";

interface ContentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serializedContent: MDXRemoteSerializeResult | null;
  /** Render the header content (title, metadata, etc.) */
  renderHeader: () => ReactNode;
  /** Optional render for floating footer (buttons, links, etc.) */
  renderFloatingFooter?: () => ReactNode;
  /** Include table styles in prose (for blog content) */
  includeTableStyles?: boolean;
}

/**
 * Shared modal component for project and blog detail views.
 * Uses the project modal aesthetic: backdrop-blur header, bg-card content, optional floating footer.
 */
export function ContentDetailModal({
  open,
  onOpenChange,
  serializedContent,
  renderHeader,
  renderFloatingFooter,
  includeTableStyles = false,
}: ContentDetailModalProps) {
  const hasFloatingFooter = !!renderFloatingFooter;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[94dvh] w-full max-w-[calc(100vw-var(--spacing-content-px))] md:max-w-[calc(100vw-var(--spacing-content-px-md)*2)]",
          "overflow-hidden",
          "flex flex-col",
          "gap-0 p-0",
        )}
        showCloseButton={true}
      >
        {/* Sticky Header with backdrop blur */}
        <div
          className={cn(
            "bg-background/70 backdrop-blur-sm absolute top-0 left-0 right-0 z-10",
            "px-6 pt-6 pb-3",
          )}
        >
          {renderHeader()}
        </div>

        {/* Scrollable Content */}
        <div
          className={cn(
            "flex-1 overflow-y-auto px-6 lg:px-8 w-full py-12 pt-28 bg-card",
            hasFloatingFooter && "pb-20",
          )}
        >
          <div className="mx-auto w-fit">
            {serializedContent ? (
              <ContentProse includeTableStyles={includeTableStyles}>
                <MDXRemote {...serializedContent} />
              </ContentProse>
            ) : (
              <p className={cn("text-muted-foreground")}>
                Content not available.
              </p>
            )}
          </div>
        </div>

        {/* Optional Floating Footer */}
        {hasFloatingFooter && (
          <div
            className={cn(
              "bg-background/70 backdrop-blur-sm absolute right-0 bottom-0 left-0 z-50",
              "flex items-center justify-center gap-4",
              "px-6 py-3",
            )}
          >
            {renderFloatingFooter()}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
