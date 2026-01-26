"use client";

import {
  ContentModalHandler,
  SerializedContent,
} from "@/components/content-detail/content-modal-handler";
import { ProjectFrontmatter } from "@/lib/projects";
import { ProjectDetailModal } from "./project-detail-modal";

export type SerializedProject = SerializedContent<ProjectFrontmatter>;

interface ProjectModalHandlerProps {
  projectsMap: Map<string, SerializedProject>;
}

export function ProjectModalHandler({
  projectsMap,
}: ProjectModalHandlerProps) {
  return (
    <ContentModalHandler
      contentMap={projectsMap}
      queryParam="project"
      renderModal={(props) => <ProjectDetailModal {...props} />}
    />
  );
}
