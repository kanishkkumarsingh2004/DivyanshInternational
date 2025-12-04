export interface EnquiryItem {
  id: string;
  productId: string;
  productTitle: string;
  grade?: string;
  packFormat?: string;
  quantity?: string;
  MOQ?: string;
  notes?: string;
}

const STORAGE_KEY = "divyansh_enquiry";

export function getEnquiryItems(): EnquiryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveEnquiryItems(items: EnquiryItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function addEnquiryItem(item: Omit<EnquiryItem, "id">): EnquiryItem[] {
  const items = getEnquiryItems();
  const newItem: EnquiryItem = {
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`,
  };
  const updated = [...items, newItem];
  saveEnquiryItems(updated);
  return updated;
}

export function updateEnquiryItem(id: string, updates: Partial<EnquiryItem>): EnquiryItem[] {
  const items = getEnquiryItems();
  const updated = items.map((item) => (item.id === id ? { ...item, ...updates } : item));
  saveEnquiryItems(updated);
  return updated;
}

export function removeEnquiryItem(id: string): EnquiryItem[] {
  const items = getEnquiryItems();
  const updated = items.filter((item) => item.id !== id);
  saveEnquiryItems(updated);
  return updated;
}

export function clearEnquiryItems(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
