import ProductShowcase from "@/components/sections/ProductShowcase";
import { client } from "@/lib/sanity/client";
import { productsQuery, productsPageQuery, siteSettingsQuery } from "@/lib/sanity/queries";

export const revalidate = 3600;

async function getData() {
  try {
    const [products, pageData, siteSettings] = await Promise.all([
      client.fetch(productsQuery),
      client.fetch(productsPageQuery),
      client.fetch(siteSettingsQuery),
    ]);
    return { products, pageData, siteSettings };
  } catch (error) {
    console.error("Error Fetching Data:", error);
    return { products: null, pageData: null, siteSettings: null };
  }
}

export default async function ProductsPage() {
  const { products, pageData, siteSettings } = await getData();

  return (
    <div className="pt-24 min-h-screen bg-[var(--color-bg)] relative overflow-hidden">
      <ProductShowcase
        initialProducts={products}
        headerData={pageData}
        siteSettings={siteSettings}
      />
    </div>
  );
}
