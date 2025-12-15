"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import AnimatedTitle from "@/components/AnimatedTitle";

import type { SanityImageSource } from "@sanity/image-url";
import { motion } from "framer-motion";
import {
  LeafIcon,
  NutIcon,
  AlmondIcon,
  CashewIcon,
  WalnutIcon,
  PeanutIcon,
} from "@/components/assets/Decorations";

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
      className="py-20 bg-gradient-to-b from-[var(--color-ivory)] via-[var(--color-cashew-cream)] to-[var(--color-beige)] relative overflow-hidden"
    >
      {/* Floating Dry Fruits Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
        
        {/* Almonds */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], y: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-16 opacity-15"
        >
          <AlmondIcon className="w-28 h-28" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -14, 14, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/3 left-20 opacity-15"
        >
          <AlmondIcon className="w-32 h-32" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 12, -12, 0], y: [0, 10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-10 left-10 opacity-12"
        >
          <AlmondIcon className="w-30 h-30" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -13, 13, 0], x: [0, 12, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-10 right-10 opacity-15"
        >
          <AlmondIcon className="w-26 h-26" />
        </motion.div>
        
        {/* Cashews */}
        <motion.div
          animate={{ rotate: [0, 12, -12, 0], y: [0, 10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/2 left-10 opacity-15"
        >
          <CashewIcon className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], x: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-24 opacity-15"
        >
          <CashewIcon className="w-26 h-26" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 13, -13, 0], y: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-20 left-1/3 opacity-12"
        >
          <CashewIcon className="w-28 h-28" />
        </motion.div>

        {/* Walnuts */}
        <motion.div
          animate={{ rotate: [0, -9, 9, 0], y: [0, -8, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute top-1/3 left-1/4 opacity-15"
        >
          <WalnutIcon className="w-26 h-26" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute bottom-40 right-1/3 opacity-12"
        >
          <WalnutIcon className="w-30 h-30" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], x: [0, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-1/4 right-1/4 opacity-15"
        >
          <WalnutIcon className="w-24 h-24" />
        </motion.div>

        {/* Peanuts */}
        <motion.div
          animate={{ rotate: [0, 11, -11, 0], x: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-1/3 left-1/3 opacity-15"
        >
          <PeanutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -14, 14, 0], y: [0, 10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-2/3 right-20 opacity-12"
        >
          <PeanutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 12, -12, 0], x: [0, -10, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 7 }}
          className="absolute bottom-20 left-20 opacity-15"
        >
          <PeanutIcon className="w-20 h-20" />
        </motion.div>

        {/* Additional Almonds */}
        <motion.div
          animate={{ rotate: [0, -11, 11, 0], y: [0, 12, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3.5 }}
          className="absolute top-1/2 right-1/3 opacity-12"
        >
          <AlmondIcon className="w-26 h-26" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], x: [0, 8, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 8 }}
          className="absolute bottom-1/2 left-1/4 opacity-15"
        >
          <AlmondIcon className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -14, 14, 0], y: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 10 }}
          className="absolute top-3/4 left-10 opacity-12"
        >
          <AlmondIcon className="w-28 h-28" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 12, -12, 0], x: [0, 10, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 11 }}
          className="absolute bottom-10 right-1/3 opacity-15"
        >
          <AlmondIcon className="w-30 h-30" />
        </motion.div>

        {/* More Cashews */}
        <motion.div
          animate={{ rotate: [0, 16, -16, 0], y: [0, 10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 9 }}
          className="absolute top-10 right-1/4 opacity-12"
        >
          <CashewIcon className="w-26 h-26" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -15, 15, 0], x: [0, -12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 12 }}
          className="absolute bottom-1/4 left-1/3 opacity-15"
        >
          <CashewIcon className="w-28 h-28" />
        </motion.div>

        {/* Extra Walnuts */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.12, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 3 }}
          className="absolute top-1/4 left-10 opacity-12"
        >
          <WalnutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute bottom-1/2 right-10 opacity-15"
        >
          <WalnutIcon className="w-26 h-26" />
        </motion.div>

        {/* Extra Peanuts */}
        <motion.div
          animate={{ rotate: [0, 13, -13, 0], y: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 13 }}
          className="absolute top-1/3 right-10 opacity-12"
        >
          <PeanutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -16, 16, 0], x: [0, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 14 }}
          className="absolute bottom-1/3 left-10 opacity-15"
        >
          <PeanutIcon className="w-22 h-22" />
        </motion.div>

        {/* Ultra Dense Layer */}
        <motion.div animate={{ rotate: [0, 10, -10, 0], y: [0, 8, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 15 }} className="absolute top-5 left-1/4 opacity-10">
          <AlmondIcon className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -11, 11, 0], x: [0, -8, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 16 }} className="absolute top-5 right-1/4 opacity-10">
          <CashewIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 12, -12, 0], y: [0, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 17 }} className="absolute bottom-5 left-1/4 opacity-10">
          <WalnutIcon className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -13, 13, 0], x: [0, 10, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 18 }} className="absolute bottom-5 right-1/4 opacity-10">
          <PeanutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 14, -14, 0], y: [0, 12, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 19 }} className="absolute top-1/4 left-5 opacity-12">
          <AlmondIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -15, 15, 0], x: [0, -10, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 20 }} className="absolute top-1/4 right-5 opacity-12">
          <CashewIcon className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 16, -16, 0], y: [0, -8, 0] }} transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 21 }} className="absolute bottom-1/4 left-5 opacity-10">
          <WalnutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -17, 17, 0], x: [0, 8, 0] }} transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 22 }} className="absolute bottom-1/4 right-5 opacity-12">
          <PeanutIcon className="w-24 h-24" />
        </motion.div>

        {/* Scattered Small Nuts */}
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 5 }} className="absolute top-10 left-1/3 opacity-8">
          <AlmondIcon className="w-18 h-18" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.12, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 6 }} className="absolute top-10 right-1/3 opacity-8">
          <CashewIcon className="w-18 h-18" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 7 }} className="absolute bottom-10 left-1/3 opacity-8">
          <WalnutIcon className="w-18 h-18" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }} transition={{ duration: 21, repeat: Infinity, ease: "linear", delay: 8 }} className="absolute bottom-10 right-1/3 opacity-8">
          <PeanutIcon className="w-18 h-18" />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        {headerData && (
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <motion.p 
              className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {headerData.eyebrow}
            </motion.p>
            <AnimatedTitle 
              direction="left" 
              delay={0.2}
              className="text-3xl md:text-4xl font-semibold text-[var(--color-graphite)] mb-4"
            >
              {headerData.title}
            </AnimatedTitle>
            <motion.p 
              className="text-lg text-[var(--color-slate)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {headerData.description}
            </motion.p>
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
