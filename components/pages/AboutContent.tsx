"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Timeline from "@/components/Timeline";
import DistributionMap from "@/components/DistributionMap";
import { LeafIcon, NutIcon } from "@/components/assets/Decorations";
import { urlForImage } from "@/lib/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";

type TeamMember = {
  _id: string;
  name: string;
  role: string;
  image: SanityImageSource | string;
  bio?: string;
};

type TimelineEntry = {
  _id: string;
  year: number;
  title: string;
  description: string;
};

interface AboutData {
  whoWeAre?: { title: string; description: string; image?: SanityImageSource };
  mission?: { title: string; description: string };
  vision?: { title: string; description: string };
  ourStory?: { eyebrow: string; title: string; description: string };
  commitment?: { title: string; description: string };
  teamSection?: { eyebrow: string; title: string };
  journeySection?: { eyebrow: string; title: string };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  distributionRegions?: any;
}

interface AboutContentProps {
  initialTeamMembers?: TeamMember[] | null;
  initialTimeline?: TimelineEntry[] | null;
  initialAbout?: AboutData | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  siteSettings?: any;
}

export default function AboutContent({
  initialTeamMembers,
  initialTimeline,
  initialAbout,
  siteSettings,
}: AboutContentProps) {
  const teamMembers = initialTeamMembers || [];
  const timelineEntries = initialTimeline || [];
  const about = initialAbout;

  if (!about) return null;

  return (
    <div className="bg-[var(--color-bg)] min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-0 text-[var(--color-gold)]/5"
        >
          <LeafIcon className="w-96 h-96" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-40 left-0 text-[var(--color-gold)]/5"
        >
          <NutIcon className="w-80 h-80" />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 md:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
              {about.ourStory?.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-deep-brown)] mb-6 font-heading">
              {about.ourStory?.title}
            </h1>
            <p className="text-lg text-[var(--color-slate)] max-w-3xl mx-auto leading-relaxed">
              {about.ourStory?.description}
            </p>
          </motion.div>
          <div className="absolute top-0 right-0 -z-10 opacity-10 rotate-12">
            <LeafIcon className="w-64 h-64 text-[var(--color-leaf-green)]" />
          </div>
        </div>

        {/* Who We Are & Mission/Vision Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--color-beige)] p-10 rounded-3xl border border-[var(--color-sand)] relative overflow-hidden"
          >
            <h2 className="text-3xl font-bold text-[var(--color-deep-brown)] mb-6 font-heading">
              {about.whoWeAre?.title}
            </h2>
            <p className="text-[var(--color-text)] mb-6 leading-relaxed">
              {about.whoWeAre?.description}
            </p>
            <LeafIcon className="absolute -bottom-10 -right-10 w-40 h-40 text-[var(--color-gold)]/10" />
          </motion.div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl border border-[var(--color-sand)] shadow-sm"
            >
              <h3 className="text-2xl font-bold text-[var(--color-deep-brown)] mb-3 font-heading">
                {about.mission?.title}
              </h3>
              <p className="text-[var(--color-slate)]">{about.mission?.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 rounded-3xl border border-[var(--color-sand)] shadow-sm"
            >
              <h3 className="text-2xl font-bold text-[var(--color-deep-brown)] mb-3 font-heading">
                {about.vision?.title}
              </h3>
              <p className="text-[var(--color-slate)]">{about.vision?.description}</p>
            </motion.div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-3">
              {about.teamSection?.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-brown)] font-heading">
              {about.teamSection?.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative aspect-[3/4] mb-6 rounded-2xl overflow-hidden bg-[var(--color-sand)]">
                  {member.image &&
                    (typeof member.image === "string" ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <Image
                        src={urlForImage(member.image).url()}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ))}
                  {member.bio && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white font-medium">&quot;{member.bio}&quot;</p>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-deep-brown)] font-heading">
                  {member.name}
                </h3>
                <p className="text-[var(--color-gold-dark)] font-medium text-sm uppercase tracking-wider">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey / Legacy Animation */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-3">
              {about.journeySection?.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-brown)] font-heading">
              {about.journeySection?.title}
            </h2>
          </div>
          <Timeline entries={timelineEntries} />
        </div>

        {/* Distribution Map */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-brown)] font-heading">
              {siteSettings?.distribution?.heading}
            </h2>
          </div>
          <DistributionMap
            regions={about.distributionRegions}
            heading={siteSettings?.distribution?.heading}
          />
        </div>
      </div>
    </div>
  );
}
