import { FilterChipGroup } from "@/components/filter-chip-group";
import { Footer, SectionContentWrapper } from "@/components/layout";
import { ListPageHeader } from "@/components/list-page-header";
import { PaginationNav } from "@/components/pagination-nav";
import { SearchInput } from "@/components/search-input";
import { getBlogIcon } from "@/lib/blog-icons";
import { getAllBlogCards, getAllBlogsWithContent } from "@/lib/blogs";
import { DEFAULT_LOCALE } from "@/lib/constants";
import { paginateItems, parsePageParam } from "@/lib/pagination";
import { readSingleParam } from "@/lib/query-params";
import { searchBlogs } from "@/lib/search";
import { sortBlogs } from "@/lib/sorting";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Link from "next/link";

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
  searchParams?: Promise<{
    page?: string | string[];
    tag?: string | string[];
    q?: string | string[];
  }>;
}

export default async function BlogIndexPage({
  searchParams,
}: BlogIndexPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedTag = readSingleParam(resolvedSearchParams?.tag);
  const searchQuery = readSingleParam(resolvedSearchParams?.q);
  const blogs = getAllBlogCards();
  const blogsWithContent = getAllBlogsWithContent();
  const tagOptions = [
    ...new Set(
      Array.from(blogsWithContent.values()).flatMap(
        (blog) => blog.frontmatter.tags ?? [],
      ),
    ),
  ];
  const filteredBlogs = selectedTag
    ? blogs.filter((blog) => {
        const blogWithContent = blogsWithContent.get(blog.slug);
        return (blogWithContent?.frontmatter.tags ?? []).includes(selectedTag);
      })
    : blogs;
  const searchedBlogs = searchBlogs(
    filteredBlogs,
    searchQuery,
    (blog) => blogsWithContent.get(blog.slug)?.frontmatter.tags ?? [],
  );
  const sortedBlogs = sortBlogs(
    searchedBlogs,
    undefined,
    (blog) => blogsWithContent.get(blog.slug)?.frontmatter.date,
  );
  const totalPages = Math.max(
    1,
    Math.ceil(sortedBlogs.length / BLOGS_PER_PAGE),
  );
  const currentPage = parsePageParam(resolvedSearchParams?.page, totalPages);
  const paginatedBlogs = paginateItems(
    sortedBlogs,
    currentPage,
    BLOGS_PER_PAGE,
  );
  const hasResults = paginatedBlogs.totalItems > 0;

  return (
    <>
      <main id="main-content" className="relative min-h-screen bg-secondary">
        <SectionContentWrapper className="relative mt-[8rem] pt-4 pb-12 md:pt-5 md:pb-16">
          <ListPageHeader
            title="Blog"
            subtitle="Notes on software, systems, and design decisions from real product work."
          />

          <section aria-label="Blog posts list" className="space-y-3.5">
            <SearchInput
              basePath="/blog"
              currentValue={searchQuery}
              placeholder="Search posts..."
              preserveParams={{ tag: selectedTag }}
            />

            <FilterChipGroup
              title="Filter by tag"
              basePath="/blog"
              paramName="tag"
              selectedValue={selectedTag}
              options={tagOptions.map((tag) => ({
                label: tag,
                value: tag,
              }))}
              preserveParams={{ q: searchQuery }}
              singleRowScrollable
            />

            <div className="flex items-center pt-1">
              <p className="text-xs tracking-wide text-muted-foreground sm:text-sm">
                <span className="font-semibold text-secondary-foreground">
                  {sortedBlogs.length}
                </span>{" "}
                posts
              </p>
            </div>

            {!hasResults ? (
              <div className="rounded-2xl border border-border/60 bg-card/45 px-5 py-8 text-secondary-foreground">
                {searchQuery
                  ? "Try a different keyword or clear filters."
                  : "Try a different tag."}
              </div>
            ) : null}

            {hasResults ? (
              <>
                <ol className="m-0 list-none space-y-3 p-0 pt-5 [&>li]:w-full [&>li]:max-w-none">
                  {paginatedBlogs.items.map((blog) => {
                    const blogWithContent = blogsWithContent.get(blog.slug);
                    const publishedDate = formatPublishedDate(
                      blogWithContent?.frontmatter.date,
                    );
                    const readingTime =
                      blogWithContent?.frontmatter.readingTime;
                    const tags = blogWithContent?.frontmatter.tags ?? [];

                    return (
                      <li key={blog.slug} className="w-full">
                        <Link
                          href={`/blog/${blog.slug}`}
                          className={cn(
                            "group block w-full transition-transform duration-300 outline-none",
                            "focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary focus-visible:outline-none",
                          )}
                        >
                          <BlogPostCard
                            blog={blog}
                            publishedDate={publishedDate}
                            readingTime={readingTime}
                            tags={tags}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ol>

                <div className="pt-6">
                  <PaginationNav
                    basePath="/blog"
                    currentPage={paginatedBlogs.currentPage}
                    totalPages={paginatedBlogs.totalPages}
                    query={{ tag: selectedTag, q: searchQuery }}
                  />
                </div>
                <p className="pt-2 text-sm text-muted-foreground">
                  {`Showing ${paginatedBlogs.startIndex + 1}-${paginatedBlogs.endIndex} of ${paginatedBlogs.totalItems}`}
                </p>
              </>
            ) : null}
          </section>
        </SectionContentWrapper>
      </main>
      <Footer />
    </>
  );
}

function BlogPostCard({
  blog,
  publishedDate,
  readingTime,
  tags,
}: {
  blog: { slug: string; title: string; description: string; icon: string };
  publishedDate: string | null;
  readingTime?: number;
  tags: string[];
}) {
  return (
    <article className="flex w-full flex-col gap-4 rounded-2xl border border-border/65 bg-card p-4 shadow-card transition-all duration-300 sm:flex-row sm:items-start sm:gap-5 sm:p-5 pointer-fine:group-hover:shadow-card-hover">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/50 bg-secondary/80 text-foreground">
        {getBlogIcon(blog.icon)}
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {publishedDate ? <span>{publishedDate}</span> : null}
          {publishedDate && readingTime ? (
            <span className="text-border">|</span>
          ) : null}
          {readingTime ? <span>{readingTime} min read</span> : null}
        </div>

        <h2 className="font-mazaeni text-2xl leading-tight text-foreground transition-colors duration-300 group-hover:text-primary-hover">
          {blog.title}
        </h2>

        <p className="line-clamp-2 text-sm leading-relaxed text-secondary-foreground">
          {blog.description}
        </p>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-tertiary/80 px-2.5 py-1 text-xs font-medium text-tertiary-foreground"
              >
                {tag}
              </span>
            ))}
            {tags.length > 4 ? (
              <span className="rounded-full bg-tertiary/80 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                +{tags.length - 4}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
