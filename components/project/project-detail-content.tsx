import { ContentProse } from "@/components/content-detail/content-prose";
import { ProjectFrontmatterSection } from "@/components/ui/project-frontmatter-section";
import { projectImageScope } from "@/content/projects/project-images";
import { ProjectFrontmatter } from "@/lib/projects";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DetailHeader } from "@/components/ui/detail-header";

interface ProjectDetailContentProps {
  frontmatter: ProjectFrontmatter;
  content: string;
}

export function ProjectDetailContent({
  frontmatter,
  content,
}: ProjectDetailContentProps) {
  const components = useMDXComponents({});

  return (
    <div>
      {/* Header Section: Logo, Title, Links, Tags */}
      <div>
        <DetailHeader
          title={frontmatter.title}
          slug={frontmatter.slug}
          basePath="/work"
          links={frontmatter.links}
          icon={frontmatter.icon}
        />
        <ProjectFrontmatterSection frontmatter={frontmatter} />
      </div>

      {/* MDX Content Section */}
      <section>
        <ContentProse>
          <MDXRemote
            source={content}
            components={components}
            options={{ scope: projectImageScope, blockJS: false }}
          />
        </ContentProse>
      </section>
    </div>
  );
}
