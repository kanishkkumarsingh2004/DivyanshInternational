import { defineType, defineField } from "sanity";

export default defineType({
  name: "sustainabilityPillar",
  title: "Sustainability Pillar",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "detail",
      title: "Detail",
      type: "text",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
});
