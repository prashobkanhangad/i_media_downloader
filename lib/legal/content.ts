import { siteConfig } from "@/lib/seo/site-config";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}

export interface LegalPageContent {
  key: "privacy" | "terms" | "dmca";
  path: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const siteName = siteConfig.name;
const contactEmail = siteConfig.email;

export const legalPages: Record<LegalPageContent["key"], LegalPageContent> = {
  privacy: {
    key: "privacy",
    path: "/privacy",
    title: "Privacy Policy",
    description: `Learn how ${siteName} collects, uses, and protects your information when you use our Instagram downloader service.`,
    lastUpdated: "2026-07-03",
    sections: [
      {
        id: "introduction",
        title: "Introduction",
        paragraphs: [
          `Welcome to ${siteName}. We respect your privacy and are committed to protecting the personal information you may provide while using our website and services. This Privacy Policy explains what information we collect, how we use it, and the choices you have.`,
          `By using our website, you agree to the collection and use of information in accordance with this policy.`,
        ],
      },
      {
        id: "information-we-collect",
        title: "Information We Collect",
        paragraphs: [
          "We collect limited information to operate, secure, and improve our service:",
        ],
        list: [
          "Usage data such as pages visited, download events, browser type, device type, and approximate location derived from IP address.",
          "Instagram URLs you submit for processing. We use these only to retrieve publicly available media and do not store your Instagram login credentials.",
          "Anonymous analytics identifiers such as session and visitor IDs stored in your browser.",
          "Technical logs including IP address, referrer, and user agent for security and abuse prevention.",
        ],
      },
      {
        id: "cookies",
        title: "Cookies and Advertising",
        paragraphs: [
          "We use cookies and similar technologies to remember preferences, measure traffic, and support site functionality.",
          "We may display advertisements through Google AdSense. Google and its partners may use cookies to serve ads based on your prior visits to this or other websites. You can learn more about how Google uses data at https://policies.google.com/technologies/partner-sites.",
          "You can manage or disable cookies through your browser settings. Some features may not function properly if cookies are disabled.",
        ],
      },
      {
        id: "how-we-use",
        title: "How We Use Information",
        paragraphs: ["We use collected information to:"],
        list: [
          "Provide and maintain the downloader service.",
          "Analyze usage trends and improve performance.",
          "Detect, prevent, and address technical issues or abuse.",
          "Comply with legal obligations.",
        ],
      },
      {
        id: "sharing",
        title: "How We Share Information",
        paragraphs: [
          "We do not sell your personal information. We may share limited data with trusted service providers who help us operate the website, such as hosting, analytics, and advertising partners, only as needed to perform their services.",
          "We may disclose information if required by law, regulation, legal process, or governmental request.",
        ],
      },
      {
        id: "retention",
        title: "Data Retention",
        paragraphs: [
          "We retain analytics and operational data only for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required by law.",
          "Submitted Instagram URLs and related download metadata may be stored temporarily for analytics and service reliability.",
        ],
      },
      {
        id: "your-rights",
        title: "Your Rights",
        paragraphs: [
          "Depending on your location, you may have rights to access, correct, delete, or restrict processing of your personal information.",
          `To make a privacy-related request, contact us at ${contactEmail}. We will respond within a reasonable timeframe.`,
        ],
      },
      {
        id: "children",
        title: "Children's Privacy",
        paragraphs: [
          "Our service is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us so we can take appropriate action.",
        ],
      },
      {
        id: "changes",
        title: "Changes to This Policy",
        paragraphs: [
          "We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of the service after changes become effective constitutes acceptance of the revised policy.",
        ],
      },
      {
        id: "contact",
        title: "Contact Us",
        paragraphs: [
          `If you have questions about this Privacy Policy, contact us at ${contactEmail}.`,
        ],
      },
    ],
  },
  terms: {
    key: "terms",
    path: "/terms",
    title: "Terms of Service",
    description: `Read the terms and conditions for using ${siteName}, including acceptable use, disclaimers, and limitations of liability.`,
    lastUpdated: "2026-07-03",
    sections: [
      {
        id: "acceptance",
        title: "Acceptance of Terms",
        paragraphs: [
          `By accessing or using ${siteName}, you agree to be bound by these Terms of Service. If you do not agree, please do not use the website.`,
        ],
      },
      {
        id: "service",
        title: "Description of Service",
        paragraphs: [
          `${siteName} provides an online tool that allows users to download publicly available Instagram content such as reels, videos, photos, and stories by submitting a URL.`,
          "We do not provide access to private accounts, password-protected content, or content that requires authentication beyond what is publicly accessible on Instagram.",
        ],
      },
      {
        id: "no-affiliation",
        title: "No Affiliation with Instagram or Meta",
        paragraphs: [
          `${siteName} is an independent service and is not affiliated with, endorsed by, sponsored by, or officially connected to Instagram, Meta Platforms, Inc., or any of their subsidiaries.`,
          "Instagram is a trademark of Meta Platforms, Inc. All trademarks belong to their respective owners.",
        ],
      },
      {
        id: "acceptable-use",
        title: "Acceptable Use",
        paragraphs: ["You agree that you will not:"],
        list: [
          "Use the service to download content you do not have the right to access or reproduce.",
          "Violate copyright, trademark, privacy, or other intellectual property rights.",
          "Use the service for harassment, fraud, spam, or unlawful activity.",
          "Attempt to disrupt, reverse engineer, or overload the website or its infrastructure.",
          "Use automated systems to abuse the service in ways that impair availability for others.",
        ],
      },
      {
        id: "user-responsibility",
        title: "User Responsibility",
        paragraphs: [
          "You are solely responsible for how you use downloaded content. Before downloading or reusing any media, ensure you have the necessary rights, permissions, or legal basis to do so.",
          "We are not responsible for any misuse of content obtained through our service.",
        ],
      },
      {
        id: "disclaimer",
        title: "Disclaimer of Warranties",
        paragraphs: [
          `The service is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, and non-infringement.`,
          "We do not guarantee that the service will be uninterrupted, error-free, or compatible with every Instagram URL or media format.",
        ],
      },
      {
        id: "liability",
        title: "Limitation of Liability",
        paragraphs: [
          `To the fullest extent permitted by law, ${siteName} and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.`,
          "Our total liability for any claim relating to the service shall not exceed the amount you paid to use the service, if any, during the twelve months preceding the claim.",
        ],
      },
      {
        id: "termination",
        title: "Termination",
        paragraphs: [
          "We may suspend or terminate access to the service at any time, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.",
        ],
      },
      {
        id: "changes",
        title: "Changes to Terms",
        paragraphs: [
          "We may revise these Terms at any time by posting an updated version on this page. Your continued use of the service after changes are posted constitutes acceptance of the updated Terms.",
        ],
      },
      {
        id: "contact",
        title: "Contact",
        paragraphs: [
          `For questions about these Terms of Service, contact us at ${contactEmail}.`,
        ],
      },
    ],
  },
  dmca: {
    key: "dmca",
    path: "/dmca",
    title: "DMCA Policy",
    description: `Copyright and DMCA takedown information for ${siteName}, including how rights holders can report infringing content.`,
    lastUpdated: "2026-07-03",
    sections: [
      {
        id: "policy",
        title: "Copyright Policy",
        paragraphs: [
          `${siteName} respects the intellectual property rights of others and expects users to do the same. We respond to notices of alleged copyright infringement in accordance with the Digital Millennium Copyright Act (DMCA) and applicable law.`,
          "Our service processes publicly available Instagram URLs submitted by users. We do not host user-uploaded files on a permanent public gallery. If you believe content accessible through our service infringes your copyright, you may submit a DMCA notice as described below.",
        ],
      },
      {
        id: "notice",
        title: "Filing a DMCA Takedown Notice",
        paragraphs: [
          "To submit a valid DMCA notice, please provide the following information in writing to our designated contact:",
        ],
        list: [
          "Identification of the copyrighted work you claim has been infringed.",
          "Identification of the material you claim is infringing, including the specific Instagram URL(s) involved.",
          "Your contact information, including name, address, telephone number, and email address.",
          "A statement that you have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law.",
          "A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on the owner's behalf.",
          "Your physical or electronic signature.",
        ],
      },
      {
        id: "agent",
        title: "Designated Copyright Agent",
        paragraphs: [
          `Please send DMCA notices to: ${contactEmail}`,
          "Subject line: DMCA Takedown Request",
          "We will review complete and valid notices and take appropriate action, which may include disabling access to specific URLs or content associated with the reported infringement.",
        ],
      },
      {
        id: "counter",
        title: "Counter-Notification",
        paragraphs: [
          "If you believe material was removed or disabled by mistake or misidentification, you may submit a counter-notification that includes:",
        ],
        list: [
          "Identification of the material that was removed and its location before removal.",
          "Your name, address, telephone number, and email address.",
          "A statement under penalty of perjury that you have a good faith belief the material was removed as a result of mistake or misidentification.",
          "A statement that you consent to the jurisdiction of the federal court in your district, or if outside the United States, the jurisdiction where the service provider is located.",
          "Your physical or electronic signature.",
        ],
      },
      {
        id: "repeat",
        title: "Repeat Infringers",
        paragraphs: [
          "We may terminate access for users who are determined to be repeat infringers in appropriate circumstances.",
        ],
      },
      {
        id: "contact",
        title: "Questions",
        paragraphs: [
          `For copyright-related questions, contact us at ${contactEmail}.`,
        ],
      },
    ],
  },
};

export const legalPageList = Object.values(legalPages);

export function getLegalPage(key: LegalPageContent["key"]): LegalPageContent {
  return legalPages[key];
}
