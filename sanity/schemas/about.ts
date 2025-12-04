import { defineType, defineField } from "sanity";

export default defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "ourStory",
      title: "Our Story",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Eyebrow" },
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
      ],
    }),
    defineField({
      name: "whoWeAre",
      title: "Who We Are",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
        { name: "image", type: "image", title: "Image" },
        {
          name: "stats",
          type: "array",
          title: "Stats",
          of: [
            {
              type: "object",
              fields: [
                { name: "value", type: "string", title: "Value" },
                { name: "label", type: "string", title: "Label" },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: "mission",
      title: "Mission",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
      ],
    }),
    defineField({
      name: "vision",
      title: "Vision",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
      ],
    }),
    defineField({
      name: "commitment",
      title: "Commitment",
      type: "object",
      fields: [
        { name: "title", type: "string", title: "Title" },
        { name: "description", type: "text", title: "Description" },
      ],
    }),
    defineField({
      name: "teamSection",
      title: "Team Section",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Eyebrow" },
        { name: "title", type: "string", title: "Title" },
      ],
    }),
    defineField({
      name: "journeySection",
      title: "Journey Section",
      type: "object",
      fields: [
        { name: "eyebrow", type: "string", title: "Eyebrow" },
        { name: "title", type: "string", title: "Title" },
      ],
    }),
    defineField({
      name: "distributionRegions",
      title: "Distribution Regions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "x", type: "number", title: "X Coordinate (%)" },
            { name: "y", type: "number", title: "Y Coordinate (%)" },
          ],
        },
      ],
    }),
  ],
});
