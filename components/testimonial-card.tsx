import Image from "next/image";
import { Testimonial } from "./testimonial";
import { QuoteSvg } from "./ui/quote-svg";

export function TestimonialCard({
  name,
  description,
  image,
  jobTitle,
  company,
}: Testimonial) {
  return (
    <div className="max-w-prose-max relative flex flex-col rounded-4xl px-6 py-4 select-none">
      {/* Spacer */}
      <div className="inline-block h-6 w-full"></div>

      {/* Large faded quote mark behind text */}
      <div
        className="text-muted-foreground pointer-events-none absolute opacity-20 md:top-2 md:-left-8"
        style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
      >
        <QuoteSvg className="size-16 rotate-190" />
      </div>

      {/* Content on top */}
      <div className="relative z-10 flex flex-col gap-5">
        {/* Testimonial text */}
        <p className="text-secondary-foreground text-base leading-relaxed font-medium sm:text-lg">
          {description}
        </p>

        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-clip rounded-full border-2">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
          <div className="flex flex-col">
            <h3
              className="text-foreground text-lg font-bold sm:text-xl"
              style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
            >
              {name}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed font-medium sm:text-base">
              <span className="font-bold">{jobTitle}</span>
              <span className="text-secondary-foreground/50"> at </span>
              <span className="font-bold">{company}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
