"use client";

import { motion } from "framer-motion";

import { getEnquiryItems } from "@/lib/utils/enquiry";
import { useState, useEffect } from "react";

interface FloatingEnquiryLabels {
  item?: string;
  items?: string;
  inYourEnquiry?: string;
  readyToSubmit?: string;
  viewEnquiry?: string;
  submitEnquiry?: string;
}

interface FloatingEnquiryBarProps {
  labels?: FloatingEnquiryLabels;
}

export default function FloatingEnquiryBar({ labels }: FloatingEnquiryBarProps) {
  const [itemCount, setItemCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const items = getEnquiryItems();
      setItemCount(items.length);
      setIsVisible(items.length > 0);
    };
    updateCount();
    window.addEventListener("enquiryUpdated", updateCount);
    return () => window.removeEventListener("enquiryUpdated", updateCount);
  }, []);

  const handleSubmit = () => {
    const items = getEnquiryItems();
    if (items.length === 0) return;

    // Create WhatsApp message with enquiry items
    const whatsappNumber = "+919876543210"; // Replace with actual number
    let message = "Hi! I would like to enquire about the following products:\n\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.productTitle}`;
      if (item.MOQ) {
        message += ` (MOQ: ${item.MOQ})`;
      }
      message += "\n";
    });
    
    message += "\nPlease provide pricing and availability details. Thank you!";
    
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-deep-brown)] text-white shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span className="font-semibold">
                {itemCount} {itemCount === 1 ? labels?.item : labels?.items} {labels?.inYourEnquiry}
              </span>
            </div>
            <p className="text-sm text-white/80 hidden md:block">{labels?.readyToSubmit}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const event = new CustomEvent("openEnquiryPanel");
                window.dispatchEvent(event);
              }}
              className="px-6 py-2 border border-white/40 text-white hover:bg-white/10 rounded-lg font-medium transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2"
            >
              {labels?.viewEnquiry}
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white rounded-lg font-semibold transition-colors focus:outline-2 focus:outline-white focus:outline-offset-2"
            >
              {labels?.submitEnquiry}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
