import { Skill } from "@/components/ui/skill";

const BUILT_WITH = ["Figma", "Next.js", "Tailwind", "Contentful", "GraphQL"];

export function Footer() {
  return (
    <footer className="px-4 pb-12 pt-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8  pt-6 text-(--color-text-secondary) md:flex-row md:items-center">
        {/* Left copy */}
        <div className="space-y-1 text-sm">
          <p className="font-semibold">Designed and Developed by</p>
          <p>Rio Edwards</p>
          <p>©2024</p>
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
      </div>
    </footer>
  );
}
