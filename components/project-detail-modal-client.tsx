"use client";

import { ParsedProjectContent } from "@/lib/parse-project-markdown";
import { type Project as ProjectType } from "./project";
import { ProjectDetailModal } from "./project-detail-modal";

interface ProjectDetailModalClientProps {
  projectContentMap: Map<string, ParsedProjectContent>;
  selectedProject: ProjectType | null;
  isModalOpen: boolean;
  onProjectSelect: (project: ProjectType | null) => void;
  onModalOpenChange: (open: boolean) => void;
}

export function ProjectDetailModalClient({
  projectContentMap,
  selectedProject,
  isModalOpen,
  onProjectSelect,
  onModalOpenChange,
}: ProjectDetailModalClientProps) {
  const content = selectedProject
    ? (projectContentMap.get(selectedProject.title) ?? null)
    : null;

  return (
    <ProjectDetailModal
      project={selectedProject}
      content={content}
      open={isModalOpen}
      onOpenChange={(open) => {
        onModalOpenChange(open);
        if (!open) {
          onProjectSelect(null);
        }
      }}
    />
  );
}
