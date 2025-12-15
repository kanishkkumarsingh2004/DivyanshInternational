"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getEnquiryItems,
  removeEnquiryItem,
  updateEnquiryItem,
  clearEnquiryItems,
  type EnquiryItem,
} from "@/lib/utils/enquiry";

import EnquiryItemComponent from "@/components/EnquiryItem";
import { trackEvent } from "@/components/analytics/GA4";

interface EnquiryPanelLabels {
  title?: string;
  emptyState?: string;
  emptyStateSub?: string;
  exportPdf?: string;
  submitEnquiry?: string;
  clearAll?: string;
  confirmClear?: string;
  itemLabels?: {
    grade?: string;
    packFormat?: string;
    quantity?: string;
    moq?: string;
    notes?: string;
    save?: string;
    cancel?: string;
    edit?: string;
  };
  closePanelAria?: string;
}

interface EnquiryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onExportPDF: () => void;
  onSubmit: () => void;
  labels?: EnquiryPanelLabels;
}

export default function EnquiryPanel({
  isOpen,
  onClose,
  onExportPDF,
  onSubmit,
  labels,
}: EnquiryPanelProps) {
  const [items, setItems] = useState<EnquiryItem[]>([]);

  useEffect(() => {
    const syncItems = () => {
      setItems(getEnquiryItems());
    };
    syncItems();
    window.addEventListener("enquiryUpdated", syncItems);
    return () => window.removeEventListener("enquiryUpdated", syncItems);
  }, []);

  const handleItemUpdate = (id: string, updates: Partial<EnquiryItem>) => {
    const updated = updateEnquiryItem(id, updates);
    setItems(updated);
    window.dispatchEvent(new Event("enquiryUpdated"));
  };

  const handleRemove = (id: string) => {
    const updated = removeEnquiryItem(id);
    setItems(updated);
    window.dispatchEvent(new Event("enquiryUpdated"));
    trackEvent("enquiry_item_removed", { item_id: id });
  };

  const handleClear = () => {
    if (confirm(labels?.confirmClear)) {
      clearEnquiryItems();
      setItems([]);
      window.dispatchEvent(new Event("enquiryUpdated"));
      trackEvent("enquiry_cleared");
    }
  };

  const handleExport = () => {
    trackEvent("enquiry_pdf_export", { item_count: items.length });
    onExportPDF();
  };

  const handleSubmit = () => {
    trackEvent("enquiry_submit_initiated", { item_count: items.length });
    onSubmit();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[460px] bg-[var(--color-ivory)] z-50 shadow-2xl overflow-y-auto border-l border-[#e9ddca]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-panel-title"
          >
            <div className="sticky top-0 bg-[var(--color-ivory)]/95 backdrop-blur border-b border-[#e5d8c3] p-5 flex justify-between items-center z-10">
              <h2
                id="enquiry-panel-title"
                className="text-xl font-semibold text-[var(--color-graphite)]"
              >
                {labels?.title} ({items.length})
              </h2>
              <button
                onClick={onClose}
                className="text-[var(--color-muted)] hover:text-[var(--color-graphite)] focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded-full p-2"
                aria-label={labels?.closePanelAria}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-5">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[var(--color-muted)] mb-4">{labels?.emptyState}</p>
                  <p className="text-sm text-[var(--color-muted)]">{labels?.emptyStateSub}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {items.map((item) => (
                      <EnquiryItemComponent
                        key={item.id}
                        item={item}
                        onUpdate={handleItemUpdate}
                        onRemove={handleRemove}
                        labels={labels?.itemLabels}
                      />
                    ))}
                  </div>

                  {/* Response Time Information */}
                  <div className="bg-gradient-to-br from-[var(--color-ivory)] to-[var(--color-cashew-cream)] p-4 rounded-2xl border border-[var(--color-sand)] mb-4">
                    <h4 className="text-sm font-bold text-[var(--color-deep-brown)] mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--color-almond-gold)] rounded-full animate-pulse"></span>
                      Response Times
                    </h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--color-almond-gold)] font-semibold">📧 Email:</span>
                        <span className="text-[var(--color-slate)]">24-48 hours response</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--color-almond-gold)] font-semibold">📱 WhatsApp:</span>
                        <span className="text-[var(--color-slate)]">12 hours response</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleExport}
                      className="w-full bg-black text-white px-6 py-3 rounded-full font-semibold tracking-wide hover:bg-[var(--color-graphite)] transition"
                    >
                      {labels?.exportPdf}
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-6 py-3 rounded-full font-semibold tracking-wide transition"
                    >
                      {labels?.submitEnquiry}
                    </button>
                    <button
                      onClick={handleClear}
                      className="w-full border border-[#f3c9c9] text-[#b14a4a] hover:bg-[#fef4f4] px-6 py-3 rounded-full font-medium transition"
                    >
                      {labels?.clearAll}
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
