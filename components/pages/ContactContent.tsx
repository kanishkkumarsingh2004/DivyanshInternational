"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import GeneralEnquiryForm from "@/components/forms/GeneralEnquiryForm";
import TradeEnquiryForm from "@/components/forms/TradeEnquiryForm";
import { LeafIcon } from "@/components/assets/Decorations";

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
    <div className="bg-[var(--color-bg)] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
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
            className="bg-white p-8 rounded-3xl border border-[var(--color-sand)] shadow-sm"
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
          <div className="bg-[var(--color-beige)] p-8 rounded-3xl border border-[var(--color-sand)]">
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

          <div className="bg-[var(--color-beige)] p-8 rounded-3xl border border-[var(--color-sand)]">
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
