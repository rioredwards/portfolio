import type { TestimonialType } from "@/components/testimonials";
import imgAmandaHockmuthProfile from "@/public/testimonial-images/amanda-hockmuth-profile.png";
import imgArinWilliamsProfile from "@/public/testimonial-images/arin-williams-profile.png";

export const TESTIMONIALS: TestimonialType[] = [
  {
    name: "Arin Williams",
    description:
      "I have had the pleasure of working with some of the most talented software engineers around the world. Without a doubt, Rio could go toe-to-toe with the very best that I've known; despite the fact that he's a selfless team player.",
    image: imgArinWilliamsProfile, // TODO: Replace with actual testimonial image
    jobTitle: "Product Manager",
    company: "Comcast",
  },
  {
    name: "Amanda Hockmuth",
    description:
      "Rio's talent is self evident, but his quiet positivity in particular, is infectious. " +
      "His VSCode Extension 'Error Affirmations' is the perfect illustration, and my favorite extension (even over 'Prettier').",
    image: imgAmandaHockmuthProfile, // TODO: Replace with actual testimonial image
    jobTitle: "Software Developer",
    company: "Code The Dream",
  },
  {
    name: "Shakira Syeda",
    description:
      "He is, without a doubt, one of the best teachers I have ever had. I am grateful to learn and grow under his guidance!",
    jobTitle: "Analyst",
    company: "Seagate Technology",
  },
  // TODO: Reach out to people for more testimonials and ask them^ if they're cool with being featured here
];
