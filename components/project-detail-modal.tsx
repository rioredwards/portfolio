"use client";

import { ContentDetailModal } from "@/components/content-detail/content-detail-modal";
import { ProjectFrontmatter } from "@/lib/projects";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
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
    <ContentDetailModal
      open={open}
      onOpenChange={onOpenChange}
      serializedContent={serializedContent}
      renderHeader={() => <ProjectDetailHeader {...frontmatter} />}
      renderFloatingFooter={
        frontmatter.links && frontmatter.links.length > 0
          ? () => (
              <>
                {frontmatter.links!.map((link, idx) => (
                  <Button
                    key={idx}
                    asChild
                    variant={idx === 0 ? "default" : "outline"}
                    size="default"
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
