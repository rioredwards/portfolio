import { BlogDetailContent } from "@/components/blog-detail-content";
import { getBlogSlugs, getBlogWithContent } from "@/lib/blogs";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogWithContent(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className={cn("min-h-screen bg-secondary")}>
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
