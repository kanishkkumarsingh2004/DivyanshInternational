import { MetadataRoute } from "next";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteSettings = await client.fetch(siteSettingsQuery);
  const robotsConfig = siteSettings.seo.robots;
  const siteUrl = siteSettings.seo.siteUrl;

  return {
    rules: {
      userAgent: robotsConfig.userAgent,
      allow: robotsConfig.allowPath,
      disallow: robotsConfig.disallowPath,
    },
    sitemap: `${siteUrl}${robotsConfig.sitemapPath}`,
  };
}
