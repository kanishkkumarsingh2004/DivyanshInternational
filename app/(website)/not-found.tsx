import Link from "next/link";
import { NutIcon } from "@/components/assets/Decorations";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

export default async function NotFound() {
  const siteSettings = await client.fetch(siteSettingsQuery);
  const errorSettings = siteSettings.error;
  const navigation = siteSettings.navigation;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <NutIcon className="absolute top-10 left-10 w-64 h-64 text-[var(--color-gold)] animate-spin-slow" />
        <NutIcon className="absolute bottom-10 right-10 w-96 h-96 text-[var(--color-gold)] animate-spin-slow-reverse" />
      </div>

      <div className="relative z-10">
        <h1 className="text-9xl font-bold text-[var(--color-gold)] opacity-20 font-heading">
          {errorSettings.notFoundCode}
        </h1>
        <div className="mt-[-4rem]">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
            {errorSettings.notFoundTitle}
          </h2>
          <p className="text-lg text-[var(--color-slate)] mb-8 max-w-md mx-auto">
            {errorSettings.notFoundText}
          </p>
          <Link
            href={navigation.homeUrl}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-[var(--color-gold)] rounded-full hover:bg-[var(--color-gold-dark)] transition-all shadow-lg hover:-translate-y-1"
          >
            {errorSettings.backHomeButton}
          </Link>
        </div>
      </div>
    </div>
  );
}
