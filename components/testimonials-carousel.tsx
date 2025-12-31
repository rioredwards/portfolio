"use client";

import { TESTIMONIALS } from "@/lib/testimonials-data";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { TestimonialCard } from "./testimonial-card";
import {
  Carousel,
  CarouselContent,
  CarouselIndicators,
  CarouselItem,
} from "./ui/carousel";

const AUTOSCROLL_DELAY = 6000;

export function TestimonialsCarousel() {
  const plugin = useRef(
    Autoplay({ delay: AUTOSCROLL_DELAY, stopOnInteraction: true }),
  );

  return (
    <div className="carousel-fade w-full">
      <Carousel
        className="max-w-content-max-w mx-auto w-full"
        opts={{
          align: "center",
          loop: true,
          slidesToScroll: 1,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent>
          {TESTIMONIALS.map((testimonial, index) => (
            <CarouselItem
              key={`${testimonial.name}-${index}`}
              className="basis-full"
            >
              <div className="flex justify-center">
                <TestimonialCard
                  name={testimonial.name}
                  description={testimonial.description}
                  image={testimonial.image}
                  jobTitle={testimonial.jobTitle}
                  company={testimonial.company}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselIndicators className="mt-4 lg:mt-6" />
      </Carousel>
    </div>
  );
}
