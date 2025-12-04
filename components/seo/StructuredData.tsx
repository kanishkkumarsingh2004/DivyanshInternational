import Script from "next/script";

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

interface StructuredDataProps {
  organization?: OrganizationData;
}

export default function StructuredData({ organization }: StructuredDataProps) {
  if (!organization) return null;

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.name,
    url: organization.url,
    logo: organization.logoUrl,
    description: organization.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: organization.address.streetAddress,
      addressLocality: organization.address.addressLocality,
      addressRegion: organization.address.addressRegion,
      postalCode: organization.address.postalCode,
      addressCountry: organization.address.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: organization.contactPoint.telephone,
      contactType: organization.contactPoint.contactType,
      areaServed: organization.contactPoint.areaServed,
      availableLanguage: organization.contactPoint.availableLanguage,
    },
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
    />
  );
}
