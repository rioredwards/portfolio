import { cn } from "@/lib/utils";

type Orientation = "left" | "right";
type Height = "short" | "tall";

interface MainSectionProps {
  id?: string;
  orientation?: Orientation;
  height?: Height;
  fill?: "background" | "secondary";
  bottomPadding?: string;
  topMargin?: string;
  children?: React.ReactNode;
  className?: string;
}

export function MainSection({
  id = "",
  orientation = "left",
  height = "tall",
  fill = "background",
  bottomPadding,
  topMargin,
  children,
  className,
}: MainSectionProps) {
  const isLeft = orientation === "left";
  const isTall = height === "tall";

  // Size variations based on height prop
  const triangleHeight = isTall ? "h-8" : "h-6";

  return (
    <section id={id} className={cn("fade-in", topMargin)}>
      {/* Upper triangle */}
      <svg
        className={cn(
          "block w-auto",
          triangleHeight,
          isLeft ? "ml-auto" : "mr-auto rotate-90",
          fill === "secondary" ? "fill-secondary" : "fill-background",
        )}
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M280 280H0C154.64 280 280 154.64 280 0V280Z" />
      </svg>

      {/* Main content */}
      <div
        className={cn(
          fill === "secondary" ? "bg-secondary" : "bg-background",
          isLeft ? "rounded-tl-4xl" : "rounded-tr-4xl",
        )}
      >
        <div
          className={cn("mx-auto max-w-6xl md:px-20", bottomPadding, className)}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
