import { useState } from "react";

import type { EnquiryItem as EnquiryItemType } from "@/lib/utils/enquiry";

interface EnquiryLabels {
  grade?: string;
  packFormat?: string;
  quantity?: string;
  moq?: string;
  notes?: string;
  save?: string;
  cancel?: string;
  edit?: string;
  gradePlaceholder?: string;
  packFormatPlaceholder?: string;
  quantityPlaceholder?: string;
  notesPlaceholder?: string;
  removeAriaLabel?: string;
}

interface EnquiryItemProps {
  item: EnquiryItemType;
  onUpdate: (id: string, updates: Partial<EnquiryItemType>) => void;
  onRemove: (id: string) => void;
  labels?: EnquiryLabels;
}

export default function EnquiryItem({ item, onUpdate, onRemove, labels }: EnquiryItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [grade, setGrade] = useState(item.grade || "");
  const [packFormat, setPackFormat] = useState(item.packFormat || "");
  const [quantity, setQuantity] = useState(item.quantity || "");
  const [notes, setNotes] = useState(item.notes || "");

  const handleSave = () => {
    onUpdate(item.id, {
      grade: grade || undefined,
      packFormat: packFormat || undefined,
      quantity: quantity || undefined,
      notes: notes || undefined,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-[var(--color-deep-brown)]">{item.productTitle}</h3>
        <button
          onClick={() => onRemove(item.id)}
          className="text-[var(--color-muted)] hover:text-[var(--color-error)] transition-colors focus:outline-2 focus:outline-[var(--color-error)] focus:rounded p-1"
          aria-label={labels?.removeAriaLabel}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[var(--color-muted)] mb-1">
              {labels?.grade}
            </label>
            <input
              type="text"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)]"
              placeholder={labels?.gradePlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-muted)] mb-1">
              {labels?.packFormat}
            </label>
            <input
              type="text"
              value={packFormat}
              onChange={(e) => setPackFormat(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)]"
              placeholder={labels?.packFormatPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-muted)] mb-1">
              {labels?.quantity}
            </label>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)]"
              placeholder={labels?.quantityPlaceholder}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-muted)] mb-1">
              {labels?.notes}
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-sm focus:ring-[var(--color-gold)] focus:border-[var(--color-gold)]"
              rows={2}
              placeholder={labels?.notesPlaceholder}
            />
          </div>
          <div className="flex gap-2 justify-end mt-2">
            <button
              onClick={handleSave}
              className="text-xs bg-[var(--color-gold)] text-white px-3 py-1.5 rounded hover:bg-[var(--color-gold-dark)] transition-colors focus:outline-2 focus:outline-[var(--color-gold-dark)] focus:outline-offset-1"
            >
              {labels?.save}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-xs border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors focus:outline-2 focus:outline-gray-400 focus:outline-offset-1"
            >
              {labels?.cancel}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-1 text-sm">
          {item.grade && (
            <p>
              <strong>{labels?.grade}:</strong> {item.grade}
            </p>
          )}
          {item.packFormat && (
            <p>
              <strong>{labels?.packFormat}:</strong> {item.packFormat}
            </p>
          )}
          {item.quantity && (
            <p>
              <strong>{labels?.quantity}:</strong> {item.quantity}
            </p>
          )}
          {item.MOQ && (
            <p>
              <strong>{labels?.moq}:</strong> {item.MOQ}
            </p>
          )}
          {item.notes && (
            <p>
              <strong>{labels?.notes}:</strong> {item.notes}
            </p>
          )}
          <button
            onClick={() => setIsEditing(true)}
            className="text-xs text-[var(--color-gold)] hover:underline mt-2 focus:outline-2 focus:outline-[var(--color-gold)] focus:rounded p-1"
          >
            {labels?.edit}
          </button>
        </div>
      )}
    </div>
  );
}
