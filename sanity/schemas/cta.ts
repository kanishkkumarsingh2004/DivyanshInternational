import { defineType, defineField } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to Action",
  type: "document",
  fields: [
    defineField({
      name: "walkthrough",
      title: "Walkthrough Section",
      type: "object",
      fields: [
        { name: "subtitle", type: "string", title: "Subtitle" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
        { name: "buttonText", type: "string", title: "Button Text" },
      ],
    }),
    defineField({
      name: "pricing",
      title: "Pricing Section",
      type: "object",
      fields: [
        { name: "subtitle", type: "string", title: "Subtitle" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
        { name: "buttonText", type: "string", title: "Button Text" },
        { name: "emailPlaceholder", type: "string", title: "Email Placeholder" },
      ],
    }),
  ],
});
