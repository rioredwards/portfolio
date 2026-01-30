import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <div className={cn("p-10", className)}>
      <h2
        className="m-0 text-center text-6xl font-black text-foreground"
        style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
      >
        {title}
      </h2>
    </div>
  );
}
