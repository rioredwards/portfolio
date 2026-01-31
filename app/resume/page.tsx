import { PrintResumeButton } from "@/components/print-resume-button";
import { ResumeContent } from "@/components/resume-content";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-secondary px-content-px py-content-py md:px-content-px-md">
      <div className="mx-auto max-w-content-max-w fade-in">
        <h1
          className="mb-8 text-center text-4xl font-semibold md:text-5xl"
          style={{ fontFamily: "var(--font-mazaeni), serif" }}
        >
          Resume
        </h1>
        <ResumeContent />
      </div>

      <div className="fixed right-12 bottom-12">
        <PrintResumeButton />
      </div>
    </main>
  );
}
