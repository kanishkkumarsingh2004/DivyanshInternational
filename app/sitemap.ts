import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { siteSettingsQuery } from "@/lib/sanity/queries";

interface Product {
  slug: string;
  _updatedAt: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteSettings = await client.fetch(siteSettingsQuery);
  const baseUrl = siteSettings.seo.siteUrl;
  const sitemapConfig = siteSettings.seo.sitemap;

  const products = await client.fetch<Product[]>(
    groq`*[_type == "product"] { "slug": slug.current, _updatedAt }`
  );

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: sitemapConfig.productDefaults.changeFrequency as "weekly",
    priority: sitemapConfig.productDefaults.priority,
  }));

  const staticPages = sitemapConfig.staticPages.map(
    (page: { path: string; changeFrequency: string; priority: number }) => ({
      url: `${baseUrl}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency as "yearly" | "monthly" | "weekly",
      priority: page.priority,
    })
  );

  return [...staticPages, ...productUrls];
}
