import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { z } from "zod";

export { sortByOrder } from "@/lib/sorting";

/**
 * Get all content slugs from a directory of MDX files.
 */
export function getContentSlugs(dir: string): string[] {
  try {
    const fullPath = path.join(process.cwd(), dir);
    const files = fs.readdirSync(fullPath);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    console.error(`Error reading ${dir}:`, error);
    return [];
  }
}

/**
 * Get validated frontmatter for a single content item.
 */
export function getContentFrontmatter<T>(
  slug: string,
  dir: string,
  schema: z.ZodSchema<T>,
  context: string,
): T | null {
  try {
    const fullPath = path.join(process.cwd(), dir, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(fileContent);

    const result = schema.safeParse(data);
    if (!result.success) {
      const msg = result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      throw new Error(`Invalid ${context} frontmatter (${slug}): ${msg}`);
    }
    return result.data;
  } catch (error) {
    console.error(`Error reading ${context} ${slug}:`, error);
    return null;
  }
}

/**
 * Get content with full MDX body. Optionally transform frontmatter (e.g. add readingTime).
 */
export function getContentWithContent<T, U = T>(
  slug: string,
  dir: string,
  schema: z.ZodSchema<T>,
  context: string,
  postProcess?: (data: T, content: string) => U,
): { frontmatter: U; content: string } | null {
  try {
    const fullPath = path.join(process.cwd(), dir, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContent);

    const result = schema.safeParse(data);
    if (!result.success) {
      const msg = result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      throw new Error(`Invalid ${context} frontmatter (${slug}): ${msg}`);
    }

    const frontmatter = postProcess
      ? postProcess(result.data, content)
      : (result.data as unknown as U);

    return { frontmatter, content };
  } catch (error) {
    console.error(`Error reading ${context} ${slug}:`, error);
    return null;
  }
}
