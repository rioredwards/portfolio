"use client";

import { BlogModalHandler, type RenderedBlog } from "@/components/blog";
import { ChipOverflowRow } from "@/components/chip-overflow-row";
import { FilterChipGroup } from "@/components/filter-chip-group";
import { PaginationNav } from "@/components/pagination-nav";
import { SearchInput } from "@/components/search-input";
import { getBlogIcon } from "@/lib/blog-icons";
import type { BlogFrontmatter } from "@/lib/blogs";
import { DEFAULT_LOCALE } from "@/lib/constants";
import { paginateItems, parsePageParam } from "@/lib/pagination";
import { buildQueryHref } from "@/lib/query-params";
import { searchBlogs } from "@/lib/search";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

const BLOGS_PER_PAGE = 9;

function formatPublishedDate(date?: string) {
  if (!date) return null;
  return new Intl.DateTimeFormat(DEFAULT_LOCALE, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

interface BlogListClientProps {
  blogFrontmatters: BlogFrontmatter[];
  renderedBlogs: Map<string, RenderedBlog>;
}

export function BlogListClient({
  blogFrontmatters,
  renderedBlogs,
}: BlogListClientProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("tag") ?? undefined;
  const searchQuery = searchParams.get("q") ?? undefined;
  const rawPage = searchParams.get("page") ?? undefined;

  const tagOptions = useMemo(
    () => [...new Set(blogFrontmatters.flatMap((b) => b.tags ?? []))],
    [blogFrontmatters],
  );

  const filteredBlogs = useMemo(
    () =>
      selectedTag
        ? blogFrontmatters.filter((b) => (b.tags ?? []).includes(selectedTag))
        : blogFrontmatters,
    [blogFrontmatters, selectedTag],
  );

  const searchedBlogs = useMemo(
    () => searchBlogs(filteredBlogs, searchQuery, (b) => b.tags ?? []),
    [filteredBlogs, searchQuery],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(searchedBlogs.length / BLOGS_PER_PAGE),
  );
  const currentPage = parsePageParam(rawPage, totalPages);
  const paginatedBlogs = paginateItems(
    searchedBlogs,
    currentPage,
    BLOGS_PER_PAGE,
  );
  const hasResults = paginatedBlogs.totalItems > 0;

  const blogListQuery = {
    tag: selectedTag,
    q: searchQuery,
    page: currentPage > 1 ? currentPage : null,
  };

  return (
    <>
      <section aria-label="Blog posts list" className="space-y-3.5">
        <SearchInput
          basePath="/blog"
          currentValue={searchQuery}
          placeholder="Search by title, tag, or description…"
          preserveParams={{ tag: selectedTag }}
        />

        <FilterChipGroup
          title="Filter by tag"
          basePath="/blog"
          paramName="tag"
          selectedValue={selectedTag}
          options={tagOptions.map((tag) => ({ label: tag, value: tag }))}
          preserveParams={{ q: searchQuery }}
          singleRowScrollable
        />

        <div className="flex items-center pt-1">
          <p className="text-xs tracking-wide text-muted-foreground sm:text-sm">
            <span className="font-semibold text-secondary-foreground">
              {searchedBlogs.length}
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
              {paginatedBlogs.items.map((blog) => (
                <li key={blog.slug} className="w-full">
                  <Link
                    href={buildQueryHref("/blog", {
                      ...blogListQuery,
                      blog: blog.slug,
                    })}
                    className={cn(
                      "group block w-full transition-transform duration-300 outline-none",
                      "focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary focus-visible:outline-none",
                    )}
                  >
                    <BlogPostCard
                      blog={blog}
                      publishedDate={formatPublishedDate(blog.date)}
                      readingTime={blog.readingTime}
                      tags={blog.tags ?? []}
                    />
                  </Link>
                </li>
              ))}
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

      <BlogModalHandler blogsMap={renderedBlogs} />
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
    <article className="flex w-full flex-col gap-4 rounded-xl border border-border/65 bg-card p-4 shadow-card transition-all duration-300 sm:flex-row sm:items-start sm:gap-5 sm:p-5 pointer-fine:group-hover:shadow-card-hover">
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
          <ChipOverflowRow
            items={tags}
            className="pt-1"
            chipClassName="rounded-full bg-tertiary/80 px-2.5 py-1 text-xs font-medium text-tertiary-foreground"
            moreClassName="rounded-full bg-tertiary/80 px-2.5 py-1 text-xs font-medium text-muted-foreground"
          />
        ) : null}
      </div>
    </article>
  );
}
