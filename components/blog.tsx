import type { ReactNode } from "react";

export interface Blog {
  title: string;
  description: string;
  icon: ReactNode;
}

export function Blog({ title, description, icon }: Blog) {
  return (
    <div className="bg-secondary fade-in rounded-card flex items-center justify-between gap-8 px-8 py-10 lg:px-14 lg:py-12">
      {/* Text content */}
      <div>
        <h2
          className="text-foreground mb-3 text-3xl leading-tight font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
        >
          {title}
        </h2>
        <p className="text-secondary-foreground text-lg font-medium">
          {description}
        </p>
      </div>

      {/* Icon bubble */}
      <div className="bg-background flex h-24 w-24 shrink-0 items-center justify-center rounded-full">
        <div className="text-foreground">{icon}</div>
      </div>
    </div>
  );
}
