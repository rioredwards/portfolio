"use client";

import { useLightbox } from "@/components/lightbox-image/lightbox-provider";
import type { LightboxSlide } from "@/components/lightbox-image/types";
import { VideoPlayer } from "@/components/video-player/video-player";
import { cn } from "@/lib/utils";

interface LightboxVideoProps {
  src: string;
  poster?: string;
  caption?: React.ReactNode;
  enableLightbox?: boolean;
  gallery?: LightboxSlide[];
  galleryIndex?: number;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showProgress?: boolean;
  showVolumeToggle?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

export function LightboxVideo({
  src,
  poster,
  caption,
  enableLightbox = true,
  gallery,
  galleryIndex = 0,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  showProgress = true,
  showVolumeToggle = false,
  rounded = "2xl",
}: LightboxVideoProps) {
  const { openSingle, openGallery } = useLightbox();
  const slide: LightboxSlide = {
    type: "video",
    sources: [{ src, type: "video/mp4" }],
    description: caption,
  };

  const handleFullscreenChange = (isFullscreen: boolean) => {
    if (!isFullscreen && gallery && gallery.length > 0) {
      openGallery(gallery, galleryIndex);
    } else if (!isFullscreen && !gallery && slide) {
      openSingle(slide);
    }
  };

  return (
    <figure className="my-6 size-full">
      <div className="relative">
        <VideoPlayer
          src={src}
          poster={poster}
          className={cn("size-full", className)}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          showProgress={showProgress}
          showVolumeToggle={showVolumeToggle}
          showFullscreen={enableLightbox}
          onFullscreenChange={handleFullscreenChange}
          rounded={rounded}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
