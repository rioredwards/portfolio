import { cn } from "@/lib/utils";
import {
  ImageOverlayClient,
  type ImageOverlayClientProps,
} from "@/components/image-overlay/image-overlay-client";
import Image, { StaticImageData } from "next/image";
import React from "react";

export interface ImageOverlayProps extends ImageOverlayClientProps {
  src: string | StaticImageData;
  alt: string;
  sizes?: string;
  priority?: boolean;
  overlayClassName?: string;
  zoomOnHover?: boolean;
}

function ImageOverlay({
  src,
  alt,
  sizes,
  priority = false,
  className,
  overlayClassName,
  zoomOnHover = true,
  children,
  ...clientProps
}: ImageOverlayProps) {
  const isStaticImage = typeof src === "object";
  const staticAspectRatio = isStaticImage
    ? `${src.width} / ${src.height}`
    : undefined;

  return (
    <ImageOverlayClient
      className={cn(
        "relative aspect-square overflow-hidden cursor-pointer h-full w-full rounded-2xl",
        className
      )}
      style={{
        ...(staticAspectRatio ? { aspectRatio: staticAspectRatio } : {}),
        ...clientProps.style,
      }}
      {...clientProps}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        placeholder={isStaticImage && src.blurDataURL ? "blur" : undefined}
        className={cn(
          "object-cover m-0! transition-transform duration-300 ease-in-out",
          zoomOnHover && "group-data-[active=true]:scale-110"
        )}
      />

      {children && (
        <div
          className={cn(
            "absolute inset-0 transition-colors duration-300 bg-transparent group-data-[active=true]:bg-foreground/40",
            overlayClassName
          )}
        >
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none group-data-[active=true]:opacity-100 group-data-[active=true]:pointer-events-auto">
            {children}
          </div>
        </div>
      )}
    </ImageOverlayClient>
  );
}

export { ImageOverlay };
