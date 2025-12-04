import { NutIcon } from "@/components/assets/Decorations";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--color-bg)]">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-[var(--color-gold)]/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <NutIcon className="w-10 h-10 text-[var(--color-gold)]" />
        </div>
      </div>
    </div>
  );
}
