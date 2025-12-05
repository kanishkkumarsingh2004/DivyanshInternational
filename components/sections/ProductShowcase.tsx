"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";

import type { SanityImageSource } from "@sanity/image-url";
import { motion } from "framer-motion";
import { LeafIcon, NutIcon } from "@/components/assets/Decorations";

import { LocaleString, LocaleText } from "@/lib/i18n";

interface Product {
  _id: string;
  title: LocaleString;
  category: string;
  slug?: { current?: string };
  heroHeading?: LocaleString;
  introParagraphs?: LocaleText[];
  listSections?: { title: LocaleString; items: LocaleString[] }[];
  ctaLine?: LocaleString;
  description?: LocaleText;
  heroImage?: SanityImageSource;
}

interface ProductShowcaseProps {
  initialProducts?: Product[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings?: any;
  headerData?: {
    eyebrow?: string;
    title?: string;
    description?: string;
  };
}

export default function ProductShowcase({
  initialProducts,
  siteSettings,
  headerData,
}: ProductShowcaseProps) {
  const [products] = useState<Product[]>(initialProducts || []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewSpecs = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAddToEnquiry = (product: Product) => {
    if (typeof window !== "undefined") {
      const eventName = siteSettings?.analytics?.eventAddToEnquiry;
      const event = new CustomEvent(eventName, { detail: product });
      window.dispatchEvent(event);
    }
  };

  return (
    <section
      id={siteSettings?.routing?.productsSectionId}
      className="py-20 bg-[var(--color-ivory)] relative overflow-hidden"
    >
      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-0 text-[var(--color-gold)]/5"
        >
          <LeafIcon className="w-80 h-80" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-10 right-0 text-[var(--color-gold)]/5"
        >
          <NutIcon className="w-96 h-96" />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        {headerData && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
              {headerData.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-graphite)] mb-4">
              {headerData.title}
            </h2>
            <p className="text-lg text-[var(--color-slate)]">{headerData.description}</p>
          </div>
        )}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <ProductCard
                product={product}
                onViewSpecs={() => handleViewSpecs(product)}
                onAddToEnquiry={() => handleAddToEnquiry(product)}
                labels={siteSettings}
              />
            </motion.div>
          ))}
        </motion.div>

        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToEnquiry={() => {
            if (selectedProduct) {
              handleAddToEnquiry(selectedProduct);
            }
          }}
          labels={siteSettings}
        />
      </div>
    </section>
  );
}
