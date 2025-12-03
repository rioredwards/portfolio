import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  paragraphs?: string[];
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function Hero({
  title,
  paragraphs,
  buttonText = "CONTACT",
  buttonHref = "#contact",
  imageSrc,
  imageAlt = "Profile picture",
  className,
}: HeroProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 place-items-center md:grid-cols-[auto_1fr] md:grid-rows-[auto_auto] md:place-items-stretch",
        className,
      )}
    >
      {/* Main heading - top-cell on mobile, top-right-cell on desktop */}
      <div className="mb-4 md:col-start-2 md:row-start-1 md:mb-2">
        <h1
          className="text-foreground text-center text-[clamp(3rem,14vw,5rem)] font-bold tracking-tight whitespace-nowrap md:text-left md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}
        >
          {title}
        </h1>
      </div>

      {/* Profile Picture - middle-cell on mobile, left-cell on desktop */}
      <div className="mb-8 md:row-span-2 md:mr-8 md:mb-0 md:flex md:place-items-center lg:mr-16">
        {/* Profile picture */}
        {imageSrc && (
          <div className="relative aspect-square h-64 overflow-hidden rounded-full border-4 sm:h-64">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>

      {/* Subheading and paragraphs - bottom-cell on mobile, bottom-right-cell on desktop */}
      <div className="max-w-lg flex-1 md:col-start-2 md:row-start-2">
        {paragraphs && (
          <div className="text-secondary-foreground mb-6 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
        <div className="mt-12 flex justify-center md:mt-4 md:justify-start">
          <Button asChild size="lg" className="tracking-wider uppercase">
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
