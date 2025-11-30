import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface HeroProps {
  title: string;
  subheading?: string;
  paragraphs?: string[];
  buttonText?: string;
  buttonHref?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export function Hero({
  title,
  subheading,
  paragraphs,
  buttonText = "CONTACT",
  buttonHref = "#contact",
  imageSrc,
  imageAlt = "Profile picture",
  className,
}: HeroProps) {
  return (
    <section className={cn("py-16", className)}>
      {/* Main heading - centered */}
      <h1
        className="mb-12 text-center text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
        style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
        {title}
      </h1>

      {/* Content area - profile picture left, text right */}
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
        {/* Profile picture */}
        {imageSrc && (
          <div className="shrink-0">
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 sm:h-64 sm:w-64">
              <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
            </div>
          </div>
        )}

        {/* Text content */}
        <div className="flex-1">
          {subheading && <h2 className="mb-4 text-xl font-bold sm:text-2xl">{subheading}</h2>}
          {paragraphs && (
            <div className="mb-6 space-y-4 text-secondary-foreground">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          {/* Contact button - right aligned */}
          <div className="flex justify-end">
            <Button asChild size="lg" className="uppercase tracking-wider">
              <Link href={buttonHref}>{buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
