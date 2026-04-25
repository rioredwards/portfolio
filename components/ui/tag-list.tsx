import { cn } from "@/lib/utils";

interface TagListProps {
  items: string[];
  dataTestId?: string;
  className?: string;
}

/**
 * Renders a list of items with "/" between them. The slash uses horizontal
 * padding so spacing is even on both sides. Each item+slash is one flex child
 * so lines wrap only between whole units, never a lone "/".
 */
export function TagList({ items, dataTestId, className }: TagListProps) {
  if (!items?.length) return null;

  return (
    <div
      className={cn(
        "flex w-full min-w-0 flex-wrap items-baseline gap-y-1.5 text-sm leading-relaxed text-foreground",
        className,
      )}
    >
      {items.map((item, idx) => (
        <span
          key={idx}
          className="inline-flex max-w-full min-w-0 flex-nowrap items-baseline"
        >
          <span className="rounded-full py-1" data-testid={dataTestId}>
            {item}
          </span>
          {idx < items.length - 1 ? (
            <span
              className="shrink-0 px-2.5 text-muted-foreground/45 select-none sm:px-3"
              aria-hidden="true"
            >
              /
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}
