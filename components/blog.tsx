import type { ReactNode } from "react";

interface BlogProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function Blog({ title, description, icon }: BlogProps) {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 rounded-[3rem] bg-secondary px-8 py-10 lg:px-14 lg:py-12">
        {/* Text content */}
        <div>
          <h2
            className="mb-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl"
            style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
            {title}
          </h2>
          <p className="text-lg font-medium text-secondary-foreground">{description}</p>
        </div>

        {/* Icon bubble */}
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-background">
          <div className="text-foreground">{icon}</div>
        </div>
      </div>
    </section>
  );
}
