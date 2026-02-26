import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

interface TagListProps {
  items: string[];
  dataTestId?: string;
  className?: string;
}

/** Renders a list of items separated by "/". */
export function TagList({ items, dataTestId, className }: TagListProps) {
  if (!items?.length) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map((item, idx) => (
        <Fragment key={idx}>
          <span
            className={cn("text-foreground", "rounded-full py-1 text-sm")}
            data-testid={dataTestId}
          >
            {item}
          </span>
          {idx < items.length - 1 && (
            <span className="text-muted-foreground/40">/</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
