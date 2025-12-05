"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import type { SanityImageSource } from "@sanity/image-url";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalized, LocaleString, LocaleText } from "@/lib/i18n";

interface Product {
    _id: string;
    title: LocaleString;
    category: string;
    description?: LocaleText;
    heroImage?: SanityImageSource;
}

interface CatalogueControlsProps {
    selectedProducts: Set<string>;
    allProducts: Product[];
    onClearSelection: () => void;
}

export default function CatalogueControls({
    selectedProducts,
    allProducts,
    onClearSelection,
}: CatalogueControlsProps) {
    const { language } = useLanguage();
    const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const selectedCount = selectedProducts.size;
    const selectedProductsList = allProducts.filter((p) => selectedProducts.has(p._id));

    const generatePDF = async (includeAll: boolean = false) => {
        setIsGeneratingPDF(true);

        try {
            const doc = new jsPDF();
            const productsToInclude = includeAll ? allProducts : selectedProductsList;

            // Header
            doc.setFontSize(24);
            doc.setTextColor(62, 47, 35); // Deep brown
            doc.text("Divyansh International", 20, 20);

            doc.setFontSize(12);
            doc.setTextColor(107, 114, 128); // Muted
            doc.text("Product Catalogue", 20, 30);

            doc.setDrawColor(201, 166, 107); // Gold
            doc.setLineWidth(0.5);
            doc.line(20, 35, 190, 35);

            let yPosition = 50;

            for (let i = 0; i < productsToInclude.length; i++) {
                const product = productsToInclude[i];

                // Check if we need a new page
                if (yPosition > 250) {
                    doc.addPage();
                    yPosition = 20;
                }

                // Product title
                doc.setFontSize(16);
                doc.setTextColor(62, 47, 35);
                doc.text(getLocalized(product.title, language), 20, yPosition);
                yPosition += 8;

                // Category
                doc.setFontSize(10);
                doc.setTextColor(179, 137, 58); // Gold dark
                doc.text(product.category.toUpperCase(), 20, yPosition);
                yPosition += 8;

                // Description
                if (product.description) {
                    doc.setFontSize(10);
                    doc.setTextColor(74, 85, 104); // Slate
                    const descriptionText = getLocalized(product.description, language);
                    const splitDescription = doc.splitTextToSize(descriptionText, 170);
                    doc.text(splitDescription, 20, yPosition);
                    yPosition += splitDescription.length * 5 + 5;
                }

                // Separator
                doc.setDrawColor(232, 224, 213); // Sand
                doc.line(20, yPosition, 190, yPosition);
                yPosition += 15;
            }

            // Footer
            const pageCount = doc.getNumberOfPages();
            for (let i = 1; i <= pageCount; i++) {
                doc.setPage(i);
                doc.setFontSize(8);
                doc.setTextColor(107, 114, 128);
                doc.text(
                    `Divyansh International - Premium Quality Dry Fruits & Spices | Page ${i} of ${pageCount}`,
                    20,
                    285
                );
            }

            // Download
            const filename = includeAll
                ? "Divyansh-International-Full-Catalogue.pdf"
                : `Divyansh-International-Selected-Products-${selectedCount}.pdf`;
            doc.save(filename);
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    const handleSendEnquiry = () => {
        if (selectedCount === 0) {
            alert("Please select at least one product to send an enquiry.");
            return;
        }
        setIsEnquiryModalOpen(true);
    };

    return (
        <>
            <motion.div
                className="fixed bottom-4 md:bottom-8 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-[var(--color-sand)] p-4"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* Selection Counter */}
                    <div className="flex items-center justify-between w-full md:w-auto gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-[var(--color-gold)] flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-bold">{selectedCount}</span>
                            </div>
                            <span className="text-sm text-[var(--color-text)]">
                                {selectedCount === 0
                                    ? "No products selected"
                                    : `${selectedCount} product${selectedCount > 1 ? "s" : ""} selected`}
                            </span>
                        </div>

                        {/* Mobile Clear Button */}
                        {selectedCount > 0 && (
                            <button
                                onClick={onClearSelection}
                                className="md:hidden text-sm text-[var(--color-muted)] hover:text-[var(--color-deep-brown)]"
                            >
                                Clear
                            </button>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-8 bg-[var(--color-sand)]" />

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
                        {selectedCount > 0 && (
                            <button
                                onClick={onClearSelection}
                                className="hidden md:block px-4 py-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-deep-brown)] transition-colors"
                            >
                                Clear Selection
                            </button>
                        )}

                        <button
                            onClick={() => generatePDF(false)}
                            disabled={selectedCount === 0 || isGeneratingPDF}
                            className="flex-1 md:flex-none px-3 py-2 rounded-lg text-xs md:text-sm font-medium bg-[var(--color-beige)] text-[var(--color-deep-brown)] hover:bg-[var(--color-sand)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                            {isGeneratingPDF ? "..." : "Download Selected"}
                        </button>

                        <button
                            onClick={() => generatePDF(true)}
                            disabled={isGeneratingPDF}
                            className="flex-1 md:flex-none px-3 py-2 rounded-lg text-xs md:text-sm font-medium bg-[var(--color-sand)] text-[var(--color-deep-brown)] hover:bg-[var(--color-beige)] transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                            Download All
                        </button>

                        <button
                            onClick={handleSendEnquiry}
                            disabled={selectedCount === 0}
                            className="flex-1 md:flex-none px-4 py-2 rounded-lg text-xs md:text-sm font-medium bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md whitespace-nowrap"
                        >
                            Send Enquiry
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Enquiry Modal */}
            {isEnquiryModalOpen && (
                <EnquiryModal
                    selectedProducts={selectedProductsList}
                    onClose={() => setIsEnquiryModalOpen(false)}
                />
            )}
        </>
    );
}

// Enquiry Modal Component
function EnquiryModal({
    selectedProducts,
    onClose,
}: {
    selectedProducts: Product[];
    onClose: () => void;
}) {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const productList = selectedProducts.map((p) => getLocalized(p.title, language)).join(", ");

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    type: "catalogue-enquiry",
                    products: productList,
                    message: `${formData.message}\n\nInterested Products: ${productList}`,
                }),
            });

            if (response.ok) {
                alert("Enquiry sent successfully! We'll get back to you soon.");
                onClose();
            } else {
                throw new Error("Failed to send enquiry");
            }
        } catch (error) {
            console.error("Error sending enquiry:", error);
            alert("Failed to send enquiry. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[var(--color-deep-brown)] font-heading">
                        Send Enquiry
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-[var(--color-muted)] hover:text-[var(--color-deep-brown)] transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-[var(--color-muted)] mb-2">Selected Products:</p>
                    <div className="flex flex-wrap gap-2">
                        {selectedProducts.map((product) => (
                            <span
                                key={product._id}
                                className="px-3 py-1 bg-[var(--color-beige)] text-[var(--color-deep-brown)] text-xs rounded-full"
                            >
                                {getLocalized(product.title, language)}
                            </span>
                        ))}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                            Name *
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-[var(--color-sand)] rounded-lg focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                            Email *
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border border-[var(--color-sand)] rounded-lg focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-[var(--color-sand)] rounded-lg focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[var(--color-text)] mb-1">
                            Message
                        </label>
                        <textarea
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full px-4 py-2 border border-[var(--color-sand)] rounded-lg focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent resize-none"
                            placeholder="Tell us about your requirements..."
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-[var(--color-sand)] rounded-lg text-[var(--color-text)] hover:bg-[var(--color-beige)] transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-[var(--color-gold)] text-white rounded-lg hover:bg-[var(--color-gold-dark)] transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? "Sending..." : "Send Enquiry"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
