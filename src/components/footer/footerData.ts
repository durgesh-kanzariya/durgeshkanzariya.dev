import { Mail, LucideIcon } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";

export interface SocialChannel {
  icon: LucideIcon | (({ size }: { size?: number }) => React.JSX.Element);
  label: string;
  handle: string;
  href: string;
  color: string;
}

export const SOCIAL_CHANNELS: SocialChannel[] = [
  {
    icon: GithubIcon,
    label: "GitHub",
    handle: "@durgesh-kanzariya",
    href: "https://github.com/durgesh-kanzariya",
    color: "#E2E8F0",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    handle: "durgesh-kanzariya",
    href: "https://linkedin.com/in/durgesh-kanzariya",
    color: "#38BDF8",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "durgesh.j.kanzariya@gmail.com",
    href: "mailto:durgesh.j.kanzariya@gmail.com",
    color: "#4F8EFF",
  },
];
