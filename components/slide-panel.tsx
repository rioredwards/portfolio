import { cn } from "@/lib/utils";
import type { Flatten } from "@/utils/typeUtils";
import { cva } from "class-variance-authority";

type Orientation = "left" | "right";
type DecorationHeight = "short" | "tall";
interface SlidePanelProps {
  orientation?: Orientation;
  decorationHeight?: DecorationHeight;
  fill?: "background" | "secondary";
  children?: React.ReactNode;
  className?: string;
}

type TriangleDecorationProps = Flatten<Omit<SlidePanelProps, "children">>;

const triangleHeightVariants = cva("block w-auto", {
  variants: {
    decorationHeight: {
      tall: "h-8 -top-8",
      short: "h-6 -top-6",
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
}: SlidePanelProps) {
  const isLeft = orientation === "left";
  const isTall = decorationHeight === "tall";

  // NOTE: The panels are positioned so that they overlap the previous section's decoration.
  const topMargin = isTall ? "-mt-8" : "-mt-6";
  const bottomPadding = isTall ? "pb-8" : "pb-6";

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
          isLeft ? "rounded-tl-4xl" : "rounded-tr-4xl",
          bottomPadding,
          "extended-padding",
        )}
      >
        {children}
      </div>
    </div>
  );
}
