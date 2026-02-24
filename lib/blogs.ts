import { READING_SPEED_WORDS_PER_MIN } from "@/lib/constants";
import {
  getContentFrontmatter,
  getContentSlugs,
  getContentWithContent,
  sortByOrder,
} from "@/lib/content";
import { z } from "zod";

const blogFrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  slug: z.string().min(1, "slug is required"),
  description: z.string().min(1, "description is required"),
  icon: z.string().min(1, "icon is required"),
  date: z.string().optional(),
  tags: z.array(z.string()).default([]),
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

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema> & {
  readingTime?: number; // Calculated, not from frontmatter
};

const BLOGS_DIR = "content/blogs";

/**
 * Calculate estimated reading time based on word count
 * Uses ~200 words per minute as average reading speed
 */
function calculateReadingTime(content: string): number {
  // Remove MDX/JSX components and markdown syntax for more accurate count
  const plainText = content
    .replace(/<[^>]*>/g, "") // Remove HTML/JSX tags
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // Convert links to just text
    .replace(/[#*_`~]/g, "") // Remove markdown syntax
    .trim();

  const words = plainText.split(/\s+/).filter((word) => word.length > 0).length;
  const minutes = Math.ceil(words / READING_SPEED_WORDS_PER_MIN);

  return Math.max(1, minutes); // Minimum 1 minute
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

/**
 * Get all blog slugs from MDX files
 */
export function getBlogSlugs(): string[] {
  return getContentSlugs(BLOGS_DIR);
}

/**
 * Get frontmatter for a single blog by slug
 */
export function getBlogFrontmatter(slug: string): BlogFrontmatter | null {
  return getContentFrontmatter(slug, BLOGS_DIR, blogFrontmatterSchema, "blog");
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

  return sortByOrder(blogs);
}

/**
 * Get a blog with its full MDX content
 */
export function getBlogWithContent(slug: string): BlogWithContent | null {
  return getContentWithContent(
    slug,
    BLOGS_DIR,
    blogFrontmatterSchema,
    "blog",
    (data, content) => ({
      ...data,
      readingTime: calculateReadingTime(content),
    }),
  );
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
