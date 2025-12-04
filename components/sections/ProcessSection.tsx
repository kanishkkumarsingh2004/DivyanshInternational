"use client";

import { motion } from "framer-motion";

interface ProcessStep {
  title: string;
  detail: string;
}

interface ProcessSectionProps {
  initialProcessSteps?: ProcessStep[] | null;
  sectionSettings?: {
    eyebrow?: string;
    title?: string;
    description?: string;
  };
  routing?: {
    processSectionId?: string;
  };
}

export default function ProcessSection({
  initialProcessSteps,
  sectionSettings,
  routing,
}: ProcessSectionProps) {
  const steps = initialProcessSteps || [];

  if (steps.length === 0) return null;
  return (
    <section id={routing?.processSectionId} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
            {sectionSettings?.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-graphite)] mb-4">
            {sectionSettings?.title}
          </h2>
          <p className="text-lg text-[var(--color-slate)]">{sectionSettings?.description}</p>
        </div>
        <motion.div
          className="grid md:grid-cols-2 gap-6"
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
          {steps.map((step) => (
            <motion.div
              key={step.title}
              className="section-shell p-6 border border-[#ede7dd]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <h3 className="text-lg font-semibold text-[var(--color-graphite)] mb-2">
                {step.title}
              </h3>
              <p className="text-[var(--color-slate)]">{step.detail}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
