"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useCallback } from "react";
import { useLightbox } from "../lightbox-image";

export interface RenderedContent<TFrontmatter> {
  frontmatter: TFrontmatter;
  renderedContent: ReactNode;
}

interface ContentModalHandlerProps<TFrontmatter> {
  /** Map of slug -> rendered content */
  contentMap: Map<string, RenderedContent<TFrontmatter>>;
  /** Query parameter name to read from URL (e.g., "project" or "blog") */
  queryParam: string;
  /** Render the modal with the selected content */
  renderModal: (props: {
    frontmatter: TFrontmatter;
    renderedContent: ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }) => ReactNode;
}

/**
 * Generic URL-based modal state handler for project and blog modals.
 * Reads the slug from URL query params and renders the appropriate modal.
 */
export function ContentModalHandler<TFrontmatter>({
  contentMap,
  queryParam,
  renderModal,
}: ContentModalHandlerProps<TFrontmatter>) {
  const { isOpen: isLightboxOpen } = useLightbox();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = searchParams.get(queryParam);
  const selectedContent = slug ? contentMap.get(slug) : null;
  const open = Boolean(slug);

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (isLightboxOpen) {
        return;
      }
      if (!nextOpen) {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(queryParam);
        const qs = params.toString();
        const href = qs ? `${pathname}?${qs}` : pathname;
        router.push(href, { scroll: false });
      }
    },
    [isLightboxOpen, pathname, queryParam, router, searchParams],
  );

  if (!selectedContent) {
    return null;
  }

  return (
    <>
      {renderModal({
        frontmatter: selectedContent.frontmatter,
        renderedContent: selectedContent.renderedContent,
        open: open,
        onOpenChange: handleOpenChange,
      })}
    </>
  );
}
