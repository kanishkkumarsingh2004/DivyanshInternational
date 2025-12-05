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
    <div className="relative py-20 overflow-hidden">
      {/* Central Line (Desktop) */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[var(--color-sand)] hidden md:block -translate-x-1/2" />

      <div className="space-y-24">
        {sortedEntries.map((entry, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={entry.year}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row items-center ${isEven ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* Content Side */}
              <div className="w-full md:w-1/2 px-4 md:px-12 mb-8 md:mb-0">
                <div className={`text-center ${isEven ? "md:text-left" : "md:text-right"}`}>
                  <div className="inline-block mb-6">
                    <div className="border-2 border-[var(--color-gold)] px-6 py-3 rounded-lg bg-white relative z-10">
                      <span className="text-3xl font-bold text-[var(--color-deep-brown)] font-heading">
                        {entry.year}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
                    {entry.title}
                  </h3>
                  {entry.description && (
                    <p className="text-[var(--color-slate)] leading-relaxed text-lg font-sans">
                      {entry.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Center Dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--color-gold)] rounded-full border-4 border-white shadow-sm z-20 hidden md:block" />

              {/* Image Side (Placeholder) */}
              <div className="w-full md:w-1/2 px-4 md:px-12">
                <div className="relative aspect-[4/3] bg-[var(--color-sand)] rounded-2xl overflow-hidden shadow-lg group">
                  {/* Placeholder Pattern */}
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[var(--color-gold)] opacity-20 transform group-hover:scale-110 transition-transform duration-700">
                      <svg
                        className="w-24 h-24"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
