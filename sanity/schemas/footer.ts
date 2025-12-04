import { defineType, defineField } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string" },
            { name: "url", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "certificationBadges",
      title: "Certification Badges",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Media Links",
      type: "object",
      fields: [
        { name: "facebook", type: "url" },
        { name: "twitter", type: "url" },
        { name: "linkedin", type: "url" },
        { name: "instagram", type: "url" },
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
    }),
    defineField({
      name: "privacyNote",
      title: "Privacy Note",
      type: "text",
    }),
  ],
});
