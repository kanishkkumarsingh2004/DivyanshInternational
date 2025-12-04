import type { Product, Brand, Organization } from "./types";

interface OrganizationData {
  name: string;
  url: string;
  logoUrl: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
}

export function generateOrganizationSchema(orgData: OrganizationData): Organization {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: orgData.name,
    url: orgData.url,
    logo: orgData.logoUrl,
    description: orgData.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: orgData.address.streetAddress,
      addressLocality: orgData.address.addressLocality,
      addressRegion: orgData.address.addressRegion,
      postalCode: orgData.address.postalCode,
      addressCountry: orgData.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: orgData.contactPoint.telephone,
      contactType: orgData.contactPoint.contactType,
      areaServed: orgData.contactPoint.areaServed,
      availableLanguage: orgData.contactPoint.availableLanguage,
    },
    sameAs: [],
  };
}

export function generateWebSiteSchema(siteData: { name: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteData.name,
    url: siteData.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteData.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateProductSchema(
  product: {
    title: string;
    description?: string;
    heroImage?: { url?: string };
    slug?: { current?: string };
  },
  baseUrl: string
): Product {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || "",
    image: product.heroImage?.url || "",
    url: `${baseUrl}/products/${product.slug?.current || ""}`,
  };
}

export function generateBrandSchema(brand: {
  name: string;
  brandCopy: string;
  heroImage?: { url?: string };
}): Brand {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    description: brand.brandCopy,
    image: brand.heroImage?.url || "",
  };
}
