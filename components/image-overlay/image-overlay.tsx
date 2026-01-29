"use client";

import { usePointerType } from "@/components/image-overlay/use-pointer-type";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import React, { useCallback, useState } from "react";

export interface ImageOverlayProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
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
      width,
      height,
      fill,
      sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px",
      priority = false,
      className,
      overlayClassName = "rounded-2xl size-full",
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
          "group transition-all duration-200 ease-in-out relative overflow-hidden rounded-2xl cursor-pointer",
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
          fill={true}
          // width={fill ? undefined : width ?? undefined}
          // height={fill ? undefined : height ?? undefined}
          priority={priority}
          sizes={sizes}
          placeholder={isStaticImage && src.blurDataURL ? "blur" : undefined}
          className={cn(
            "block object-cover my-0! transition-transform duration-300 ease-in-out rounded-2xl",
            zoomOnHover && active && "scale-105",
            className
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
