import { notFound } from "next/navigation";
import { client } from "@/lib/sanity/client";
import { productBySlugQuery, siteSettingsQuery } from "@/lib/sanity/queries";
import ProductDetail from "@/components/ProductDetail";
import { getLocalized } from "@/lib/i18n";

import type { Metadata } from "next";

export const revalidate = 3600;

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

import { productListQuery } from "@/lib/sanity/queries";

export async function generateStaticParams() {
  const products = await client.fetch(productListQuery);
  return products.map((product: { slug: { current: string } }) => ({
    slug: product.slug.current,
  }));
}

async function getProduct(slug: string) {
  try {
    const [product, siteSettings] = await Promise.all([
      client.fetch(productBySlugQuery, { slug }),
      client.fetch(siteSettingsQuery),
    ]);
    return { product, siteSettings };
  } catch (error) {
    console.error("Error Fetching Product:", error);
    return { product: null, siteSettings: null };
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { product, siteSettings } = await getProduct(slug);

  if (!product) {
    return {
      title: siteSettings?.error?.notFoundTitle,
    };
  }

  // Use English as default for SEO metadata
  const productTitle = getLocalized(product.title, "en");
  const productDescription = getLocalized(product.description, "en");
  const metaSuffix = siteSettings?.seo?.metaTitleSuffix || "";

  return {
    title: `${productTitle}${metaSuffix}`,
    description: productDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const { product, siteSettings } = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} labels={siteSettings} />;
}
