"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/components/analytics/GA4";

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
  productDetail: {
    heroPlaceholder: string;
    addToEnquiry: string;
    requestSample: string;
    backToProducts: string;
    programSuffix: string;
  };
  common: {
    addToEnquiry: string;
  };
  navigation: {
    home: string;
    products: string;
    homeUrl: string;
    productsUrl: string;
  };
  apiConfig: {
    breadcrumbSeparator: string;
    enquiryTypeTrade: string;
  };
  routing: {
    queryParamType: string;
    queryParamProduct: string;
    queryParamAction: string;
    actionSample: string;
    scrollTargetContact: string;
    productsHash: string;
  };
  analytics: {
    eventAddToEnquiry: string;
    eventAddToEnquiryGA: string;
    eventSampleRequest: string;
    locationProductPage: string;
  };
}

interface ProductDetailProps {
  product: Product;
  labels: Labels;
}

export default function ProductDetail({ product, labels }: ProductDetailProps) {
  const router = useRouter();

  const handleAddToEnquiry = () => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent(labels.analytics.eventAddToEnquiry, { detail: product });
      window.dispatchEvent(event);
      trackEvent(labels.analytics.eventAddToEnquiryGA, {
        product: product.title,
        location: labels.analytics.locationProductPage,
      });

      const element = document.getElementById(labels.routing.scrollTargetContact);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleRequestSample = () => {
    trackEvent(labels.analytics.eventSampleRequest, {
      product: product.title,
      location: labels.analytics.locationProductPage,
    });
    router.push(
      `/contact?${labels.routing.queryParamType}=${labels.apiConfig.enquiryTypeTrade}&${labels.routing.queryParamProduct}=${encodeURIComponent(product.title)}&${labels.routing.queryParamAction}=${labels.routing.actionSample}`
    );
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
          <Link
            href={labels.navigation.homeUrl}
            className="hover:text-[var(--color-gold)] transition-colors"
          >
            {labels.navigation.home}
          </Link>
          <span>{labels.apiConfig.breadcrumbSeparator}</span>
          <Link
            href={`${labels.navigation.homeUrl}${labels.routing.productsHash}`}
            className="hover:text-[var(--color-gold)] transition-colors"
          >
            {labels.navigation.products}
          </Link>
          <span>{labels.apiConfig.breadcrumbSeparator}</span>
          <span className="text-[var(--color-deep-brown)]">{product.title}</span>
        </nav>
      </div>

      {/* Product Content */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-shell border border-[var(--color-sand)] p-8 md:p-10 space-y-8"
        >
          <div className="w-full rounded-3xl border border-dashed border-[var(--color-deep-brown)] bg-[var(--color-beige)] min-h-[320px] flex items-center justify-center text-center text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
            {labels.productDetail.heroPlaceholder}
          </div>
          <div className="space-y-4">
            <p className="uppercase tracking-[0.3em] text-xs text-[var(--color-muted)]">
              {product.category}
              {labels.productDetail.programSuffix}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-deep-brown)] leading-tight">
              {product.heroHeading || product.title}
            </h1>
            {product.introParagraphs?.map((paragraph) => (
              <p key={paragraph} className="text-lg text-[var(--color-text)] leading-relaxed">
                {paragraph}
              </p>
            ))}
            {!product.introParagraphs?.length && product.description && (
              <p className="text-lg text-[var(--color-text)] leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          {product.listSections && product.listSections.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {product.listSections.map((section) => (
                <div
                  key={section.title}
                  className="border border-[var(--color-sand)] rounded-2xl p-5 bg-white"
                >
                  <h3 className="text-xl font-semibold text-[var(--color-deep-brown)] mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2 text-[var(--color-text)] leading-relaxed">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]"
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
            <p className="text-lg font-semibold text-[var(--color-deep-brown)] bg-[var(--color-sand)] border border-[var(--color-sand)] rounded-2xl p-5">
              {product.ctaLine}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={handleAddToEnquiry}
              className="flex-1 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors focus:outline-2 focus:outline-[var(--color-gold-dark)] focus:outline-offset-2"
            >
              {labels.common.addToEnquiry}
            </button>
            <button
              onClick={handleRequestSample}
              className="flex-1 border-2 border-[var(--color-deep-brown)] text-[var(--color-deep-brown)] hover:bg-[var(--color-deep-brown)] hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:outline-offset-2"
            >
              {labels.productDetail.requestSample}
            </button>
          </div>

          <Link
            href={`${labels.navigation.homeUrl}${labels.routing.productsHash}`}
            className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-dark)] transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            {labels.productDetail.backToProducts}
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
