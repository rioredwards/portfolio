import codeQuestImage from "@/public/work/images/code-quest-preview.webp";
import errorAffirmationsImage from "@/public/work/images/error-affirmations-preview.webp";
import jScribeImage from "@/public/work/images/j-scribe-preview.webp";
import { Project } from "../components/project";

export const PROJECTS: Project[] = [
  {
    category: "Web App",
    title: "Code Quest",
    description:
      "This immersive web app generates pseudo-random coding challenges, making learning practical coding skills exciting and engaging!",
    image: codeQuestImage,
    skills: [
      "TypeScript",
      "React",
      "Redux",
      "Framer Motion",
      "Figma",
      "Adobe Illustrator",
      "After Effects",
    ],
  },
  {
    category: "Web App",
    title: "j-scribe",
    description:
      "j-scribe is a versatile platform to create, share, and modify code snippets. With support for various libraries and frameworks, j-scribe's intuitive user interface and live preview make it easy to see the results of your code as you type.",
    image: jScribeImage,
    skills: [
      "TypeScript",
      "JavaScript",
      "React",
      "Redux",
      "Node.js",
      "Express.js",
      "Bulma",
      "Lerna",
      "esbuild",
    ],
  },
  {
    category: "Package",
    title: "Error Affirmations",
    description:
      "Receive all your favorite Error Affirmations, when you need them most! With an easy install and a variety of options for customization, our Jest Reporter is sure to help soften the blow from any failing tests and give you the confidence to carry on!",
    image: errorAffirmationsImage,
    skills: ["JavaScript", "Node.js"],
  },
];
