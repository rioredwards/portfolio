import { ProjectFrontmatter } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

export function ProjectFrontmatterSection({
  frontmatter,
}: {
  frontmatter: ProjectFrontmatter;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-muted-foreground text-sm font-medium">
          Category
        </span>
        <span className="text-foreground">{frontmatter.category}</span>
      </div>

      {frontmatter.skills && frontmatter.skills.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-sm font-medium">
            Skills
          </span>
          <div className="flex flex-wrap gap-2 items-center">
            {frontmatter.skills.map((skill, idx) => (
              <Fragment key={idx}>
                <span
                  key={idx}
                  className={cn(
                    "text-foreground",
                    "rounded-full py-1 text-sm"
                  )}
                >
                  {/* seprated by a circle */}
                  {skill}
                </span>
                {idx < frontmatter.skills.length - 1 && <span className="text-muted-foreground/40">/</span>}
              </Fragment>
            ))}
          </div>
        </div>
      )}
      <hr className="border-border/40 mt-4 mb-8" />
    </div>
  );
}
