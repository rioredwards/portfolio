import { ProjectDetailContent } from "@/components/project-detail-content";
import { getProjectMarkdown } from "@/lib/get-project-markdown";
import { parseProjectMarkdown } from "@/lib/parse-project-markdown";
import { PROJECTS } from "@/lib/projects-data";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.title.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS.find(
    (p) => p.title.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  if (!project) {
    notFound();
  }

  const markdown = await getProjectMarkdown(slug);
  const parsedContent = markdown
    ? parseProjectMarkdown(markdown, project.title)
    : null;

  return (
    <main className={cn("bg-background min-h-screen")}>
      <div className={cn("px-content-px py-content-py mx-auto max-w-5xl")}>
        {parsedContent ? (
          <ProjectDetailContent
            project={project}
            content={parsedContent}
            renderContext="page"
          />
        ) : (
          <p className={cn("text-muted-foreground")}>Content not available.</p>
        )}
      </div>
    </main>
  );
}
