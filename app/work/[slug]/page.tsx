import { ProjectDetailContent } from "@/components/project";
import { getProjectSlugs, getProjectWithContent } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectWithContent(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={cn("min-h-screen bg-secondary")}>
      <div
        className={cn("mx-auto max-w-prose-max px-content-px py-content-py")}
      >
        <ProjectDetailContent
          frontmatter={project.frontmatter}
          content={project.content}
        />
      </div>
    </main>
  );
}
