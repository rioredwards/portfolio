"use client";

import { buildQueryHref, type QueryValue } from "@/lib/query-params";
import type { SortOption } from "@/lib/sorting";
import { useRouter } from "next/navigation";

interface SortSelectProps {
  basePath: string;
  currentValue?: string;
  options: SortOption[];
  preserveParams: Record<string, QueryValue>;
}

export function SortSelect({
  basePath,
  currentValue,
  options,
  preserveParams,
}: SortSelectProps) {
  const router = useRouter();

  return (
    <label className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
      <span className="sr-only">Sort projects</span>
      <select
        value={currentValue ?? "recent"}
        onChange={(e) => {
          const value = e.target.value;
          router.push(
            buildQueryHref(basePath, {
              ...preserveParams,
              sort: value === "recent" ? null : value,
              page: null,
            }),
          );
        }}
        className="h-9 cursor-pointer rounded-full border border-border/60 bg-background/80 px-3.5 text-xs font-semibold text-secondary-foreground transition-all duration-200 hover:border-primary/30 hover:text-foreground focus:border-primary focus-visible:ring-4 focus-visible:ring-ring/25 focus-visible:outline-none sm:text-sm"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
