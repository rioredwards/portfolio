import { BlogListClient } from "@/components/blog/blog-list-client";
import { type RenderedBlog } from "@/components/blog/blog-modal-handler";
import { Footer, SectionContentWrapper } from "@/components/layout";
import { ListPageHeader } from "@/components/list-page-header";
import { mdxComponents } from "@/components/mdx";
import { getAllBlogsWithContent } from "@/lib/blogs";
import { sortByOrder } from "@/lib/sorting";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Suspense } from "react";

const blogIndexDescription =
  "Browse all of Rio Edwards' blog posts, writing, and technical explainers.";

export const metadata: Metadata = {
  title: "Blog",
  description: blogIndexDescription,
  openGraph: {
    title: "Blog | Rio Edwards",
    description: blogIndexDescription,
    type: "website",
  },
};

export default async function BlogIndexPage() {
  const blogsWithContent = getAllBlogsWithContent();

  const blogFrontmatters = sortByOrder(
    Array.from(blogsWithContent.values()).map((b) => b.frontmatter),
  );

  const renderedBlogs = new Map<string, RenderedBlog>();
  for (const [slug, blog] of blogsWithContent) {
    renderedBlogs.set(slug, {
      frontmatter: blog.frontmatter,
      renderedContent: (
        <MDXRemote
          source={blog.content}
          components={mdxComponents}
          options={{ blockJS: false }}
        />
      ),
    });
  }

  return (
    <>
      <main id="main-content" className="relative min-h-screen bg-secondary">
        <SectionContentWrapper className="relative mt-[8rem] pt-4 pb-12 md:pt-5 md:pb-16">
          <ListPageHeader
            title="Blog"
            subtitle="Notes on software, systems, and design decisions from real product work."
          />
          <Suspense>
            <BlogListClient
              blogFrontmatters={blogFrontmatters}
              renderedBlogs={renderedBlogs}
            />
          </Suspense>
        </SectionContentWrapper>
      </main>
      <Footer />
    </>
  );
}
