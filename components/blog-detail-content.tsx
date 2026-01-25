import { BlogFrontmatter } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "@/mdx-components";

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
      <div
        className={cn(
          "prose prose-neutral dark:prose-invert max-w-none",
          "prose-headings:font-[var(--font-mazaeni-demo),serif]",
          "prose-p:text-foreground prose-strong:text-foreground",
          "prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground",
          "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
          "prose-img:rounded-xl prose-img:my-6",
          "prose-pre:bg-secondary prose-pre:text-foreground",
          "prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
          "prose-table:text-foreground",
          "prose-th:bg-secondary prose-th:px-4 prose-th:py-2",
          "prose-td:px-4 prose-td:py-2",
        )}
      >
        <MDXRemote source={content} components={components} />
      </div>
    </article>
  );
}
