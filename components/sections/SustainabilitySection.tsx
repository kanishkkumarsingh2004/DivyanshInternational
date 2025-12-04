"use client";

import { motion } from "framer-motion";

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
    <section id={routing?.sustainabilitySectionId} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="section-shell p-8 md:p-12 grid lg:grid-cols-2 gap-10 items-center border border-[#eee4d5]">
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
                className="p-4 rounded-2xl bg-[var(--color-sand)] border border-[#efe5d6] hover:shadow-md transition-shadow"
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
