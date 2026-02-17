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
  highlights?: string[];
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

export interface Resume {
  $schema?: string;
  basics: ResumeBasics;
  work?: ResumeWork[];
  education?: ResumeEducation[];
  certificates?: ResumeCertificate[];
  skills?: ResumeSkill[];
}

const GIST_RAW_URL =
  "https://gist.githubusercontent.com/rioredwards/de30a258d908819312a2e48bcd191c37/raw/resume.json";

export async function getResume(): Promise<Resume> {
  const localPath = process.env.RESUME_LOCAL_PATH;
  if (localPath) {
    const { readFile } = await import("fs/promises");
    const { resolve } = await import("path");
    const json = await readFile(resolve(localPath), "utf-8");
    return JSON.parse(json);
  }

  const res = await fetch(GIST_RAW_URL, {
    signal: AbortSignal.timeout(5000),
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch resume: ${res.status}`);
  }

  return res.json();
}

// Format ISO date string to display format (e.g., "2024-07" -> "Jul 2024")
export function formatResumeDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  if (!month) return year;

  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
