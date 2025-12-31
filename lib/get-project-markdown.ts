import fs from "fs";
import path from "path";
import {
  ParsedProjectContent,
  parseProjectMarkdown,
} from "./parse-project-markdown";
import { PROJECTS } from "./projects-data";

export async function getProjectMarkdown(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "work",
      "markdown",
      `${slug}.md`,
    );
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, "utf-8");
    }
    return null;
  } catch (error) {
    console.error("Error reading markdown:", error);
    return null;
  }
}

export async function getAllProjectContent(): Promise<
  Map<string, ParsedProjectContent>
> {
  const contentMap: Map<string, ParsedProjectContent> = new Map();

  for (const project of PROJECTS) {
    const slug = project.title.toLowerCase().replace(/\s+/g, "-");
    const markdown = await getProjectMarkdown(slug);
    if (markdown) {
      const parsed = parseProjectMarkdown(markdown, project.title);
      contentMap.set(project.title, parsed);
    }
  }

  return contentMap;
}
