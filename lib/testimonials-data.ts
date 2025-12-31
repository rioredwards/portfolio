import profileImage from "@/public/profile.webp";
import { Testimonial } from "../components/testimonial";

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "John Doe",
    description:
      "Rio is an exceptional software engineer who consistently delivers high-quality work. Their attention to detail and dedication to creating user-friendly products is truly impressive.",
    image: profileImage, // TODO: Replace with actual testimonial image
    jobTitle: "Software Engineer",
    company: "Company A",
  },
  {
    name: "Jane Smith",
    description:
      "Working with Rio has been a pleasure. Their technical expertise and collaborative approach make them an invaluable team member. I highly recommend their services.",
    image: profileImage, // TODO: Replace with actual testimonial image
    jobTitle: "Software Engineer",
    company: "Company B",
  },
  {
    name: "John O'Connor",
    description:
      "Rio is a great developer and a great person. He is always willing to help and is a great team player. I highly recommend him.",
    image: profileImage, // TODO: Replace with actual testimonial image
    jobTitle: "Software Engineer",
    company: "Lumeer",
  },
];
