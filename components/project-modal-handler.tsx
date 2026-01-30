"use client";

import {
  ContentModalHandler,
  RenderedContent,
} from "@/components/content-detail/content-modal-handler";
import { ProjectFrontmatter } from "@/lib/projects";
import { ProjectDetailModal } from "./project-detail-modal";

export type RenderedProject = RenderedContent<ProjectFrontmatter>;

interface ProjectModalHandlerProps {
  projectsMap: Map<string, RenderedProject>;
}

export function ProjectModalHandler({ projectsMap }: ProjectModalHandlerProps) {
  return (
    <ContentModalHandler
      contentMap={projectsMap}
      queryParam="project"
      renderModal={(props) => <ProjectDetailModal {...props} />}
    />
  );
}
