import type { Metadata } from "next";

interface SeoSettings {
  siteUrl: string;
  metaTitle: string;
  metaDescription: string;
  ogType: string;
  twitterCardType: string;
}

export function generateMetadata(
  seoSettings: SeoSettings,
  title?: string,
  description?: string,
  image?: string
): Metadata {
  const finalTitle = title || seoSettings.metaTitle;
  const finalDescription = description || seoSettings.metaDescription;

  return {
    title: finalTitle,
    description: finalDescription,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      type: seoSettings.ogType as "website",
      url: seoSettings.siteUrl,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: seoSettings.twitterCardType as "summary_large_image",
      title: finalTitle,
      description: finalDescription,
      images: image ? [image] : [],
    },
  };
}
