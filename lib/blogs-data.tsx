import { ServerStack03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Blog } from "../components/blog";

export const BLOGS: Blog[] = [
  {
    title: "What is the backend?",
    description: "An easy intro to the Backend, Servers, APIs, etc..",
    icon: (
      <HugeiconsIcon
        icon={ServerStack03Icon}
        size={44}
        color="currentColor"
        strokeWidth={2}
      />
    ),
  },
];
