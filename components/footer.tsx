import { Skill } from "@/components/ui/skill";

const BUILT_WITH = ["Next.js", "Tailwind", "Shadcn/UI", "TypeScript"];

export function Footer() {

  return (
    <footer className="text-secondary-foreground max-w-content-max-w px-content-px md:px-content-px-md py-content-py mx-auto flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
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
  );
}
