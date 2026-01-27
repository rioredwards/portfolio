import { ContentProse } from "@/components/content-detail/content-prose";
import { ProjectFrontmatter } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Button } from "./ui/button";
import { DialogTitle } from "./ui/dialog";

interface ProjectDetailContentProps {
  frontmatter: ProjectFrontmatter;
  content: string;
  renderContext?: "modal" | "page";
}

export function ProjectDetailHeader({
  title,
  links,
}: ProjectFrontmatter) {
  const firstLink = links?.[0];

  return (
    <div className="flex flex-col gap-4 px-2 md:px-4">
      <header className="flex flex-col gap-2">
        <DialogTitle
          className={cn("text-2xl font-bold", "text-foreground")}
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
        >
          {firstLink ? (
            <Link
              href={firstLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:brightness-125"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </DialogTitle>
      </header>
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

          {/* Links  */}
          {frontmatter.links && frontmatter.links.length > 0 && (
            <ul className={cn("flex items-center gap-4")}>
              {frontmatter.links.map((link, idx) => (
                <li key={idx}>
                  <Button
                    asChild
                    variant={idx === 0 ? "default" : "outline"}
                    size="sm"
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
        <ContentProse>
          <MDXRemote source={content} components={components} />
        </ContentProse>
      </section>
    </div>
  );
}
