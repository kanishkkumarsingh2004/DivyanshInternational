"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import ProductsDropdown from "./ProductsDropdown";
import LanguageSwitcher from "./LanguageSwitcher";


import type { SanityImageSource } from "@sanity/image-url";

interface HeaderData {
  logo?: SanityImageSource;
  navLinks?: { label: string; url: string }[];
  tradeButtonText?: string;
  whatsappText?: string;
  logoAlt?: string;
  homeAriaLabel?: string;
  navAriaLabel?: string;
  menuAriaLabel?: string;
  closeMenuAriaLabel?: string;
  productsLabel?: string;
}

interface HeaderProps {
  initialHeader?: HeaderData | null;
  products?: { title: string; slug: { current: string } }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings?: any;
}

export default function Header({ initialHeader, products, siteSettings }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const header = initialHeader || {};

  const whatsappNumber = siteSettings?.whatsapp?.phoneNumber;
  const messageTemplate = siteSettings?.whatsapp?.messageTemplate;

  const whatsappUrl =
    whatsappNumber && messageTemplate
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageTemplate)}`
      : null;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-white/95 backdrop-blur-sm py-4"
          }`}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-3 focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded"
                aria-label={header.homeAriaLabel}
              >
                <Image
                  src="/divyansh-logo.jpg"
                  alt={header.logoAlt || "Divyansh International Logo"}
                  width={56}
                  height={56}
                  className="rounded-full border border-[var(--color-beige)] object-cover mix-blend-multiply"
                  priority
                />
                <span className="md:hidden text-[var(--color-deep-brown)] font-semibold text-lg">
                  Divyansh International
                </span>
                <span className="hidden md:block text-[var(--color-deep-brown)] font-semibold text-lg">
                  {siteSettings?.footer?.companyTitle}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6" aria-label={header.navAriaLabel}>
              <ProductsDropdown products={products || []} labels={siteSettings} />
              {header.navLinks?.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded px-2 py-1"
                >
                  {link.label}
                </Link>
              ))}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text)] hover:text-[var(--color-gold)] transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded px-2 py-1"
                >
                  {header.whatsappText}
                </a>
              )}
              <Link
                href="/contact?type=trade"
                className="bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-6 py-2 rounded-lg font-medium transition-colors focus:outline-2 focus:outline-[var(--color-gold-dark)] focus:outline-offset-2"
              >
                {header.tradeButtonText}
              </Link>
              <div className="pl-2 border-l border-[var(--color-sand)]">
                <LanguageSwitcher />
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-[var(--color-deep-brown)] focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded p-2"
              aria-label={header.menuAriaLabel}
              aria-expanded={isMobileMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        products={products}
        menuItems={header.navLinks}
        productsLabel={header.productsLabel}
        closeMenuAriaLabel={header.closeMenuAriaLabel}
      />
    </>
  );
}
