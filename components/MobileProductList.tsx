"use client";

import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalized, LocaleString, LocaleText } from "@/lib/i18n";

interface Product {
  _id: string;
  title: LocaleString;
  category: string;
  description?: LocaleText;
  heroImage?: SanityImageSource;
}

interface MobileProductListProps {
  products: Product[];
  selectedProducts: Set<string>;
  toggleProductSelection: (productId: string) => void;
}

export default function MobileProductList({
  products,
  selectedProducts,
  toggleProductSelection,
}: MobileProductListProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6 pb-32">
      {products.map((product) => {
        const productTitle = getLocalized(product.title, language);
        const productDescription = getLocalized(product.description, language);

        return (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-sm border border-[var(--color-sand)] overflow-hidden"
          >
            <div className="relative aspect-video w-full bg-[var(--color-sand)]">
              {product.heroImage && (
                <Image
                  src={urlForImage(product.heroImage).width(600).height(400).url()}
                  alt={productTitle}
                  fill
                  className="object-cover"
                />
              )}
              <div className="absolute top-4 right-4">
                <label className="flex items-center gap-2 cursor-pointer bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product._id)}
                    onChange={() => toggleProductSelection(product._id)}
                    className="w-4 h-4 rounded border-2 border-[var(--color-gold)] text-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold)] cursor-pointer"
                  />
                  <span className="text-xs font-medium text-gray-700">Select</span>
                </label>
              </div>
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-widest text-[var(--color-gold-dark)] font-semibold mb-2">
                {product.category}
              </p>
              <h3 className="text-xl font-bold text-[var(--color-deep-brown)] font-heading mb-3">
                {productTitle}
              </h3>
              {productDescription && (
                <p className="text-sm text-gray-600 leading-relaxed">
                  {productDescription}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
