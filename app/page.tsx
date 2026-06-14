import { Navigation } from "@/components/landing/navigation";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { InfrastructureSection } from "@/components/landing/infrastructure-section";
import { MetricsSection } from "@/components/landing/metrics-section";
import { IntegrationsSection } from "@/components/landing/integrations-section";
import { SecuritySection } from "@/components/landing/security-section";
import { DevelopersSection } from "@/components/landing/developers-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { FaqSection } from "@/components/landing/faq-section";
import { CtaSection } from "@/components/landing/cta-section";
import { FooterSection } from "@/components/landing/footer-section";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Plumber",
        "@id": "https://denvertoiletpros.com/#business",
        name: "Denver Toilet Pros",
        url: "https://denvertoiletpros.com/",
        telephone: "+1-720-555-0198",
        priceRange: "$$",
        areaServed: [
          { "@type": "City", name: "Denver", addressRegion: "CO", addressCountry: "US" },
          { "@type": "City", name: "Lakewood", addressRegion: "CO", addressCountry: "US" },
          { "@type": "City", name: "Aurora", addressRegion: "CO", addressCountry: "US" },
          { "@type": "City", name: "Arvada", addressRegion: "CO", addressCountry: "US" },
          { "@type": "City", name: "Englewood", addressRegion: "CO", addressCountry: "US" },
          { "@type": "City", name: "Littleton", addressRegion: "CO", addressCountry: "US" },
        ],
        makesOffer: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Toilet replacement in Denver" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Toilet installation in Denver" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Toilet repair in Denver" } },
        ],
      },
      {
        "@type": "Service",
        "@id": "https://denvertoiletpros.com/#toilet-service",
        serviceType: "Toilet installation, replacement, and repair",
        provider: { "@id": "https://denvertoiletpros.com/#business" },
        areaServed: { "@type": "City", name: "Denver", addressRegion: "CO", addressCountry: "US" },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://denvertoiletpros.com/#breadcrumbs",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://denvertoiletpros.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Denver Toilet Service",
            item: "https://denvertoiletpros.com/#features",
          },
        ],
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden noise-overlay">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <InfrastructureSection />
      <MetricsSection />
      <IntegrationsSection />
      <SecuritySection />
      <DevelopersSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <FooterSection />
    </main>
  );
}
