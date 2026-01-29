"use client";

import React from "react";
import type { LightboxSlide } from "@/components/lightbox-image/types";
import { LightboxImage } from "@/components/lightbox-image/lightbox-image";

interface LightboxGalleryProps {
  children: React.ReactNode;
}

function collectSlides(node: React.ReactNode): LightboxSlide[] {
  const slides: LightboxSlide[] = [];
  React.Children.forEach(node, (child) => {
    if (!React.isValidElement(child)) return;
    const props = child.props as Record<string, unknown>;
    if (child.type === LightboxImage) {
      slides.push({
        src: props.src as string,
        alt: props.alt as string,
      });
    }
    if (props.children) {
      slides.push(...collectSlides(props.children as React.ReactNode));
    }
  });
  return slides;
}

function injectGallery(
  node: React.ReactNode,
  slides: LightboxSlide[],
  counter: { index: number }
): React.ReactNode {
  return React.Children.map(node, (child) => {
    if (!React.isValidElement(child)) return child;
    const props = child.props as Record<string, unknown>;

    if (child.type === LightboxImage) {
      const idx = counter.index++;
      return React.cloneElement(
        child as React.ReactElement<Record<string, unknown>>,
        {
          enableLightbox: true,
          gallery: slides,
          galleryIndex: idx,
        }
      );
    }

    if (props.children) {
      return React.cloneElement(
        child as React.ReactElement<Record<string, unknown>>,
        {},
        injectGallery(props.children as React.ReactNode, slides, counter)
      );
    }

    return child;
  });
}

export function LightboxGallery({ children }: LightboxGalleryProps) {
  const slides = collectSlides(children);
  return <>{injectGallery(children, slides, { index: 0 })}</>;
}
