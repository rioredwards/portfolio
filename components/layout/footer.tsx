import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

const BUILT_WITH = ["Next.js", "TypeScript", "Tailwind", "Shadcn/UI", "MDX"];

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-content-max-w flex-col items-start justify-between gap-8 px-content-px py-content-py text-secondary-foreground md:flex-row md:items-center md:px-content-px-md">
      {/* Left copy */}
      <div className="space-y-1 text-sm">
        <p className="font-semibold">Designed and Developed by</p>
        <p>Rio Edwards</p>
        <p>©{new Date().getFullYear()}</p>
      </div>

      {/* Right built-with pills */}
      <div className="flex flex-col items-start gap-3 md:items-end">
        <p className="text-sm font-semibold">Built With</p>
        <div className="flex flex-wrap gap-4">
          {BUILT_WITH.map((tool, idx) => (
            <Fragment key={idx}>
              <span
                className={cn("text-foreground", "rounded-full py-1 text-sm")}
              >
                {/* seprated by a circle */}
                {tool}
              </span>
              {idx < BUILT_WITH.length - 1 && (
                <span className="text-muted-foreground/40">/</span>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
