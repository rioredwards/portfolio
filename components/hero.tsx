import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroProps {
  title: string;
  paragraphs?: string[];
  buttonText?: string;
  buttonHref?: string;
  image: React.ReactNode;
  className?: string;
}

export function Hero({
  title,
  paragraphs,
  buttonText = "CONTACT",
  buttonHref = "#contact",
  image,
  className,
}: HeroProps) {
  return (
    <div
      className={cn(
        "grid w-full min-w-0 grid-cols-1 place-items-center lg:grid-cols-[auto_auto] lg:grid-rows-[auto_auto] lg:place-items-stretch",
        className,
      )}
    >
      {/* Main heading - top-cell on mobile, top-right-cell on desktop */}
      <div className="mb-4 lg:col-start-2 lg:row-start-1 lg:mb-2">
        <h1 className="hero-text">{title}</h1>
      </div>

      {/* Profile Picture - middle-cell on mobile, left-cell on desktop */}
      <div className="mb-8 lg:row-span-2 lg:mr-16 lg:mb-0 lg:ml-auto lg:flex lg:place-items-center">
        {/* Profile picture */}
        <div className="relative aspect-square h-64 overflow-hidden rounded-full border-4 lg:h-full lg:w-full">
          {image}
        </div>
      </div>

      {/* Subheading and paragraphs - bottom-cell on mobile, bottom-right-cell on desktop */}
      <div className="max-w-lg flex-1 lg:col-start-2 lg:row-start-2">
        {paragraphs && (
          <div className="mb-6 space-y-4">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="body-text">
                {paragraph}
              </p>
            ))}
          </div>
        )}
        <div className="mt-12 flex justify-center lg:mt-4 lg:justify-start">
          <Button asChild size="lg" className="tracking-wider uppercase">
            <Link href={buttonHref}>{buttonText}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
