import { FilterChipGroup } from "@/components/filter-chip-group";
import { Footer, SectionContentWrapper } from "@/components/layout";
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

  return (
    <>
      <main
        id="main-content"
        className="relative min-h-screen overflow-hidden bg-secondary"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-12 left-[10%] h-80 w-80 rounded-full bg-primary/9 blur-3xl" />
          <div className="absolute top-[32rem] right-[-7rem] h-80 w-80 rounded-full bg-tertiary/35 blur-3xl" />
        </div>

        <SectionContentWrapper className="relative space-y-10 pt-30 pb-16 md:space-y-12 md:pt-36">
          <header className="grid gap-8 pb-7 lg:grid-cols-[1fr] lg:items-end">
            <div className="space-y-5">
              <p className="text-xs font-semibold tracking-[0.26em] text-muted-foreground uppercase">
                Writing Archive
              </p>
              <h1 className="font-mazaeni text-5xl leading-none text-foreground sm:text-6xl md:text-7xl">
                Blog
              </h1>
              <p className="max-w-prose-max text-lg leading-relaxed text-secondary-foreground sm:text-xl">
                Notes on software, systems, and design decisions from real
                product work.
              </p>
            </div>
          </header>

          <section aria-label="Blog posts list" className="space-y-8">
            <div className="sticky top-18 z-20 -mx-content-px bg-secondary/92 px-content-px pt-2 pb-5 backdrop-blur sm:-mx-content-px md:-mx-content-px-md md:px-content-px-md">
              <div className="space-y-4">
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
              </div>
            </div>

            {paginatedBlogs.totalItems === 0 ? (
              <div className="border-y border-border/60 py-10 text-secondary-foreground">
                {searchQuery
                  ? "Try a different keyword or clear filters."
                  : "Try a different tag."}
              </div>
            ) : null}

            <ol className="m-0 list-none divide-y divide-border/55 border-y border-border/55 p-0 [&>li]:w-full [&>li]:max-w-none">
              {paginatedBlogs.items.map((blog) => {
                const blogWithContent = blogsWithContent.get(blog.slug);
                const publishedDate = formatPublishedDate(
                  blogWithContent?.frontmatter.date,
                );
                const readingTime = blogWithContent?.frontmatter.readingTime;
                const tags = blogWithContent?.frontmatter.tags ?? [];

                return (
                  <li key={blog.slug} className="w-full">
                    <Link
                      href={`/blog/${blog.slug}`}
                      className={cn(
                        "group block py-8 transition-colors duration-300",
                        "focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary focus-visible:outline-none",
                      )}
                    >
                      <article className="grid gap-7 lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start lg:gap-10">
                        <div className="space-y-4 text-sm text-muted-foreground">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border/50 bg-card text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                            {getBlogIcon(blog.icon)}
                          </div>
                          <div className="space-y-1">
                            {publishedDate ? <p>{publishedDate}</p> : null}
                            {readingTime ? <p>{readingTime} min read</p> : null}
                            <p>/blog/{blog.slug}</p>
                          </div>
                        </div>

                        <div className="space-y-5">
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
                                  className="rounded-full border border-border/70 bg-secondary/75 px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          ) : null}

                          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-foreground uppercase transition-transform duration-300 group-hover:translate-x-1">
                            Read post
                            <span aria-hidden="true">→</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </li>
                );
              })}
            </ol>

            <PaginationNav
              basePath="/blog"
              currentPage={paginatedBlogs.currentPage}
              totalPages={paginatedBlogs.totalPages}
              query={{ tag: selectedTag, q: searchQuery }}
            />
            <p className="pt-2 text-sm text-muted-foreground">
              {paginatedBlogs.totalItems === 0
                ? searchQuery
                  ? "No posts match your search"
                  : "No posts match this filter"
                : `Showing ${paginatedBlogs.startIndex + 1}-${paginatedBlogs.endIndex} of ${paginatedBlogs.totalItems}`}
            </p>
          </section>
        </SectionContentWrapper>
      </main>
      <Footer />
    </>
  );
}
