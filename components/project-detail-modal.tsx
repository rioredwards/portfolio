"use client";

import { ContentDetailModal } from "@/components/content-detail/content-detail-modal";
import { ProjectFrontmatter } from "@/lib/projects";
import { cn } from "@/lib/utils";
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

function ProjectFrontmatterSection({
  frontmatter,
}: {
  frontmatter: ProjectFrontmatter;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-sm font-medium">
          Category
        </span>
        <span className="text-foreground">{frontmatter.category}</span>
      </div>

      {frontmatter.skills && frontmatter.skills.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-sm font-medium">
            Skills
          </span>
          <div className="flex flex-wrap gap-2">
            {frontmatter.skills.map((skill, idx) => (
              <span
                key={skill}
                className={cn(
                  "bg-secondary text-secondary-foreground",
                  "rounded-full py-1 text-sm"
                )}
              >
                {/* seprated by a circle */}
                {skill} {idx < frontmatter.skills.length - 1 && <span className="text-muted-foreground">•</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
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
