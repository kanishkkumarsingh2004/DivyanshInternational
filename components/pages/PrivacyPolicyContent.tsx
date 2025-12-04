"use client";

import { motion } from "framer-motion";
import { PortableText } from "next-sanity";
import { LeafIcon } from "@/components/assets/Decorations";

interface PrivacyPolicyData {
  title: string;
  lastUpdated: string;
  content: {
    heading: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any[];
  }[];
}

interface PrivacyPolicyContentProps {
  privacyPolicy: PrivacyPolicyData | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings: any;
}

export default function PrivacyPolicyContent({
  privacyPolicy,
  siteSettings,
}: PrivacyPolicyContentProps) {
  if (!privacyPolicy) return null;

  const contact = siteSettings?.organization;

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
              Legal
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-deep-brown)] mb-6 font-heading">
              {privacyPolicy.title}
            </h1>
            <p className="text-lg text-[var(--color-slate)] max-w-3xl mx-auto leading-relaxed">
              Last updated:{" "}
              {new Date(privacyPolicy.lastUpdated).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </p>
          </motion.div>
          <div className="absolute top-0 left-0 -z-10 opacity-10 -rotate-12">
            <LeafIcon className="w-64 h-64 text-[var(--color-leaf-green)]" />
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-[var(--color-sand)] shadow-sm">
          <div className="prose prose-lg max-w-none text-[var(--color-text)]">
            {privacyPolicy.content?.map((section, index) => (
              <div key={index} className="mb-8">
                {section.heading && (
                  <h3 className="text-[var(--color-deep-brown)] font-heading mt-8 mb-4 text-2xl font-bold">
                    {section.heading}
                  </h3>
                )}
                <PortableText value={section.body} />
              </div>
            ))}

            {/* Contact Section (Hardcoded structure but dynamic data) */}
            {contact && (
              <div className="bg-[var(--color-beige)] p-6 rounded-xl border border-[var(--color-sand)] mt-8">
                <p className="font-bold text-[var(--color-deep-brown)]">{contact.name}</p>
                <p>{contact.address?.streetAddress}</p>
                <p>
                  {contact.address?.addressLocality} – {contact.address?.postalCode},{" "}
                  {contact.address?.addressRegion},{" "}
                  {contact.address?.addressCountry === "IN"
                    ? "India"
                    : contact.address?.addressCountry}
                </p>
                <p className="mt-2">
                  <strong>Email:</strong>{" "}
                  {siteSettings?.contact?.contactDetails?.email || "Care@divyanshinternational.com"}
                </p>
                <p>
                  <strong>Phone:</strong> {siteSettings?.organization?.contactPoint?.telephone}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
