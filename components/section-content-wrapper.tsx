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
        "max-w-content-max-width mx-auto px-(--content-padding-x-mobile) py-(--content-padding-y) md:px-(--content-padding-x-desktop)",
        className,
      )}
    >
      {children}
    </div>
  );
}
