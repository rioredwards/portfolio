import { Skill } from "@/components/ui/skill";
import type { ReactNode } from "react";

interface SkillSectionProps {
  category: string;
  skills: string[];
  icon: ReactNode;
}

export function SkillSection({ category, skills, icon }: SkillSectionProps) {
  return (
    <div className="rounded-[3rem] px-8 py-10 lg:px-14 lg:py-12">
      <div className="text-foreground mb-8 flex items-center gap-4">
        {icon}
        <h2
          className="text-3xl leading-tight font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
        >
          {category}
        </h2>
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
