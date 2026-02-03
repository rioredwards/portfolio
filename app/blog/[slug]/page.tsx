import { BlogDetailContent } from "@/components/blog";
import {
  getBlogFrontmatter,
  getBlogSlugs,
  getBlogWithContent,
} from "@/lib/blogs";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const frontmatter = getBlogFrontmatter(slug);

  if (!frontmatter) {
    return { title: "Blog Post Not Found" };
  }

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      type: "article",
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogWithContent(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main id="main-content" className={cn("min-h-screen bg-secondary")}>
      <div
        className={cn("mx-auto max-w-prose-max px-content-px py-content-py")}
      >
        <BlogDetailContent
          frontmatter={blog.frontmatter}
          content={blog.content}
        />
      </div>
    </main>
  );
}
