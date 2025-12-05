"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTradeEnquirySchema, type TradeEnquiryInput } from "@/lib/validation/schemas";
import { getEnquiryItems } from "@/lib/utils/enquiry";
import { trackEvent } from "@/components/analytics/GA4";
import { useLanguage } from "@/context/LanguageContext";
import { getLocalized, LocaleString } from "@/lib/i18n";

interface TradeEnquiryFormProps {
  productList?: { _id: string; title: LocaleString }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formLabels?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analytics?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation?: any;
  initialProduct?: string;
  initialAction?: string;
}

export default function TradeEnquiryForm({
  productList,
  formLabels,
  analytics,
  validation,
  initialProduct,
  initialAction,
}: TradeEnquiryFormProps) {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const products = useMemo(
    () => productList?.map((p) => ({ _id: p._id, title: getLocalized(p.title, language) })) || [],
    [productList, language]
  );
  const labels = formLabels || {};
  const analyticsConfig = analytics || {};

  const tradeEnquirySchema = createTradeEnquirySchema(validation);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TradeEnquiryInput>({
    resolver: zodResolver(tradeEnquirySchema),
  });

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setValue("email", emailParam);
    }
  }, [searchParams, setValue]);

  useEffect(() => {
    if (initialProduct && products.some((p) => p.title === initialProduct)) {
      setSelectedProducts((prev) => {
        if (prev.includes(initialProduct)) return prev;
        return [...prev, initialProduct];
      });
    }
  }, [initialProduct, products]);

  useEffect(() => {
    setValue("productInterest", selectedProducts);
  }, [selectedProducts, setValue]);

  useEffect(() => {
    if (initialAction === "sample" && initialProduct) {
      const message = (
        labels.sampleRequestMessage || "I am interested in requesting a sample for {product}."
      ).replace("{product}", initialProduct);
      setValue("message", message);
    }
  }, [initialAction, initialProduct, setValue, labels.sampleRequestMessage]);

  useEffect(() => {
    const pendingData = sessionStorage.getItem("pendingEnquiryPopulation");
    if (pendingData) {
      try {
        const items = JSON.parse(pendingData);
        if (items.length > 0) {
          const productTitles = items.map((item: { productTitle: string }) => item.productTitle);
          setSelectedProducts(productTitles);
          setValue("productInterest", productTitles);
          const intro =
            labels.enquiryListIntro || "Please find the following products in my enquiry:";
          const itemsList = items
            .map(
              (item: { productTitle: string; quantity?: string }) =>
                `- ${item.productTitle}${item.quantity ? ` (${item.quantity})` : ""}`
            )
            .join("\n");
          setValue("message", `${intro}\n${itemsList}`);
        }
        sessionStorage.removeItem("pendingEnquiryPopulation");
      } catch (error) {
        console.error("Error parsing pending enquiry data:", error);
        sessionStorage.removeItem("pendingEnquiryPopulation");
      }
    }
  }, [setValue, setSelectedProducts, labels.enquiryListIntro]);

  useEffect(() => {
    const handlePopulate = () => {
      const items = getEnquiryItems();
      if (items.length > 0) {
        const productTitles = items.map((item) => item.productTitle);
        setSelectedProducts(productTitles);
        setValue("productInterest", productTitles);
        const intro =
          labels.enquiryListIntro || "Please find the following products in my enquiry:";
        const itemsList = items
          .map((item) => `- ${item.productTitle}${item.quantity ? ` (${item.quantity})` : ""}`)
          .join("\n");
        setValue("message", `${intro}\n${itemsList}`);
      }
    };

    const eventName = labels.populateEventName || "populateEnquiryForm";
    window.addEventListener(eventName, handlePopulate);
    return () => window.removeEventListener(eventName, handlePopulate);
  }, [setValue, labels.enquiryListIntro, labels.populateEventName]);

  const onSubmit = async (data: TradeEnquiryInput) => {
    if (data.honeypot) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(labels.tradeEnquiryEndpoint || "/api/contact/trade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        const eventName = analyticsConfig.eventFormSubmission || "form_submission";
        const paramName = analyticsConfig.paramFormType || "form_type";
        const formType = analyticsConfig.formTypeTrade || "trade_enquiry";
        trackEvent(eventName, { [paramName]: formType });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error Submitting Form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProduct = (productTitle: string) => {
    const updated = selectedProducts.includes(productTitle)
      ? selectedProducts.filter((p) => p !== productTitle)
      : [...selectedProducts, productTitle];
    setSelectedProducts(updated);
    setValue("productInterest", updated);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Honeypot */}
      <input
        type="text"
        {...register("honeypot")}
        className="hidden"
        tabIndex={labels.honeypotTabIndex ?? -1}
        autoComplete="off"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            {labels.nameLabel}{" "}
            <span className="text-red-500">{labels.requiredIndicator || "*"}</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-2 focus:outline-[var(--color-gold)] ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-[var(--color-text)] mb-2"
          >
            {labels.companyLabel}{" "}
            <span className="text-red-500">{labels.requiredIndicator || "*"}</span>
          </label>
          <input
            id="company"
            type="text"
            {...register("company")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-2 focus:outline-[var(--color-gold)] ${
              errors.company ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={errors.company ? "true" : "false"}
            aria-describedby={errors.company ? "company-error" : undefined}
          />
          {errors.company && (
            <p id="company-error" className="mt-1 text-sm text-red-500" role="alert">
              {errors.company.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-[var(--color-text)] mb-2">
            {labels.roleLabel}
          </label>
          <input
            id="role"
            type="text"
            {...register("role")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-2 focus:outline-[var(--color-gold)]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--color-text)] mb-2"
          >
            {labels.emailLabel}{" "}
            <span className="text-red-500">{labels.requiredIndicator || "*"}</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-2 focus:outline-[var(--color-gold)] ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[var(--color-text)] mb-2"
          >
            {labels.phoneLabel}{" "}
            <span className="text-red-500">{labels.requiredIndicator || "*"}</span>
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-2 focus:outline-[var(--color-gold)] ${
              errors.phone ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={errors.phone ? "true" : "false"}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1 text-sm text-red-500" role="alert">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-[var(--color-text)] mb-2"
          >
            {labels.countryLabel}{" "}
            <span className="text-red-500">{labels.requiredIndicator || "*"}</span>
          </label>
          <input
            id="country"
            type="text"
            {...register("country")}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-2 focus:outline-[var(--color-gold)] ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
            aria-invalid={errors.country ? "true" : "false"}
            aria-describedby={errors.country ? "country-error" : undefined}
          />
          {errors.country && (
            <p id="country-error" className="mt-1 text-sm text-red-500" role="alert">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
          {labels.productInterestLabel}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {products.map((product) => (
            <label
              key={product._id}
              className="flex items-center space-x-2 cursor-pointer p-3 border border-gray-300 rounded-lg hover:bg-[var(--color-beige)] transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedProducts.includes(product.title)}
                onChange={() => toggleProduct(product.title)}
                className="w-4 h-4 text-[var(--color-gold)] focus:ring-[var(--color-gold)] border-gray-300 rounded"
              />
              <span className="text-sm text-[var(--color-text)]">{product.title}</span>
            </label>
          ))}
        </div>
        <Controller name="productInterest" control={control} render={() => <></>} />
      </div>

      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-[var(--color-text)] mb-2"
        >
          {labels.quantityLabel}
        </label>
        <input
          id="quantity"
          type="text"
          {...register("quantity")}
          placeholder={labels.tradeQuantityPlaceholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-2 focus:outline-[var(--color-gold)]"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-[var(--color-text)] mb-2"
        >
          {labels.messageLabel}{" "}
          <span className="text-red-500">{labels.requiredIndicator || "*"}</span>
        </label>
        <textarea
          id="message"
          {...register("message")}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-2 focus:outline-[var(--color-gold)] ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {submitStatus === "success" && (
        <div
          className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800"
          role="alert"
        >
          {labels.successMessage}
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800" role="alert">
          {labels.errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-dark)] text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-2 focus:outline-[var(--color-gold-dark)] focus:outline-offset-2"
      >
        {isSubmitting ? labels.submittingButton : labels.submitButton}
      </button>
    </form>
  );
}
