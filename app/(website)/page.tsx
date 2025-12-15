import HeroSlider from "@/components/sections/HeroSlider";
import CapabilitiesSection from "@/components/sections/CapabilitiesSection";
import ProductShowcase from "@/components/sections/ProductShowcase";
import ProcessSection from "@/components/sections/ProcessSection";
import VideoTestimonialsSection from "@/components/sections/VideoTestimonials";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import TrustSection from "@/components/sections/TrustSection";
import CTASection from "@/components/sections/CTASection";

import SpiralQuote from "@/components/SpiralQuote";
import AnimationWrapper from "@/components/AnimationWrapper";
import Script from "next/script";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo/schema";

import { client } from "@/lib/sanity/client";
import {
  productsQuery,
  heroSlidesQuery,
  capabilitiesQuery,
  certificatesQuery,
  testimonialsQuery,
  processQuery as processStepsQuery,
  sustainabilityQuery as sustainabilityPillarsQuery,
  ctaQuery,
  quoteQuery,
  siteSettingsQuery,
  footerQuery,
  testimonialsSectionQuery,
  homePageQuery,
} from "@/lib/sanity/queries";

export const revalidate = 3600;

async function getData() {
  try {
    const [
      products,
      heroSlides,
      capabilities,
      certificates,
      testimonials,
      processSteps,
      sustainabilityPillars,
      cta,
      quote,
      siteSettings,
      footer,
      testimonialsSection,
      homePage,
    ] = await Promise.all([
      client.fetch(productsQuery),
      client.fetch(heroSlidesQuery),
      client.fetch(capabilitiesQuery),
      client.fetch(certificatesQuery),
      client.fetch(testimonialsQuery),
      client.fetch(processStepsQuery),
      client.fetch(sustainabilityPillarsQuery),
      client.fetch(ctaQuery),
      client.fetch(quoteQuery),
      client.fetch(siteSettingsQuery),
      client.fetch(footerQuery),
      client.fetch(testimonialsSectionQuery),
      client.fetch(homePageQuery),
    ]);

    return {
      products,
      heroSlides,
      capabilities,
      certificates,
      testimonials,
      processSteps,
      sustainabilityPillars,
      cta,
      quote,
      siteSettings,
      footer,
      testimonialsSection,
      homePage,
    };
  } catch (error) {
    console.error("Error Fetching Data:", error);
    return {
      products: [],
      heroSlides: [],
      capabilities: [],
      certificates: [],
      testimonials: [],
      processSteps: [],
      sustainabilityPillars: [],
      cta: null,
      quote: null,
      siteSettings: null,
      footer: null,
      testimonialsSection: null,
      homePage: null,
    };
  }
}

export default async function Home() {
  const {
    products,
    heroSlides,
    capabilities,
    certificates,
    testimonials,
    processSteps,
    sustainabilityPillars,
    cta,
    quote,
    siteSettings,
    testimonialsSection,
    homePage,
  } = await getData();

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema(siteSettings.organization)),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateWebSiteSchema({
              name: siteSettings.organization.name,
              url: siteSettings.seo.siteUrl,
            })
          ),
        }}
      />
      <AnimationWrapper>
        <HeroSlider
          initialSlides={heroSlides}
          stats={homePage?.heroStats}
          accessibility={siteSettings?.accessibility}
          heroConfig={siteSettings?.heroConfig}
          routing={siteSettings?.routing}
        />
      </AnimationWrapper>
      <AnimationWrapper delay={0.1}>
        <SpiralQuote
          initialQuote={quote}
          labels={{
            spiralQuoteSection: homePage.spiralQuoteSection,
            navigation: siteSettings.navigation,
          }}
        />
      </AnimationWrapper>
      <AnimationWrapper delay={0.2}>
        <CapabilitiesSection
          initialCapabilities={capabilities}
          initialCertificates={certificates}
          sectionSettings={homePage?.capabilitiesSection}
        />
      </AnimationWrapper>
      
      <AnimationWrapper delay={0.4}>
        <ProcessSection
          initialProcessSteps={processSteps}
          sectionSettings={homePage?.processSection}
          routing={siteSettings?.routing}
        />
      </AnimationWrapper>
      <AnimationWrapper delay={0.3}>
        <ProductShowcase
          initialProducts={products}
          siteSettings={siteSettings}
          headerData={homePage?.productShowcaseSection}
        />
      </AnimationWrapper>
      <AnimationWrapper delay={0.5}>
        <VideoTestimonialsSection
          initialTestimonials={testimonials}
          sectionSettings={testimonialsSection}
          routing={siteSettings?.routing}
        />
      </AnimationWrapper>
      <AnimationWrapper delay={0.6}>
        <SustainabilitySection
          initialPillars={sustainabilityPillars}
          sectionSettings={homePage?.sustainabilitySection}
          routing={siteSettings?.routing}
        />
      </AnimationWrapper>
      <AnimationWrapper delay={0.7}>
        <TrustSection
          initialCertificates={certificates}
          sectionSettings={homePage?.trustSection}
          routing={siteSettings?.routing}
        />
      </AnimationWrapper>
      <AnimationWrapper delay={0.8}>
        <CTASection initialCTA={cta} />
      </AnimationWrapper>
    </>
  );
}
