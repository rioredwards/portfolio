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
      tall: "h-(--radius-5xl) -top-(--radius-5xl)",
      short: "h-(--radius-4xl) -top-(--radius-4xl)",
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
  // If no previous panel is specified, use 0
  const topMargin =
    previousDecorationHeight !== null
      ? previousIsTall
        ? "-mt-panel-tall-extended-padding-height"
        : "-mt-panel-short-extended-padding-height"
      : "mt-0";

  const bottomPadding = isTall
    ? "pb-panel-tall-extended-padding-height"
    : "pb-panel-short-extended-padding-height";

  return (
    <div className={cn("fade-in-scroll relative", topMargin, className)}>
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
              ? "rounded-tl-5xl" // left tall panel
              : "rounded-tl-4xl" // left short panel
            : isTall
              ? "rounded-tr-5xl" // right tall panel
              : "rounded-tr-4xl", // right short panel
          bottomPadding,
        )}
      >
        {children ? children : <div className="min-h-14" />}
      </div>
    </div>
  );
}
