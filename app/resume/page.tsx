import { PrintResumeButton } from "@/components/print-resume-button";
import { ResumeContent } from "@/components/resume-content";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-secondary px-content-px py-content-py md:px-content-px-md">
      <div className="mx-auto max-w-content-max-w">
        <div className="resume-actions mb-8 flex items-center justify-between">
          <h1
            className="text-4xl font-semibold md:text-5xl"
            style={{ fontFamily: "var(--font-mazaeni), serif" }}
          >
            Resume
          </h1>
          <PrintResumeButton />
        </div>
        <ResumeContent />
      </div>
    </main>
  );
}
