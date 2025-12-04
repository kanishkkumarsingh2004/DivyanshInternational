"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { urlFor } from "@/lib/sanity/client";
import type { SanityImageSource } from "@sanity/image-url";

interface Product {
  _id: string;
  title: string;
  category: string;
  description?: string;
  slug?: { current?: string };
  heroHeading?: string;
  introParagraphs?: string[];
  listSections?: { title: string; items: string[] }[];
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
  const productSlug = product.slug?.current || product.category;
  const intro = product.introParagraphs?.[0] || product.description || "";
  const quickItems = product.listSections?.[0]?.items.slice(0, 2) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="section-shell border border-[#eee3d2] flex flex-col h-full bg-white"
    >
      <Link href={`/products/${productSlug}`} className="block flex-1 p-6 space-y-4">
        <div className="relative aspect-square w-full rounded-2xl border border-dashed border-[var(--color-deep-brown)] bg-[var(--color-beige)] flex items-center justify-center text-center overflow-hidden">
          {product.heroImage ? (
            <Image
              src={urlFor(product.heroImage).width(500).height(500).url()}
              alt={product.title}
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
          {product.heroHeading || product.title}
        </h3>
        <p className="text-[var(--color-muted)] text-sm mb-4 leading-relaxed line-clamp-4">
          {intro}
        </p>
        {quickItems.length > 0 && (
          <ul className="space-y-2 text-sm text-[var(--color-slate)]">
            {quickItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] mt-2"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </Link>
      <div className="px-6 pb-6 mt-auto flex flex-col sm:flex-row gap-2">
        <button
          onClick={onViewSpecs}
          className="flex-1 border border-[#e8dcc8] text-[var(--color-deep-brown)] hover:bg-[var(--color-beige)] px-4 py-3 rounded-full font-medium transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:outline-offset-2"
          aria-label={`View specs for ${product.title}`}
        >
          {labels.common.viewSpecs}
        </button>
        <button
          onClick={onAddToEnquiry}
          className="flex-1 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-4 py-3 rounded-full font-semibold transition-colors focus:outline-2 focus:outline-[var(--color-gold-dark)] focus:outline-offset-2"
          aria-label={`Add ${product.title} to enquiry`}
        >
          {labels.common.addToEnquiry}
        </button>
      </div>
    </motion.div>
  );
}
