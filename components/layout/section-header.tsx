import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn("p-10", className)}>
      <div className="flex flex-col items-center gap-3">
        <h2
          className="m-0 text-center text-6xl font-black text-foreground"
          style={{ fontFamily: "var(--font-mazaeni), serif" }}
        >
          {title}
        </h2>
        <div
          className="h-1 w-12 rounded-full bg-primary/30"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
