"use client";

import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
      <span className="relative inline-flex">
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
          className="h-9 max-w-full min-w-0 cursor-pointer appearance-none rounded-full border border-border/60 bg-background/80 pr-10 pl-3.5 text-xs font-semibold text-secondary-foreground transition-all duration-200 hover:border-primary/30 hover:text-foreground focus:border-primary focus-visible:ring-4 focus-visible:ring-ring/25 focus-visible:outline-none sm:text-sm"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <HugeiconsIcon
          icon={ArrowDown01Icon}
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 shrink-0 -translate-y-1/2 text-secondary-foreground"
          aria-hidden
        />
      </span>
    </label>
  );
}
