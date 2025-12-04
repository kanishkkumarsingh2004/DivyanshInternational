"use client";

import { motion } from "framer-motion";

import type { SanityImageSource } from "@sanity/image-url";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";

interface Certificate {
  _id: string;
  name: string;
  label: string;
  image?: SanityImageSource;
  description?: string;
}

interface TrustSectionProps {
  initialCertificates?: Certificate[] | null;
  sectionSettings?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    partnerSegments?: string[];
  };
  routing?: {
    trustSectionId?: string;
  };
}

export default function TrustSection({
  initialCertificates,
  sectionSettings,
  routing,
}: TrustSectionProps) {
  const displayCertificates =
    initialCertificates && initialCertificates.length > 0
      ? initialCertificates.map((c) => ({
          label: c.label || c.name,
          description: c.name,
          image: c.image,
        }))
      : [];

  const segments = sectionSettings?.partnerSegments || [];

  return (
    <section id={routing?.trustSectionId} className="py-20 bg-[var(--color-ivory)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="section-shell p-8 md:p-12 border border-[#efe3d2]">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-10"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
                {sectionSettings?.eyebrow}
              </p>
              <h2 className="text-3xl font-semibold text-[var(--color-graphite)]">
                {sectionSettings?.title}
              </h2>
            </div>
            <p className="text-[var(--color-slate)] max-w-xl">{sectionSettings?.description}</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-6 mb-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
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
            {displayCertificates.map((cert, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl border-2 border-[var(--color-gold)]/30 bg-white relative overflow-hidden group hover:border-[var(--color-gold)] transition-colors hover:shadow-lg"
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
                }}
              >
                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  {/* If we have an image, show it, otherwise show icon */}
                  {(cert as Certificate).image ? (
                    <div className="w-16 h-16 relative">
                      <Image
                        src={urlForImage((cert as Certificate).image!).url()}
                        alt={cert.label}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <svg
                      className="w-16 h-16 text-[var(--color-gold)]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                    </svg>
                  )}
                </div>
                <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-gold-dark)] mb-2 font-bold">
                  {cert.label}
                </p>
                <p className="text-[var(--color-graphite)] font-medium">{cert.description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {segments.map((segment) => (
              <motion.div
                key={segment}
                className="min-h-[80px] flex items-center justify-center rounded-xl border border-[#efe3d2] bg-white/80 text-center px-4 text-sm font-semibold text-[var(--color-slate)] hover:bg-white hover:shadow-md transition-all"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                }}
              >
                {segment}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
