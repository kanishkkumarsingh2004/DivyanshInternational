"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGeneralEnquirySchema, type GeneralEnquiryInput } from "@/lib/validation/schemas";
import { trackEvent } from "@/components/analytics/GA4";

interface GeneralEnquiryFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formLabels?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  analytics?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validation?: any;
}

export default function GeneralEnquiryForm({
  formLabels,
  analytics,
  validation,
}: GeneralEnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const labels = formLabels || {};
  const analyticsConfig = analytics || {};

  const generalEnquirySchema = createGeneralEnquirySchema(validation);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GeneralEnquiryInput>({
    resolver: zodResolver(generalEnquirySchema),
  });

  const onSubmit = async (data: GeneralEnquiryInput) => {
    if (data.honeypot) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(labels.generalEnquiryEndpoint || "/api/contact/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        const eventName = analyticsConfig.eventFormSubmission || "form_submission";
        const paramName = analyticsConfig.paramFormType || "form_type";
        const formType = analyticsConfig.formTypeGeneral || "general_enquiry";
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

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text)] mb-2">
          {labels.nameLabel} <span className="text-red-500">{labels.requiredIndicator || "*"}</span>
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
        <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
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
        <label htmlFor="phone" className="block text-sm font-medium text-[var(--color-text)] mb-2">
          {labels.phoneLabel}
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
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
          rows={5}
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
