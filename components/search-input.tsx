"use client";

import { buildQueryHref, type QueryValue } from "@/lib/query-params";
import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface SearchInputProps {
  basePath: string;
  currentValue?: string;
  placeholder?: string;
  preserveParams: Record<string, QueryValue>;
}

const DEBOUNCE_MS = 300;

export function SearchInput({
  basePath,
  currentValue,
  placeholder = "Search...",
  preserveParams,
}: SearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState(currentValue ?? "");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  function navigate(q: string) {
    router.push(
      buildQueryHref(basePath, {
        ...preserveParams,
        q: q || null,
        page: null,
      }),
    );
  }

  function handleChange(newValue: string) {
    setValue(newValue);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => navigate(newValue), DEBOUNCE_MS);
  }

  function handleClear() {
    setValue("");
    if (timerRef.current) clearTimeout(timerRef.current);
    navigate("");
  }

  return (
    <div className="relative">
      <HugeiconsIcon
        icon={Search01Icon}
        size={16}
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground"
        strokeWidth={2}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-border/70 bg-background py-2 pr-10 pl-10 text-sm font-medium text-foreground transition-colors placeholder:text-muted-foreground hover:border-background-hover-border hover:bg-secondary focus:border-primary focus:outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Clear search"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2} />
        </button>
      ) : null}
    </div>
  );
}
