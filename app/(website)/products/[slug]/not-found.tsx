import Link from "next/link";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

export default async function ProductNotFound() {
  const siteSettings = await client.fetch(siteSettingsQuery);
  const labels = siteSettings.error;
  const navigation = siteSettings.navigation;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold text-[var(--color-deep-brown)] mb-4 font-serif">
        {labels.notFoundTitle}
      </h1>
      <p className="text-[var(--color-muted)] mb-8 max-w-md">{labels.notFoundText}</p>
      <Link
        href={navigation.productsUrl}
        className="bg-[var(--color-gold)] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-gold-dark)] transition-colors focus:outline-2 focus:outline-[var(--color-gold-dark)] focus:outline-offset-2"
      >
        {labels.backHomeButton}
      </Link>
    </div>
  );
}
