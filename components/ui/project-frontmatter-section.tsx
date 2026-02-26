import { ProjectFrontmatter } from "@/lib/projects";
import { TagList } from "./tag-list";

export function ProjectFrontmatterSection({
  frontmatter,
}: {
  frontmatter: ProjectFrontmatter;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-muted-foreground">
          Category
        </span>
        <span className="text-foreground" data-testid="project-category">
          {frontmatter.category}
        </span>
      </div>

      {frontmatter.skills && frontmatter.skills.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Skills
          </span>
          <TagList items={frontmatter.skills} dataTestId="project-skill" />
        </div>
      )}
      <hr className="mt-4 mb-8 border-border/40" />
    </div>
  );
}
