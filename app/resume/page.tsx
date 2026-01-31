import { Button } from "@/components/ui/button";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const RESUME_PDF = "/Rio_Edwards_Resume.pdf";

export default function ResumePage() {
  return (
    <main className="flex min-h-screen flex-col bg-secondary px-content-px py-content-py md:px-content-px-md">
      <div className="mx-auto flex w-full max-w-content-max-w flex-col">
        <div className="flex items-center justify-between">
          <h1
            className="text-4xl font-semibold md:text-5xl"
            style={{ fontFamily: "var(--font-mazaeni), serif" }}
          >
            Resume
          </h1>
          <Button asChild size="lg">
            <a href={RESUME_PDF} download>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={16}
                color="currentColor"
                strokeWidth={2}
              />
              Download PDF
            </a>
          </Button>
        </div>
        <iframe
          src={RESUME_PDF}
          title="Rio Edwards Resume"
          className="mt-8 hidden h-[80vh] w-full rounded-lg border md:block"
        />
        <p className="mt-8 text-center text-muted-foreground md:hidden">
          PDF preview is not available on mobile. Use the download button above
          to view the resume.
        </p>
      </div>
    </main>
  );
}
