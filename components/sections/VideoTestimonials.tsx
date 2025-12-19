"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import AnimatedTitle from "@/components/AnimatedTitle";
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
    videoUrl?: string;
    image?: SanityImageSource;
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
    <section id={routing?.testimonialsSectionId} className="py-20 bg-gradient-to-b from-[var(--color-beige)] to-[var(--color-sand)] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <motion.p 
              className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {sectionSettings?.eyebrow}
            </motion.p>
            <AnimatedTitle 
              direction="left" 
              delay={0.05}
              className="text-3xl md:text-4xl font-semibold text-[var(--color-graphite)] mb-6"
            >
              {sectionSettings?.title}
            </AnimatedTitle>
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
                  className="bg-gradient-to-br from-white to-[var(--color-ivory)] border-2 border-[var(--color-sand)] rounded-2xl p-6 shadow-lg hover:shadow-xl hover:border-[var(--color-gold-light)] transition-all duration-300"
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
          </div>

          <motion.div
            className="bg-gradient-to-br from-white to-[var(--color-ivory)] border-2 border-[var(--color-gold-light)] p-8 rounded-3xl shadow-xl space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.p 
              className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {sectionSettings?.droneSection?.eyebrow}
            </motion.p>
            <AnimatedTitle 
              direction="right" 
              delay={0.1}
              as="h3"
              className="text-2xl font-semibold text-[var(--color-graphite)] mb-4"
            >
              {sectionSettings?.droneSection?.title}
            </AnimatedTitle>
            <div className="rounded-2xl overflow-hidden border-2 border-[var(--color-gold-light)] bg-[var(--color-beige)] min-h-[220px] relative">
              {sectionSettings?.droneSection?.videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  src={sectionSettings.droneSection.videoUrl}
                  controls
                  poster={sectionSettings?.droneSection?.image ? urlForImage(sectionSettings.droneSection.image).url() : undefined}
                >
                  Your browser does not support the video tag.
                </video>
              ) : sectionSettings?.droneSection?.image ? (
                <div className="relative w-full h-[300px]">
                  <Image
                    src={urlForImage(sectionSettings.droneSection.image).url()}
                    alt={sectionSettings?.droneSection?.title || "Facility"}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center text-center text-xs uppercase tracking-[0.3em] text-[var(--color-muted)] px-6 min-h-[220px]">
                  {sectionSettings?.droneSection?.placeholderText}
                </div>
              )}
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
