"use client";

import { buildQueryHref, type QueryValue } from "@/lib/query-params";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ViewModeToggleProps {
  basePath: string;
  currentValue?: "grid" | "list";
  preserveParams: Record<string, QueryValue>;
}

export function ViewModeToggle({
  basePath,
  currentValue,
  preserveParams,
}: ViewModeToggleProps) {
  const router = useRouter();
  const selectedView = currentValue === "list" ? "list" : "grid";

  function navigate(view: "grid" | "list") {
    router.push(
      buildQueryHref(basePath, {
        ...preserveParams,
        view: view === "grid" ? null : view,
        page: null,
      }),
    );
  }

  return (
    <div
      className="inline-flex h-9 items-center rounded-full border border-border/60 bg-background/80 p-0.5"
      role="tablist"
      aria-label="Choose project view"
    >
      <button
        type="button"
        role="tab"
        aria-selected={selectedView === "grid"}
        onClick={() => navigate("grid")}
        className={cn(
          "h-full cursor-pointer rounded-full px-3.5 text-xs font-semibold transition-colors",
          selectedView === "grid"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Grid
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={selectedView === "list"}
        onClick={() => navigate("list")}
        className={cn(
          "h-full cursor-pointer rounded-full px-3.5 text-xs font-semibold transition-colors",
          selectedView === "list"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        List
      </button>
    </div>
  );
}
