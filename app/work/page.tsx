import { FilterChipGroup } from "@/components/filter-chip-group";
import { SectionContentWrapper } from "@/components/layout";
import { PaginationNav } from "@/components/pagination-nav";
import { SearchInput } from "@/components/search-input";
import { paginateItems, parsePageParam } from "@/lib/pagination";
import { getAllProjectCards } from "@/lib/projects";
import { readSingleParam } from "@/lib/query-params";
import { searchProjects } from "@/lib/search";
import { sortProjects } from "@/lib/sorting";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const workIndexDescription =
  "Browse all of Rio Edwards' software projects, case studies, and shipped product work.";

export const metadata: Metadata = {
  title: "Work | Rio Edwards",
  description: workIndexDescription,
  openGraph: {
    title: "Work | Rio Edwards",
    description: workIndexDescription,
    type: "website",
  },
};

const PROJECTS_PER_PAGE = 6;

interface WorkIndexPageProps {
  searchParams?: Promise<{
    page?: string | string[];
    category?: string | string[];
    q?: string | string[];
  }>;
}

export default async function WorkIndexPage({
  searchParams,
}: WorkIndexPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = readSingleParam(resolvedSearchParams?.category);
  const searchQuery = readSingleParam(resolvedSearchParams?.q);
  const projects = getAllProjectCards();
  const categories = [...new Set(projects.map((project) => project.category))];
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;
  const searchedProjects = searchProjects(filteredProjects, searchQuery);
  const sortedProjects = sortProjects(searchedProjects);
  const totalPages = Math.max(
    1,
    Math.ceil(sortedProjects.length / PROJECTS_PER_PAGE),
  );
  const currentPage = parsePageParam(resolvedSearchParams?.page, totalPages);
  const paginatedProjects = paginateItems(
    sortedProjects,
    currentPage,
    PROJECTS_PER_PAGE,
  );

  return (
    <main
      id="main-content"
      className="relative min-h-screen overflow-hidden bg-secondary"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 right-[8%] h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-[28rem] -left-24 h-72 w-72 rounded-full bg-tertiary/35 blur-3xl" />
      </div>

      <SectionContentWrapper className="relative space-y-10 pt-30 pb-16 md:space-y-12 md:pt-36">
        <header className="grid gap-8 pb-7 lg:grid-cols-[1fr] lg:items-end">
          <div className="space-y-5">
            <p className="text-xs font-semibold tracking-[0.26em] text-muted-foreground uppercase">
              Project Index
            </p>
            <h1 className="font-mazaeni text-5xl leading-none text-foreground sm:text-6xl md:text-7xl">
              Work
            </h1>
            <p className="max-w-prose-max text-lg leading-relaxed text-secondary-foreground sm:text-xl">
              A curated list of products, experiments, and client systems. Each
              entry links to a full breakdown.
            </p>
          </div>
        </header>

        <section aria-label="Projects list" className="space-y-8">
          <div className="sticky top-18 z-20 -mx-content-px bg-secondary/92 px-content-px pt-2 pb-5 backdrop-blur sm:-mx-content-px md:-mx-content-px-md md:px-content-px-md">
            <div className="space-y-4">
              <SearchInput
                basePath="/work"
                currentValue={searchQuery}
                placeholder="Search projects..."
                preserveParams={{
                  category: selectedCategory,
                }}
              />
              <FilterChipGroup
                title="Filter by category"
                basePath="/work"
                paramName="category"
                selectedValue={selectedCategory}
                options={categories.map((category) => ({
                  label: category,
                  value: category,
                }))}
                preserveParams={{ q: searchQuery }}
                singleRowScrollable
              />
            </div>
          </div>

          {paginatedProjects.totalItems === 0 ? (
            <div className="border-y border-border/60 py-10 text-secondary-foreground">
              {searchQuery
                ? "Try a different keyword or clear filters."
                : "Try a different category."}
            </div>
          ) : null}

          <ol className="m-0 list-none divide-y divide-border/55 border-y border-border/55 p-0 [&>li]:w-full [&>li]:max-w-none">
            {paginatedProjects.items.map((project, index) => {
              const isOdd = index % 2 === 1;

              return (
                <li key={project.slug} className="w-full">
                  <Link
                    href={`/work/${project.slug}`}
                    className={cn(
                      "group block py-8 transition-colors duration-300",
                      "focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary focus-visible:outline-none",
                    )}
                  >
                    <article
                      className={cn(
                        "grid items-center gap-8 lg:gap-12",
                        isOdd
                          ? "lg:grid-cols-[20rem_minmax(0,1fr)]"
                          : "lg:grid-cols-[minmax(0,1fr)_20rem]",
                      )}
                    >
                      <div className={cn("space-y-5", isOdd && "lg:order-2")}>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-primary/25 bg-tertiary/80 px-4 py-1.5 text-xs font-semibold tracking-[0.16em] text-tertiary-foreground uppercase">
                            {project.category}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            /work/{project.slug}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <h2 className="font-mazaeni text-3xl leading-tight text-foreground transition-colors duration-300 group-hover:text-primary-hover sm:text-4xl">
                            {project.title}
                          </h2>
                          <p className="max-w-prose-max text-base leading-relaxed text-secondary-foreground sm:text-lg">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {project.skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-border/70 bg-secondary/75 px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-foreground uppercase transition-transform duration-300 group-hover:translate-x-1">
                          View project
                          <span aria-hidden="true">→</span>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "relative h-56 overflow-hidden rounded-4xl border border-border/45 shadow-card",
                          isOdd && "lg:order-1",
                        )}
                      >
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: project.brandColor }}
                        />
                        <Image
                          src={project.image}
                          alt={`${project.title} preview`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 20rem"
                          className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                          priority={index < 2}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10" />
                      </div>
                    </article>
                  </Link>
                </li>
              );
            })}
          </ol>

          <PaginationNav
            basePath="/work"
            currentPage={paginatedProjects.currentPage}
            totalPages={paginatedProjects.totalPages}
            query={{
              category: selectedCategory,
              q: searchQuery,
            }}
          />
          <p className="pt-2 text-sm text-muted-foreground">
            {paginatedProjects.totalItems === 0
              ? searchQuery
                ? "No projects match your search"
                : "No projects match this filter"
              : `Showing ${paginatedProjects.startIndex + 1}-${paginatedProjects.endIndex} of ${paginatedProjects.totalItems}`}
          </p>
        </section>
      </SectionContentWrapper>
    </main>
  );
}
