"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/components/analytics/GA4";
import Script from "next/script";
import { generateProductSchema } from "@/lib/seo/schema";

interface Product {
  _id: string;
  title: string;
  category: string;
  description?: string;
  slug?: { current?: string };
  heroHeading?: string;
  introParagraphs?: string[];
  listSections?: { title: string; items: string[] }[];
  ctaLine?: string;
}

interface Labels {
  productModal: {
    closeAria: string;
    placeholder: string;
    addToEnquiry: string;
    requestSample: string;
  };
  analytics: {
    eventSampleRequest: string;
    eventAddToEnquiryGA: string;
    locationModal: string;
  };
  routing: {
    queryParamType: string;
    queryParamProduct: string;
  };
  apiConfig: {
    enquiryTypeTrade: string;
  };
  seo: {
    siteUrl: string;
  };
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToEnquiry: () => void;
  labels: Labels;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToEnquiry,
  labels,
}: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements?.[0] as HTMLElement;
      firstElement?.focus();
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  const handleRequestSample = () => {
    trackEvent(labels.analytics.eventSampleRequest, { product: product.title });
    window.location.href = `/contact?${labels.routing.queryParamType}=${labels.apiConfig.enquiryTypeTrade}&${labels.routing.queryParamProduct}=${encodeURIComponent(product.title)}`;
  };

  const handleAddToEnquiry = () => {
    trackEvent(labels.analytics.eventAddToEnquiryGA, {
      product: product.title,
      location: labels.analytics.locationModal,
    });
    onAddToEnquiry();
  };

  const productSchema = generateProductSchema(
    {
      title: product.title,
      description: product.description,
      slug: product.slug,
    },
    labels.seo.siteUrl
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Script
            id={`product-schema-${product._id}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(productSchema),
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
            aria-hidden="true"
          />
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Close Button */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
                <h2
                  id="product-modal-title"
                  className="text-2xl font-bold text-[var(--color-deep-brown)]"
                >
                  {product.title}
                </h2>
                <button
                  onClick={onClose}
                  className="text-[var(--color-muted)] hover:text-[var(--color-deep-brown)] focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded p-2"
                  aria-label={labels.productModal.closeAria}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="rounded-2xl border border-dashed border-[var(--color-deep-brown)] bg-[var(--color-beige)] min-h-[220px] flex items-center justify-center text-center text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                  {labels.productModal.placeholder}
                </div>
                {product.heroHeading && (
                  <p className="text-[var(--color-deep-brown)] font-semibold">
                    {product.heroHeading}
                  </p>
                )}
                {product.introParagraphs?.length ? (
                  <div className="space-y-3 text-[var(--color-text)]">
                    {product.introParagraphs.slice(0, 2).map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  product.description && (
                    <p className="text-[var(--color-text)]">{product.description}</p>
                  )
                )}

                {product.listSections && product.listSections.length > 0 && (
                  <div className="grid gap-4">
                    {product.listSections.slice(0, 3).map((section) => (
                      <div
                        key={section.title}
                        className="border border-[#efe3d2] rounded-xl p-4 bg-[var(--color-beige)]/50"
                      >
                        <h3 className="font-semibold text-[var(--color-deep-brown)] mb-2">
                          {section.title}
                        </h3>
                        <ul className="space-y-1 text-[var(--color-text)] text-sm">
                          {section.items.slice(0, 4).map((item) => (
                            <li key={item} className="flex gap-2">
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1 w-1 rounded-full bg-[var(--color-gold)]"
                              />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {product.ctaLine && (
                  <p className="text-sm font-semibold text-[var(--color-deep-brown)]">
                    {product.ctaLine}
                  </p>
                )}

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleAddToEnquiry}
                    className="flex-1 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-2 focus:outline-[var(--color-gold-dark)] focus:outline-offset-2"
                  >
                    {labels.productModal.addToEnquiry}
                  </button>
                  <button
                    onClick={handleRequestSample}
                    className="flex-1 border-2 border-[var(--color-deep-brown)] text-[var(--color-deep-brown)] hover:bg-[var(--color-deep-brown)] hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:outline-offset-2"
                  >
                    {labels.productModal.requestSample}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
