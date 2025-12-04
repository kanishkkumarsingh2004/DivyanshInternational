import { defineType, defineField } from "sanity";

export default defineType({
  name: "header",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "url", type: "string", title: "URL" },
          ],
        },
      ],
    }),
    defineField({
      name: "tradeButtonText",
      title: "Trade Button Text",
      type: "string",
    }),
    defineField({
      name: "whatsappText",
      title: "WhatsApp Button Text",
      type: "string",
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      type: "string",
    }),
    defineField({
      name: "homeAriaLabel",
      title: "Home Link Aria Label",
      type: "string",
    }),
    defineField({
      name: "navAriaLabel",
      title: "Navigation Aria Label",
      type: "string",
    }),
    defineField({
      name: "menuAriaLabel",
      title: "Mobile Menu Open Aria Label",
      type: "string",
    }),
    defineField({
      name: "closeMenuAriaLabel",
      title: "Mobile Menu Close Aria Label",
      type: "string",
    }),
    defineField({
      name: "productsLabel",
      title: "Products Label (Mobile Menu)",
      type: "string",
    }),
  ],
});
