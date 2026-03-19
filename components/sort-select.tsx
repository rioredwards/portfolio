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
    <label className="flex items-center gap-2 text-sm text-muted-foreground">
      <span className="font-medium">Sort:</span>
      <select
        value={currentValue ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          router.push(
            buildQueryHref(basePath, {
              ...preserveParams,
              sort: value || null,
              page: null,
            }),
          );
        }}
        className="rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-background-hover-border hover:bg-secondary"
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
