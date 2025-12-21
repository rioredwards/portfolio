import { cn } from "@/lib/utils";

type Orientation = "left" | "right";
type Height = "short" | "tall";

interface SectionBreakProps {
  orientation?: Orientation;
  height?: Height;
  children?: React.ReactNode;
}

export function SectionBreak({
  orientation = "left",
  height = "tall",
  children,
}: SectionBreakProps) {
  const isLeft = orientation === "left";
  const isTall = height === "tall";

  // Triangle SVG path for the cutout effect
  const trianglePath = "M280 280H0C154.64 280 280 154.64 280 0V280Z";

  // Size variations based on height prop
  const triangleHeight = isTall ? "h-8" : "h-6";
  const textSizeClass = isTall
    ? "text-section-break-tall"
    : "text-section-break-short";
  const padding = isTall ? "p-6" : "p-3";

  return (
    <div className="relative w-full">
      {/* Upper triangle */}
      <svg
        className={cn(
          "fill-secondary block w-auto",
          triangleHeight,
          isLeft ? "ml-auto" : "mr-auto rotate-90",
        )}
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={trianglePath} />
      </svg>

      {/* Main rectangle with text */}
      <div
        className={cn(
          "bg-secondary",
          isLeft
            ? "rounded-tl-4xl rounded-br-4xl"
            : "rounded-tr-4xl rounded-bl-4xl",
          padding,
        )}
      >
        {children && (
          <h2 className={cn("text-section-break m-0 p-4", textSizeClass)}>
            {children}
          </h2>
        )}
      </div>

      {/* Lower triangle */}
      <svg
        className={cn(
          "fill-secondary block w-auto",
          triangleHeight,
          isLeft ? "mr-auto rotate-180" : "ml-auto rotate-270",
        )}
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={trianglePath} />
      </svg>
    </div>
  );
}
