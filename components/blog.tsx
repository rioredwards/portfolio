import type { ReactNode } from "react";

interface BlogProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function Blog({ title, description, icon }: BlogProps) {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 rounded-[3rem] bg-(--color-bg-secondary) px-8 py-10 shadow-md lg:px-14 lg:py-12">
        {/* Text content */}
        <div>
          <h2
            className="mb-3 text-3xl font-bold leading-tight text-(--color-text-secondary) sm:text-4xl"
            style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
            {title}
          </h2>
          <p className="text-lg font-medium text-(--color-text-secondary)">{description}</p>
        </div>

        {/* Icon bubble */}
        <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-(--color-bg-primary)">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--color-text-secondary)">
            <div className="text-(--color-bg-primary)">{icon}</div>
          </div>
        </div>
      </div>
    </section>
  );
}


