import { buildQueryHref, type QueryValue } from "@/lib/query-params";
import { cn } from "@/lib/utils";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

interface PaginationNavProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  query?: Record<string, QueryValue>;
}

function buildPageHref(
  basePath: string,
  page: number,
  query?: Record<string, QueryValue>,
) {
  return buildQueryHref(basePath, {
    ...query,
    page: page <= 1 ? null : page,
  });
}

export function PaginationNav({
  basePath,
  currentPage,
  totalPages,
  query,
}: PaginationNavProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  );

  return (
    <nav aria-label="Pagination" className="pt-4">
      <div className="mx-auto grid w-full max-w-md grid-cols-[auto_1fr_auto] items-center gap-3">
        <Link
          href={buildPageHref(basePath, currentPage - 1, query)}
          aria-disabled={currentPage === 1}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/85 transition-all duration-300",
            currentPage === 1
              ? "pointer-events-none opacity-40"
              : "hover:-translate-y-0.5 hover:border-primary/35 hover:bg-secondary",
          )}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={2} />
          <span className="sr-only">Previous page</span>
        </Link>

        <div className="flex flex-wrap justify-center gap-2">
          {pageNumbers.map((pageNumber) => {
            const isCurrentPage = pageNumber === currentPage;

            return (
              <Link
                key={pageNumber}
                href={buildPageHref(basePath, pageNumber, query)}
                aria-current={isCurrentPage ? "page" : undefined}
                className={cn(
                  "flex h-11 min-w-11 items-center justify-center rounded-full border px-3 text-base font-semibold transition-all duration-300",
                  isCurrentPage
                    ? "border-primary bg-primary text-primary-foreground shadow-card"
                    : "border-border/70 bg-background/85 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-secondary",
                )}
              >
                {pageNumber}
              </Link>
            );
          })}
        </div>

        <Link
          href={buildPageHref(basePath, currentPage + 1, query)}
          aria-disabled={currentPage === totalPages}
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/85 transition-all duration-300",
            currentPage === totalPages
              ? "pointer-events-none opacity-40"
              : "hover:-translate-y-0.5 hover:border-primary/35 hover:bg-secondary",
          )}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2} />
          <span className="sr-only">Next page</span>
        </Link>
      </div>
    </nav>
  );
}
