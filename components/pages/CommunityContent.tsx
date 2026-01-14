"use client";

import { motion } from "framer-motion";
import {
  LeafIcon,
  NutIcon,
  AlmondIcon,
  CashewIcon,
} from "@/components/assets/Decorations";

interface CSRInitiative {
  _key: string;
  title: string;
  description: string;
}

interface TradeEvent {
  _key: string;
  name: string;
  date: string;
  location: string;
}

interface CommunityData {
  _id: string;
  csrInitiatives?: CSRInitiative[];
  tradeEvents?: TradeEvent[];
}

interface CommunityContentProps {
  initialCommunity?: CommunityData | null;
}

export default function CommunityContent({
  initialCommunity,
}: CommunityContentProps) {
  const community = initialCommunity;

  if (!community) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <p className="text-[var(--color-slate)]">Community data not available</p>
      </div>
    );
  }

  const csrInitiatives = community.csrInitiatives || [];
  const tradeEvents = community.tradeEvents || [];

  return (
    <div className="bg-gradient-to-b from-[var(--color-ivory)] via-[var(--color-cashew-cream)] to-[var(--color-beige)] min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-0 text-[var(--color-gold)]/5"
        >
          <LeafIcon className="w-96 h-96" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute bottom-40 left-0 text-[var(--color-gold)]/5"
        >
          <NutIcon className="w-80 h-80" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/3 right-1/4 opacity-10"
        >
          <AlmondIcon className="w-32 h-32" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/3 opacity-10"
        >
          <CashewIcon className="w-28 h-28" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
              Building Together
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-deep-brown)] mb-6 font-heading">
              Community & CSR
            </h1>
            <p className="text-lg text-[var(--color-slate)] max-w-3xl mx-auto leading-relaxed">
              At Divyansh International, we believe in growing together with our community,
              supporting sustainable practices, and creating positive impact.
            </p>
          </motion.div>
        </div>

        {/* CSR Initiatives Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
              Our CSR Initiatives
            </h2>
            <p className="text-[var(--color-slate)] max-w-2xl mx-auto">
              We are committed to making a positive difference in the communities we serve
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {csrInitiatives.map((initiative, index) => (
              <motion.div
                key={initiative._key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-white to-[var(--color-ivory)] p-8 rounded-3xl border-2 border-[var(--color-sand)] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl mb-4">
                  {index === 0 && "🌾"}
                  {index === 1 && "👥"}
                  {index === 2 && "📚"}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-deep-brown)] mb-3 font-heading">
                  {initiative.title}
                </h3>
                <p className="text-[var(--color-slate)] leading-relaxed">
                  {initiative.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Trade Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
              Trade Events & Exhibitions
            </h2>
            <p className="text-[var(--color-slate)] max-w-2xl mx-auto">
              Meet us at leading industry events across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tradeEvents.map((event, index) => (
              <motion.div
                key={event._key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-[var(--color-sand)] shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[var(--color-almond-gold)] to-[var(--color-gold-dark)] rounded-full flex items-center justify-center text-white font-bold">
                    📅
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-[var(--color-deep-brown)] mb-2">
                      {event.name}
                    </h3>
                    <p className="text-sm text-[var(--color-slate)] mb-1">
                      📍 {event.location}
                    </p>
                    <p className="text-sm text-[var(--color-almond-gold)] font-semibold">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[var(--color-almond-gold)]/10 to-[var(--color-gold-light)]/5 p-12 rounded-3xl border-2 border-[var(--color-almond-gold)]/20 relative overflow-hidden"
        >
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-brown)] mb-6 font-heading">
              Our Commitment to Community
            </h2>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-[var(--color-slate)] leading-relaxed">
              <p>
                We believe that business success is deeply connected to the well-being of the
                communities we serve. Through our CSR initiatives, we focus on sustainable
                farming practices, local employment generation, and knowledge sharing.
              </p>
              <p className="text-xl font-semibold text-[var(--color-almond-gold)]">
                Together, we grow stronger.
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-4 right-4 opacity-20"
          >
            <NutIcon className="w-24 h-24 text-[var(--color-almond-gold)]" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-4 left-4 opacity-20"
          >
            <AlmondIcon className="w-20 h-20 text-[var(--color-gold-dark)]" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
