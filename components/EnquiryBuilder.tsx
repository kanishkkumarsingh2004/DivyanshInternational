"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { addEnquiryItem, getEnquiryItems } from "@/lib/utils/enquiry";
import EnquiryPanel from "@/components/EnquiryPanel";
import { trackEvent } from "@/components/analytics/GA4";

interface EnquiryBuilderProps {
  labels?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    panel?: any;
    builder?: {
      buttonLabel?: string;
    };
    pdfError?: string;
    emptyEnquiryError?: string;
    openBuilderAria?: string;
  };
}

export default function EnquiryBuilder({ labels }: EnquiryBuilderProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setItemCount(getEnquiryItems().length);
    };
    updateCount();
    window.addEventListener("enquiryUpdated", updateCount);
    return () => window.removeEventListener("enquiryUpdated", updateCount);
  }, []);

  useEffect(() => {
    const handleAddToEnquiry = (event: Event) => {
      const customEvent = event as CustomEvent;
      const product = customEvent.detail;
      addEnquiryItem({
        productId: product._id || product.id,
        productTitle: product.title,
        MOQ: product.MOQ,
      });
      window.dispatchEvent(new Event("enquiryUpdated"));
      trackEvent("add_to_enquiry", { product: product.title, location: "builder" });
    };

    const handleOpenPanel = () => {
      setIsPanelOpen(true);
      trackEvent("enquiry_panel_opened", { source: "floating_bar" });
    };

    window.addEventListener("addToEnquiry", handleAddToEnquiry);
    window.addEventListener("openEnquiryPanel", handleOpenPanel);
    return () => {
      window.removeEventListener("addToEnquiry", handleAddToEnquiry);
      window.removeEventListener("openEnquiryPanel", handleOpenPanel);
    };
  }, []);

  const handleExportPDF = async () => {
    const items = getEnquiryItems();
    try {
      const response = await fetch("/api/enquiry/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `enquiry-${new Date().toISOString().split("T")[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        trackEvent("enquiry_pdf_exported");
      } else {
        alert(labels?.pdfError);
      }
    } catch (error) {
      console.error("Error Exporting PDF:", error);
      alert(labels?.pdfError);
    }
  };

  const handleSubmit = () => {
    const items = getEnquiryItems();
    if (items.length === 0) {
      alert(labels?.emptyEnquiryError);
      return;
    }

    sessionStorage.setItem("pendingEnquiryPopulation", JSON.stringify(items));

    setIsPanelOpen(false);

    window.location.href = "/contact?type=trade";
  };

  if (itemCount === 0 && !isPanelOpen) return null;

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsPanelOpen(true);
          trackEvent("enquiry_panel_opened");
        }}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white rounded-full px-6 py-4 shadow-[0_25px_60px_rgba(0,0,0,0.35)] flex items-center gap-3 focus:outline-2 focus:outline-white focus:outline-offset-2"
        aria-label={labels?.openBuilderAria}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
        <span className="hidden sm:inline font-semibold tracking-wide">
          {labels?.builder?.buttonLabel}
        </span>
        {itemCount > 0 && (
          <span className="bg-white/90 text-[var(--color-gold-dark)] rounded-full px-3 py-1 text-xs font-bold">
            {itemCount}
          </span>
        )}
      </motion.button>

      <EnquiryPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        onExportPDF={handleExportPDF}
        onSubmit={handleSubmit}
        labels={labels?.panel}
      />
    </>
  );
}
