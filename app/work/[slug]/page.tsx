import { ProjectDetailContent } from "@/components/project-detail-content";
import {
  getProjectSlugs,
  getProjectWithContent,
} from "@/lib/projects";
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
    <main className={cn("bg-secondary min-h-screen")}>
      <div className={cn("px-content-px py-content-py mx-auto max-w-prose-max")}>
        <ProjectDetailContent
          frontmatter={project.frontmatter}
          content={project.content}
        />
      </div>
    </main>
  );
}
