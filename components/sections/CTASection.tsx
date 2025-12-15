"use client";

import { motion } from "framer-motion";
import { AlmondIcon, CashewIcon, WalnutIcon, PeanutIcon } from "@/components/assets/Decorations";
import AnimatedTitle from "@/components/AnimatedTitle";

interface CTAData {
  walkthrough?: {
    subtitle: string;
    title: string;
    description: string;
    buttonText: string;
  };
  pricing?: {
    subtitle: string;
    title: string;
    description: string;
    buttonText: string;
    emailPlaceholder?: string;
  };
}

interface CTASectionProps {
  initialCTA?: CTAData | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routing?: any;
}

export default function CTASection({ initialCTA, routing }: CTASectionProps) {
  const cta = initialCTA;
  const sectionId = routing?.ctaSectionId || "cta";

  if (!cta) return null;

  return (
    <section id={sectionId} className="py-20 bg-gradient-to-b from-[var(--color-ivory)] to-[var(--color-beige)] relative overflow-hidden">
      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ rotate: [0, 14, -14, 0], y: [0, 12, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 right-20 opacity-15">
          <AlmondIcon className="w-28 h-28" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -12, 12, 0], x: [0, 10, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-20 left-20 opacity-15">
          <CashewIcon className="w-26 h-26" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/4 opacity-12">
          <WalnutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 13, -13, 0], y: [0, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }} className="absolute bottom-1/3 right-1/4 opacity-15">
          <PeanutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -12, 12, 0], x: [0, 10, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 6 }} className="absolute top-1/3 left-1/3 opacity-12">
          <AlmondIcon className="w-26 h-26" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 14, -14, 0], y: [0, 12, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 7 }} className="absolute bottom-20 left-1/4 opacity-15">
          <CashewIcon className="w-24 h-24" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 2 }} className="absolute top-1/4 right-1/3 opacity-12">
          <WalnutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -11, 11, 0], y: [0, -10, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 8 }} className="absolute top-5 left-1/4 opacity-10">
          <AlmondIcon className="w-20 h-20" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 12, -12, 0], x: [0, 10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 9 }} className="absolute bottom-5 right-1/4 opacity-12">
          <PeanutIcon className="w-22 h-22" />
        </motion.div>
        <motion.div animate={{ rotate: [0, -360], scale: [1, 1.12, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 3 }} className="absolute top-1/2 left-5 opacity-8">
          <CashewIcon className="w-18 h-18" />
        </motion.div>
        <motion.div animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }} transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 4 }} className="absolute bottom-1/2 right-5 opacity-8">
          <WalnutIcon className="w-18 h-18" />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-10 grid lg:grid-cols-2 gap-8 relative z-10">
        <div className="bg-gradient-to-br from-white to-[var(--color-cashew-cream)] p-8 rounded-3xl border-2 border-[var(--color-gold-light)] shadow-xl hover:shadow-2xl transition-all duration-300">
          <motion.p 
            className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {cta.walkthrough?.subtitle}
          </motion.p>
          <AnimatedTitle 
            direction="left" 
            delay={0.2}
            as="h3"
            className="text-2xl font-semibold text-[var(--color-graphite)] mb-4"
          >
            {cta.walkthrough?.title}
          </AnimatedTitle>
          <motion.p 
            className="text-[var(--color-slate)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {cta.walkthrough?.description}
          </motion.p>
          <button
            onClick={() => {
              window.location.href = "/contact";
            }}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[var(--color-almond-gold)] to-[var(--color-gold-dark)] text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            {cta.walkthrough?.buttonText}
          </button>
        </div>

        <div className="bg-gradient-to-br from-white to-[var(--color-cashew-cream)] p-8 rounded-3xl border-2 border-[var(--color-gold-light)] shadow-xl hover:shadow-2xl transition-all duration-300">
          <motion.p 
            className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {cta.pricing?.subtitle}
          </motion.p>
          <AnimatedTitle 
            direction="right" 
            delay={0.2}
            as="h3"
            className="text-2xl font-semibold text-[var(--color-graphite)] mb-4"
          >
            {cta.pricing?.title}
          </AnimatedTitle>
          <motion.p 
            className="text-[var(--color-slate)] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {cta.pricing?.description}
          </motion.p>
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const email = formData.get("email");
              window.location.href = `/contact?type=trade&email=${email}`;
            }}
          >
            <input
              name="email"
              type="email"
              placeholder={cta.pricing?.emailPlaceholder}
              className="px-4 py-3 border border-[var(--color-sand)] rounded-full focus:outline-2 focus:outline-[var(--color-gold)]"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[var(--color-deep-brown)] to-[var(--color-raisin-purple)] text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {cta.pricing?.buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
