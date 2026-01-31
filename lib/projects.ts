import fs from "fs";
import matter from "gray-matter";
import path from "path";

// Types
export interface ProjectFrontmatter {
  title: string;
  slug: string;
  icon?: string;
  description: string;
  category: string;
  skills: string[];
  image: string;
  brandColor?: string;
  links?: Array<{ text: string; url: string; icon?: string }>;
  order?: number;
}

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

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

/**
 * Get all project slugs from MDX files
 */
export function getProjectSlugs(): string[] {
  try {
    const files = fs.readdirSync(PROJECTS_DIR);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error("Error reading projects directory:", error);
    return [];
  }
}

/**
 * Get frontmatter for a single project by slug
 */
export function getProjectFrontmatter(slug: string): ProjectFrontmatter | null {
  try {
    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      title: data.title,
      slug: data.slug,
      icon: data.icon,
      description: data.description,
      category: data.category,
      skills: data.skills || [],
      image: data.image,
      brandColor: data.brandColor,
      links: data.links || [],
      order: data.order,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
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

  // Sort by order if specified, otherwise maintain file order
  return projects.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return 0;
  });
}

/**
 * Get a project with its full MDX content
 */
export function getProjectWithContent(slug: string): ProjectWithContent | null {
  try {
    const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const frontmatter: ProjectFrontmatter = {
      title: data.title,
      slug: data.slug,
      icon: data.icon,
      description: data.description,
      category: data.category,
      skills: data.skills || [],
      image: data.image,
      brandColor: data.brandColor,
      links: data.links || [],
      order: data.order,
    };

    return {
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
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
