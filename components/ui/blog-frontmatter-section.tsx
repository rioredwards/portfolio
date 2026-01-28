import { BlogFrontmatter } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

export function BlogFrontmatterSection({
  frontmatter,
}: {
  frontmatter: BlogFrontmatter;
}) {
  const hasTags = frontmatter.tags && frontmatter.tags.length > 0;
  const hasDate = !!frontmatter.date;
  const hasReadingTime = !!frontmatter.readingTime;

  if (!hasTags && !hasDate && !hasReadingTime) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      {(hasDate || hasReadingTime) && (
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          {hasDate && (
            <span>
              {new Date(frontmatter.date!).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          )}
          {hasDate && hasReadingTime && <span>•</span>}
          {hasReadingTime && <span>{frontmatter.readingTime} min read</span>}
        </div>
      )}
      {hasTags && (
        <div className="flex flex-wrap gap-2 items-center">
          {frontmatter.tags!.map((tag, idx) => (
            <Fragment key={idx}>
              <span
                className={cn(
                  "bg-secondary text-foreground",
                  "rounded-full py-1 text-sm"
                )}
              >
                {tag}
              </span>
              {idx < frontmatter.tags!.length - 1 && (
                <span className="text-muted-foreground">•</span>
              )}
            </Fragment>
          ))}
        </div>
      )}
      <hr className="border-border mt-4 mb-8" />
    </div>
  );
}
