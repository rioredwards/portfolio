import { SectionContentWrapper } from "@/components/layout";
import { getAllProjectCards } from "@/lib/projects";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const workIndexDescription =
  "Browse all of Rio Edwards' software projects, case studies, and shipped product work.";

export const metadata: Metadata = {
  title: "Work | Rio Edwards",
  description: workIndexDescription,
  openGraph: {
    title: "Work | Rio Edwards",
    description: workIndexDescription,
    type: "website",
  },
};

export default function WorkIndexPage() {
  const projects = getAllProjectCards();

  return (
    <main id="main-content" className="min-h-screen bg-secondary">
      <SectionContentWrapper className="space-y-12 pt-32 md:pt-36">
        <header className="max-w-3xl space-y-5">
          <p className="text-sm font-semibold tracking-[0.24em] text-muted-foreground uppercase">
            All Projects
          </p>
          <div className="space-y-4">
            <h1 className="font-mazaeni text-5xl leading-none text-foreground sm:text-6xl md:text-7xl">
              Work
            </h1>
            <p className="text-lg leading-relaxed text-secondary-foreground sm:text-xl">
              A browsable index of the products, experiments, and client work
              I’ve shipped so far.
            </p>
          </div>
        </header>

        <section aria-label="Projects list" className="space-y-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={cn(
                "group block overflow-hidden rounded-4xl border border-border/60 bg-background shadow-card transition-all duration-300 ease-out",
                "hover:-translate-y-1 hover:border-background-hover-border hover:shadow-card-hover",
                "focus-visible:ring-4 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary focus-visible:outline-none",
              )}
            >
              <article className="grid min-h-full gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)]">
                <div className="flex flex-col justify-between gap-8 p-7 sm:p-9 lg:p-10">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-tertiary px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-tertiary-foreground uppercase">
                        {project.category}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /work/{project.slug}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h2 className="font-mazaeni text-3xl leading-tight text-foreground transition-colors duration-300 group-hover:text-primary-hover sm:text-4xl">
                        {project.title}
                      </h2>
                      <p className="max-w-prose-max text-base leading-relaxed text-secondary-foreground sm:text-lg">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-border/70 bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.16em] text-foreground uppercase transition-transform duration-300 group-hover:translate-x-1">
                      View project
                      <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </div>

                <div
                  className="relative min-h-72 overflow-hidden border-t border-border/60 bg-card lg:min-h-full lg:border-t-0 lg:border-l"
                  style={{ backgroundColor: project.brandColor }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    priority
                  />
                </div>
              </article>
            </Link>
          ))}
        </section>
      </SectionContentWrapper>
    </main>
  );
}
