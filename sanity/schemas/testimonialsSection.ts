import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "document",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Eyebrow Text",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
    }),
    defineField({
      name: "droneSection",
      title: "Drone Diaries Section",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Eyebrow" },
        { name: "title", type: "string", title: "Title" },
        { name: "placeholderText", type: "string", title: "Placeholder Text" },
        {
          name: "highlights",
          type: "array",
          title: "Highlights",
          of: [{ type: "string" }],
        },
        { name: "note", type: "string", title: "Footer Note" },
      ],
    }),
  ],
});
