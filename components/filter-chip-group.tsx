"use client";

import { buildQueryHref, type QueryValue } from "@/lib/query-params";
import { cn } from "@/lib/utils";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterChipGroupProps {
  title: string;
  basePath: string;
  paramName: string;
  selectedValue?: string;
  options: FilterOption[];
  preserveParams?: Record<string, QueryValue>;
  singleRowScrollable?: boolean;
}

export function FilterChipGroup({
  title,
  basePath,
  paramName,
  selectedValue,
  options,
  preserveParams,
  singleRowScrollable = false,
}: FilterChipGroupProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrowVisibility = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;

    const left = node.scrollLeft > 2;
    const right = node.scrollLeft + node.clientWidth < node.scrollWidth - 2;
    setCanScrollLeft(left);
    setCanScrollRight(right);
  }, []);

  useEffect(() => {
    if (!singleRowScrollable) return;

    updateArrowVisibility();
    const node = scrollRef.current;
    if (!node) return;

    node.addEventListener("scroll", updateArrowVisibility, { passive: true });
    window.addEventListener("resize", updateArrowVisibility);

    return () => {
      node.removeEventListener("scroll", updateArrowVisibility);
      window.removeEventListener("resize", updateArrowVisibility);
    };
  }, [singleRowScrollable, updateArrowVisibility]);

  const scrollChips = (direction: "left" | "right") => {
    const node = scrollRef.current;
    if (!node) return;
    const amount = Math.max(180, Math.floor(node.clientWidth * 0.72));
    node.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const chips = (
    <>
      <Link
        href={buildQueryHref(basePath, {
          ...preserveParams,
          [paramName]: null,
          page: null,
        })}
        aria-current={!selectedValue ? "true" : undefined}
        className={cn(
          "rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.09em] uppercase transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm",
          !selectedValue
            ? "border-primary bg-primary text-primary-foreground shadow-card"
            : "border-border/70 bg-background/80 text-secondary-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary",
        )}
      >
        All
      </Link>
      {options.map((option) => {
        const isSelected = option.value === selectedValue;

        return (
          <Link
            key={option.value}
            href={buildQueryHref(basePath, {
              ...preserveParams,
              [paramName]: option.value,
              page: null,
            })}
            aria-current={isSelected ? "true" : undefined}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold tracking-[0.09em] whitespace-nowrap uppercase transition-all duration-300 sm:px-4 sm:py-2 sm:text-sm",
              isSelected
                ? "border-primary bg-primary text-primary-foreground shadow-card"
                : "border-border/70 bg-background/80 text-secondary-foreground hover:-translate-y-0.5 hover:border-primary/40 hover:bg-secondary",
            )}
          >
            {option.label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
        {title}
      </p>
      {singleRowScrollable ? (
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto px-0 [scrollbar-width:none] sm:px-10 [&::-webkit-scrollbar]:hidden"
          >
            {chips}
          </div>

          {canScrollLeft ? (
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 hidden w-18 bg-gradient-to-r from-secondary via-secondary/88 to-transparent sm:block" />
          ) : null}

          {canScrollRight ? (
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-18 bg-gradient-to-l from-secondary via-secondary/88 to-transparent sm:block" />
          ) : null}

          {canScrollLeft ? (
            <button
              type="button"
              onClick={() => scrollChips("left")}
              className="absolute top-1/2 left-0 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground transition-colors hover:border-primary/35 hover:bg-secondary sm:inline-flex"
              aria-label="Scroll filters left"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={2} />
            </button>
          ) : null}

          {canScrollRight ? (
            <button
              type="button"
              onClick={() => scrollChips("right")}
              className="absolute top-1/2 right-0 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground transition-colors hover:border-primary/35 hover:bg-secondary sm:inline-flex"
              aria-label="Scroll filters right"
            >
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                strokeWidth={2}
              />
            </button>
          ) : null}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">{chips}</div>
      )}
    </div>
  );
}
