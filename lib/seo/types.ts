export interface Organization {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    "@type": string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    "@type": string;
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
  sameAs: string[];
}

export interface Product {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string;
  url: string;
}

export interface Brand {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  image: string;
}
