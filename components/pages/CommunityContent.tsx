"use client";

import { motion } from "framer-motion";
import {
  LeafIcon,
  NutIcon,
  AlmondIcon,
  CashewIcon,
  WalnutIcon,
  PeanutIcon,
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
  const tradeEvents = community?.tradeEvents || [];

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
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/4 opacity-8"
        >
          <WalnutIcon className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 right-1/3 opacity-12"
        >
          <PeanutIcon className="w-26 h-26" />
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
              Community at Divyansh International
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-deep-brown)] mb-6 font-heading">
              Responsibility That Grows Alongside the Business
            </h1>
            <p className="text-lg text-[var(--color-slate)] max-w-4xl mx-auto leading-relaxed">
              Divyansh International was built on the belief that a business does not grow in isolation. 
              Every milestone achieved carries a responsibility towards the people and ecosystems that make that growth possible.
            </p>
          </motion.div>
        </div>

        {/* Core Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-br from-white to-[var(--color-ivory)] p-10 md:p-12 rounded-3xl border-2 border-[var(--color-sand)] shadow-xl"
        >
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-[var(--color-slate)] leading-relaxed mb-6">
              Community, for the organisation, is not limited to external initiatives. It begins with employees, 
              extends to their families, supports education, strengthens industry collaboration, and respects the environment.
            </p>
            <p className="text-xl font-semibold text-[var(--color-almond-gold)]">
              This people-first approach reflects the values that guide Divyansh International as a responsible and purpose-driven organisation.
            </p>
          </div>
        </motion.div>

        {/* Education & Social Participation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gradient-to-br from-[var(--color-almond-gold)]/10 to-[var(--color-gold-light)]/5 p-8 rounded-3xl border-2 border-[var(--color-almond-gold)]/20">
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-3xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
                Giving Back Through Education
              </h2>
              <p className="text-[var(--color-slate)] leading-relaxed mb-4">
                As part of its broader commitment to social responsibility, Divyansh International actively associates 
                with government schools that serve underprivileged communities. The focus is on consistent involvement 
                rather than one-time support.
              </p>
              <p className="text-[var(--color-slate)] leading-relaxed">
                The organisation contributes wherever there is a genuine need — participating in initiatives, addressing 
                essential requirements, and supporting learning environments through ongoing engagement.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-[var(--color-sand)] shadow-lg">
              <p className="text-[var(--color-deep-brown)] font-semibold text-lg italic">
                "These efforts align with the company's belief that education is a long-term investment in stronger communities."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Women Empowerment */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-br from-[var(--color-pistachio-green)]/10 to-white p-10 md:p-12 rounded-3xl border-2 border-[var(--color-pistachio-green)]/20 shadow-xl"
        >
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">👩‍💼</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
              Women at the Core of Our Workforce
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-[var(--color-slate)] leading-relaxed">
            <p>
              People are central to everything at Divyansh International, and women form a vital part of that foundation.
            </p>
            <p>
              The organisation maintains close, personal relationships with its women employees, creating a work environment 
              that prioritises trust, respect, and continuity. Beyond providing employment, Divyansh International has nurtured 
              a supportive community where women share experiences, encourage one another, and build confidence together.
            </p>
            <p className="font-semibold text-[var(--color-deep-brown)]">
              A dedicated digital platform allows women employees to voice their journeys and motivate each other to step 
              into the workforce and sustain their careers. This initiative reflects the company's commitment to women 
              empowerment and inclusive growth.
            </p>
          </div>
        </motion.div>

        {/* Childcare & Learning */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-white to-[var(--color-cashew-cream)] p-10 md:p-12 rounded-3xl border-2 border-[var(--color-gold-light)] shadow-xl">
            <div className="text-center mb-8">
              <div className="text-5xl mb-4">🧒</div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
                Supporting Families Through Childcare and Learning
              </h2>
            </div>
            <div className="max-w-4xl mx-auto space-y-6 text-lg text-[var(--color-slate)] leading-relaxed">
              <p>
                Understanding the realities faced by working mothers, Divyansh International has created a dedicated 
                activity and learning centre for employees' children.
              </p>
              <p>
                This space includes supervised play areas for younger children and academic guidance through an assigned tutor. 
                By providing this support, the organisation enables women employees to work with peace of mind while ensuring 
                their children receive care and learning assistance in a safe environment.
              </p>
              <p className="text-center font-semibold text-[var(--color-almond-gold)] text-xl">
                Such initiatives reinforce Divyansh International's employee-centric culture and commitment to work-life balance.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Industry Collaboration */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-[var(--color-ivory)] to-white p-8 rounded-3xl border-2 border-[var(--color-sand)] shadow-lg">
              <div className="text-5xl mb-4">🤝</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
                Building Stronger Industry Communities
              </h2>
              <p className="text-[var(--color-slate)] leading-relaxed mb-4">
                Divyansh International actively participates in industry-level collaboration through its association 
                with a national trade council representing the nuts and dry fruits sector.
              </p>
              <p className="text-[var(--color-slate)] leading-relaxed">
                By engaging in discussions, trade roadshows, and collective initiatives, the organisation contributes 
                to addressing common industry challenges and promoting responsible trade practices.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[var(--color-leaf-green)]/10 to-white p-8 rounded-3xl border-2 border-[var(--color-leaf-green)]/20 shadow-lg">
              <div className="text-5xl mb-4">🌱</div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
                Environmental Responsibility
              </h2>
              <p className="text-[var(--color-slate)] leading-relaxed mb-4">
                Sustainability is integrated into the daily operations at Divyansh International.
              </p>
              <ul className="space-y-3 text-[var(--color-slate)]">
                <li className="flex items-start">
                  <span className="text-[var(--color-almond-gold)] mr-2">☀️</span>
                  <span>Solar energy systems to reduce environmental footprint</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-almond-gold)] mr-2">💧</span>
                  <span>Rainwater harvesting for responsible water usage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-almond-gold)] mr-2">🏠</span>
                  <span>Residential accommodation near workplace</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[var(--color-almond-gold)] mr-2">🎓</span>
                  <span>Partnerships with nearby schools for employees' children</span>
                </li>
              </ul>
            </div>
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

        {/* Growing With Purpose - Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 bg-gradient-to-br from-white to-[var(--color-ivory)] p-10 md:p-12 rounded-3xl border-2 border-[var(--color-sand)] shadow-xl"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
              Growing With Purpose
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-[var(--color-slate)] leading-relaxed">
            <p className="text-center">
              At Divyansh International, community responsibility is not a separate chapter from business—it is part of the same story.
            </p>
            <p>
              By supporting education, empowering women, caring for families, participating in industry dialogue, 
              and investing in environmental sustainability, the organisation continues to grow with purpose, integrity, and empathy.
            </p>
            <p className="text-center text-xl font-semibold text-[var(--color-deep-brown)]">
              This is how Divyansh International builds long-term value—for its people, its partners, and the communities it serves.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
