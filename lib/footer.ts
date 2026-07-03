import type { ComponentType, SVGProps } from "react";

import {
  FacebookIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/icons/social-icons";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const footerCompanyLinks: FooterLink[] = [
  { label: "About Us", href: "/about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export const footerLegalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "DMCA", href: "/dmca" },
];

export const footerContactLinks: FooterLink[] = [
  { label: "Contact Us", href: "/contact" },
  { label: "Support", href: "/support" },
  { label: "Report a Bug", href: "/contact?type=bug" },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  { title: "Company", links: footerCompanyLinks },
  { title: "Legal", links: footerLegalLinks },
  { title: "Contact", links: footerContactLinks },
];

export const footerSocialLinks: SocialLink[] = [
  { label: "Twitter", href: "https://twitter.com", icon: TwitterIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  { label: "GitHub", href: "https://github.com", icon: GithubIcon },
];
