import ClientSection from "@/components/landing/client-section";
import CallToActionSection from "@/components/landing/cta-section";
import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <ClientSection />
      <PricingSection />
      <CallToActionSection />
    </>
  );
}
