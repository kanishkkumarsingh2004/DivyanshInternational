import { defineType, defineField } from "sanity";

const supportedLanguages = [
  { id: "en", title: "English", isDefault: true },
  { id: "ar", title: "Arabic" },
  { id: "hi", title: "Hindi" },
  { id: "fr", title: "French" },
];

export default defineType({
  name: "localeString",
  title: "Localized String",
  type: "object",
  fieldsets: [
    {
      title: "Translations",
      name: "translations",
      options: { collapsible: true },
    },
  ],
  fields: supportedLanguages.map((lang) =>
    defineField({
      title: lang.title,
      name: lang.id,
      type: "string",
      fieldset: lang.isDefault ? undefined : "translations",
    })
  ),
});
