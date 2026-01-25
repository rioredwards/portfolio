import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Types
export interface BlogFrontmatter {
  title: string;
  slug: string;
  description: string;
  icon: string;
  date?: string;
  tags?: string[];
  order?: number;
}

export interface BlogCard {
  title: string;
  slug: string;
  description: string;
  icon: string;
}

export interface BlogWithContent {
  frontmatter: BlogFrontmatter;
  content: string;
}

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

/**
 * Get all blog slugs from MDX files
 */
export function getBlogSlugs(): string[] {
  try {
    const files = fs.readdirSync(BLOGS_DIR);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error("Error reading blogs directory:", error);
    return [];
  }
}

/**
 * Get frontmatter for a single blog by slug
 */
export function getBlogFrontmatter(slug: string): BlogFrontmatter | null {
  try {
    const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      title: data.title,
      slug: data.slug,
      description: data.description,
      icon: data.icon,
      date: data.date,
      tags: data.tags || [],
      order: data.order,
    };
  } catch (error) {
    console.error(`Error reading blog ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blog cards (frontmatter only) for listing
 */
export function getAllBlogCards(): BlogCard[] {
  const slugs = getBlogSlugs();
  const blogs: (BlogCard & { order?: number })[] = [];

  for (const slug of slugs) {
    const frontmatter = getBlogFrontmatter(slug);
    if (frontmatter) {
      blogs.push({
        title: frontmatter.title,
        slug: frontmatter.slug,
        description: frontmatter.description,
        icon: frontmatter.icon,
        order: frontmatter.order,
      });
    }
  }

  // Sort by order if specified, otherwise maintain file order
  return blogs.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    }
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return 0;
  });
}

/**
 * Get a blog with its full MDX content
 */
export function getBlogWithContent(slug: string): BlogWithContent | null {
  try {
    const filePath = path.join(BLOGS_DIR, `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const frontmatter: BlogFrontmatter = {
      title: data.title,
      slug: data.slug,
      description: data.description,
      icon: data.icon,
      date: data.date,
      tags: data.tags || [],
      order: data.order,
    };

    return {
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog ${slug}:`, error);
    return null;
  }
}

/**
 * Get all blogs with their full MDX content
 */
export function getAllBlogsWithContent(): Map<string, BlogWithContent> {
  const slugs = getBlogSlugs();
  const contentMap = new Map<string, BlogWithContent>();

  for (const slug of slugs) {
    const blog = getBlogWithContent(slug);
    if (blog) {
      contentMap.set(slug, blog);
    }
  }

  return contentMap;
}
