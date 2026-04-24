import { Contact } from "@/components/contact";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function ContactPage() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-secondary px-content-px py-content-py md:px-content-px-md"
    >
      <div className="mx-auto w-full max-w-4xl fade-in">
        <ErrorBoundary
          fallback={
            <div className="rounded-2xl bg-destructive/10 p-8 text-center">
              <p className="text-lg font-medium text-destructive">
                Contact form unavailable
              </p>
              <p className="mt-2 text-muted-foreground">
                Please email me directly at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="underline hover:text-foreground"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          }
        >
          <Contact
            showTestimonials={false}
            intro={
              <div className="space-y-2">
                <h1
                  id="page-header"
                  className="text-3xl font-semibold text-secondary-foreground sm:text-4xl"
                  style={{ fontFamily: "var(--font-mazaeni), serif" }}
                >
                  Let&apos;s talk
                </h1>
                <p className="text-base text-muted-foreground">
                  Have a project, role, or frontend problem to discuss? Send a
                  note and I&apos;ll get back to you soon.
                </p>
              </div>
            }
          />
        </ErrorBoundary>
      </div>
    </main>
  );
}
