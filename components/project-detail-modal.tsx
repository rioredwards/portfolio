"use client";

import { ContentDetailModal } from "@/components/content-detail/content-detail-modal";
import { ProjectModalHeader } from "@/components/ui/project-modal-header";
import { ProjectFrontmatter } from "@/lib/projects";
import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { DialogTitle } from "./ui/dialog";
import { ProjectFrontmatterSection } from "./ui/project-frontmatter-section";

interface ProjectDetailModalProps {
  frontmatter: ProjectFrontmatter | null;
  renderedContent: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}


export function ProjectDetailModal({
  frontmatter,
  renderedContent,
  open,
  onOpenChange,
}: ProjectDetailModalProps) {
  if (!frontmatter) return null;

  return (
    <ContentDetailModal
      open={open}
      onOpenChange={onOpenChange}
      renderedContent={renderedContent}
      renderHeader={() => <DialogTitle><ProjectModalHeader {...frontmatter} /></DialogTitle>}
      renderFrontmatter={() => (
        <ProjectFrontmatterSection frontmatter={frontmatter} />
      )}
      renderFloatingFooter={
        frontmatter.links && frontmatter.links.length > 0
          ? () => (
            <>
              {frontmatter.links!.map((link, idx) => (
                <Button
                  key={idx}
                  asChild
                  variant={idx === 0 ? "default" : "outline"}
                  size="sm"
                >
                  <Link href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.text}
                  </Link>
                </Button>
              ))}
            </>
          )
          : undefined
      }
    />
  );
}
