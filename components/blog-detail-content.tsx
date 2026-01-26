import { ContentProse } from "@/components/content-detail/content-prose";
import { BlogFrontmatter } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogDetailContentProps {
  frontmatter: BlogFrontmatter;
  content: string;
}

export function BlogDetailContent({
  frontmatter,
  content,
}: BlogDetailContentProps) {
  const components = useMDXComponents({});

  return (
    <article>
      {/* Header Section */}
      <header className={cn("mb-8")}>
        <h1
          className={cn(
            "mb-4 text-4xl font-bold tracking-tight md:text-5xl",
            "text-foreground",
          )}
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
        >
          {frontmatter.title}
        </h1>

        {/* Meta info */}
        <div className={cn("flex flex-wrap items-center gap-3")}>
          {frontmatter.date && (
            <time
              dateTime={frontmatter.date}
              className={cn("text-muted-foreground text-sm")}
            >
              {new Date(frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <>
              <span className="text-muted-foreground">·</span>
              <div className={cn("flex flex-wrap gap-2")}>
                {frontmatter.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-medium",
                      "bg-secondary text-foreground-secondary",
                    )}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Description */}
        <p className={cn("mt-4 text-lg text-muted-foreground")}>
          {frontmatter.description}
        </p>
      </header>

      {/* MDX Content */}
      <ContentProse includeTableStyles>
        <MDXRemote source={content} components={components} />
      </ContentProse>
    </article>
  );
}
