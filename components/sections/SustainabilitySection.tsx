"use client";

import { motion } from "framer-motion";
import { AlmondIcon, CashewIcon, WalnutIcon, PeanutIcon } from "@/components/assets/Decorations";

interface SustainabilityPillar {
  title: string;
  detail: string;
}

interface SustainabilitySectionProps {
  initialPillars?: SustainabilityPillar[] | null;
  sectionSettings?: {
    eyebrow?: string;
    title?: string;
    description?: string;
  };
  routing?: {
    sustainabilitySectionId?: string;
  };
}

export default function SustainabilitySection({
  initialPillars,
  sectionSettings,
  routing,
}: SustainabilitySectionProps) {
  const activePillars = initialPillars || [];

  if (activePillars.length === 0) return null;
  return (
    <section id={routing?.sustainabilitySectionId} className="py-20 bg-gradient-to-b from-white to-[var(--color-ivory)] relative overflow-hidden">
      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ rotate: [0, 11, -11, 0], y: [0, -10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 right-10 opacity-15">
          <AlmondIcon className="w-30 h-30" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -14, 14, 0], x: [0, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-10 left-10 opacity-15">
          <CashewIcon className="w-28 h-28" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }} transition={{ duration: 16, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute top-1/2 right-1/4 opacity-12">
          <WalnutIcon className="w-26 h-26" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 12, -12, 0], y: [0, 10, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }} className="absolute bottom-1/4 left-1/4 opacity-15">
          <PeanutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -13, 13, 0], x: [0, -10, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 5 }} className="absolute top-1/3 right-1/3 opacity-12">
          <AlmondIcon className="w-26 h-26" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 15, -15, 0], y: [0, -12, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }} className="absolute bottom-1/3 right-1/4 opacity-15">
          <CashewIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 2 }} className="absolute top-1/4 left-1/3 opacity-12">
          <WalnutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 11, -11, 0], y: [0, 10, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 7 }} className="absolute top-5 left-1/4 opacity-10">
          <AlmondIcon className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -12, 12, 0], x: [0, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 8 }} className="absolute bottom-5 right-1/4 opacity-12">
          <PeanutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 21, repeat: Infinity, ease: "linear", delay: 3 }} className="absolute top-1/2 left-5 opacity-8">
          <CashewIcon className="w-18 h-18" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.08, 1] }} transition={{ duration: 19, repeat: Infinity, ease: "linear", delay: 4 }} className="absolute bottom-1/2 right-5 opacity-8">
          <WalnutIcon className="w-18 h-18" />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-10 relative z-10">
        <div className="bg-gradient-to-br from-white to-[var(--color-cashew-cream)] p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center rounded-3xl border-2 border-[var(--color-gold-light)] shadow-xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
              {sectionSettings?.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold text-[var(--color-graphite)] mb-4">
              {sectionSettings?.title}
            </h2>
            <p className="text-lg text-[var(--color-slate)]">{sectionSettings?.description}</p>
          </motion.div>
          <motion.div
            className="grid gap-6"
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
            {activePillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                className="p-4 rounded-2xl bg-gradient-to-br from-[var(--color-ivory)] to-[var(--color-beige)] border-2 border-[var(--color-sand)] hover:shadow-lg hover:border-[var(--color-gold-light)] transition-all duration-300"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
              >
                <h3 className="text-lg font-semibold text-[var(--color-graphite)] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-[var(--color-slate)]">{pillar.detail}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
