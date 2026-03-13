import { cn } from "@/lib/utils";
import Link from "next/link";

interface PaginationNavProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
}

function buildPageHref(basePath: string, page: number) {
  if (page <= 1) {
    return basePath;
  }

  return `${basePath}?page=${page}`;
}

export function PaginationNav({
  basePath,
  currentPage,
  totalPages,
}: PaginationNavProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center gap-4 pt-4 sm:flex-row sm:justify-between"
    >
      <div className="flex items-center gap-3 self-start sm:self-auto">
        <Link
          href={buildPageHref(basePath, currentPage - 1)}
          aria-disabled={currentPage === 1}
          className={cn(
            "rounded-full border border-border/70 bg-background px-5 py-2 text-sm font-semibold uppercase transition-colors",
            currentPage === 1
              ? "pointer-events-none opacity-40"
              : "hover:border-background-hover-border hover:bg-secondary",
          )}
        >
          Previous
        </Link>
        <Link
          href={buildPageHref(basePath, currentPage + 1)}
          aria-disabled={currentPage === totalPages}
          className={cn(
            "rounded-full border border-border/70 bg-background px-5 py-2 text-sm font-semibold uppercase transition-colors",
            currentPage === totalPages
              ? "pointer-events-none opacity-40"
              : "hover:border-background-hover-border hover:bg-secondary",
          )}
        >
          Next
        </Link>
      </div>

      <div className="flex flex-wrap justify-start gap-2 sm:justify-end">
        {pageNumbers.map((pageNumber) => {
          const isCurrentPage = pageNumber === currentPage;

          return (
            <Link
              key={pageNumber}
              href={buildPageHref(basePath, pageNumber)}
              aria-current={isCurrentPage ? "page" : undefined}
              className={cn(
                "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-semibold transition-colors",
                isCurrentPage
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/70 bg-background hover:border-background-hover-border hover:bg-secondary",
              )}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
