"use client";

import { cn } from "@/lib/utils";

type Orientation = "left" | "right";
type Height = "short" | "tall";

interface SectionBreakProps {
  orientation?: Orientation;
  text: string;
  height?: Height;
}

export function SectionBreak({ orientation = "left", text, height = "tall" }: SectionBreakProps) {
  const isLeft = orientation === "left";
  const isTall = height === "tall";

  // Triangle SVG path for the cutout effect
  const trianglePath = "M280 280H0C154.64 280 280 154.64 280 0V280Z";

  // Size variations based on height prop
  const triangleHeight = isTall ? "h-8" : "h-6";
  const textSize = isTall ? "text-4xl" : "text-3xl";
  const padding = isTall ? "p-4" : "p-3";

  return (
    <div className="relative w-full">
      {/* Upper triangle */}
      <svg
        className={cn(
          "block fill-[#e3cfaa] w-auto",
          triangleHeight,
          isLeft ? "ml-auto" : "mr-auto rotate-90"
        )}
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d={trianglePath} />
      </svg>

      {/* Main rectangle with text */}
      <div
        className={cn(
          "bg-[#e3cfaa]",
          isLeft ? "rounded-[32px_0_32px_0]" : "rounded-[0_32px_0_32px]",
          padding
        )}>
        <h2
          className={cn("p-0 m-0 font-black text-center text-[#099037]", textSize)}
          style={{ fontFamily: "var(--font-mazaeni-demo), serif" }}>
          {text}
        </h2>
      </div>

      {/* Lower triangle */}
      <svg
        className={cn(
          "block fill-[#e3cfaa] w-auto",
          triangleHeight,
          isLeft ? "mr-auto rotate-180" : "ml-auto rotate-270"
        )}
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d={trianglePath} />
      </svg>
    </div>
  );
}
