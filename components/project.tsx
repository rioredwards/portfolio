import Image from "next/image";

const TECHNOLOGIES = [
  "JavaScript",
  "JavaScript",
  "JavaScript",
  "JavaScript",
  "JavaScript",
  "JavaScript",
];

export function Project() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 rounded-[3rem] bg-(--color-bg-secondary) px-8 py-12 shadow-md lg:flex-row lg:items-center lg:gap-16 lg:px-14 lg:py-16">
        {/* Left column – text content */}
        <div className="flex-1">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-(--color-text-tertiary)">
            Planning
          </p>
          <h2
            className="mb-6 text-4xl font-bold leading-tight text-(--color-text-secondary) sm:text-5xl"
            style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
            Class TopBase
          </h2>

          <p className="mb-8 max-w-xl text-base leading-relaxed text-(--color-text-tertiary)">
            ClassTopBase is a school management software for after-schools. For this project, I
            designed a feature to help school owners plan their students&apos; academic plans
            efficiently.
          </p>

          <div className="flex flex-wrap gap-4">
            {TECHNOLOGIES.map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="rounded-full border border-(--color-text-secondary)/40 bg-(--color-bg-primary) px-6 py-2 text-sm font-medium tracking-wide text-(--color-text-secondary) shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right column – mockup image */}
        <div className="relative flex-1">
          <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-tl-4xl rounded-br-4xl border border-(--color-bg-tertiary)">
            {/* Screenshot / UI preview */}
            <div className="relative h-72 bg-(--color-bg-secondary) sm:h-80 md:h-96">
              {/* Gradient overlay */}
              <div className="z-10 absolute inset-0 bg-linear-to-b from-transparent from-80% to-black/30 to-100%" />
              {/* Window frame (image should overflow the bottom right corner) */}
              <div className="absolute inset-10 h-full w-full">
                {/* Image content */}
                <Image
                  src="/temp-proj-photo.webp"
                  alt="ClassTopBase planning feature UI"
                  fill
                  className="object-cover object-top-left"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
