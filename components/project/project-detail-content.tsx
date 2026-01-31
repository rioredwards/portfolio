import { ContentProse } from "@/components/content-detail/content-prose";
import { projectImageScope } from "@/content/projects/project-images";
import { ProjectFrontmatter } from "@/lib/projects";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ProjectDetailHeader } from "@/components/ui/project-detail-header";
import { ProjectFrontmatterSection } from "@/components/ui/project-frontmatter-section";

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
        <ProjectDetailHeader {...frontmatter} />
        <ProjectFrontmatterSection frontmatter={frontmatter} />
      </div>

      {/* MDX Content Section */}
      <section>
        <ContentProse>
          <MDXRemote
            source={content}
            components={components}
            options={{ scope: projectImageScope }}
          />
        </ContentProse>
      </section>
    </div>
  );
}
