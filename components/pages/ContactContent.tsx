"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import GeneralEnquiryForm from "@/components/forms/GeneralEnquiryForm";
import TradeEnquiryForm from "@/components/forms/TradeEnquiryForm";
import {
  LeafIcon,
  AlmondIcon,
  NutIcon,
  CashewIcon,
  WalnutIcon,
  PeanutIcon,
} from "@/components/assets/Decorations";

interface ContactContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialContact: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productList: any;
}

export default function ContactContent({
  initialContact,
  siteSettings,
  productList,
}: ContactContentProps) {
  const searchParams = useSearchParams();
  const formLabels = siteSettings?.forms || {};
  const routing = siteSettings?.routing || {};

  const tabValueGeneral = formLabels.tabValueGeneral || "general";
  const tabValueTrade = formLabels.tabValueTrade || "trade";
  const defaultTab = formLabels.defaultTab || tabValueGeneral;

  const typeParam = searchParams.get(routing.queryParamType || "type");
  const activeTabFromUrl =
    typeParam === tabValueTrade || typeParam === tabValueGeneral
      ? (typeParam as "general" | "trade")
      : (defaultTab as "general" | "trade");

  const [activeTab, setActiveTab] = useState<"general" | "trade">(activeTabFromUrl);

  const initialProduct = searchParams.get(routing.queryParamProduct || "product") || "";
  const initialAction = searchParams.get(routing.queryParamAction || "action") || "";

  const contact = initialContact;

  if (!contact) return null;

  return (
    <div className="bg-gradient-to-b from-[var(--color-ivory)] via-[var(--color-cashew-cream)] to-[var(--color-beige)] min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Almonds */}
        <motion.div
          animate={{ rotate: [0, 12, -12, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-16 opacity-15"
        >
          <AlmondIcon className="w-28 h-28" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -15, 15, 0], x: [0, 12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/3 right-12 opacity-15"
        >
          <AlmondIcon className="w-32 h-32" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 18, -18, 0], y: [0, 15, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute bottom-40 left-1/4 opacity-15"
        >
          <AlmondIcon className="w-36 h-36" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -10, 10, 0], x: [0, -10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-20 right-1/4 opacity-12"
        >
          <AlmondIcon className="w-30 h-30" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 13, -13, 0], y: [0, 12, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 7 }}
          className="absolute bottom-20 right-20 opacity-15"
        >
          <AlmondIcon className="w-26 h-26" />
        </motion.div>

        {/* Nuts */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-10 text-[var(--color-deep-brown)]/8"
        >
          <NutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -360], scale: [1, 1.15, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-32 right-1/4 text-[var(--color-deep-brown)]/8"
        >
          <NutIcon className="w-28 h-28" />
        </motion.div>

        {/* Cashews */}
        <motion.div
          animate={{ rotate: [0, 14, -14, 0], x: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 right-20 opacity-15"
        >
          <CashewIcon className="w-26 h-26" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -11, 11, 0], y: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 left-16 opacity-15"
        >
          <CashewIcon className="w-30 h-30" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 12, -12, 0], y: [0, 8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-10 left-1/3 opacity-12"
        >
          <CashewIcon className="w-28 h-28" />
        </motion.div>

        {/* Walnuts */}
        <motion.div
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute top-2/3 left-1/3 opacity-15"
        >
          <WalnutIcon className="w-28 h-28" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute bottom-1/3 right-1/4 opacity-12"
        >
          <WalnutIcon className="w-26 h-26" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], x: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 7 }}
          className="absolute top-1/2 right-10 opacity-15"
        >
          <WalnutIcon className="w-24 h-24" />
        </motion.div>

        {/* Peanuts */}
        <motion.div
          animate={{ rotate: [0, -13, 13, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/3 left-1/4 opacity-15"
        >
          <PeanutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0], x: [0, -8, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-1/3 right-1/3 opacity-15"
        >
          <PeanutIcon className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 14, -14, 0], y: [0, -10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 8 }}
          className="absolute top-3/4 left-10 opacity-12"
        >
          <PeanutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -12, 12, 0], x: [0, 10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 9 }}
          className="absolute bottom-10 right-1/4 opacity-15"
        >
          <PeanutIcon className="w-26 h-26" />
        </motion.div>

        {/* Extra Layer - More Almonds */}
        <motion.div
          animate={{ rotate: [0, 11, -11, 0], y: [0, -10, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 10 }}
          className="absolute top-1/2 left-1/3 opacity-12"
        >
          <AlmondIcon className="w-28 h-28" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -14, 14, 0], x: [0, 12, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 11 }}
          className="absolute bottom-1/2 right-1/3 opacity-15"
        >
          <AlmondIcon className="w-26 h-26" />
        </motion.div>

        {/* Extra Cashews */}
        <motion.div
          animate={{ rotate: [0, 15, -15, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 12 }}
          className="absolute top-1/4 left-1/4 opacity-12"
        >
          <CashewIcon className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -13, 13, 0], x: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 13 }}
          className="absolute bottom-1/4 right-1/4 opacity-15"
        >
          <CashewIcon className="w-28 h-28" />
        </motion.div>

        {/* Extra Walnuts */}
        <motion.div
          animate={{ rotate: [0, 360], scale: [1, 1.12, 1] }}
          transition={{ duration: 21, repeat: Infinity, ease: "linear", delay: 5 }}
          className="absolute top-3/4 left-1/4 opacity-12"
        >
          <WalnutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }}
          transition={{ duration: 19, repeat: Infinity, ease: "linear", delay: 7 }}
          className="absolute bottom-1/3 left-1/3 opacity-15"
        >
          <WalnutIcon className="w-26 h-26" />
        </motion.div>

        {/* Dense Layer - Top Section */}
        <motion.div animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 14 }} className="absolute top-5 left-5 opacity-10">
          <AlmondIcon className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -11, 11, 0], x: [0, 8, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 15 }} className="absolute top-10 right-5 opacity-12">
          <CashewIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 12, -12, 0], y: [0, 10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 16 }} className="absolute top-5 left-1/2 opacity-10">
          <PeanutIcon className="w-18 h-18" />
        </motion.div>

        {/* Dense Layer - Middle Section */}
        <motion.div animate={{ rotate: [0, -13, 13, 0], x: [0, -10, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 17 }} className="absolute top-1/2 left-5 opacity-12">
          <WalnutIcon className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 14, -14, 0], y: [0, -12, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 18 }} className="absolute top-1/2 right-5 opacity-10">
          <AlmondIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -15, 15, 0], x: [0, 10, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 19 }} className="absolute top-1/2 left-1/2 opacity-12">
          <CashewIcon className="w-20 h-20" />
        </motion.div>

        {/* Dense Layer - Bottom Section */}
        <motion.div animate={{ rotate: [0, 11, -11, 0], y: [0, 8, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 20 }} className="absolute bottom-5 left-5 opacity-10">
          <PeanutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -12, 12, 0], x: [0, -8, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 21 }} className="absolute bottom-10 right-5 opacity-12">
          <WalnutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 13, -13, 0], y: [0, -10, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 22 }} className="absolute bottom-5 left-1/2 opacity-10">
          <AlmondIcon className="w-20 h-20" />
        </motion.div>

        {/* Corner Decorations */}
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 8 }} className="absolute top-10 left-10 opacity-8">
          <CashewIcon className="w-18 h-18" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 9 }} className="absolute top-10 right-10 opacity-8">
          <PeanutIcon className="w-18 h-18" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.12, 1] }} transition={{ duration: 24, repeat: Infinity, ease: "linear", delay: 10 }} className="absolute bottom-10 left-10 opacity-8">
          <AlmondIcon className="w-18 h-18" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }} transition={{ duration: 23, repeat: Infinity, ease: "linear", delay: 11 }} className="absolute bottom-10 right-10 opacity-8">
          <WalnutIcon className="w-18 h-18" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
              {contact.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-deep-brown)] mb-6 font-heading">
              {contact.title}
            </h1>
            <p className="text-lg text-[var(--color-slate)] max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
              {contact.description}
            </p>
          </motion.div>
          <div className="absolute top-0 left-0 -z-10 opacity-10 -rotate-12">
            <LeafIcon className="w-64 h-64 text-[var(--color-leaf-green)]" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab(tabValueGeneral as "general")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded-t-lg ${
                activeTab === tabValueGeneral
                  ? "text-[var(--color-gold)] border-b-2 border-[var(--color-gold)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
              }`}
              aria-selected={activeTab === tabValueGeneral}
              role="tab"
            >
              {contact.generalEnquiryLabel}
            </button>
            <button
              onClick={() => setActiveTab(tabValueTrade as "trade")}
              className={`flex-1 px-6 py-4 font-semibold transition-colors focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded-t-lg ${
                activeTab === tabValueTrade
                  ? "text-[var(--color-gold)] border-b-2 border-[var(--color-gold)]"
                  : "text-[var(--color-muted)] hover:text-[var(--color-text)]"
              }`}
              aria-selected={activeTab === tabValueTrade}
              role="tab"
            >
              {contact.tradeEnquiryLabel}
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-white to-[var(--color-ivory)] p-8 rounded-3xl border-2 border-[var(--color-gold-light)] shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            {activeTab === tabValueGeneral ? (
              <GeneralEnquiryForm
                formLabels={formLabels}
                analytics={siteSettings?.analytics}
                validation={siteSettings?.validation}
              />
            ) : (
              <TradeEnquiryForm
                productList={productList}
                formLabels={formLabels}
                analytics={siteSettings?.analytics}
                validation={siteSettings?.validation}
                initialProduct={initialProduct}
                initialAction={initialAction}
              />
            )}
          </motion.div>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[var(--color-cashew-cream)] to-[var(--color-beige)] p-8 rounded-3xl border-2 border-[var(--color-gold-light)] shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
              {contact.contactDetailsTitle}
            </h3>
            <div className="space-y-4 text-[var(--color-text)]">
              <div>
                <p className="font-semibold text-[var(--color-gold-dark)] mb-1">
                  {siteSettings?.contact?.officeLabel}
                </p>
                <p className="whitespace-pre-line">{contact.contactDetails.address}</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-gold-dark)] mb-1">
                  {siteSettings?.contact?.phoneLabel}
                </p>
                <p>
                  {contact.contactDetails.phone.join(
                    siteSettings?.apiConfig?.listSeparator || ", "
                  )}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-gold-dark)] mb-1">
                  {siteSettings?.contact?.emailLabel}
                </p>
                <p>{contact.contactDetails.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[var(--color-cashew-cream)] to-[var(--color-beige)] p-8 rounded-3xl border-2 border-[var(--color-gold-light)] shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
              {contact.businessHoursTitle}
            </h3>
            <div className="space-y-2 text-[var(--color-text)]">
              <p>{contact.businessHours.weekdays}</p>
              <p>{contact.businessHours.sunday}</p>
            </div>
            <p className="mt-6 text-sm text-[var(--color-muted)] italic">{contact.footerNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
