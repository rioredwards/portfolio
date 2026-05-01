import { Fragment } from "react/jsx-runtime";

const BUILT_WITH = ["Next.js", "TypeScript", "Tailwind", "Shadcn/UI", "MDX"];

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-content-max-w flex-col items-start justify-between gap-10 px-content-px py-content-py text-secondary-foreground md:flex-row md:items-center md:px-content-px-md">
      {/* Left copy */}
      <div className="space-y-2 text-sm">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Designed & Developed by
        </p>
        <p
          className="text-xl font-bold text-foreground"
          style={{ fontFamily: "var(--font-mazaeni), serif" }}
        >
          Rio Edwards
        </p>
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} All rights reserved
        </p>
      </div>

      {/* Right built-with pills */}
      <div className="flex flex-col items-start gap-3 md:items-end">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Built With
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {BUILT_WITH.map((tool, idx) => (
            <Fragment key={idx}>
              <span className="rounded-full bg-tertiary/60 px-3 py-1 text-sm font-medium text-tertiary-foreground">
                {tool}
              </span>
              {idx < BUILT_WITH.length - 1 && (
                <span
                  className="h-1 w-1 rounded-full bg-border"
                  aria-hidden="true"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  );
}
