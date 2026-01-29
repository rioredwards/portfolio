"use client";

import { cn } from "@/lib/utils";
import { usePointerType } from "@/components/image-overlay/use-pointer-type";
import Image, { StaticImageData } from "next/image";
import React, { useCallback, useState } from "react";

export interface ImageOverlayProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  src: string | StaticImageData;
  alt: string;
  sizes?: string;
  priority?: boolean;
  overlayClassName?: string;
  zoomOnHover?: boolean;
  onActiveChange?: (active: boolean) => void;
  children?: React.ReactNode;
}

const ImageOverlay = React.forwardRef<HTMLDivElement, ImageOverlayProps>(
  (
    {
      src,
      alt,
      sizes,
      priority = false,
      className,
      overlayClassName,
      zoomOnHover = true,
      onActiveChange,
      onClick,
      onMouseEnter,
      onMouseLeave,
      children,
      ...props
    },
    ref
  ) => {
    const [active, setActive] = useState(false);
    const pointerType = usePointerType();

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (pointerType === "coarse") {
          const next = !active;
          setActive(next);
          onActiveChange?.(next);
        }
        onClick?.(e);
      },
      [pointerType, active, onClick, onActiveChange]
    );

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (pointerType === "fine") {
          setActive(true);
          onActiveChange?.(true);
        }
        onMouseEnter?.(e);
      },
      [pointerType, onMouseEnter, onActiveChange]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (pointerType === "fine") {
          setActive(false);
          onActiveChange?.(false);
        }
        onMouseLeave?.(e);
      },
      [pointerType, onMouseLeave, onActiveChange]
    );

    const isStaticImage = typeof src === "object";
    const staticAspectRatio = isStaticImage
      ? `${src.width} / ${src.height}`
      : undefined;

    return (
      <div
        ref={ref}
        role="group"
        className={cn(
          "relative aspect-square overflow-hidden cursor-pointer h-full w-full rounded-2xl",
          className
        )}
        style={{
          ...(staticAspectRatio ? { aspectRatio: staticAspectRatio } : {}),
          ...props.style,
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          placeholder={isStaticImage && src.blurDataURL ? "blur" : undefined}
          className={cn(
            "object-cover transition-transform duration-300 ease-in-out",
            zoomOnHover && active && "scale-110"
          )}
        />

        {children && (
          <div
            aria-hidden={!active}
            className={cn(
              "absolute inset-0 transition-colors duration-300",
              active ? "bg-foreground/40" : "bg-transparent",
              overlayClassName
            )}
          >
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                active
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              )}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    );
  }
);
ImageOverlay.displayName = "ImageOverlay";

export { ImageOverlay };
