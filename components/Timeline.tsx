"use client";

import { motion } from "framer-motion";

interface TimelineEntry {
  year: number;
  title: string;
  description?: string;
}

interface TimelineProps {
  entries: TimelineEntry[];
}

export default function Timeline({ entries }: TimelineProps) {
  const sortedEntries = [...entries].sort((a, b) => a.year - b.year);

  return (
    <div className="relative py-12">
      {/* Timeline Line */}
      <motion.div
        className="absolute left-9 top-0 bottom-0 w-0.5 bg-[var(--color-gold)] hidden md:block origin-top"
        initial={{ height: "0%", opacity: 0 }}
        whileInView={{ height: "100%", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <div className="space-y-12">
        {sortedEntries.map((entry, index) => (
          <motion.div
            key={entry.year}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-20 md:pl-32"
          >
            {/* Timeline Dot */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
              className="absolute left-4 md:left-6 top-0 w-8 h-8 bg-[var(--color-gold)] rounded-full border-4 border-white shadow-lg flex items-center justify-center"
            >
              <span className="text-xs font-bold text-white">{entry.year}</span>
            </motion.div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-[var(--color-deep-brown)] mb-2">
                {entry.title}
              </h3>
              {entry.description && <p className="text-[var(--color-text)]">{entry.description}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
