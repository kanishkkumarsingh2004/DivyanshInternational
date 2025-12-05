import { Language } from "@/context/LanguageContext";

export type LocaleString = Record<Language, string>;
export type LocaleText = Record<Language, string>;

export function getLocalized(
  content: LocaleString | LocaleText | string | undefined,
  language: Language
): string {
  if (!content) return "";
  if (typeof content === "string") return content;
  return content[language] || content["en"] || "";
}
