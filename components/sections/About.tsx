"use client";

import { motion } from "framer-motion";
import Timeline from "@/components/Timeline";
import DistributionMap from "@/components/DistributionMap";

interface AboutProps {
  whoWeAre?: {
    eyebrow: string;
    title: string;
    description: string;
    stats?: { value: string; label: string }[];
  };
  mission?: { title: string; description: string };
  vision?: { eyebrow: string; title: string; description: string };
  commitment?: { title: string; description: string };
  timeline?: {
    eyebrow: string;
    title: string;
    entries: { year: number; title: string; description: string }[];
  };
  distribution?: { title: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routing?: any;
}

export default function About({
  whoWeAre,
  mission,
  vision,
  commitment,
  timeline,
  distribution,
  routing,
}: AboutProps) {
  const timelineEntries = timeline?.entries || [];
  const sectionId = routing?.aboutSectionId || "about";

  return (
    <section id={sectionId} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        {/* Who We Are Section */}
        <motion.div
          className="section-shell border border-[var(--color-sand)] p-8 md:p-12 mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
            {whoWeAre?.eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-graphite)] mb-6">
            {whoWeAre?.title}
          </h2>
          <div className="space-y-4 text-lg text-[var(--color-slate)] mb-8">
            <p>{whoWeAre?.description}</p>
          </div>
          {whoWeAre?.stats && (
            <div className="grid sm:grid-cols-3 gap-6 text-center pt-6 border-t border-[var(--color-sand)]">
              {whoWeAre.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-semibold text-[var(--color-gold)]">{stat.value}</p>
                  <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Vision & Purpose Section */}
        <motion.div
          className="section-shell border border-[var(--color-sand)] p-8 md:p-12 mb-16 bg-[var(--color-sand)]"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
            {vision?.eyebrow}
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold text-[var(--color-graphite)] mb-6">
            {vision?.title}
          </h3>
          <ul className="space-y-4 text-lg text-[var(--color-slate)]">
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-2 w-2 rounded-full bg-[var(--color-gold)] flex-shrink-0"
              />
              <span>{mission?.description}</span>
            </li>
            <li className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-2 w-2 rounded-full bg-[var(--color-gold)] flex-shrink-0"
              />
              <span>{vision?.description}</span>
            </li>
          </ul>
        </motion.div>

        {/* Company Values */}
        <motion.div
          className="section-shell border border-[var(--color-sand)] p-8 md:p-10 mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold text-[var(--color-graphite)] mb-3">
            {commitment?.title}
          </h3>
          <p className="text-lg text-[var(--color-slate)]">{commitment?.description}</p>
        </motion.div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[var(--color-graphite)] text-center mb-12">
            {timeline?.title}
          </h3>
          <Timeline entries={timelineEntries} />
        </div>

        {/* Distribution Map */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-[var(--color-graphite)] text-center mb-8">
            {distribution?.title}
          </h3>
          <DistributionMap />
        </div>
      </div>
    </section>
  );
}
