import { defineType, defineField } from "sanity";

export default defineType({
  name: "capability",
  title: "Capability",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "metric",
      title: "Metric (e.g., 12+ origins)",
      type: "string",
    }),
    defineField({
      name: "icon",
      title: "Icon Name (Optional)",
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
