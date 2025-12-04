import { defineType, defineField } from "sanity";

export default defineType({
  name: "community",
  title: "Community",
  type: "document",
  fields: [
    defineField({
      name: "teamPhotos",
      title: "Team Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "csrInitiatives",
      title: "CSR Initiatives",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "description", type: "text" },
            { name: "image", type: "image", options: { hotspot: true } },
          ],
        },
      ],
    }),
    defineField({
      name: "tradeEvents",
      title: "Trade Events",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string" },
            { name: "date", type: "date" },
            { name: "location", type: "string" },
            { name: "image", type: "image", options: { hotspot: true } },
          ],
        },
      ],
    }),
  ],
});
