"use client";

import { useRouter } from "next/navigation";
import { Project, type Project as ProjectType } from "./project";

interface ProjectCardProps extends ProjectType {
  orientation: "left" | "right";
}

export function ProjectCard({ orientation, ...project }: ProjectCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`?project=${project.slug}`, { scroll: false });
  };

  return (
    <Project
      orientation={orientation}
      onClick={handleClick}
      {...project}
    />
  );
}
