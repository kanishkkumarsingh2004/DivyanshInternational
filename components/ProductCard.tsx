"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity/client";
import type { SanityImageSource } from "@sanity/image-url";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalized, LocaleString, LocaleText } from "@/lib/i18n";

interface Product {
  _id: string;
  title: LocaleString;
  category: string;
  description?: LocaleText;
  slug?: { current?: string };
  heroHeading?: LocaleString;
  introParagraphs?: LocaleText[];
  listSections?: { title: LocaleString; items: LocaleString[] }[];
  heroImage?: SanityImageSource;
}

interface Labels {
  common: {
    viewSpecs: string;
    addToEnquiry: string;
  };
  productCard: {
    placeholderText: string;
  };
}

interface ProductCardProps {
  product: Product;
  onViewSpecs: () => void;
  onAddToEnquiry: () => void;
  labels: Labels;
}

export default function ProductCard({
  product,
  onViewSpecs,
  onAddToEnquiry,
  labels,
}: ProductCardProps) {
  const { language } = useLanguage();
  const productSlug = product.slug?.current || product.category;
  const productTitle = getLocalized(product.title, language);
  const heroHeading = getLocalized(product.heroHeading, language);
  const intro = getLocalized(product.introParagraphs?.[0], language) || getLocalized(product.description, language) || "";
  const quickItems = product.listSections?.[0]?.items.slice(0, 2) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="group relative flex flex-col h-full bg-gradient-to-br from-white via-[var(--color-ivory)] to-[var(--color-cashew-cream)] rounded-3xl border-2 border-[var(--color-gold-light)] shadow-lg hover:shadow-2xl hover:border-[var(--color-almond-gold)] transition-all duration-300 overflow-hidden"
    >
      {/* Premium shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <Link href={`/products/${productSlug}`} className="block flex-1 p-6 space-y-4">
        <div className="relative aspect-square w-full rounded-2xl border border-dashed border-[var(--color-deep-brown)] bg-[var(--color-beige)] flex items-center justify-center text-center overflow-hidden">
          {product.heroImage ? (
            <Image
              src={urlFor(product.heroImage).width(500).height(500).url()}
              alt={productTitle}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
              {labels.productCard.placeholderText}
            </span>
          )}
        </div>
        <span className="inline-flex items-center px-3 py-1 text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] bg-white rounded-full border border-[#efe3d2] mb-4">
          {product.category}
        </span>
        <h3 className="text-xl font-bold text-[var(--color-deep-brown)] mb-3">
          {heroHeading || productTitle}
        </h3>
        <p className="text-[var(--color-muted)] text-sm mb-4 leading-relaxed line-clamp-4">
          {intro}
        </p>
        {quickItems.length > 0 && (
          <ul className="space-y-2 text-sm text-[var(--color-slate)]">
            {quickItems.map((item) => (
              <li key={getLocalized(item, language)} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] mt-2"
                />
                <span>{getLocalized(item, language)}</span>
              </li>
            ))}
          </ul>
        )}
      </Link>
      <div className="px-6 pb-6 mt-auto flex flex-col sm:flex-row gap-2">
        <button
          onClick={onViewSpecs}
          className="flex-1 border-2 border-[var(--color-almond-gold)] text-[var(--color-deep-brown)] hover:bg-[var(--color-cashew-cream)] hover:border-[var(--color-gold-dark)] px-4 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 focus:outline-2 focus:outline-[var(--color-gold)] focus:outline-offset-2"
          aria-label={`View specs for ${productTitle}`}
        >
          {labels.common.viewSpecs}
        </button>
        <button
          onClick={onAddToEnquiry}
          className="flex-1 bg-gradient-to-r from-[var(--color-almond-gold)] to-[var(--color-gold-dark)] hover:shadow-lg text-white px-4 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 focus:outline-2 focus:outline-[var(--color-gold-dark)] focus:outline-offset-2"
          aria-label={`Add ${productTitle} to enquiry`}
        >
          {labels.common.addToEnquiry}
        </button>
      </div>
    </motion.div>
  );
}
