"use client";

import { ImageOverlay } from "@/components/image-overlay/image-overlay";
import { usePointerType } from "@/components/image-overlay/use-pointer-type";
import { useLightbox } from "@/components/lightbox-image/lightbox-provider";
import { LightboxTrigger } from "@/components/lightbox-image/lightbox-trigger";
import type { LightboxSlide } from "@/components/lightbox-image/types";
import { cn } from "@/lib/utils";
import { StaticImageData } from "next/image";

export interface LightboxImageProps {
  src: string | StaticImageData;
  alt: string;
  caption?: React.ReactNode;
  enableLightbox?: boolean;
  gallery?: LightboxSlide[];
  galleryIndex?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  maximizeIcon?: React.ReactNode;
}

export function LightboxImage({
  src,
  alt,
  caption,
  enableLightbox = true,
  gallery,
  galleryIndex = 0,
  priority = false,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 640px",
  maximizeIcon,
}: LightboxImageProps) {
  const pointerType = usePointerType();
  const { openSingle, openGallery } = useLightbox();

  const isStaticImage = typeof src === "object";

  const slide: LightboxSlide = isStaticImage
    ? { ...src, alt, description: caption }
    : { src, alt, description: caption };

  const handleImageClick = () => {
    if (pointerType === "fine" && enableLightbox) {
      if (gallery && gallery.length > 0) {
        openGallery(gallery, galleryIndex);
      } else {
        openSingle(slide);
      }
    }
  };

  return (
    <figure className="my-6 size-full">
      <ImageOverlay
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority}
        className={cn(className)}
        overlayClassName="rounded-2xl size-full"
        zoomOnHover={enableLightbox}
        onClick={handleImageClick}
      >
        {enableLightbox && (
          <LightboxTrigger
            {...(gallery && gallery.length > 0
              ? { slides: gallery, index: galleryIndex }
              : { slide })}
            aria-label="View fullscreen"
          >
            {maximizeIcon || <DefaultMaximizeIcon />}
          </LightboxTrigger>
        )}
      </ImageOverlay>
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function DefaultMaximizeIcon() {
  return (
    <div className="backdrop-blur-sm bg-background/70 absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full text-foreground shadow-md transition-all duration-200 ease-in-out hover:bg-primary hover:text-primary-foreground cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4"
      >
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1={21} x2={14} y1={3} y2={10} />
        <line x1={3} x2={10} y1={21} y2={14} />
      </svg>
    </div>
  );
}
