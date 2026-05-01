import { cn } from "@/lib/utils";
import {
  ImageOverlayClient,
  type ImageOverlayClientProps,
} from "@/components/image-overlay/image-overlay-client";
import Image, { StaticImageData } from "next/image";

export interface ImageOverlayProps extends ImageOverlayClientProps {
  src: string | StaticImageData;
  alt: string;
  /** With string `src`, intrinsic aspect ratio is unknown unless you pass these (or use a static import). */
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  overlayClassName?: string;
  zoomOnHover?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  onLoadStart?: () => void;
}

function ImageOverlay({
  src,
  alt,
  width: intrinsicWidth,
  height: intrinsicHeight,
  sizes,
  priority = false,
  className,
  overlayClassName,
  zoomOnHover = true,
  onLoad,
  onError,
  onLoadStart,
  children,
  ...clientProps
}: ImageOverlayProps) {
  const isStaticImage = typeof src === "object";
  const staticAspectRatio = isStaticImage
    ? `${src.width} / ${src.height}`
    : undefined;
  const explicitAspectRatio =
    typeof intrinsicWidth === "number" && typeof intrinsicHeight === "number"
      ? `${intrinsicWidth} / ${intrinsicHeight}`
      : undefined;
  const aspectRatio = staticAspectRatio ?? explicitAspectRatio;

  const srcString = isStaticImage ? src.src : src;
  const isAnimatedGif = srcString.toLowerCase().endsWith(".gif");

  return (
    <ImageOverlayClient
      className={cn(
        "group/overlay relative cursor-pointer overflow-hidden rounded-2xl shadow-lg",
        aspectRatio ? "" : "aspect-square",
        className,
      )}
      style={{
        ...(aspectRatio ? { aspectRatio } : {}),
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
        unoptimized={isAnimatedGif}
        placeholder={isStaticImage && src.blurDataURL ? "blur" : undefined}
        className={cn(
          "object-cover transition-transform duration-500 ease-out",
          zoomOnHover &&
            "group-active/overlay:scale-[100%]! group-data-[active=true]:scale-[102%]",
        )}
        onLoad={onLoad}
        onError={onError}
        onLoadStart={onLoadStart}
      />

      {children && (
        <div
          className={cn(
            "absolute inset-0 bg-transparent transition-colors duration-300 group-data-[active=true]:bg-black/30",
            overlayClassName,
          )}
        >
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-data-[active=true]:pointer-events-auto group-data-[active=true]:opacity-100">
            {children}
          </div>
        </div>
      )}
    </ImageOverlayClient>
  );
}

export { ImageOverlay };
