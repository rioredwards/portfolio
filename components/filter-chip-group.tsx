import { buildQueryHref, type QueryValue } from "@/lib/query-params";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterChipGroupProps {
  title: string;
  basePath: string;
  paramName: string;
  selectedValue?: string;
  options: FilterOption[];
  preserveParams?: Record<string, QueryValue>;
}

export function FilterChipGroup({
  title,
  basePath,
  paramName,
  selectedValue,
  options,
  preserveParams,
}: FilterChipGroupProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        <Link
          href={buildQueryHref(basePath, { ...preserveParams, [paramName]: null, page: null })}
          aria-current={!selectedValue ? "true" : undefined}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            !selectedValue
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border/70 bg-background hover:border-background-hover-border hover:bg-secondary",
          )}
        >
          All
        </Link>
        {options.map((option) => {
          const isSelected = option.value === selectedValue;

          return (
            <Link
              key={option.value}
              href={buildQueryHref(basePath, {
                ...preserveParams,
                [paramName]: option.value,
                page: null,
              })}
              aria-current={isSelected ? "true" : undefined}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/70 bg-background hover:border-background-hover-border hover:bg-secondary",
              )}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
