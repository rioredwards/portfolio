import { ContentProse } from "@/components/content-detail/content-prose";
import { BlogDetailHeader } from "@/components/ui/blog-detail-header";
import { BlogFrontmatterSection } from "@/components/ui/blog-frontmatter-section";
import { BlogFrontmatter } from "@/lib/blogs";
import { useMDXComponents } from "@/mdx-components";
import { MDXRemote } from "next-mdx-remote/rsc";

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
        <BlogDetailHeader {...frontmatter} />
        <BlogFrontmatterSection frontmatter={frontmatter} />
      </div>

      {/* MDX Content */}
      <section>
        <ContentProse includeTableStyles>
          <MDXRemote source={content} components={components} />
        </ContentProse>
      </section>
    </div>
  );
}
