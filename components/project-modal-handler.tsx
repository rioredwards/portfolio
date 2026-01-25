"use client";

import { ProjectFrontmatter } from "@/lib/projects";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectDetailModal } from "./project-detail-modal";

export interface SerializedProject {
  frontmatter: ProjectFrontmatter;
  serializedContent: MDXRemoteSerializeResult;
}

interface ProjectModalHandlerProps {
  projectsMap: Map<string, SerializedProject>;
}

export function ProjectModalHandler({
  projectsMap,
}: ProjectModalHandlerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const projectSlug = searchParams.get("project");
  const selectedProject = projectSlug ? projectsMap.get(projectSlug) : null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push("/", { scroll: false });
    }
  };

  return (
    <ProjectDetailModal
      frontmatter={selectedProject?.frontmatter ?? null}
      serializedContent={selectedProject?.serializedContent ?? null}
      open={!!selectedProject}
      onOpenChange={handleOpenChange}
    />
  );
}
