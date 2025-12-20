import { cn } from "../lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn("p-8", className)}>
      <h2 style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>{title}</h2>
    </div>
  );
}
