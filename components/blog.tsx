import type { ReactNode } from "react";

interface BlogProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function Blog({ title, description, icon }: BlogProps) {
  return (
    <div className="bg-secondary fade-in flex items-center justify-between gap-8 rounded-(--radius-card) px-(--spacing-article-padding-x) py-(--spacing-article-padding-y)">
      {/* Text content */}
      <div>
        <h3 className="mb-3">{title}</h3>
        <p>{description}</p>
      </div>

      {/* Icon bubble */}
      <div className="bg-background flex h-24 w-24 shrink-0 items-center justify-center rounded-full">
        <div className="text-foreground">{icon}</div>
      </div>
    </div>
  );
}
