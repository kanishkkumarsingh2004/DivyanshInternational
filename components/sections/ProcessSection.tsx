"use client";

import { motion } from "framer-motion";
import { AlmondIcon, CashewIcon, WalnutIcon, PeanutIcon } from "@/components/assets/Decorations";

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
    <section id={routing?.processSectionId} className="py-20 bg-gradient-to-b from-white to-[var(--color-ivory)] relative overflow-hidden">
      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ rotate: [0, 12, -12, 0], y: [0, 10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute top-10 left-10 opacity-15">
          <AlmondIcon className="w-30 h-30" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -13, 13, 0], x: [0, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }} className="absolute bottom-10 right-10 opacity-15">
          <CashewIcon className="w-26 h-26" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.08, 1] }} transition={{ duration: 17, repeat: Infinity, ease: "linear", delay: 1 }} className="absolute top-1/3 right-20 opacity-12">
          <WalnutIcon className="w-28 h-28" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 11, -11, 0], y: [0, -10, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: 3 }} className="absolute bottom-1/4 left-20 opacity-15">
          <PeanutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -13, 13, 0], x: [0, 10, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "linear", delay: 5 }} className="absolute top-1/4 left-1/3 opacity-12">
          <AlmondIcon className="w-26 h-26" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 14, -14, 0], y: [0, 12, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 6 }} className="absolute bottom-1/3 right-1/3 opacity-15">
          <CashewIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 19, repeat: Infinity, ease: "linear", delay: 2 }} className="absolute top-1/3 left-1/4 opacity-12">
          <WalnutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -11, 11, 0], y: [0, -10, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "linear", delay: 7 }} className="absolute top-5 left-1/3 opacity-10">
          <AlmondIcon className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 12, -12, 0], x: [0, 10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 8 }} className="absolute bottom-5 right-1/3 opacity-12">
          <CashewIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.12, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 3 }} className="absolute top-1/2 right-5 opacity-8">
          <PeanutIcon className="w-18 h-18" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 4 }} className="absolute bottom-1/2 left-5 opacity-8">
          <WalnutIcon className="w-18 h-18" />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-10 relative z-10">
        <div className="max-w-2xl mb-12">
          <motion.p 
            className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {sectionSettings?.eyebrow}
          </motion.p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-graphite)] mb-4">
            {sectionSettings?.title}
          </h2>
          <motion.p 
            className="text-lg text-[var(--color-slate)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {sectionSettings?.description}
          </motion.p>
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
              className="bg-gradient-to-br from-white to-[var(--color-ivory)] p-6 rounded-3xl border-2 border-[var(--color-sand)] shadow-lg hover:shadow-xl hover:border-[var(--color-gold-light)] transition-all duration-300"
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
