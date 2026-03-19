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
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border/70 bg-background/85 py-3 pr-10 pl-10 text-sm font-medium text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] transition-all duration-300 placeholder:text-muted-foreground hover:border-primary/35 hover:bg-background focus:border-primary focus:outline-none focus-visible:ring-4 focus-visible:ring-ring/25"
      />
      {value ? (
        <button
          type="button"
          onClick={handleClear}
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Clear search"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={16} strokeWidth={2} />
        </button>
      ) : null}
    </div>
  );
}
