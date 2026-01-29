"use client";

import { mdxComponents } from "@/components/mdx";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { ReactNode, useEffect } from "react";
import { useLightbox } from "../lightbox-image/lightbox-provider";
import { ContentProse } from "./content-prose";

interface ContentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serializedContent: MDXRemoteSerializeResult | null;
  /** Render the header content (title, metadata, etc.) */
  renderHeader: () => ReactNode;
  /** Optional render for frontmatter section (tags, skills, etc.) - displayed before MDX content */
  renderFrontmatter?: () => ReactNode;
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
  renderFrontmatter,
  renderFloatingFooter,
  includeTableStyles = false,
}: ContentDetailModalProps) {
  const hasFloatingFooter = !!renderFloatingFooter;
  const { isOpen: isLightboxOpen } = useLightbox();

  // Scroll to hash element after modal content renders
  useEffect(() => {
    if (open && serializedContent) {
      const hash = window.location.hash.slice(1); // Remove the #
      if (hash) {
        // Small delay to ensure content is rendered
        const timeoutId = setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [open, serializedContent]);

  return (
    <Dialog open={true} onOpenChange={onOpenChange} modal={true} >
      <DialogContent
        className={cn(
          "max-h-[94dvh] w-full max-w-[calc(100vw-var(--spacing-content-px))] md:max-w-[calc(100vw-var(--spacing-content-px-md)*2)] lg:max-w-4xl",
          "overflow-hidden",
          "flex flex-col",
          "gap-0 p-0",
        )}
        showCloseButton={true}
        onEscapeKeyDown={(e) => {
          if (isLightboxOpen) {
            e.preventDefault();
            return
          }
        }}
        onInteractOutside={(e) => {
          if (isLightboxOpen) {
            e.preventDefault();
            return
          }
        }}
        onPointerDownOutside={(e) => {
          if (isLightboxOpen) {
            e.preventDefault();
            return
          }
        }}
      >
        {/* Sticky Header with backdrop blur */}
        <div
          className={cn(
            "bg-background sticky top-0 left-0 right-0 z-10",
            "px-6 pt-6 pb-3",
          )}
        >
          {renderHeader()}
        </div>

        {/* Scrollable Content */}
        <div
          className={cn(
            "flex-1 overflow-y-auto px-6 lg:px-8 w-full py-8 bg-card",
            hasFloatingFooter && "pb-20",
          )}
        >
          <div className="mx-auto w-fit">
            {renderFrontmatter && (
              renderFrontmatter()
            )}
            {serializedContent ? (
              <ContentProse includeTableStyles={includeTableStyles}>
                <MDXRemote {...serializedContent} components={mdxComponents} />
              </ContentProse>
            ) : (
              <p className={cn("text-muted-foreground")}>
                Content not available.
              </p>
            )}
          </div>
        </div>

        {/* Optional Floating Footer */}

        <div className={cn(
          "bg-background/70 backdrop-blur-sm right-0 bottom-0 left-0 z-50",
          "flex items-center justify-center gap-4",
          "px-6 py-2",
        )}>{hasFloatingFooter && renderFloatingFooter()}</div>
      </DialogContent>
    </Dialog>
  );
}
