import type { ReactNode } from "react";

interface BlogProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function Blog({ title, description, icon }: BlogProps) {
  return (
    <div className="bg-secondary fade-in flex items-center justify-between gap-8 rounded-[3rem] px-8 py-10 lg:px-14 lg:py-12">
      {/* Text content */}
      <div>
        <h2 className="text-section-heading mb-3">{title}</h2>
        <p className="text-body-large font-medium">{description}</p>
      </div>

      {/* Icon bubble */}
      <div className="bg-background flex h-24 w-24 shrink-0 items-center justify-center rounded-full">
        <div className="text-foreground">{icon}</div>
      </div>
    </div>
  );
}
