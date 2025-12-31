import { ParsedProjectContent } from "@/lib/parse-project-markdown";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Project } from "./project";
import { Button } from "./ui/button";
import { Skill } from "./ui/skill";

interface ProjectDetailContentProps {
  project: Project;
  content: ParsedProjectContent;
  renderContext?: "modal" | "page";
}

function ProjectDetailSection({
  name,
  children,
}: {
  name?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mb-6")}>
      {name && (
        <div className={cn("mt-6 mb-4 flex flex-col justify-center")}>
          <h2
            className={cn("mb-2 text-2xl font-bold", "text-foreground")}
            style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
          >
            {name}
          </h2>
          <div className={cn("bg-border h-px w-full")} />
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}

export function ProjectDetailHeader({
  project,
  content,
}: {
  project: Project;
  content: ParsedProjectContent;
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
          {project.title.charAt(0)}
        </div>
        <h1
          className={cn("text-4xl font-bold", "text-foreground")}
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
        >
          {content.title}
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
          #{project.category}
        </span>
        {project.skills.slice(0, 2).map((skill, idx) => (
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
  project,
  content,
  renderContext = "page",
}: ProjectDetailContentProps) {
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
              {project.title.charAt(0)}
            </div>
            <h1
              className={cn(
                "mb-0 text-4xl leading-none font-bold tracking-tight",
                "text-foreground",
              )}
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
            >
              {content.title}
            </h1>
          </div>

          {/* Links (Try, GitHub) */}
          {content.links.length > 0 && (
            <ul className={cn("flex items-center gap-4")}>
              {content.links.map((link, idx) => (
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
              #{project.category}
            </span>
            {project.skills.slice(0, 2).map((skill, idx) => (
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

      {/* Content Section */}
      <section>
        {/* Header Image */}
        {content.headerImage && (
          <div className={cn("bg-secondary my-6 overflow-hidden rounded-xl")}>
            <div
              className={cn(
                "flex aspect-video w-full items-center justify-center",
              )}
            >
              <span className={cn("text-muted-foreground")}>
                Header Image Placeholder
              </span>
            </div>
          </div>
        )}

        {/* Slogan */}
        {content.slogan && (
          <ProjectDetailSection>
            <div
              className={cn(
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-p:text-foreground prose-strong:text-foreground",
              )}
            >
              <ReactMarkdown>{content.slogan}</ReactMarkdown>
            </div>
          </ProjectDetailSection>
        )}

        {/* Description */}
        {content.description && (
          <ProjectDetailSection>
            <div
              className={cn(
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-p:text-foreground",
              )}
            >
              <ReactMarkdown>{content.description}</ReactMarkdown>
            </div>
          </ProjectDetailSection>
        )}

        {/* Made With */}
        {content.madeWith.length > 0 && (
          <ProjectDetailSection name="Made With">
            <div className={cn("flex flex-wrap gap-2")}>
              {content.madeWith.map((tech, idx) => (
                <Skill key={idx} text={tech} />
              ))}
            </div>
          </ProjectDetailSection>
        )}

        {/* Features */}
        {content.features && (
          <ProjectDetailSection name="Features">
            <div
              className={cn(
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-ul:text-foreground prose-li:text-foreground",
                "prose-strong:text-foreground",
              )}
            >
              <ReactMarkdown>{content.features}</ReactMarkdown>
            </div>
          </ProjectDetailSection>
        )}

        {/* Preview */}
        {content.preview && (
          <ProjectDetailSection name="Preview">
            <div className={cn("bg-secondary overflow-hidden rounded-xl")}>
              <div
                className={cn(
                  "flex aspect-video w-full items-center justify-center",
                )}
              >
                <span className={cn("text-muted-foreground")}>
                  Preview Image Placeholder
                </span>
              </div>
            </div>
          </ProjectDetailSection>
        )}

        {/* Usage */}
        {content.usage && (
          <ProjectDetailSection name="Usage">
            <div
              className={cn(
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-ol:text-foreground prose-li:text-foreground",
              )}
            >
              <ReactMarkdown>{content.usage}</ReactMarkdown>
            </div>
          </ProjectDetailSection>
        )}

        {/* Configure */}
        {content.configure && (
          <ProjectDetailSection name="Configure">
            <div
              className={cn(
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-ol:text-foreground prose-li:text-foreground",
              )}
            >
              <ReactMarkdown>{content.configure}</ReactMarkdown>
            </div>
          </ProjectDetailSection>
        )}

        {/* Lessons Learned */}
        {content.lessonsLearned && (
          <ProjectDetailSection name="Lessons Learned">
            <div
              className={cn(
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-ul:text-foreground prose-li:text-foreground",
                "prose-strong:text-foreground",
              )}
            >
              <ReactMarkdown>{content.lessonsLearned}</ReactMarkdown>
            </div>
          </ProjectDetailSection>
        )}

        {/* Reflection */}
        {content.reflection && (
          <ProjectDetailSection name="Reflection">
            <div
              className={cn(
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-p:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
              )}
            >
              <ReactMarkdown>{content.reflection}</ReactMarkdown>
            </div>
          </ProjectDetailSection>
        )}

        {/* Authors */}
        {content.authors && (
          <ProjectDetailSection name="Authors">
            <div
              className={cn(
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-ul:text-foreground prose-li:text-foreground",
                "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
              )}
            >
              <ReactMarkdown>{content.authors}</ReactMarkdown>
            </div>
          </ProjectDetailSection>
        )}

        {/* Acknowledgements */}
        {content.acknowledgements && (
          <ProjectDetailSection name="Acknowledgements">
            <div
              className={cn(
                "prose prose-neutral dark:prose-invert max-w-none",
                "prose-ul:text-foreground prose-li:text-foreground",
                "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
              )}
            >
              <ReactMarkdown>{content.acknowledgements}</ReactMarkdown>
            </div>
          </ProjectDetailSection>
        )}
      </section>
    </div>
  );
}
