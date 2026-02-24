import { ContentProse } from "@/components/content-detail/content-prose";
import { BlogFrontmatterSection } from "@/components/ui/blog-frontmatter-section";
import { BlogFrontmatter } from "@/lib/blogs";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";
import { DetailHeader } from "../ui/detail-header";

interface BlogDetailContentProps {
  frontmatter: BlogFrontmatter;
  content: string;
}

export function BlogDetailContent({
  frontmatter,
  content,
}: BlogDetailContentProps) {
  const components = useMDXComponents({});

  return (
    <div>
      {/* Header Section */}
      <div>
        <DetailHeader
          title={frontmatter.title}
          slug={frontmatter.slug}
          basePath="/blog"
          links={frontmatter.links}
        />
        <BlogFrontmatterSection frontmatter={frontmatter} />
      </div>

      {/* MDX Content */}
      <section>
        <ContentProse includeTableStyles>
          <MDXRemote
            source={content}
            components={components}
            options={{ blockJS: false }}
          />
        </ContentProse>
      </section>
    </div>
  );
}
