import canonicalResume from "@/content/resume.json";
import { z } from "zod";
import { DEFAULT_LOCALE } from "./constants";

// Resume Zod schemas: single source of truth for types, runtime validation,
// and JSON Schema generation (see scripts/generate-resume-schema.ts).

export const resumeBasicsSchema = z.object({
  name: z.string(),
  title: z.string(),
  location: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  website: z.string().url().optional(),
  linkedIn: z.string().url(),
});

export const resumeProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  url: z.string().url().optional(),
});

const datePattern = /^\d{4}(-\d{2})?$/;

const resumeExperienceBase = z.object({
  name: z.string(),
  title: z.string(),
  startDate: z.string().regex(datePattern, "Expected YYYY or YYYY-MM"),
  endDate: z.string().regex(datePattern, "Expected YYYY or YYYY-MM").optional(),
});

export const resumeExperienceSchema = z.union([
  resumeExperienceBase.extend({ projects: z.array(resumeProjectSchema) }),
  resumeExperienceBase.extend({ highlights: z.array(z.string()) }),
]);

export const resumeEducationSchema = z.object({
  institution: z.string(),
  certificate: z.string(),
  date: z.string().regex(datePattern, "Expected YYYY or YYYY-MM"),
});

export const resumeSkillsSchema = z.object({
  category: z.string(),
  skills: z.array(z.string()),
});

export const resumeSchema = z.object({
  $schema: z.string().optional(),
  basics: resumeBasicsSchema,
  summary: z.string(),
  experience: z.array(resumeExperienceSchema),
  education: z.array(resumeEducationSchema),
  skills: z.array(resumeSkillsSchema),
  sideProjects: z.array(resumeProjectSchema).optional(),
});

// Infer types from Zod schemas
export type ResumeBasics = z.infer<typeof resumeBasicsSchema>;
export type ResumeProject = z.infer<typeof resumeProjectSchema>;
export type ResumeExperience = z.infer<typeof resumeExperienceSchema>;
export type ResumeEducation = z.infer<typeof resumeEducationSchema>;
export type ResumeSkills = z.infer<typeof resumeSkillsSchema>;
export type Resume = z.infer<typeof resumeSchema>;

export async function getResume(): Promise<Resume> {
  const raw = canonicalResume;

  const result = resumeSchema.safeParse(raw);
  if (!result.success) {
    const msg = result.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid resume data: ${msg}`);
  }
  return result.data;
}

// Format ISO date string to display format (e.g., "2024-07" -> "Jul 2024")
export function formatResumeDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  if (!month) return year;

  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString(DEFAULT_LOCALE, {
    month: "short",
    year: "numeric",
  });
}
