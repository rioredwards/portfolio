import { cn } from "@/lib/utils";

export function SectionContentWrapper({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-content-max-w px-content-px py-content-py md:px-content-px-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
