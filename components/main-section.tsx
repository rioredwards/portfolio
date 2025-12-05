import { cn } from "@/lib/utils";

type Orientation = "left" | "right";
type Height = "short" | "tall";

interface MainSectionProps {
  id?: string;
  orientation?: Orientation;
  height?: Height;
  fill?: "background" | "secondary";
  children?: React.ReactNode;
  className?: string;
}

export function MainSection({
  id = "",
  orientation = "left",
  height = "tall",
  fill = "background",
  children,
  className,
}: MainSectionProps) {
  const isLeft = orientation === "left";
  const isTall = height === "tall";

  // Size variations based on height prop
  const triangleHeight = isTall ? "h-8" : "h-6";

  return (
    <section id={id} className={cn(className, "w-full")}>
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
          "min-h-small mx-auto max-w-6xl px-4 md:px-20",
          fill === "secondary" ? "bg-secondary" : "bg-background",
          isLeft ? "rounded-tl-4xl" : "rounded-tr-4xl",
        )}
      >
        {children}
      </div>
    </section>
  );
}
