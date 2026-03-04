import { BlogFrontmatter } from "@/lib/blogs";
import { DEFAULT_LOCALE } from "@/lib/constants";
import { TagList } from "./tag-list";

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
        <div className="flex items-center gap-2 text-sm text-secondary-foreground">
          {hasDate && (
            <span>
              {new Date(frontmatter.date!).toLocaleDateString(DEFAULT_LOCALE, {
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
      {hasTags && <TagList items={frontmatter.tags!} dataTestId="blog-tag" />}
      <hr className="mt-4 mb-8 border-border/40" />
    </div>
  );
}
