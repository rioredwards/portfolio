import { Skill } from "@/components/ui/skill";
import { SlidePanel } from "./slide-panel";

const BUILT_WITH = ["Figma", "Next.js", "Tailwind", "Contentful", "GraphQL"];

export function Footer() {
  return (
    <SlidePanel orientation="left" decorationHeight="tall" fill="secondary">
      <footer className="text-secondary-foreground mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 pt-6 md:flex-row md:items-center">
        {/* Left copy */}
        <div className="space-y-1">
          <p
            className="text-body font-semibold"
            style={{ fontSize: "var(--font-size-sm)" }}
          >
            Designed and Developed by
          </p>
          <p className="text-body" style={{ fontSize: "var(--font-size-sm)" }}>
            Rio Edwards
          </p>
          <p className="text-body" style={{ fontSize: "var(--font-size-sm)" }}>
            ©2024
          </p>
        </div>

        {/* Right built-with pills */}
        <div className="flex flex-col items-start gap-3 md:items-end">
          <p
            className="text-body font-semibold"
            style={{ fontSize: "var(--font-size-sm)" }}
          >
            Built With
          </p>
          <div className="flex flex-wrap gap-4">
            {BUILT_WITH.map((tool) => (
              <Skill key={tool} text={tool} variant="outline" size="sm" />
            ))}
          </div>
        </div>
      </footer>
    </SlidePanel>
  );
}
