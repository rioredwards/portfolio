import { MAX_CHIPS_ON_CARD } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface ChipOverflowRowProps {
  items: string[];
  maxVisible?: number;
  chipClassName: string;
  moreClassName: string;
  /** Tailwind gap between chips, e.g. `gap-1.5` or `gap-2` */
  gapClassName?: string;
  className?: string;
}

/**
 * Renders up to `maxVisible` string chips, then a “+N” chip when there are more
 * (N = number of items not shown).
 */
export function ChipOverflowRow({
  items,
  maxVisible = MAX_CHIPS_ON_CARD,
  chipClassName,
  moreClassName,
  gapClassName = "gap-1.5",
  className,
}: ChipOverflowRowProps) {
  if (items.length === 0) {
    return null;
  }

  const visible = items.slice(0, maxVisible);
  const overflowCount = items.length - maxVisible;

  return (
    <div className={cn("flex flex-wrap", gapClassName, className)}>
      {visible.map((item, i) => (
        <span key={`${item}-${i}`} className={chipClassName}>
          {item}
        </span>
      ))}
      {overflowCount > 0 ? (
        <span
          className={moreClassName}
          title={`${overflowCount} more not shown on card`}
        >
          +{overflowCount}
        </span>
      ) : null}
    </div>
  );
}
