import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Almonds", value: "almonds" },
          { title: "Cashews", value: "cashews" },
          { title: "Walnuts", value: "walnuts" },
          { title: "Raisins", value: "raisins" },
          { title: "Pistachio", value: "pistachio" },
          { title: "Cardamom", value: "cardamom" },
          { title: "Coconut", value: "coconut" },
          { title: "Dried Fig", value: "dried-fig" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "origins",
      title: "Origins",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "grades",
      title: "Grades",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "packFormats",
      title: "Pack Formats",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "MOQ",
      title: "Minimum Order Quantity",
      type: "string",
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
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "microVideo",
      title: "Micro Video",
      type: "file",
      options: {
        accept: "video/*",
      },
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
      name: "heroHeading",
      title: "Hero Heading",
      type: "localeString",
    }),
    defineField({
      name: "introParagraphs",
      title: "Intro Paragraphs",
      type: "array",
      of: [{ type: "localeText" }],
    }),
    defineField({
      name: "listSections",
      title: "List Sections",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "localeString" }),
            defineField({ name: "items", title: "Items", type: "array", of: [{ type: "localeString" }] }),
          ],
        },
      ],
    }),
    defineField({
      name: "ctaLine",
      title: "CTA Line",
      type: "localeString",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "localeText",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "heroImage",
    },
  },
});
