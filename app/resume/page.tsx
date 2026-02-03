import { PrintResumeButton } from "@/components/print-resume-button";
import { ResumeContent } from "@/components/resume-content";
import { getResume } from "@/lib/resume";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Rio Edwards - Software Engineer resume. Experience in full-stack web development with React, Next.js, TypeScript, and Node.js.",
  openGraph: {
    title: "Resume — Rio Edwards",
    description:
      "Rio Edwards - Software Engineer resume. Experience in full-stack web development with React, Next.js, TypeScript, and Node.js.",
  },
};

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <main className="min-h-screen bg-secondary px-content-px py-content-py md:px-content-px-md">
      <div className="mx-auto max-w-content-max-w fade-in">
        <h1
          id="page-header"
          className="mx-auto mb-8 max-w-[8.5in] text-2xl font-semibold text-muted-foreground"
          style={{ fontFamily: "var(--font-mazaeni), serif" }}
        >
          Resume
        </h1>
        <ResumeContent data={resume} />
      </div>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2">
        <PrintResumeButton />
      </div>
    </main>
  );
}
