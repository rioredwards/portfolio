import type { ReactNode } from "react";

interface SkillSectionProps {
  category: string;
  skills: string[];
  icon: ReactNode;
}

export function SkillSection({ category, skills, icon }: SkillSectionProps) {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl rounded-[3rem] bg-secondary px-8 py-10 lg:px-14 lg:py-12">
        <div className="mb-8 flex items-center gap-4 text-foreground">
          {icon}
          <h2
            className="text-3xl font-bold leading-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
            {category}
          </h2>
        </div>

        {/* Skill pills */}
        <div className="flex flex-wrap gap-x-10 gap-y-6">
          {skills.map((skill, index) => (
            <div
              key={`${skill}-${index}`}
              className="inline-flex min-w-36 items-center justify-center bg-primary px-6 py-3 text-base font-medium tracking-[0.16em] text-secondary rounded-full">
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
