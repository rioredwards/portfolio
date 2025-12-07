import { cn } from "../lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn("p-8 pb-0", className)}>
      <h2
        className="text-foreground m-0 text-center text-6xl font-black"
        style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
      >
        {title}
      </h2>
    </div>
  );
}
