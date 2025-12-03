import { FileText, Mail } from "lucide-react";
import { SiGithub, SiLinkedin, SiYoutube } from "react-icons/si";

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export function getSocialLinks(iconSize: string = "size-5"): SocialLink[] {
  return [
    {
      icon: <Mail className={iconSize} />,
      href: "mailto:your@email.com",
      label: "Email",
    },
    {
      icon: <SiGithub className={iconSize} />,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <SiLinkedin className={iconSize} />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <SiYoutube className={iconSize} />,
      href: "https://youtube.com",
      label: "YouTube",
    },
    { icon: <FileText className={iconSize} />, href: "#", label: "Resume" },
  ];
}
