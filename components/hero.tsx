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
        "grid grid-cols-1 md:place-items-stretch place-items-center md:grid-cols-[auto_1fr] md:grid-rows-[auto_auto]",
        className
      )}>
      {/* Main heading - top-cell on mobile, top-right-cell on desktop */}
      <div className="md:col-start-2 md:row-start-1 mb-4 md:mb-2">
        <h1
          className="text-[clamp(3rem,14vw,5rem)] md:text-6xl lg:text-7xl md:text-left whitespace-nowrap text-center font-bold tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
          {title}
        </h1>
      </div>

      {/* Profile Picture - middle-cell on mobile, left-cell on desktop */}
      <div className="md:row-span-2 md:flex md:place-items-center mb-8 md:mb-0 md:mr-8 lg:mr-16">
        {/* Profile picture */}
        {imageSrc && (
          <div className="relative h-64 overflow-hidden rounded-full border-4 sm:h-64 aspect-square">
            <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
          </div>
        )}
      </div>

      {/* Subheading and paragraphs - bottom-cell on mobile, bottom-right-cell on desktop */}
      <div className="md:col-start-2 md:row-start-2 flex-1 max-w-lg">
        {paragraphs && (
          <div className="mb-6 space-y-4 text-secondary-foreground">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
        <div className="flex justify-center md:justify-start mt-12 md:mt-4">
          <Button asChild size="lg" className="uppercase tracking-wider">
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
