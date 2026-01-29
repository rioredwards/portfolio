"use client";

import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useState } from "react";
import { useLightbox } from "../lightbox-image";

export interface SerializedContent<TFrontmatter> {
  frontmatter: TFrontmatter;
  serializedContent: MDXRemoteSerializeResult;
}

interface ContentModalHandlerProps<TFrontmatter> {
  /** Map of slug -> serialized content */
  contentMap: Map<string, SerializedContent<TFrontmatter>>;
  /** Query parameter name to read from URL (e.g., "project" or "blog") */
  queryParam: string;
  /** Render the modal with the selected content */
  renderModal: (props: {
    frontmatter: TFrontmatter;
    serializedContent: MDXRemoteSerializeResult;
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
  const { isOpen: isLightboxOpen } = useLightbox()
  const [open, setOpen] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = searchParams.get(queryParam);
  const selectedContent = slug ? contentMap.get(slug) : null;

  const handleOpenChange = (open: boolean) => {
    if (isLightboxOpen) {
      return
    }
    setOpen(open);
    if (!open) {
      router.push("/", { scroll: false });
    }
  };

  if (!selectedContent) {
    return null;
  }

  return (
    <>
      {renderModal({
        frontmatter: selectedContent.frontmatter,
        serializedContent: selectedContent.serializedContent,
        open: open,
        onOpenChange: handleOpenChange,
      })}
    </>
  );
}
