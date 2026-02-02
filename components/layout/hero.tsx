import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import profileImage from "@/public/profile.webp"; // Adjust path as needed
import { Message02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RotatingWord } from "../ui/RotatingWord";

function HeroImage({
  image,
  className,
}: {
  image: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative aspect-square min-h-64 min-w-64 shrink-0 overflow-hidden rounded-full border-4 border-border/50",
        className,
      )}
    >
      {image}
    </div>
  );
}

function HeroButton({
  buttonText,
  buttonHref,
}: {
  buttonText: string;
  buttonHref: string;
}) {
  return (
    <div className="group p-4 lg:-translate-x-4 pointer-coarse:translate-x-0">
      <Button
        asChild
        size="icon-xl"
        className={cn(
          "custom-bg-ping-wrapper bg-secondary group-hover:bg-accent-hover! pointer-coarse:bg-accent-hover!",
          "overflow-hidden group-hover:overflow-visible pointer-coarse:overflow-visible",
          "transition-all duration-400",
          "h-14 w-12 group-hover:w-52 group-hover:px-6 pointer-coarse:w-52 pointer-coarse:px-6",
        )}
      >
        <Link className="" href={buttonHref}>
          <div className="custom-bg-ping mr-2 flex items-center gap-2">
            <span
              className={cn(
                "grid grid-cols-[0fr] transition-all duration-400",
                "group-hover:grid-cols-[1fr] pointer-coarse:grid-cols-[1fr]",
              )}
            >
              <span className="overflow-hidden text-xl tracking-wider whitespace-nowrap uppercase opacity-0 transition-all duration-400 ease-in group-hover:opacity-100 pointer-coarse:opacity-100">
                {buttonText}
              </span>
            </span>
            <HugeiconsIcon
              icon={Message02Icon}
              className="size-8 text-accent transition-all duration-400 group-hover:scale-75 group-hover:text-primary-foreground pointer-coarse:scale-75 pointer-coarse:text-primary-foreground"
              color="currentColor"
              strokeWidth={2}
            />
          </div>
        </Link>
      </Button>
    </div>
  );
}

function HeroHeading({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-center text-[clamp(3rem,14vw,5rem)] leading-16 font-black tracking-tight text-foreground md:text-left md:text-6xl lg:text-7xl",
        className,
      )}
      style={{ fontFamily: "var(--font-mazaeni), serif" }}
    >
      {title}
    </h1>
  );
}

export function Hero() {
  const image = (
    <Image
      src={profileImage}
      alt="Rio Edwards"
      fill
      className="object-cover"
      priority
      placeholder="blur"
    />
  );
  const title = "Hello, I'm Rio.";

  const adjectives = [
    "thoughtful",
    "accessible",
    "maintainable",
    "delightful",
    "responsive",
    "scalable",
    "memorable",
    "intuitive",
    "reliable",
    "secure",
  ];

  const paragraph = (
    <p key="1" className="text-center text-lg leading-relaxed md:text-left">
      I build <RotatingWord words={adjectives} className="w-32 font-bold" />{" "}
      software.
    </p>
  );

  const buttonText = "CONTACT";
  const buttonHref = "#contact";

  return (
    <div className="grid min-h-[calc(100vh-6rem)] place-items-center fade-in md:min-h-screen">
      {/* Desktop layout */}
      <div
        className={cn(
          // "grid grid-cols-1 place-items-center md:grid-cols-[auto_1fr] md:grid-rows-[auto_auto] md:place-items-stretch lg:grid-cols-[1fr_max-content]",
          "hidden items-center smd:flex md:gap-12",
        )}
      >
        <HeroImage image={image} className="h-full" />
        <div className="mt-10 flex max-w-prose-max flex-col items-start justify-end">
          <HeroHeading title={title} className="mb-4" />
          <div className="mb-2">{paragraph}</div>
          <HeroButton buttonText={buttonText} buttonHref={buttonHref} />
        </div>
      </div>
      {/* Mobile layout */}
      <div
        className={cn(
          "flex flex-col items-center justify-center h-full min-h-128 md:hidden",
        )}
      >
        <HeroHeading title={title} className="mb-8" />
        <HeroImage image={image} className="mb-6" />
        <div className="mb-10 max-w-prose-max space-y-4 text-center">
          {paragraph}
        </div>
        <HeroButton buttonText={buttonText} buttonHref={buttonHref} />
      </div>
    </div>
  );
}
