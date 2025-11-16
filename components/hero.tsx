import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export function Hero({ title, subtitle, description, actions, className }: HeroProps) {
  return (
    <section
      className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {subtitle && (
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-gray-600">
          {subtitle}
        </p>
      )}
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {description && (
        <p className="mb-8 max-w-2xl text-lg text-gray-600 sm:text-xl">{description}</p>
      )}
      {actions && <div className="flex flex-wrap items-center justify-center gap-4">{actions}</div>}
    </section>
  );
}
