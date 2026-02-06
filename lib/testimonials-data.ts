import { Testimonial } from "@/components/testimonials";
import profileImage1 from "@/public/testamonial-images/goose-1.png";
import profileImage2 from "@/public/testamonial-images/goose-2.png";

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "John Doe",
    description:
      "Rio's pretty chill, I guess.",
    image: profileImage1, // TODO: Replace with actual testimonial image
    jobTitle: "Goose",
    company: "Pond",
  },
  {
    name: "Jane Smith",
    description:
      "Yeah he's alright.",
    image: profileImage2, // TODO: Replace with actual testimonial image
    jobTitle: "Goose",
    company: "Park",
  },
];
