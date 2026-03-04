import { ResumeContent } from "@/components/resume-content";
import { Button } from "@/components/ui/button";
import { getResume } from "@/lib/resume";
import { Download04Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <main
      id="main-content"
      className="min-h-screen bg-secondary px-content-px py-content-py md:px-content-px-md"
    >
      <div className="mx-auto max-w-content-max-w fade-in">
        <h1
          id="page-header"
          className="mx-auto mb-8 max-w-[8.5in] text-2xl font-semibold text-secondary-foreground"
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
            download="Rio_Edwards_Resume.pdf"
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
