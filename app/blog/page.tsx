import { Footer, SectionContentWrapper } from "@/components/layout";
import { PaginationNav } from "@/components/pagination-nav";
import { getBlogIcon } from "@/lib/blog-icons";
import { getAllBlogCards, getAllBlogsWithContent } from "@/lib/blogs";
import { DEFAULT_LOCALE } from "@/lib/constants";
import { paginateItems, parsePageParam } from "@/lib/pagination";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

const blogIndexDescription =
  "Browse all of Rio Edwards' blog posts, writing, and technical explainers.";

export const metadata: Metadata = {
  title: "Blog | Rio Edwards",
  description: blogIndexDescription,
  openGraph: {
    title: "Blog | Rio Edwards",
    description: blogIndexDescription,
    type: "website",
  },
};

function formatPublishedDate(date?: string) {
  if (!date) return null;

  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

const BLOGS_PER_PAGE = 6;

interface BlogIndexPageProps {
  searchParams?: Promise<{ page?: string | string[] }>;
}

export default async function BlogIndexPage({
  searchParams,
}: BlogIndexPageProps) {
  const resolvedSearchParams = await searchParams;
  const blogs = getAllBlogCards();
  const blogsWithContent = getAllBlogsWithContent();
  const totalPages = Math.max(1, Math.ceil(blogs.length / BLOGS_PER_PAGE));
  const currentPage = parsePageParam(resolvedSearchParams?.page, totalPages);
  const paginatedBlogs = paginateItems(blogs, currentPage, BLOGS_PER_PAGE);

  return (
    <>
      <main id="main-content" className="min-h-screen bg-secondary">
        <SectionContentWrapper className="space-y-12 pt-32 md:pt-36">
          <header className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold tracking-[0.24em] text-muted-foreground uppercase">
              All Posts
            </p>
            <div className="space-y-4">
              <h1 className="font-mazaeni text-5xl leading-none text-foreground sm:text-6xl md:text-7xl">
                Blog
              </h1>
              <p className="text-lg leading-relaxed text-secondary-foreground sm:text-xl">
                Writing about software, systems, and the ideas that make the web
                easier to understand.
              </p>
            </div>
          </header>

          <section aria-label="Blog posts list" className="space-y-5">
            <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {paginatedBlogs.startIndex + 1}-
                {paginatedBlogs.endIndex} of {paginatedBlogs.totalItems} posts
              </p>
              <p>
                Page {paginatedBlogs.currentPage} of {paginatedBlogs.totalPages}
              </p>
            </div>

            {paginatedBlogs.items.map((blog) => {
              const blogWithContent = blogsWithContent.get(blog.slug);
              const publishedDate = formatPublishedDate(
                blogWithContent?.frontmatter.date,
              );
              const readingTime = blogWithContent?.frontmatter.readingTime;
              const tags = blogWithContent?.frontmatter.tags ?? [];

              return (
                <Link
                  key={blog.slug}
                  href={`/blog/${blog.slug}`}
                  className={cn(
                    "group block rounded-4xl border border-border/60 bg-background p-7 shadow-card transition-all duration-300 ease-out sm:p-9",
                    "hover:-translate-y-1 hover:border-background-hover-border hover:shadow-card-hover",
                    "focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary focus-visible:outline-none",
                  )}
                >
                  <article className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        {publishedDate ? <span>{publishedDate}</span> : null}
                        {publishedDate && readingTime ? <span>•</span> : null}
                        {readingTime ? (
                          <span>{readingTime} min read</span>
                        ) : null}
                        {publishedDate || readingTime ? <span>•</span> : null}
                        <span>/blog/{blog.slug}</span>
                      </div>

                      <div className="space-y-3">
                        <h2 className="font-mazaeni text-3xl leading-tight text-foreground transition-colors duration-300 group-hover:text-primary-hover sm:text-4xl">
                          {blog.title}
                        </h2>
                        <p className="max-w-prose-max text-base leading-relaxed text-secondary-foreground sm:text-lg">
                          {blog.description}
                        </p>
                      </div>

                      {tags.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-border/70 bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-between gap-6 lg:min-h-full lg:flex-col lg:items-end">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-card text-foreground sm:h-24 sm:w-24">
                        {getBlogIcon(blog.icon)}
                      </div>

                      <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.16em] text-foreground uppercase transition-transform duration-300 group-hover:translate-x-1">
                        Read post
                        <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
            <PaginationNav
              basePath="/blog"
              currentPage={paginatedBlogs.currentPage}
              totalPages={paginatedBlogs.totalPages}
            />
          </section>
        </SectionContentWrapper>
      </main>
      <Footer />
    </>
  );
}
