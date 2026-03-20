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
        className="h-11 rounded-full border border-border/70 bg-background/90 px-4 text-sm font-semibold text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-300 hover:border-primary/35 focus:border-primary focus-visible:ring-4 focus-visible:ring-ring/25 focus-visible:outline-none"
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
