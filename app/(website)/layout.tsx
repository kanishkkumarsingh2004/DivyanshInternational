import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";
import FloatingEnquiryBar from "@/components/FloatingEnquiryBar";
import EnquiryBuilder from "@/components/EnquiryBuilder";
import SkipLink from "@/components/SkipLink";
import GA4 from "@/components/analytics/GA4";
import ThemeToggle from "@/components/ThemeToggle";
import StructuredData from "@/components/seo/StructuredData";
import { client } from "@/lib/sanity/client";
import {
  footerQuery,
  headerQuery,
  productListQuery,
  siteSettingsQuery,
} from "@/lib/sanity/queries";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await client.fetch(siteSettingsQuery);
  const seo = siteSettings.seo;

  return {
    metadataBase: new URL(seo.siteUrl),
    title: seo.metaTitle,
    description: seo.metaDescription,
    keywords: seo.keywords,
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      type: seo.ogType,
    },
    twitter: {
      card: seo.twitterCardType,
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
  };
}

export default async function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let headerData = null;
  let footerData = null;
  let productsData = [];
  let siteSettings = null;

  try {
    const [header, footer, products, settings] = await Promise.all([
      client.fetch(headerQuery),
      client.fetch(footerQuery),
      client.fetch(productListQuery),
      client.fetch(siteSettingsQuery),
    ]);
    headerData = header;
    footerData = footer;
    productsData = products;
    siteSettings = settings;
  } catch (error) {
    console.error("Error Fetching Layout Data:", error);
  }

  return (
    <>
      <StructuredData
        organization={{
          ...siteSettings?.organization,
          logoUrl: `${siteSettings?.seo?.siteUrl || ""}/divyansh-logo.jpg`,
        }}
      />
      <GA4 />
      <SkipLink labels={siteSettings?.accessibility} />
      <ThemeToggle labels={siteSettings?.themeToggle} />
      <Header initialHeader={headerData} products={productsData} siteSettings={siteSettings} />
      <main id="main-content">{children}</main>
      <Footer
        initialFooter={footerData}
        labels={siteSettings?.footer}
        accessibility={siteSettings?.accessibility}
        products={productsData}
      />
      <FloatingEnquiryBar labels={siteSettings?.enquiry?.floatingBar} />
      <EnquiryBuilder labels={siteSettings?.enquiry} />
      <FloatingActionButton
        whatsappNumber={siteSettings?.whatsapp?.phoneNumber}
        whatsappMessage={siteSettings?.whatsapp?.messageTemplate}
      />
    </>
  );
}
