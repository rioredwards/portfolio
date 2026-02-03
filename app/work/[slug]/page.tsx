import { ProjectDetailContent } from "@/components/project";
import {
  getProjectFrontmatter,
  getProjectSlugs,
  getProjectWithContent,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const frontmatter = getProjectFrontmatter(slug);

  if (!frontmatter) {
    return { title: "Project Not Found" };
  }

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
      images: frontmatter.image ? [{ url: frontmatter.image }] : undefined,
    },
  };
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
