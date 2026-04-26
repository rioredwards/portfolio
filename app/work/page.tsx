import { SectionContentWrapper } from "@/components/layout";
import { ListPageHeader } from "@/components/list-page-header";
import { mdxComponents } from "@/components/mdx";
import { ProjectListClient } from "@/components/project/project-list-client";
import { type RenderedProject } from "@/components/project/project-modal-handler";
import { projectImageScope } from "@/content/projects/project-images";
import { getAllProjectsWithContent } from "@/lib/projects";
import { sortByOrder } from "@/lib/sorting";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";

const workIndexDescription =
  "Browse all of Rio Edwards' software projects, case studies, and shipped product work.";

export const metadata: Metadata = {
  title: "Work",
  description: workIndexDescription,
  openGraph: {
    title: "Work | Rio Edwards",
    description: workIndexDescription,
    type: "website",
  },
};

export default async function WorkIndexPage() {
  const projectsWithContent = getAllProjectsWithContent();

  const projectFrontmatters = sortByOrder(
    Array.from(projectsWithContent.values()).map((p) => p.frontmatter),
  );

  const renderedProjects = new Map<string, RenderedProject>();
  for (const [slug, project] of projectsWithContent) {
    renderedProjects.set(slug, {
      frontmatter: project.frontmatter,
      renderedContent: (
        <MDXRemote
          source={project.content}
          components={mdxComponents}
          options={{ scope: projectImageScope, blockJS: false }}
        />
      ),
    });
  }

  return (
    <main id="main-content" className="relative min-h-screen bg-secondary">
      <SectionContentWrapper className="relative mt-[8rem] pt-4 pb-12 md:pt-5 md:pb-16">
        <ListPageHeader
          title="Work"
          subtitle="Products, experiments, and shipped systems."
        />
        <Suspense>
          <ProjectListClient
            projectFrontmatters={projectFrontmatters}
            renderedProjects={renderedProjects}
          />
        </Suspense>
      </SectionContentWrapper>
    </main>
  );
}
