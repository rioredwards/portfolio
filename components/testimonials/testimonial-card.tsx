import { QuoteSvg } from "@/components/ui/quote-svg";
import { User03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { Testimonial } from "./testimonial";

export function TestimonialCard({
  name,
  description,
  image,
  jobTitle,
  company,
}: Testimonial) {
  return (
    <div className="relative flex max-w-prose-max flex-col rounded-4xl px-6 py-4 select-none">
      {/* Spacer */}
      <div className="inline-block h-6 w-full"></div>

      {/* Large faded quote mark behind text */}
      <div
        className="pointer-events-none absolute text-muted-foreground opacity-20 md:top-2 md:-left-8"
        style={{ fontFamily: "var(--font-mazaeni), serif" }}
      >
        <QuoteSvg className="size-16 rotate-190" />
      </div>

      {/* Content on top */}
      <div className="relative z-10 flex flex-col gap-5">
        {/* Testimonial text */}
        <p className="text-base leading-relaxed font-medium text-secondary-foreground sm:text-lg">
          {description}
        </p>

        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-clip rounded-full border-2 bg-muted">
            {image ? (
              <Image src={image} alt={name} fill className="object-cover" />
            ) : (
              <HugeiconsIcon
                icon={User03Icon}
                size={28}
                className="text-muted-foreground"
              />
            )}
          </div>
          <div className="flex flex-col">
            <h3
              className="text-lg font-bold text-foreground sm:text-xl"
              style={{ fontFamily: "var(--font-mazaeni), serif" }}
            >
              {name}
            </h3>
            <p className="text-sm leading-relaxed font-medium text-muted-foreground sm:text-base">
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
