import { FilterChipGroup } from "@/components/filter-chip-group";
import { SectionContentWrapper } from "@/components/layout";
import { ListPageHeader } from "@/components/list-page-header";
import { PaginationNav } from "@/components/pagination-nav";
import { SearchInput } from "@/components/search-input";
import { SortSelect } from "@/components/sort-select";
import { ViewModeToggle } from "@/components/view-mode-toggle";
import { paginateItems, parsePageParam } from "@/lib/pagination";
import { getAllProjectCards, type ProjectCard } from "@/lib/projects";
import { readSingleParam } from "@/lib/query-params";
import { searchProjects } from "@/lib/search";
import { sortProjects, WORK_SORT_OPTIONS } from "@/lib/sorting";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const workIndexDescription =
  "Browse all of Rio Edwards' software projects, case studies, and shipped product work.";

export const metadata: Metadata = {
  title: "Work",
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
    sort?: string | string[];
    view?: string | string[];
  }>;
}

export default async function WorkIndexPage({
  searchParams,
}: WorkIndexPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = readSingleParam(resolvedSearchParams?.category);
  const searchQuery = readSingleParam(resolvedSearchParams?.q);
  const requestedSort = readSingleParam(resolvedSearchParams?.sort);
  const requestedView = readSingleParam(resolvedSearchParams?.view);

  const selectedSort = WORK_SORT_OPTIONS.some(
    (option) => option.value === requestedSort,
  )
    ? requestedSort
    : "recent";
  const selectedView = requestedView === "list" ? "list" : "grid";
  const sortParam = selectedSort === "recent" ? null : selectedSort;
  const viewParam = selectedView === "grid" ? null : selectedView;

  const projects = getAllProjectCards();
  const categories = [
    ...new Set(projects.map((project) => project.category)),
  ].sort((a, b) => a.localeCompare(b));
  const filteredProjects = selectedCategory
    ? projects.filter((project) => project.category === selectedCategory)
    : projects;
  const searchedProjects = searchProjects(filteredProjects, searchQuery);
  const sortedProjects = sortProjects(searchedProjects, selectedSort);
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
  const hasResults = paginatedProjects.totalItems > 0;

  return (
    <main id="main-content" className="relative min-h-screen bg-secondary">
      <SectionContentWrapper className="relative mt-[8rem] pt-4 pb-12 md:pt-5 md:pb-16">
        <ListPageHeader
          title="Work"
          subtitle="Products, experiments, and shipped systems."
        />

        <section aria-label="Projects list" className="space-y-3.5">
          <SearchInput
            basePath="/work"
            currentValue={searchQuery}
            placeholder="Search projects..."
            preserveParams={{
              category: selectedCategory,
              sort: sortParam,
              view: viewParam,
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
            preserveParams={{
              q: searchQuery,
              sort: sortParam,
              view: viewParam,
            }}
            singleRowScrollable
          />

          <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs tracking-wide text-muted-foreground sm:text-sm">
              <span className="font-semibold text-secondary-foreground">
                {sortedProjects.length}
              </span>{" "}
              projects
            </p>
            <div className="flex items-center gap-2">
              <SortSelect
                basePath="/work"
                currentValue={selectedSort}
                options={WORK_SORT_OPTIONS}
                preserveParams={{
                  category: selectedCategory,
                  q: searchQuery,
                  view: viewParam,
                }}
              />
              <ViewModeToggle
                basePath="/work"
                currentValue={selectedView}
                preserveParams={{
                  category: selectedCategory,
                  q: searchQuery,
                  sort: sortParam,
                }}
              />
            </div>
          </div>

          {!hasResults ? (
            <div className="rounded-2xl border border-border/60 bg-card/45 px-5 py-8 text-secondary-foreground">
              {searchQuery
                ? "Try a different keyword or clear filters."
                : "Try a different category."}
            </div>
          ) : null}

          {hasResults ? (
            <>
              <ol
                className={cn(
                  "m-0 list-none p-0 [&>li]:w-full [&>li]:max-w-none",
                  selectedView === "grid"
                    ? "grid gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-3 pt-5",
                )}
              >
                {paginatedProjects.items.map((project, index) => (
                  <li
                    key={project.slug}
                    className={cn(
                      "w-full",
                      selectedView === "grid" && "h-full",
                    )}
                  >
                    <Link
                      href={`/work/${project.slug}`}
                      className={cn(
                        "group block w-full transition-transform duration-300 outline-none",
                        "focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary focus-visible:outline-none",
                        selectedView === "grid" && "h-full",
                      )}
                    >
                      {selectedView === "grid" ? (
                        <CompactProjectCard
                          project={project}
                          priority={index < 3}
                        />
                      ) : (
                        <ListProjectCard
                          project={project}
                          priority={index < 2}
                        />
                      )}
                    </Link>
                  </li>
                ))}
              </ol>

              <div className="pt-6">
                <PaginationNav
                  basePath="/work"
                  currentPage={paginatedProjects.currentPage}
                  totalPages={paginatedProjects.totalPages}
                  query={{
                    category: selectedCategory,
                    q: searchQuery,
                    sort: sortParam,
                    view: viewParam,
                  }}
                />
              </div>
              <p className="pt-2 text-sm text-muted-foreground">
                {`Showing ${paginatedProjects.startIndex + 1}-${paginatedProjects.endIndex} of ${paginatedProjects.totalItems}`}
              </p>
            </>
          ) : null}
        </section>
      </SectionContentWrapper>
    </main>
  );
}

function CompactProjectCard({
  project,
  priority,
}: {
  project: ProjectCard;
  priority?: boolean;
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border/65 bg-card shadow-card transition-all duration-300 pointer-fine:group-hover:-translate-y-1 pointer-fine:group-hover:shadow-card-hover">
      <div
        className="relative aspect-video overflow-hidden"
        style={{ backgroundColor: project.brandColor }}
      >
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          priority={priority}
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-background/88 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h2 className="font-mazaeni text-2xl leading-none text-foreground transition-colors duration-300 group-hover:text-primary-hover">
          {project.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-secondary-foreground">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.skills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-tertiary/80 px-2.5 py-1 text-xs font-medium text-tertiary-foreground"
            >
              {skill}
            </span>
          ))}
          {project.skills.length > 3 ? (
            <span className="rounded-full bg-tertiary/80 px-2.5 py-1 text-xs font-medium text-muted-foreground">
              +{project.skills.length - 3}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ListProjectCard({
  project,
  priority,
}: {
  project: ProjectCard;
  priority?: boolean;
}) {
  return (
    <article className="flex w-full flex-col gap-4 rounded-2xl border border-border/65 bg-card p-3 shadow-card transition-all duration-300 sm:flex-row sm:items-center sm:gap-5 sm:p-4 pointer-fine:group-hover:shadow-card-hover">
      <div
        className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl sm:w-52"
        style={{ backgroundColor: project.brandColor }}
      >
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 640px) 100vw, 13rem"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          priority={priority}
        />
      </div>

      <div className="min-w-0 flex-1 space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/25 bg-tertiary/80 px-3 py-1 text-xs font-medium text-tertiary-foreground">
            {project.category}
          </span>
          <span className="text-xs text-muted-foreground">
            /work/{project.slug}
          </span>
        </div>
        <h2 className="truncate font-mazaeni text-2xl leading-none text-foreground transition-colors duration-300 group-hover:text-primary-hover">
          {project.title}
        </h2>
        <p className="line-clamp-2 text-sm leading-relaxed text-secondary-foreground">
          {project.description}
        </p>
        <div className="hidden flex-wrap gap-1.5 sm:flex">
          {project.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-tertiary/80 px-2.5 py-1 text-xs font-medium text-tertiary-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
