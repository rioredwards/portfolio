import { cn } from "@/lib/utils";
import type { Flatten } from "@/utils/typeUtils";
import { cva } from "class-variance-authority";

type Orientation = "left" | "right";
type DecorationHeight = "short" | "tall";
export interface SlidePanelProps {
  orientation?: Orientation;
  decorationHeight?: DecorationHeight;
  fill?: "background" | "secondary";
  children?: React.ReactNode;
  className?: string;
  previousDecorationHeight?: DecorationHeight | null;
}

type TriangleDecorationProps = Flatten<Omit<SlidePanelProps, "children">>;

const triangleHeightVariants = cva("block w-auto", {
  variants: {
    decorationHeight: {
      tall: "h-[var(--radius-panel-tall)] -top-[var(--radius-panel-tall)]",
      short: "h-[var(--radius-panel-short)] -top-[var(--radius-panel-short)]",
    },
    orientation: {
      left: "right-0",
      right: "left-0 rotate-90",
    },
    fill: {
      background: "fill-background",
      secondary: "fill-secondary",
    },
  },
});

// NOTE: to achieve the "wavy" top edge of the panel, we use a concave-triangle SVG on one top edge and a corner radius on the opposite edge.
export function TriangleDecoration({
  decorationHeight = "tall",
  fill = "background",
  className = "",
  orientation = "left",
  ...props
}: TriangleDecorationProps) {
  return (
    <svg
      className={cn(
        triangleHeightVariants({ decorationHeight, fill, orientation }),
        className,
      )}
      {...props}
      viewBox="0 0 280 280"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M280 280H0C154.64 280 280 154.64 280 0V280Z" />
    </svg>
  );
}

export function SlidePanel({
  orientation = "left",
  decorationHeight = "tall",
  fill = "background",
  children,
  className = "",
  previousDecorationHeight = null,
}: SlidePanelProps) {
  const isLeft = orientation === "left";
  const isTall = decorationHeight === "tall";
  const previousIsTall = previousDecorationHeight === "tall";

  // NOTE: The panels are positioned so that they overlap the previous section's decoration.
  // The top margin should match the previous panel's bottom padding (inversed).
  // If no previous panel is specified, use the current panel's decoration height.
  const topMargin =
    previousDecorationHeight !== null
      ? previousIsTall
        ? "-mt-[var(--panel-decoration-tall)]"
        : "-mt-[var(--panel-decoration-short)]"
      : isTall
        ? "-mt-[var(--panel-decoration-tall)]"
        : "-mt-[var(--panel-decoration-short)]";

  const bottomPadding = isTall
    ? "pb-[var(--panel-decoration-tall)]"
    : "pb-[var(--panel-decoration-short)]";

  return (
    <div className={cn("fade-in relative", topMargin, className)}>
      {/* Decoration */}
      <TriangleDecoration
        decorationHeight={decorationHeight}
        fill={fill}
        orientation={orientation}
        className="absolute"
      />

      {/* Main content */}
      <div
        className={cn(
          fill === "secondary" ? "bg-secondary" : "bg-background",
          isLeft
            ? isTall
              ? "rounded-tl-(--radius-panel-tall)" // left tall panel
              : "rounded-tl-(--radius-panel-short)" // left short panel
            : isTall
              ? "rounded-tr-(--radius-panel-tall)" // right tall panel
              : "rounded-tr-(--radius-panel-short)", // right short panel
          bottomPadding,
          "extended-padding min-h-14",
        )}
      >
        {children}
      </div>
    </div>
  );
}
