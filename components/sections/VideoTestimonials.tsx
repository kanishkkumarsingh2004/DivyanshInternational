"use client";

import { motion } from "framer-motion";

import type { SanityImageSource } from "@sanity/image-url";

type Testimonial = {
  _id: string;
  author: string;
  role: string;
  location?: string;
  videoUrl?: string;
  thumbnail?: SanityImageSource;
  quote: string;
};

interface TestimonialsSectionSettings {
  eyebrow?: string;
  title?: string;
  droneSection?: {
    eyebrow?: string;
    title?: string;
    placeholderText?: string;
    highlights?: string[];
    note?: string;
  };
}

interface VideoTestimonialsProps {
  initialTestimonials?: Testimonial[] | null;
  sectionSettings?: TestimonialsSectionSettings | null;
  routing?: {
    testimonialsSectionId?: string;
  };
}

export default function VideoTestimonialsSection({
  initialTestimonials,
  sectionSettings,
  routing,
}: VideoTestimonialsProps) {
  const testimonials = initialTestimonials || [];
  const droneHighlightsList = sectionSettings?.droneSection?.highlights || [];

  return (
    <section id={routing?.testimonialsSectionId} className="py-20 bg-[var(--color-sand)]">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
              {sectionSettings?.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-graphite)] mb-6">
              {sectionSettings?.title}
            </h2>
            <motion.div
              className="space-y-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              {testimonials.map((testimonial) => (
                <motion.blockquote
                  key={testimonial._id}
                  className="bg-white border border-[#efe3d2] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                >
                  <p className="text-lg text-[var(--color-slate)] mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <footer className="text-sm font-semibold text-[var(--color-deep-brown)]">
                    {testimonial.author},{" "}
                    <span className="text-[var(--color-muted)]">{testimonial.role}</span>
                  </footer>
                </motion.blockquote>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="section-shell border border-[#eadfce] p-8 bg-white space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
              {sectionSettings?.droneSection?.eyebrow}
            </p>
            <h3 className="text-2xl font-semibold text-[var(--color-graphite)] mb-4">
              {sectionSettings?.droneSection?.title}
            </h3>
            <div className="rounded-2xl border border-dashed border-[var(--color-deep-brown)] bg-[var(--color-beige)] min-h-[220px] flex items-center justify-center text-center text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] px-6">
              {sectionSettings?.droneSection?.placeholderText}
            </div>
            <ul className="space-y-4 text-[var(--color-slate)]">
              {droneHighlightsList.map((point) => (
                <li key={point} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 rounded-full bg-[var(--color-gold)]"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              {sectionSettings?.droneSection?.note}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
