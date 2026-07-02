import { BackgroundGradient } from "@/components/ui/background-gradient";
import { AdBanner } from "@/components/ads/ad-banner";
import { HomePageAdLayout } from "@/components/ads/home-page-ad-layout";
import { FaqSection } from "@/features/home/components/faq-section";
import { FeaturesSection } from "@/features/home/components/features-section";
import { HeroSection } from "@/features/home/components/hero-section";
import { HowItWorksSection } from "@/features/home/components/how-it-works-section";
import { SupportedMediaSection } from "@/features/home/components/supported-media-section";

export function LandingPage() {
  return (
    <HomePageAdLayout>
      <BackgroundGradient />
      <HeroSection />
      <AdBanner slotKey="homeHero" />
      <FeaturesSection />
      <AdBanner slotKey="homeBetweenSections" />
      <HowItWorksSection />
      <AdBanner slotKey="homeBetweenSections" />
      <SupportedMediaSection />
      <AdBanner slotKey="homeBetweenSections" />
      <FaqSection />
    </HomePageAdLayout>
  );
}
