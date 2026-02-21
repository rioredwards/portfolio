// JSON Resume schema types (subset used by this portfolio)
// Full schema: https://jsonresume.org/schema

export interface ResumeBasics {
  name: string;
  label: string;
  email: string;
  phone?: string;
  url?: string;
  summary?: string;
  profiles?: {
    network: string;
    username: string;
    url: string;
  }[];
}

export interface ResumeWork {
  name: string;
  position: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: ResumeWorkProject[];
}

export interface ResumeWorkProject {
  title?: string;
  description?: string;
  tech?: string[];
  url?: string;
}

export interface ResumeEducation {
  institution: string;
  area?: string;
  studyType?: string;
  startDate?: string;
  endDate?: string;
}

export interface ResumeCertificate {
  name: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface ResumeSkill {
  name: string;
  level?: string;
  keywords?: string[];
}

export interface ResumeProject {
  name: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  highlights?: string[];
  tech?: string[];
  url?: string;
}

export interface Resume {
  $schema?: string;
  basics: ResumeBasics;
  work?: ResumeWork[];
  education?: ResumeEducation[];
  certificates?: ResumeCertificate[];
  skills?: ResumeSkill[];
  projects?: ResumeProject[];
}

import canonicalResume from "@/content/resume.json";

export async function getResume(): Promise<Resume> {
  // In development, RESUME_LOCAL_PATH can point to a variant JSON for generating
  // tailored PDFs. Set it in .env.local. Output variants to resume-variants/ (gitignored).
  // Never set this in production: it has no effect there.
  const localPath = process.env.RESUME_LOCAL_PATH;
  if (localPath && process.env.NODE_ENV !== "production") {
    const { readFile } = await import("fs/promises");
    const { resolve } = await import("path");
    const json = await readFile(resolve(localPath), "utf-8");
    return JSON.parse(json);
  }

  return canonicalResume as Resume;
}

// Format ISO date string to display format (e.g., "2024-07" -> "Jul 2024")
export function formatResumeDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  if (!month) return year;

  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
