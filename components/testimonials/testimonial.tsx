import Image, { StaticImageData } from "next/image";
import { UserAccountIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export interface Testimonial {
  name: string;
  description: string;
  image?: StaticImageData;
  jobTitle: string;
  company: string;
}

export function Testimonial({
  name,
  description,
  image,
  jobTitle,
  company,
}: Testimonial) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-4xl bg-secondary px-6 py-6 text-center sm:px-8 sm:py-8">
      {/* Image */}
      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-clip rounded-full bg-muted">
        {image ? (
          <Image src={image} alt={name} fill className="object-cover" />
        ) : (
          <HugeiconsIcon
            icon={UserAccountIcon}
            size={32}
            className="text-muted-foreground"
          />
        )}
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed font-medium text-secondary-foreground sm:text-base">
          {description}
        </p>
        <h3
          className="text-lg font-bold text-foreground sm:text-xl"
          style={{ fontFamily: "var(--font-mazaeni), serif" }}
        >
          {name}
        </h3>
        <p className="text-sm leading-relaxed font-medium text-secondary-foreground sm:text-base">
          <span className="font-bold">{jobTitle}</span>
          <span className="text-secondary-foreground/50"> at </span>
          <span className="font-bold">{company}</span>
        </p>
      </div>
    </div>
  );
}
