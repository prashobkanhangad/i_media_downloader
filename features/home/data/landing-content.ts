import {
  Clapperboard,
  Film,
  Globe,
  ImageIcon,
  Layers,
  Link2,
  MonitorSmartphone,
  Shield,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StepItem {
  step: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface MediaItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export const features: FeatureItem[] = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Download videos in seconds with our optimized processing pipeline.",
  },
  {
    icon: Shield,
    title: "Private & Secure",
    description:
      "No login required. We never store your links or personal data.",
  },
  {
    icon: Sparkles,
    title: "HD Quality",
    description: "Get the highest available resolution for every download.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description: "Use on any device — desktop, tablet, or mobile browser.",
  },
  {
    icon: Link2,
    title: "Paste & Download",
    description: "Simply paste an Instagram URL and hit download. That's it.",
  },
  {
    icon: MonitorSmartphone,
    title: "No App Needed",
    description: "100% web-based. No installations or extensions required.",
  },
];

export const howItWorksSteps: StepItem[] = [
  {
    step: 1,
    icon: Link2,
    title: "Copy the Link",
    description:
      "Open Instagram and copy the URL of the post, reel, or story you want.",
  },
  {
    step: 2,
    icon: Layers,
    title: "Paste the URL",
    description: "Paste the link into the input box on our homepage.",
  },
  {
    step: 3,
    icon: Zap,
    title: "Download Instantly",
    description: "Click download and save the video directly to your device.",
  },
];

export const supportedMedia: MediaItem[] = [
  {
    icon: Film,
    title: "Reels",
    description: "Download Instagram Reels in full HD quality.",
    tag: "Video",
  },
  {
    icon: Clapperboard,
    title: "IGTV Videos",
    description: "Save long-form IGTV content to watch offline.",
    tag: "Video",
  },
  {
    icon: ImageIcon,
    title: "Posts",
    description: "Download video posts from any public profile.",
    tag: "Video",
  },
  {
    icon: Sparkles,
    title: "Stories",
    description: "Save stories before they disappear after 24 hours.",
    tag: "Video",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Is this Instagram video downloader free?",
    answer:
      "Yes, our tool is completely free to use. There are no hidden fees, subscriptions, or download limits.",
  },
  {
    question: "Do I need to log in to Instagram?",
    answer:
      "No login is required. Simply paste a public Instagram URL and download. We never ask for your credentials.",
  },
  {
    question: "What video quality can I download?",
    answer:
      "We provide the highest quality available from Instagram, typically up to 1080p HD depending on the original upload.",
  },
  {
    question: "Can I download private Instagram videos?",
    answer:
      "No. Our tool only works with publicly accessible content. Private account posts cannot be downloaded.",
  },
  {
    question: "Is it safe to use this downloader?",
    answer:
      "Absolutely. We don't store your URLs, don't require personal information, and use secure HTTPS connections.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. Our downloader is fully responsive and works on iPhone, Android, tablets, and desktop browsers.",
  },
];
