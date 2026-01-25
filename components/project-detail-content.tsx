import { ProjectFrontmatter } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { useMDXComponents } from "@/mdx-components";
import { Button } from "./ui/button";

interface ProjectDetailContentProps {
  frontmatter: ProjectFrontmatter;
  content: string;
  renderContext?: "modal" | "page";
}

export function ProjectDetailHeader({
  frontmatter,
}: {
  frontmatter: ProjectFrontmatter;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] grid-rows-[auto_auto] items-center justify-items-start",
        "gap-x-4 gap-y-4",
      )}
    >
      {/* Logo placeholder and Title */}
      <div className={cn("flex items-center gap-4")}>
        <div
          className={cn(
            "bg-secondary flex h-12 w-12 items-center justify-center rounded-full",
            "text-foreground-secondary text-2xl font-bold",
          )}
        >
          {frontmatter.title.charAt(0)}
        </div>
        <h1
          className={cn("text-4xl font-bold", "text-foreground")}
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
        >
          {frontmatter.title}
        </h1>
      </div>

      {/* Tags */}
      <div className={cn("col-span-2 flex flex-wrap items-center gap-2")}>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium",
            "bg-secondary text-foreground-secondary",
          )}
        >
          #{frontmatter.category}
        </span>
        {frontmatter.skills.slice(0, 2).map((skill, idx) => (
          <span
            key={idx}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              "bg-secondary text-foreground-secondary",
            )}
          >
            #{skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetailContent({
  frontmatter,
  content,
  renderContext = "page",
}: ProjectDetailContentProps) {
  const components = useMDXComponents({});

  return (
    <div>
      {/* Header Section: Logo, Title, Links, Tags */}
      {renderContext === "page" && (
        <div
          className={cn(
            "mt-6 mb-6 grid grid-cols-[auto_1fr] grid-rows-[auto_auto] items-center justify-items-start",
            "gap-x-6 gap-y-2",
          )}
        >
          {/* Logo placeholder and Title */}
          <div className={cn("flex items-end justify-end gap-4")}>
            <div
              className={cn(
                "bg-secondary flex h-16 w-16 items-center justify-center rounded-full",
                "text-foreground-secondary text-2xl font-bold",
              )}
            >
              {frontmatter.title.charAt(0)}
            </div>
            <h1
              className={cn(
                "mb-0 text-4xl leading-none font-bold tracking-tight",
                "text-foreground",
              )}
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
            >
              {frontmatter.title}
            </h1>
          </div>

          {/* Links (Try, GitHub) */}
          {frontmatter.links && frontmatter.links.length > 0 && (
            <ul className={cn("flex items-center gap-4")}>
              {frontmatter.links.map((link, idx) => (
                <li key={idx}>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className={cn(
                      "border-foreground text-foreground hover:bg-secondary",
                    )}
                  >
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.text}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          )}

          {/* Tags */}
          <div className={cn("col-span-2 flex flex-wrap items-center gap-2")}>
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                "bg-secondary text-foreground-secondary",
              )}
            >
              #{frontmatter.category}
            </span>
            {frontmatter.skills.slice(0, 2).map((skill, idx) => (
              <span
                key={idx}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  "bg-secondary text-foreground-secondary",
                )}
              >
                #{skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* MDX Content Section */}
      <section>
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
          )}
        >
          <MDXRemote source={content} components={components} />
        </div>
      </section>
    </div>
  );
}
