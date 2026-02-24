import {
  getContentFrontmatter,
  getContentSlugs,
  getContentWithContent,
  sortByOrder,
} from "@/lib/content";
import { z } from "zod";

const projectFrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  slug: z.string().min(1, "slug is required"),
  description: z.string().min(1, "description is required"),
  category: z.string().min(1, "category is required"),
  image: z.string().min(1, "image is required"),
  icon: z.string().optional(),
  skills: z.array(z.string()).default([]),
  brandColor: z.string().optional(),
  links: z
    .array(
      z.object({
        text: z.string(),
        url: z.string(),
        icon: z.string().optional(),
      }),
    )
    .default([]),
  order: z.number().optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export interface ProjectCard {
  title: string;
  slug: string;
  description: string;
  category: string;
  skills: string[];
  image: string;
  brandColor?: string;
}

export interface ProjectWithContent {
  frontmatter: ProjectFrontmatter;
  content: string;
}

const PROJECTS_DIR = "content/projects";

/**
 * Get all project slugs from MDX files
 */
export function getProjectSlugs(): string[] {
  return getContentSlugs(PROJECTS_DIR);
}

/**
 * Get frontmatter for a single project by slug
 */
export function getProjectFrontmatter(slug: string): ProjectFrontmatter | null {
  return getContentFrontmatter(
    slug,
    PROJECTS_DIR,
    projectFrontmatterSchema,
    "project",
  );
}

/**
 * Get all project cards (frontmatter only) for listing
 */
export function getAllProjectCards(): ProjectCard[] {
  const slugs = getProjectSlugs();
  const projects: (ProjectCard & { order?: number })[] = [];

  for (const slug of slugs) {
    const frontmatter = getProjectFrontmatter(slug);
    if (frontmatter) {
      projects.push({
        title: frontmatter.title,
        slug: frontmatter.slug,
        description: frontmatter.description,
        category: frontmatter.category,
        skills: frontmatter.skills,
        image: frontmatter.image,
        brandColor: frontmatter.brandColor,
        order: frontmatter.order,
      });
    }
  }

  return sortByOrder(projects);
}

/**
 * Get a project with its full MDX content
 */
export function getProjectWithContent(slug: string): ProjectWithContent | null {
  return getContentWithContent(
    slug,
    PROJECTS_DIR,
    projectFrontmatterSchema,
    "project",
  );
}

/**
 * Get all projects with their full MDX content
 */
export function getAllProjectsWithContent(): Map<string, ProjectWithContent> {
  const slugs = getProjectSlugs();
  const contentMap = new Map<string, ProjectWithContent>();

  for (const slug of slugs) {
    const project = getProjectWithContent(slug);
    if (project) {
      contentMap.set(slug, project);
    }
  }

  return contentMap;
}
