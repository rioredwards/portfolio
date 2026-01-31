import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContentProseProps {
  children: ReactNode;
  includeTableStyles?: boolean;
  className?: string;
}

/**
 * Shared prose styling for MDX content in project and blog detail views.
 * Includes optional table styles for blog content.
 */
export function ContentProse({
  children,
  includeTableStyles = false,
  className,
}: ContentProseProps) {
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        "prose-headings:font-[var(--font-mazaeni),serif]",
        "prose-p:text-foreground prose-strong:text-foreground",
        "prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground",
        "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        "prose-img:rounded-xl prose-img:my-6",
        "prose-pre:bg-secondary prose-pre:text-foreground",
        "prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded",
        includeTableStyles && [
          "prose-table:text-foreground",
          "prose-th:bg-secondary prose-th:px-4 prose-th:py-2",
          "prose-td:px-4 prose-td:py-2",
        ],
        className,
      )}
    >
      {children}
    </div>
  );
}
