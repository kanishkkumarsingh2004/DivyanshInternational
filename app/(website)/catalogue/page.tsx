import FlipHTML5Catalog from "@/components/FlipHTML5Catalog";
import { client } from "@/lib/sanity/client";
import { fliphtml5SettingsQuery } from "@/lib/sanity/queries";

export const metadata = {
  title: "Product Catalogue | Divyansh International",
  description: "Browse our interactive product catalogue with premium quality dry fruits and spices.",
};

export const revalidate = 3600; // Revalidate every hour

async function getFlipHTML5Settings() {
  try {
    const settings = await client.fetch(fliphtml5SettingsQuery);
    return settings || null;
  } catch (error) {
    console.error("Error fetching FlipHTML5 settings:", error);
    return null;
  }
}

export default async function CataloguePage() {
  const fliphtml5Settings = await getFlipHTML5Settings();

  return (
    <FlipHTML5Catalog 
      settings={fliphtml5Settings}
    />
  );
}