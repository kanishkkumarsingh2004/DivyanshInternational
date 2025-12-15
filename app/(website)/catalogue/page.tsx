import { Suspense } from "react";
import ProductCatalogueBook from "@/components/ProductCatalogueBook";
import { client } from "@/lib/sanity/client";
import { productsQuery, catalogSettingsQuery } from "@/lib/sanity/queries";

export const metadata = {
    title: "Product Catalogue | Divyansh International",
    description: "Browse our interactive product catalogue with premium quality dry fruits and spices.",
};

export const revalidate = 3600;

async function getProducts() {
    try {
        const products = await client.fetch(productsQuery);
        return products || [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

async function getCatalogSettings() {
    try {
        const settings = await client.fetch(catalogSettingsQuery);
        return settings || null;
    } catch (error) {
        console.error("Error fetching catalog settings:", error);
        return null;
    }
}

export default async function CataloguePage() {
    const products = await getProducts();
    const catalogSettings = await getCatalogSettings();

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading catalogue...</div>}>
            <ProductCatalogueBook products={products} backCoverImage={catalogSettings?.backCoverImage} backCoverImageAlt={catalogSettings?.backCoverImageAlt} />
        </Suspense>
    );
}
