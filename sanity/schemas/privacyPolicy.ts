import { defineType, defineField } from "sanity";

export default defineType({
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastUpdated",
      title: "Last Updated Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "content",
      title: "Content Sections",
      type: "array",
      of: [
        {
          type: "object",
          title: "Section",
          fields: [
            {
              name: "heading",
              title: "Section Heading",
              type: "string",
            },
            {
              name: "body",
              title: "Section Body",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    }),
  ],
});
