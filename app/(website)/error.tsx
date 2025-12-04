"use client";

import { useEffect, useState } from "react";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

interface ErrorSettings {
  genericErrorTitle: string;
  genericErrorText: string;
  tryAgainButton: string;
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [errorSettings, setErrorSettings] = useState<ErrorSettings | null>(null);

  useEffect(() => {
    console.error(error);

    client
      .fetch(siteSettingsQuery)
      .then((settings) => {
        if (settings?.error) {
          setErrorSettings(settings.error);
        }
      })
      .catch((err) => console.error("Failed To Fetch Error Settings", err));
  }, [error]);

  if (!errorSettings) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-bg)] px-4 text-center">
      <h2 className="text-3xl font-bold text-[var(--color-deep-brown)] mb-4 font-heading">
        {errorSettings.genericErrorTitle}
      </h2>
      <p className="text-[var(--color-text)] mb-8 max-w-md">{errorSettings.genericErrorText}</p>
      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-[var(--color-gold)] text-white rounded-full font-semibold hover:bg-[var(--color-gold-dark)] transition-colors shadow-lg"
      >
        {errorSettings.tryAgainButton}
      </button>
    </div>
  );
}
