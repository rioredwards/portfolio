import { File01Icon, Mail01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { SiBluesky, SiGithub, SiLinkedin, SiYoutube } from "react-icons/si";

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
  copyToClipboard?: boolean;
  copyValue?: string;
}

export function getSocialLinks(iconSize: string = "size-5"): SocialLink[] {
  return [
    {
      icon: (
        <HugeiconsIcon
          icon={Mail01Icon}
          size={20}
          color="currentColor"
          strokeWidth={1.8}
        />
      ),
      href: "#",
      label: "Email",
      copyToClipboard: true,
      copyValue: "rioredwards@gmail.com",
    },
    {
      icon: <SiGithub className={iconSize} />,
      href: "https://github.com/rioredwards/",
      label: "GitHub",
    },
    {
      icon: <SiLinkedin className={iconSize} />,
      href: "https://linkedin.com/in/rio-edwards/",
      label: "LinkedIn",
    },
    {
      icon: <SiYoutube className={iconSize} />,
      href: "https://www.youtube.com/@rioredwards",
      label: "YouTube",
    },
    {
      icon: <SiBluesky className={iconSize} />,
      href: "https://bsky.app/profile/rioredwards.bsky.social",
      label: "BlueSky",
    },
    {
      icon: (
        <HugeiconsIcon
          icon={File01Icon}
          size={20}
          color="currentColor"
          strokeWidth={1.8}
        />
      ),
      href: "#",
      label: "Resume",
    },
  ];
}
