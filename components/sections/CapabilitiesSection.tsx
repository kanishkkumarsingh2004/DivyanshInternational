"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { AlmondIcon, CashewIcon, WalnutIcon, PeanutIcon, NutIcon } from "@/components/assets/Decorations";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

type Capability = {
  _id: string;
  title: string;
  description: string;
  metric: string;
  icon?: string;
};

type Certificate = {
  _id: string;
  name: string;
  label: string;
  imageUrl?: string;
  image?: SanityImageSource;
};

interface CapabilitiesSectionProps {
  initialCapabilities?: Capability[] | null;
  initialCertificates?: Certificate[] | null;
  sectionSettings?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    certificationsTitle?: string;
    certificationsDescription?: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routing?: any;
}

export default function CapabilitiesSection({
  initialCapabilities,
  initialCertificates,
  sectionSettings,
  routing,
}: CapabilitiesSectionProps) {
  const capabilities = initialCapabilities || [];
  const certificates = initialCertificates || [];
  const sectionId = routing?.capabilitiesSectionId || "capabilities";

  if (capabilities.length === 0) return null;

  return (
    <section id={sectionId} className="py-20 bg-gradient-to-b from-[var(--color-ivory)] to-[var(--color-cashew-cream)] relative overflow-hidden">
      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ rotate: [0, 10, -10, 0], y: [0, -12, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 right-10 opacity-15">
          <AlmondIcon className="w-32 h-32" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -12, 12, 0], x: [0, 10, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-20 left-10 opacity-15">
          <CashewIcon className="w-28 h-28" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 right-1/4 opacity-12">
          <WalnutIcon className="w-26 h-26" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 14, -14, 0], y: [0, 10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute bottom-1/3 right-20 opacity-15">
          <PeanutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -11, 11, 0], x: [0, -10, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 6 }} className="absolute top-1/4 left-20 opacity-12">
          <NutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 13, -13, 0], y: [0, 10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 8 }} className="absolute bottom-1/4 left-1/3 opacity-15">
          <AlmondIcon className="w-26 h-26" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -14, 14, 0], x: [0, 12, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 9 }} className="absolute top-1/3 right-1/3 opacity-12">
          <CashewIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 12, -12, 0], y: [0, -10, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 10 }} className="absolute bottom-1/3 left-1/4 opacity-15">
          <PeanutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -11, 11, 0], x: [0, 10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 11 }} className="absolute top-5 left-1/4 opacity-10">
          <AlmondIcon className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 13, -13, 0], y: [0, 8, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 12 }} className="absolute bottom-5 right-1/4 opacity-12">
          <CashewIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 19, repeat: Infinity, ease: "linear", delay: 4 }} className="absolute top-1/2 left-5 opacity-8">
          <WalnutIcon className="w-18 h-18" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.08, 1] }} transition={{ duration: 21, repeat: Infinity, ease: "linear", delay: 5 }} className="absolute bottom-1/2 right-5 opacity-8">
          <PeanutIcon className="w-18 h-18" />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-10 relative z-10">
        <div className="max-w-3xl mb-12">
          {sectionSettings && (
            <>
              <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
                {sectionSettings.eyebrow}
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-graphite)] mb-4">
                {sectionSettings.title}
              </h2>
              <p className="text-lg text-[var(--color-slate)]">{sectionSettings.description}</p>
            </>
          )}
        </div>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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
          {capabilities.map((capability) => (
            <motion.div
              key={capability._id}
              className="bg-gradient-to-br from-white to-[var(--color-ivory)] p-6 h-full rounded-3xl border-2 border-[var(--color-gold-light)] shadow-lg hover:shadow-xl hover:border-[var(--color-almond-gold)] transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <div className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)] mb-4">
                {capability.metric}
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-graphite)] mb-3">
                {capability.title}
              </h3>
              <p className="text-[var(--color-slate)]">{capability.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Certificates Section */}
        {certificates.length > 0 && (
          <motion.div
            className="mt-20 border-t border-[var(--color-sand)] pt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
                {sectionSettings?.certificationsTitle}
              </h3>
              <p className="text-[var(--color-slate)] max-w-2xl mx-auto">
                {sectionSettings?.certificationsDescription}
              </p>
            </div>

            <motion.div
              className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {certificates.map((cert) => (
                <motion.div
                  key={cert._id}
                  className="flex flex-col items-center gap-3 group"
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
                  }}
                >
                  <div className="w-24 h-24 relative bg-white rounded-full shadow-sm border border-[var(--color-sand)] p-4 flex items-center justify-center overflow-hidden">
                    {cert.imageUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={cert.imageUrl}
                          alt={cert.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : cert.image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={urlForImage(cert.image).url()}
                          alt={cert.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-[var(--color-deep-brown)]">
                        {cert.name}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-bold tracking-wider text-[var(--color-muted)] group-hover:text-[var(--color-gold)] transition-colors">
                    {cert.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
