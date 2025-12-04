"use client";

interface CTAData {
  walkthrough?: {
    subtitle: string;
    title: string;
    description: string;
    buttonText: string;
  };
  pricing?: {
    subtitle: string;
    title: string;
    description: string;
    buttonText: string;
    emailPlaceholder?: string;
  };
}

interface CTASectionProps {
  initialCTA?: CTAData | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routing?: any;
}

export default function CTASection({ initialCTA, routing }: CTASectionProps) {
  const cta = initialCTA;
  const sectionId = routing?.ctaSectionId || "cta";

  if (!cta) return null;

  return (
    <section id={sectionId} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-10 grid lg:grid-cols-2 gap-8">
        <div className="section-shell p-8 border border-[var(--color-sand)]">
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
            {cta.walkthrough?.subtitle}
          </p>
          <h3 className="text-2xl font-semibold text-[var(--color-graphite)] mb-4">
            {cta.walkthrough?.title}
          </h3>
          <p className="text-[var(--color-slate)] mb-6">{cta.walkthrough?.description}</p>
          <button
            onClick={() => {
              window.location.href = "/contact";
            }}
            className="px-8 py-3 rounded-full bg-[var(--color-gold)] text-white font-semibold hover:bg-[var(--color-gold-dark)] transition"
          >
            {cta.walkthrough?.buttonText}
          </button>
        </div>

        <div className="section-shell p-8 border border-[var(--color-sand)]">
          <p className="uppercase tracking-[0.4em] text-xs text-[var(--color-muted)] mb-4">
            {cta.pricing?.subtitle}
          </p>
          <h3 className="text-2xl font-semibold text-[var(--color-graphite)] mb-4">
            {cta.pricing?.title}
          </h3>
          <p className="text-[var(--color-slate)] mb-6">{cta.pricing?.description}</p>
          <form
            className="flex flex-col gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const email = formData.get("email");
              window.location.href = `/contact?type=trade&email=${email}`;
            }}
          >
            <input
              name="email"
              type="email"
              placeholder={cta.pricing?.emailPlaceholder}
              className="px-4 py-3 border border-[var(--color-sand)] rounded-full focus:outline-2 focus:outline-[var(--color-gold)]"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-black text-white font-semibold hover:bg-[var(--color-graphite)] transition"
            >
              {cta.pricing?.buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
