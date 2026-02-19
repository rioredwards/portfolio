import { Button } from "@/components/ui/button";
import { ResumeContent } from "@/components/resume-content";
import { getResume } from "@/lib/resume";
import { Download04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Product Engineer resume for Rio Edwards. Full-stack web development with React, Next.js, TypeScript, and Node.js.",
  openGraph: {
    title: "Resume | Rio Edwards",
    description:
      "Product Engineer resume for Rio Edwards. Full-stack web development with React, Next.js, TypeScript, and Node.js.",
  },
};

export default async function ResumePage() {
  const resume = await getResume();

  const filename = `${resume.basics.name?.replace(/\s+/g, "_") ?? "Rio_Edwards"}_${resume.basics.label?.replace(/\s+/g, "_") ?? "Resume"}_Resume.pdf`;

  return (
    <main
      id="main-content"
      className="min-h-screen bg-secondary px-content-px py-content-py md:px-content-px-md"
    >
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
        <Button asChild size="lg">
          <a
            href="/Rio_Edwards_Resume.pdf"
            download={filename}
            id="download-resume-link"
          >
            <HugeiconsIcon
              icon={Download04Icon}
              size={16}
              color="currentColor"
              strokeWidth={2}
            />
            Download PDF
          </a>
        </Button>
      </div>
    </main>
  );
}
