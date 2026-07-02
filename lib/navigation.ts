export interface NavLink {
  label: string;
  href: string;
}

export const navbarLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Reels", href: "/reels" },
  { label: "Videos", href: "/videos" },
  { label: "Photos", href: "/photos" },
  { label: "Stories", href: "/stories" },
  { label: "FAQ", href: "/faq" },
];
