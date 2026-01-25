"use client";

import { ParsedProjectContent } from "@/lib/parse-project-markdown";
import { PROJECTS } from "@/lib/projects-data";
import { useRouter, useSearchParams } from "next/navigation";
import { ProjectDetailModal } from "./project-detail-modal";

interface ProjectModalHandlerProps {
  projectContentMap: Map<string, ParsedProjectContent>;
}

export function ProjectModalHandler({
  projectContentMap,
}: ProjectModalHandlerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const projectSlug = searchParams.get("project");
  const selectedProject = projectSlug
    ? PROJECTS.find(
        (p) => p.title.toLowerCase().replace(/\s+/g, "-") === projectSlug
      ) ?? null
    : null;

  const content = selectedProject
    ? projectContentMap.get(selectedProject.title) ?? null
    : null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push("/", { scroll: false });
    }
  };

  return (
    <ProjectDetailModal
      project={selectedProject}
      content={content}
      open={!!selectedProject}
      onOpenChange={handleOpenChange}
    />
  );
}
