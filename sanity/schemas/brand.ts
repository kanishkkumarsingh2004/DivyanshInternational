import { defineType, defineField } from "sanity";

export default defineType({
  name: "brand",
  title: "Brand",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Brand Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "brandCopy",
      title: "Brand Copy",
      type: "text",
    }),
    defineField({
      name: "productSKUs",
      title: "Product SKUs",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "distributionContacts",
      title: "Distribution Contacts",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "email", type: "string" },
            { name: "phone", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "specSheetPDF",
      title: "Spec Sheet PDF",
      type: "file",
      options: {
        accept: "application/pdf",
      },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "heroImage",
    },
  },
});
