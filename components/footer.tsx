import { Skill } from "@/components/ui/skill";
import { SlidePanel } from "./slide-panel";

const BUILT_WITH = ["Next.js", "Tailwind", "Shadcn/UI", "TypeScript"];

export function Footer() {
  return (
    <SlidePanel orientation="left" decorationHeight="tall" fill="secondary">
      <footer className="text-secondary-foreground mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 pt-6 md:flex-row md:items-center">
        {/* Left copy */}
        <div className="space-y-1 text-sm">
          <p className="font-semibold">Designed and Developed by</p>
          <p>Rio Edwards</p>
          <p>©2025</p>
        </div>

        {/* Right built-with pills */}
        <div className="flex flex-col items-start gap-3 md:items-end">
          <p className="text-sm font-semibold">Built With</p>
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
