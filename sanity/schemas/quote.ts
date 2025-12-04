import { defineType, defineField } from "sanity";

export default defineType({
  name: "quote",
  title: "Spiral Quote",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "linkText",
      title: "Link Text",
      type: "string",
    }),
    defineField({
      name: "linkUrl",
      title: "Link URL",
      type: "string",
    }),
  ],
});
