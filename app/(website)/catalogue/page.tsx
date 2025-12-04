import { Suspense } from "react";
import ProductCatalogueBook from "@/components/ProductCatalogueBook";
import { client } from "@/lib/sanity/client";
import { productsQuery } from "@/lib/sanity/queries";

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

export default async function CataloguePage() {
    const products = await getProducts();

    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading catalogue...</div>}>
            <ProductCatalogueBook products={products} />
        </Suspense>
    );
}
