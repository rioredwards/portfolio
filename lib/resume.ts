import canonicalResume from "@/content/resume.json";
import { z } from "zod";
import { DEFAULT_LOCALE } from "./constants";

// --- Portfolio render model (used by components/resume-content.tsx) ---

const datePattern = /^\d{4}(-\d{2})?$/;

export const resumeProjectSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
  url: z.string().url().optional(),
});

const resumeExperienceBase = z.object({
  id: z.string().optional(),
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
  id: z.string().optional(),
  institution: z.string(),
  certificate: z.string(),
  date: z.string().regex(datePattern, "Expected YYYY or YYYY-MM"),
});

export const resumeBasicsSchema = z.object({
  name: z.string(),
  title: z.string(),
  location: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  website: z.string().url().optional(),
  linkedIn: z.string().url(),
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

export type ResumeProject = z.infer<typeof resumeProjectSchema>;
export type ResumeExperience = z.infer<typeof resumeExperienceSchema>;
export type ResumeEducation = z.infer<typeof resumeEducationSchema>;
export type ResumeBasics = z.infer<typeof resumeBasicsSchema>;
export type ResumeSkills = z.infer<typeof resumeSkillsSchema>;
export type Resume = z.infer<typeof resumeSchema>;

// --- External “career” resume file (shared with the resume rendering app) ---

const careerProjectInputSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  description: z.string(),
  tech: z.array(z.string()).min(1),
  url: z.string().url().optional(),
});

const careerMetaSchema = z.object({
  slug: z.string().min(1),
  base: z.string().min(1),
  targetRole: z.string().min(1),
  company: z.string().min(1),
  updatedAt: z.string().min(1),
});

const careerBasicsInputSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.string().optional(),
  email: z.string().email(),
  phone: z.string().min(1),
  website: z.string().url().optional(),
  linkedIn: z.string().url(),
  github: z.string().url().optional(),
});

const careerExperienceInputSchema = z
  .object({
    id: z.string().min(1),
    company: z.string().min(1),
    title: z.string().min(1),
    startDate: z.string().regex(datePattern, "Expected YYYY or YYYY-MM"),
    endDate: z
      .string()
      .regex(datePattern, "Expected YYYY or YYYY-MM")
      .optional(),
    location: z.string().optional(),
    projects: z.array(careerProjectInputSchema).optional(),
    highlights: z.array(z.string().min(1)).optional(),
  })
  .refine(
    (d) => {
      const hasProjects = (d.projects?.length ?? 0) > 0;
      const hasHighlights = (d.highlights?.length ?? 0) > 0;
      return hasProjects || hasHighlights;
    },
    {
      message: "Each experience must include non-empty projects or highlights",
    },
  );

const careerEducationInputSchema = z.object({
  id: z.string().min(1),
  institution: z.string().min(1),
  credential: z.string().min(1),
  date: z.string().regex(datePattern, "Expected YYYY or YYYY-MM"),
});

const careerSkillGroupInputSchema = z.object({
  label: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

export const careerResumeInputSchema = z.object({
  meta: careerMetaSchema,
  basics: careerBasicsInputSchema,
  summary: z.string().min(1),
  experience: z.array(careerExperienceInputSchema).min(1),
  education: z.array(careerEducationInputSchema).min(1),
  skills: z.array(careerSkillGroupInputSchema).min(1),
  sideProjects: z.array(careerProjectInputSchema).optional(),
});

export type CareerResumeInput = z.infer<typeof careerResumeInputSchema>;

function isCareerResumeFormat(raw: unknown): raw is Record<string, unknown> {
  if (raw === null || typeof raw !== "object") return false;
  const m = (raw as Record<string, unknown>).meta;
  if (m === null || typeof m !== "object") return false;
  const mm = m as Record<string, unknown>;
  return typeof mm.slug === "string" && typeof mm.targetRole === "string";
}

function toPortfolioProject(
  p: z.infer<typeof careerProjectInputSchema>,
): ResumeProject {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    tech: p.tech,
    url: p.url,
  };
}

function normalizeCareerToPortfolio(data: CareerResumeInput): Resume {
  return {
    basics: {
      name: data.basics.name,
      title: data.basics.title,
      location: data.basics.location,
      email: data.basics.email,
      phone: data.basics.phone,
      website: data.basics.website,
      linkedIn: data.basics.linkedIn,
    },
    summary: data.summary,
    experience: data.experience.map((e) => {
      const base = {
        id: e.id,
        name: e.company,
        title: e.title,
        startDate: e.startDate,
        endDate: e.endDate,
      };
      if (e.projects && e.projects.length > 0) {
        return {
          ...base,
          projects: e.projects.map(toPortfolioProject),
        };
      }
      return {
        ...base,
        highlights: e.highlights!,
      };
    }),
    education: data.education.map((ed) => ({
      id: ed.id,
      institution: ed.institution,
      certificate: ed.credential,
      date: ed.date,
    })),
    skills: data.skills.map((g) => ({
      category: g.label,
      skills: g.items,
    })),
    sideProjects: data.sideProjects?.map(toPortfolioProject),
  };
}

export async function getResume(): Promise<Resume> {
  const raw = canonicalResume as unknown;
  if (isCareerResumeFormat(raw)) {
    const result = careerResumeInputSchema.safeParse(raw);
    if (!result.success) {
      const msg = result.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      throw new Error(`Invalid career resume data: ${msg}`);
    }
    return normalizeCareerToPortfolio(result.data);
  }

  const legacy = resumeSchema.safeParse(raw);
  if (!legacy.success) {
    const msg = legacy.error.issues
      .map((i) => `${i.path.join(".")}: ${i.message}`)
      .join("; ");
    throw new Error(`Invalid resume data: ${msg}`);
  }
  return legacy.data;
}

// Format ISO date string to display format (e.g., "2024-07" -> "Jul 2024")
export function formatResumeDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  if (!month) return year;

  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1);
  return date.toLocaleDateString(DEFAULT_LOCALE, {
    month: "short",
    year: "numeric",
  });
}
