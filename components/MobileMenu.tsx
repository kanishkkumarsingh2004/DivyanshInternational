"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalized, LocaleString } from "@/lib/i18n";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  products?: { title: LocaleString; slug: { current: string } }[];
  menuItems?: { label: string; url: string }[];
  productsLabel?: string;
  closeMenuAriaLabel?: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  products,
  menuItems,
  productsLabel,
  closeMenuAriaLabel,
}: MobileMenuProps) {
  const { language } = useLanguage();
  const items = menuItems || [];
  const productLinks = products || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="p-6">
              {/* Close Button */}
              <div className="flex justify-between items-center mb-4">
                <LanguageSwitcher />
                <button
                  onClick={onClose}
                  className="text-[var(--color-deep-brown)] hover:text-[var(--color-gold)] focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded p-2"
                  aria-label={closeMenuAriaLabel}
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

              <ul className="mt-8 space-y-2">
                {items.map((item) => (
                  <li key={item.url}>
                    <Link
                      href={item.url}
                      className="block w-full text-left px-4 py-2 text-[var(--color-deep-brown)] hover:bg-[var(--color-beige)] rounded-lg transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}

                {/* Products Section */}
                <li className="pt-4 border-t border-gray-200 mt-4">
                  <div className="px-4 py-2 font-semibold text-[var(--color-deep-brown)] mb-2">
                    {productsLabel}
                  </div>
                  <ul className="space-y-1">
                    {productLinks.map((product) => {
                      const slug =
                        typeof product.slug === "string" ? product.slug : product.slug.current;
                      return (
                        <li key={slug}>
                          <Link
                            href={`/products/${slug}`}
                            className="block px-4 py-2 text-[var(--color-text)] hover:bg-[var(--color-beige)] rounded-lg transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded"
                            onClick={onClose}
                          >
                            {getLocalized(product.title, language)}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
