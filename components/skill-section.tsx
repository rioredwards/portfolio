import { Skill } from "@/components/ui/skill";
import type { ReactNode } from "react";

interface SkillSectionProps {
  category: string;
  skills: string[];
  icon: ReactNode;
}

export function SkillSection({ category, skills, icon }: SkillSectionProps) {
  return (
    <div className="rounded-(--radius-card) px-(--spacing-article-padding-x) py-(--spacing-article-padding-y)">
      <div className="text-foreground mb-8 flex items-center gap-4">
        {icon}
        <h2 className="text-section-heading">{category}</h2>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-x-10 gap-y-6">
        {skills.map((skill, index) => (
          <Skill
            key={`${skill}-${index}`}
            text={skill}
            variant="outline"
            size="md"
            className="tracking-[0.16em]"
          />
        ))}
      </div>
    </div>
  );
}
